import React from 'react';
import {animated, interpolate, useTransition} from 'react-spring';
import {PieArcDatum, ProvidedProps} from '@visx/shape/lib/shapes/Pie';

import {Colors} from '../../../../common/styled/color-constants';
import {TooltipData} from './todo-pies';

// react-spring transition definitions
type AnimatedStyles = {startAngle: number; endAngle: number; opacity: number};

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0
});

const enterUpdateTransition = ({startAngle, endAngle}: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1
});

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  delay?: number;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent<SVGPathElement, MouseEvent>, data: Datum) => void;
};

export function AnimatedPie<Datum>({
  animate, arcs, path, onMouseMove,
  getKey, getColor, onMouseLeave
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });

  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

    return (
      <g key={key}>
        <animated.path
          // compute interpolated path d attribute from intermediate angle values
          d={interpolate([props.startAngle, props.endAngle], (startAngle, endAngle) =>
            path({
              ...arc,
              startAngle,
              endAngle,
            }),
          )}
          fill={getColor(arc)}
          onMouseLeave={onMouseLeave}
          onMouseMove={e => onMouseMove(e, arc.data)}
        />
        {hasSpaceForLabel && (
          <animated.g style={{opacity: props.opacity}}>
            <text
              fill={Colors.WHITE}
              x={centroidX}
              y={centroidY}
              dy={'.33em'}
              fontSize={9}
              textAnchor={'middle'}
              pointerEvents={'none'}
            >
              {getKey(arc)}
            </text>
          </animated.g>
        )}
      </g>
    );
  });
}
