import React, {FC, memo, useMemo} from 'react';
import {useTooltip, useTooltipInPortal, defaultStyles} from '@visx/tooltip';
import {scaleBand, scaleLinear, scaleOrdinal} from '@visx/scale';
import {GradientPinkBlue} from '@visx/gradient';
import {localPoint} from '@visx/event';
import {AxisBottom} from '@visx/axis';
import {BarStack} from '@visx/shape';
import {Group} from '@visx/group';

import {IBarStack} from '../../../../utils/visualizations/bar-stack.utils';
import {TooltipRow, TooltipWrapper} from '../../../../common/styled/ui-components';
import {Colors} from '../../../../common/styled/color-constants';
import {Content} from '../../../../utils/content-constants';
import {Languages} from '../../../../utils/constants';

import {
  TodoBarStackGroup,
  TodoTickWrapper,
  TodoBarStackWrapper,
  TodoChartsPlug
} from '../../todo-dashboard.styled';

interface TodoBarStackData {
  data: Array<IBarStack>;
  max: number;
}

interface TodoBarStackProps {
  width: number;
  height: number;
  barStackData: TodoBarStackData;
  lang: Languages;
}

export type TooltipData = {
  label: string;
  value: number;
};

const defaultMargin = {
  top: 40, right: 0, bottom: 0, left: 0
};
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: Colors.DARK,
  color: Colors.WHITE
};
let tooltipTimeout: number;

export const TodoBarStack: FC<TodoBarStackProps> = memo(({
  width, height, barStackData, lang
}) => {
  const {data, max} = barStackData;
  const getDay = (day: IBarStack) => day.x;

  const keys = useMemo(
    () => ['active', 'completed'],
    []
  );

  const xScale = useMemo(() => scaleBand<string>({
    domain: data.map(getDay),
    padding: 0.3
  }), [data]);

  const yScale = useMemo(() => scaleLinear<number>({
    domain: [0, max],
    nice: true
  }), [max]);

  const colorScale = useMemo(() => scaleOrdinal({
    domain: keys,
    range: ['url(#visx-gradient-bar-teal)', 'url(#visx-gradient-bar-pink)']
  }), [keys]);

  const {xMax, yMax} = useMemo(() => {
    const x = width;
    const y = height - defaultMargin.top - 25;

    return {xMax: x, yMax: y};
  }, [width, height]);

  const {
    tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip
  } = useTooltip<TooltipData>();

  const {containerRef, TooltipInPortal} = useTooltipInPortal({
    scroll: true
  });

  xScale.rangeRound([0, xMax]);
  yScale.range([yMax, 0]);

  if (width < 100 || height < 100) {
    return null;
  }

  return (
    <TodoBarStackWrapper>
      <svg ref={containerRef} width={width} height={height}>
        <GradientPinkBlue id="visx-gradient-bar-pink" fromOpacity={0.6} toOpacity={1} />

        <defs>
          <linearGradient id="visx-gradient-bar-teal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6094EA" stopOpacity="1" />
            <stop offset="100%" stopColor="#17EAD9" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {!barStackData.max && (
          <Group top={(height / 2) - defaultMargin.top} left={xMax / 2}>
            <TodoChartsPlug>
              <tspan x={0} dy={0}>{Content.BAR.PLUG.START[lang]}</tspan>
              <tspan x={0} dy="1.25em">{Content.BAR.PLUG.END[lang]}</tspan>
            </TodoChartsPlug>
          </Group>
        )}

        {barStackData.max && (
          <Group top={defaultMargin.top}>
            <TodoBarStackGroup>
              <BarStack
                data={data}
                keys={keys}
                x={getDay}
                xScale={xScale}
                yScale={yScale}
                color={colorScale}

              >
                {barStacks => barStacks.map(barStack => barStack.bars.map(bar => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.key === 'active' ? bar.y + 2 : bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 300);
                    }}
                    onMouseMove={event => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);

                      const eventSvgCoords = localPoint(event);
                      const left = bar.x + bar.width / 2;
                      const key = bar.key === 'active' ? 'active' : 'completed';
                      const value = bar.bar.data[key];

                      showTooltip({
                        tooltipData: {
                          label: bar.key,
                          value
                        },
                        tooltipTop: eventSvgCoords?.y,
                        tooltipLeft: left
                      });
                    }}
                  />
                )))}
              </BarStack>
            </TodoBarStackGroup>
          </Group>
        )}

        <AxisBottom
          top={yMax + defaultMargin.top}
          scale={xScale}
          stroke="none"
          tickStroke="none"
        >
          {axis => axis.ticks.map(tick => (
            <TodoTickWrapper
              key={`visx-axis-bot-tick-${tick.index}`}
              x={tick.from.x}
              y={tick.to.y}
            >
              <tspan x={tick.from.x} dy={tick.to.y + 6}>
                {tick.value}
              </tspan>
            </TodoTickWrapper>
          ))}
        </AxisBottom>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <TooltipWrapper>
            <TooltipRow>
              <strong>{tooltipData.label}</strong>
            </TooltipRow>
            <TooltipRow>
              {`Value: ${tooltipData.value}`}
            </TooltipRow>
          </TooltipWrapper>
        </TooltipInPortal>
      )}
    </TodoBarStackWrapper>
  );
});
