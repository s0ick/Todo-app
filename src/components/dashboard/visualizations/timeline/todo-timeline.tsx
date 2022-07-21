import React, {FC, memo, useCallback, useMemo} from 'react';
import {useTooltip, useTooltipInPortal, defaultStyles, TooltipWithBounds} from '@visx/tooltip';
import {scaleTime, scaleLinear} from '@visx/scale';
import {AxisLeft, AxisBottom} from '@visx/axis';
import {LinePath, Bar, Line} from '@visx/shape';
import {localPoint} from '@visx/event';
import {Group} from '@visx/group';
import {bisector} from 'd3-array';

import {ITimeline} from '../../../../utils/timeline.utils';
import {getFormattedDate} from '../../../../utils/utils';
import {Colors} from '../../../../common/styled/color-constants';
import {TooltipLine, TooltipRow, TooltipWrapper} from '../../../../common/styled/ui-components';

import {TodoTickWrapper, TodoTimelineWrapper} from '../../todo-dashboard.styled';

interface TimelineProps {
  width: number;
  height: number;
  data: Array<ITimeline>;
}

export type TooltipData = {
  x: Date;
  active: number;
  completed: number;
};

const defaultMargin = {top: 10, right: 30, bottom: 30, left: 30};
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: Colors.DARK,
  color: Colors.WHITE
};

export const TodoTimeline: FC<TimelineProps> = memo(({width, height, data}) => {
  if (width < 80) {
    return null;
  }

  const {xMax, yMax} = useMemo(
    () => {
      const xMax = width - defaultMargin.left - defaultMargin.right;
      const yMax = height - defaultMargin.top - defaultMargin.bottom;

      return {xMax, yMax};
    }, [width, height]
  );

  const getDate = (d: ITimeline) => d.x.valueOf();
  const domains = useMemo(
    () => {
      return data.map(getDate);
    }, [data]
  );

  const xScale = useMemo(
    () => {
      return scaleTime<number>({
        range: [0, xMax],
        domain: [
          Math.min(...domains),
          Math.max(...domains)
        ]
      });
    }, [domains]
  );

  const yScale = useMemo(
    () => {
      return scaleLinear<number>({
        range: [yMax, 0],
        domain: [
          Math.min(...data.map(d => Math.min(d.active, d.completed))),
          Math.max(...data.map(d => Math.max(d.active, d.completed)))
        ],
        nice: true
      });
    }, [data]
  );

  const {tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip} = useTooltip<TooltipData>();
  const {containerRef} = useTooltipInPortal({
    scroll: true,
  });

  const bisectDate = bisector<ITimeline, Date>(d => d.x).left;

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
      debugger
    },
    [showTooltip, yScale, xScale]
  );

  return (
    <TodoTimelineWrapper>
      <svg width={width} height={height} ref={containerRef}>
        <Group left={defaultMargin.left} top={defaultMargin.top}>
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
        </Group>

        <Bar
          x={defaultMargin.left}
          y={defaultMargin.top}
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
                <tspan x={tick.from.x + 30} dy={tick.to.y + 20}>
                  {tick.formattedValue !== '12 PM' && tick.formattedValue}
                </tspan>
              </TodoTickWrapper>
            ))
          }}
        </AxisBottom>

        {(tooltipData && tooltipTop) && (
          <g>
            <Line
              from={{x: tooltipLeft, y: defaultMargin.top}}
              to={{x: tooltipLeft, y: height + defaultMargin.top - defaultMargin.bottom}}
              stroke={Colors.HINT_ACTION}
              strokeWidth={1}
              pointerEvents={'none'}
              strokeDasharray={5}
            />
            <circle
              cx={xScale(getDate(tooltipData)) + defaultMargin.left}
              cy={yScale(tooltipData.active) + defaultMargin.top}
              r={4}
              fill={Colors.ACTION}
              fillOpacity={0.8}
              stroke={Colors.WHITE}
              strokeWidth={1}
              strokeOpacity={0.8}
              pointerEvents={'none'}
            />
            <circle
              cx={xScale(getDate(tooltipData)) + defaultMargin.left}
              cy={yScale(tooltipData.completed) + defaultMargin.top}
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
      </svg>

      {(tooltipData && tooltipLeft) && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={defaultMargin.top}
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
