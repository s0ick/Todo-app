import React, {FC} from 'react';
import {scaleOrdinal} from '@visx/scale';
import Pie from '@visx/shape/lib/shapes/Pie';
import {Group} from '@visx/group';

import {PiesTypes} from '../../../../utils/constants';
import {Segment} from '../../../../utils/pies.utils';
import {PiesColors} from '../../../todo-page';

import {AnimatedPie} from './animated-pie';

const defaultMargin = {top: 20, right: 20, bottom: 20, left: 20};

interface PiesData {
  outer: Array<Segment>,
  inner: Array<Segment>
}

interface PiesProps {
  data: PiesData,
  width: number,
  height: number,
  colors: PiesColors,
  margin?: typeof defaultMargin
}

export const TodoPies: FC<PiesProps> = ({
  data, width, height,
  colors, margin = defaultMargin
}) => {
  const getValue = (d: Segment) => d.value;

  const outerScale = scaleOrdinal({
    domain: data[PiesTypes.OUTER].map(s => s.label),
    range: colors[PiesTypes.OUTER]
  });

  const innerScale = scaleOrdinal({
    domain: data[PiesTypes.INNER].map(s => s.label),
    range: colors[PiesTypes.INNER]
  });

  if (width < 40) {
    return null;
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  return (
    <svg width={width} height={height}>
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={data[PiesTypes.OUTER]}
          pieValue={getValue}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.005}
        >
          {(pie) => (
            <AnimatedPie<Segment>
              {...pie}
              animate
              getKey={({ data: {label}}) => label}
              getColor={({ data: {label}}) => outerScale(label)}
            />
          )}
        </Pie>
        <Pie
          data={data[PiesTypes.INNER]}
          pieValue={getValue}
          pieSortValues={() => -1}
          outerRadius={radius - donutThickness * 1.3}
        >
          {(pie) => (
            <AnimatedPie<Segment>
              {...pie}
              animate
              getKey={({ data: {label}}) => label}
              getColor={({ data: {label}}) => innerScale(label)}
            />
          )}
        </Pie>
      </Group>
    </svg>
  );
}
