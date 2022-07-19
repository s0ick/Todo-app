import React, {FC, memo} from 'react';
import {scaleTime, scaleLinear} from '@visx/scale';
import {AxisLeft, AxisBottom} from '@visx/axis';
import {LinePath} from '@visx/shape';
import {Group} from '@visx/group';

import {ITimeline} from '../../../../utils/timeline.utils';
import {Colors} from '../../../../common/styled/color-constants';
import {TodoTickWrapper} from '../../todo-dashboard.styled';

interface TimelineProps {
  width: number;
  height: number;
  data: Array<ITimeline>;
}

const defaultMargin = {top: 10, right: 30, bottom: 30, left: 30};

export const TodoTimeline: FC<TimelineProps> = memo(({width, height, data}) => {
  if (width < 80) {
    return null;
  }

  const getDate = (d: ITimeline) => d.x.valueOf();
  const domains = data.map(getDate);

  const xScale = scaleTime<number>({
    domain: [
      Math.min(...domains),
      Math.max(...domains)
    ]
  });
  const yScale = scaleLinear<number>({
    domain: [
      Math.min(...data.map(d => Math.min(d.active, d.completed))),
      Math.max(...data.map(d => Math.max(d.active, d.completed)))
    ],
    nice: true
  });

  const xMax = width - defaultMargin.left - defaultMargin.right;
  const yMax = height - defaultMargin.top - defaultMargin.bottom;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <svg width={width} height={height}>
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
    </svg>
  );
});
