import React, {FC, memo, useMemo} from 'react';
import {useTooltip, useTooltipInPortal, defaultStyles} from '@visx/tooltip';
import {GradientPinkBlue, GradientTealBlue} from '@visx/gradient';
import Pie from '@visx/shape/lib/shapes/Pie';
import {scaleOrdinal} from '@visx/scale';
import {localPoint} from '@visx/event';
import {Group} from '@visx/group';

import {TooltipRow, TooltipWrapper} from '../../../../common/styled/ui-components';
import {Colors} from '../../../../common/styled/color-constants';
import {Languages, PiesTypes} from '../../../../utils/constants';
import {Content} from '../../../../utils/content-constants';
import {Segment} from '../../../../utils/pies.utils';

import {TodoChartsPlug, TodoPieGroup, TodoPiesWrapper} from '../../todo-dashboard.styled';

import {AnimatedPie} from './animated-pie';

const defaultMargin = {top: 0, right: 0, bottom: 0, left: 0};

interface PiesData {
  outer: Array<Segment>;
  inner: Array<Segment>;
}

interface PiesProps {
  data: PiesData;
  size: number;
  lang: Languages;
}

export type TooltipData = {
  label: string;
  value: number;
};

const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: Colors.DARK,
  color: Colors.WHITE
};

let tooltipTimeout: number;

export const TodoPies: FC<PiesProps> = memo(({data, size, lang}) => {
  if (size < 40) {
    return null;
  }

  const getValue = (d: Segment) => d.value;

  const outerScale = useMemo(
    () => {
      return scaleOrdinal({
        domain: data[PiesTypes.OUTER].map(s => s.label),
        range: [
          'url(#visx-gradient-teal)',
          'url(#visx-gradient-pink)'
        ]
      });
    }, [data]
  );

  const innerScale = useMemo(
    () => {
      return scaleOrdinal({
        domain: data[PiesTypes.INNER].map(s => s.label),
        range: [
          'url(#visx-gradient-green-d)',
          'url(#visx-gradient-green-l)'
        ]
      });
    }, [data]
  );

  const {tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip} =
    useTooltip<TooltipData>();

  const {containerRef, TooltipInPortal} = useTooltipInPortal({
    scroll: true
  });

  const weeklyData = useMemo(
    () => {
      return data[PiesTypes.INNER][0].value || data[PiesTypes.INNER][1].value;
    }, [data]
  );

  const {radius, centerY, centerX, donutThickness} = useMemo(
    () => {
      const innerWidth = size - defaultMargin.left - defaultMargin.right;
      const innerHeight = size - defaultMargin.top - defaultMargin.bottom;
      const radius = Math.min(innerWidth, innerHeight) / 2;
      const centerY = innerHeight / 2;
      const centerX = innerWidth / 2;
      const donutThickness = 70;

      return {radius, centerY, centerX, donutThickness}
    }, [size]
  );

  return (
    <TodoPiesWrapper>
      <svg width={size} height={size} ref={containerRef}>
        <GradientPinkBlue id={'visx-gradient-green-l'} fromOpacity={.7}/>
        <GradientTealBlue id={'visx-gradient-green-d'} fromOpacity={.7}/>

        <GradientPinkBlue id={'visx-gradient-pink'} fromOpacity={.5} toOpacity={.7}/>
        <GradientTealBlue id={'visx-gradient-teal'} fromOpacity={.5} toOpacity={.7}/>

        <Group
          top={centerY + defaultMargin.top}
          left={centerX + defaultMargin.left}
        >
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
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}
                onMouseMove={(event, data) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  const eventSvgCoords = localPoint(event);
                  showTooltip({
                    tooltipData: data,
                    tooltipTop: eventSvgCoords?.y,
                    tooltipLeft: eventSvgCoords?.x
                  });
                }}
              />
            )}
          </Pie>
          {!weeklyData && (
            <Group>
              <TodoChartsPlug>
                <tspan x={0} dy={0}>{Content.PIES.PLUG.START[lang]}</tspan>
                <tspan x={0} dy={'1.25em'}>{Content.PIES.PLUG.END[lang]}</tspan>
              </TodoChartsPlug>
            </Group>
          )}
          {weeklyData && (
            <TodoPieGroup>
              <Pie
                data={data[PiesTypes.INNER]}
                pieValue={getValue}
                outerRadius={radius - donutThickness * 1.3}
              >
                {(pie) => (
                  <AnimatedPie<Segment>
                    {...pie}
                    animate
                    getKey={({data: {label}}) => label}
                    getColor={({data: {label}}) => innerScale(label)}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 300);
                    }}
                    onMouseMove={(event, data) => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);
                      const eventSvgCoords = localPoint(event);
                      showTooltip({
                        tooltipData: data,
                        tooltipTop: eventSvgCoords?.y,
                        tooltipLeft: eventSvgCoords?.x
                      });
                    }}
                  />
                )}
              </Pie>
            </TodoPieGroup>
          )}
        </Group>
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
    </TodoPiesWrapper>
  );
});
