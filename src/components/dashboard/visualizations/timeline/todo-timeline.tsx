import React, {FC, memo, useCallback} from 'react';
import {useTooltip, useTooltipInPortal, defaultStyles, TooltipWithBounds} from '@visx/tooltip';
import {AxisLeft, AxisBottom} from '@visx/axis';
import {LinePath, Bar, Line} from '@visx/shape';
import {localPoint} from '@visx/event';
import {Group} from '@visx/group';
import {bisector} from 'd3-array';

import {IMargin, ITimeline} from '../../../../utils/timeline.utils';
import {getFormattedDate} from '../../../../utils/utils';
import {Colors} from '../../../../common/styled/color-constants';
import {TooltipLine, TooltipRow, TooltipWrapper} from '../../../../common/styled/ui-components';

import {TodoTickWrapper, TodoTimelineWrapper} from '../../todo-dashboard.styled';

interface TimelineOptions {
  xMax: number;
  yMax: number;
  xScale: any;
  yScale: any;
}

interface TimelineProps {
  width: number;
  height: number;
  data: Array<ITimeline>;
  options: TimelineOptions;
  isBrush: boolean;
  margin: IMargin;
  getDate: (d: ITimeline) => number;
  children?: React.ReactNode;
}

export type TooltipData = {
  x: Date;
  active: number;
  completed: number;
};

const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: Colors.DARK,
  color: Colors.WHITE
};

export const TodoTimeline: FC<TimelineProps> = memo(({
  width, height,
  data, isBrush, options,
  getDate, margin, children
}) => {
  if (width < 80) {
    return null;
  }

  const {xScale, yScale, yMax} = options;
  const bisectDate = bisector<ITimeline, Date>(d => d.x).left;

  const {tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip} = useTooltip<TooltipData>();
  const {containerRef} = useTooltipInPortal({
    scroll: true,
  });

  const handleTooltip = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      const {x} = localPoint(event) || {x: 0};
      const x0 = xScale.invert(x);
      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];
      let d = d0;
      if (d1 && getDate(d1)) {
        d = x0.valueOf() - getDate(d0) > getDate(d1) - x0.valueOf() ? d1 : d0;
      }
      showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: yScale(d.active)
      });
    },
    [showTooltip, yScale, xScale]
  );

  return (
    <TodoTimelineWrapper>
      <svg width={width} height={height} ref={containerRef}>
        <Group left={margin.left} top={margin.top}>
          {!isBrush && (
            <AxisLeft
              scale={yScale}
              stroke={'none'}
              tickStroke={'none'}
            >
              {axis => {
                return axis.ticks.map(tick => (
                  <TodoTickWrapper
                    key={`visx-axis-bot-tick-${tick.index}`}
                    x={tick.from.x}
                    y={tick.to.y}
                  >
                    <tspan x={tick.from.x - 15}>
                      {tick.formattedValue}
                    </tspan>
                  </TodoTickWrapper>
                ))
              }}
            </AxisLeft>
          )}

          <LinePath
            data={data}
            x={d => xScale(getDate(d))}
            y={d => yScale(d.active)}
            stroke={Colors.ACTION}
            strokeOpacity={0.8}
            strokeWidth={1.5}
          />
          <LinePath
            data={data}
            x={d => xScale(getDate(d))}
            y={d => yScale(d.completed)}
            stroke={Colors.SUCCESS}
            strokeOpacity={0.6}
            strokeWidth={1.5}
          />

          {!isBrush && (
            <>
              <Bar
                x={0}
                y={margin.top}
                width={width}
                height={height}
                fill={Colors.TRANSPARENT}
                onTouchStart={handleTooltip}
                onTouchMove={handleTooltip}
                onMouseMove={handleTooltip}
                onMouseLeave={() => hideTooltip()}
              />

              <AxisBottom
                top={yMax}
                scale={xScale}
                stroke={'none'}
                tickStroke={'none'}
                numTicks={width > 520 ? 10 : 5}
              >
                {axis => {
                  return axis.ticks.map(tick => (
                    <TodoTickWrapper
                      key={`visx-axis-bot-tick-${tick.index}`}
                      x={tick.from.x}
                      y={tick.to.y}
                    >
                      <tspan x={tick.from.x + margin.left} dy={tick.to.y + margin.top}>
                        {tick.formattedValue !== '12 PM' && tick.formattedValue}
                      </tspan>
                    </TodoTickWrapper>
                  ))
                }}
              </AxisBottom>
            </>
          )}

          {(tooltipData && tooltipTop && tooltipLeft) && (
            <g>
              <Line
                from={{x: tooltipLeft - margin.left, y: margin.top}}
                to={{x: tooltipLeft - margin.left, y: height - margin.bottom}}
                stroke={Colors.HINT_ACTION}
                strokeWidth={1}
                pointerEvents={'none'}
                strokeDasharray={5}
              />
              <circle
                cx={xScale(getDate(tooltipData))}
                cy={yScale(tooltipData.active)}
                r={4}
                fill={Colors.ACTION}
                fillOpacity={0.8}
                stroke={Colors.WHITE}
                strokeWidth={1}
                strokeOpacity={0.8}
                pointerEvents={'none'}
              />
              <circle
                cx={xScale(getDate(tooltipData))}
                cy={yScale(tooltipData.completed)}
                r={4}
                fill={Colors.SUCCESS}
                fillOpacity={0.8}
                stroke={Colors.WHITE}
                strokeWidth={1}
                strokeOpacity={0.8}
                pointerEvents={'none'}
              />
            </g>
          )}

          {children}
        </Group>
      </svg>

      {(tooltipData && tooltipLeft) && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={margin.top}
            left={tooltipLeft + 12}
            style={tooltipStyles}
          >
            <TooltipWrapper>
              <TooltipRow>
                <strong>{getFormattedDate(tooltipData.x)}</strong>
              </TooltipRow>
              <TooltipRow>
                <TooltipLine bgc={Colors.SUCCESS}/>
                {`Completed: ${tooltipData.completed}`}
              </TooltipRow>
              <TooltipRow>
                <TooltipLine bgc={Colors.ACTION}/>
                {`Active: ${tooltipData.active}`}
              </TooltipRow>
            </TooltipWrapper>
          </TooltipWithBounds>
        </div>
      )}
    </TodoTimelineWrapper>
  );
});
