import React, {
  FC, memo, useCallback, useEffect, useMemo, useRef, useState
} from 'react';
import {BrushHandleRenderProps} from '@visx/brush/lib/BrushHandle';
import BaseBrush from '@visx/brush/lib/BaseBrush';
import {Bounds} from '@visx/brush/lib/types';
import {PatternLines} from '@visx/pattern';
import {Group} from '@visx/group';
import {Brush} from '@visx/brush';

import {getTimelineOptions, ITimeline} from '../../../../utils/visualizations/timeline.utils';
import {Colors} from '../../../../common/styled/color-constants';

import {TodoTimelineWrapper} from '../../todo-dashboard.styled';

import {TodoTimeline} from './todo-timeline';

interface TimelineProps {
  width: number;
  height: number;
  data: Array<ITimeline>;
  brushHeight: number;
}

const PATTERN_ID = 'BRUSH_PATTERN';
const defaultMargin = {
  top: 10, right: 30, bottom: 30, left: 30
};
const defaultBrushMargin = {
  top: 0, right: 30, bottom: 0, left: 30
};
const selectedBrushStyle = {
  fill: `url(#${PATTERN_ID})`,
  fillOpacity: 0.5,
  strokeOpacity: 0.5,
  stroke: 'white',
  rx: '14px'
};

function BrushHandle({x, height, isBrushActive}: BrushHandleRenderProps) {
  const pathWidth = 8;
  const pathHeight = 15;

  if (!isBrushActive) {
    return null;
  }

  return (
    <Group left={x + pathWidth / 2} top={(height - pathHeight) / 2} rx={20}>
      <path
        d="M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12"
        fill={Colors.WHITE}
        fillOpacity={0.5}
        stroke={Colors.LIGHT}
        strokeWidth="1"
        style={{cursor: 'ew-resize'}}
      />
    </Group>
  );
}

export const TodoTimelineBrush: FC<TimelineProps> = memo(({
  width, height, data, brushHeight
}) => {
  const brushRef = useRef<BaseBrush | null>(null);
  const [filteredData, setFilteredData] = useState(data);

  const getDate = (d: ITimeline) => d.x.valueOf();

  const options = useMemo(() => getTimelineOptions({
    getDate, data: filteredData, height, width, margin: defaultMargin
  }), [filteredData, height, width]);

  const brushOptions = useMemo(() => getTimelineOptions({
    getDate, data, height: brushHeight, width, margin: defaultBrushMargin
  }), [data, brushHeight, width]);

  const initialBrushPosition = useMemo(
    () => {
      const {xScale} = brushOptions;

      const startPoint = data.length > 51 ? data.length - 50 : 0;

      return {
        start: {x: xScale(getDate(data[startPoint]))},
        end: {x: xScale(getDate(data[data.length - 1]))}
      };
    },
    [data, brushOptions]
  );

  const onBrushChange = useCallback((domain: Bounds | null) => {
    if (!domain) {
      return;
    }

    const {x0, x1} = domain;
    const dataCopy = data.filter(s => {
      const x = getDate(s);
      return x > x0 && x < x1;
    });

    if (dataCopy.length > 5) {
      setFilteredData(dataCopy);
    }
  }, [data]);

  useEffect(() => {
    const startPoint = data.length > 51 ? data.length - 50 : 0;
    const start = getDate(data[startPoint]);
    const end = getDate(data[data.length - 1]);
    const dataCopy = data.filter(s => {
      const x = getDate(s);
      return x > start && x < end;
    });

    setFilteredData(dataCopy);
  }, [data]);

  if (width < 80) {
    return null;
  }

  return (
    <TodoTimelineWrapper>
      <TodoTimeline
        width={width}
        height={height}
        data={filteredData}
        options={options}
        margin={defaultMargin}
        getDate={getDate}
        isBrush={false}
      />

      <TodoTimeline
        width={width}
        height={brushOptions.yMax}
        data={data}
        options={brushOptions}
        margin={defaultBrushMargin}
        getDate={getDate}
        isBrush
      >
        <PatternLines
          id={PATTERN_ID}
          height={12}
          width={12}
          stroke={Colors.ACTION}
          strokeWidth={1}
          orientation={['diagonal']}
        />

        <Brush
          xScale={brushOptions.xScale}
          yScale={brushOptions.yScale}
          width={brushOptions.xMax}
          height={brushOptions.yMax}
          margin={defaultBrushMargin}
          handleSize={8}
          innerRef={brushRef}
          resizeTriggerAreas={['left', 'right']}
          brushDirection="horizontal"
          initialBrushPosition={initialBrushPosition}
          onChange={onBrushChange}
          onClick={() => setFilteredData(data)}
          selectedBoxStyle={selectedBrushStyle}
          useWindowMoveEvents
          renderBrushHandle={props => <BrushHandle {...props} />}
        />
      </TodoTimeline>
    </TodoTimelineWrapper>
  );
});
