import styled from 'styled-components';

export const TodoDashboardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const TodoDashboardBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  margin-right: 80px;
  margin-bottom: 80px;
  
  svg, g, path {
    transition: fill .2s ease-in;
  }
`;

export const TodoDashboardBlockTitle = styled.h3`
  margin: 0;
  padding: 0;

  font-size: 20px;
`;

export const TodoDashboardBlockSubtitle = styled.p`
  margin: 0;
  margin-top: 10px;
  margin-bottom: 30px;
  
  font-size: 18px;
  max-width: 480px;
`;

export const TodoPiesWrapper = styled.div`
  position: relative;

  padding-top: 6px;
  padding-left: 6px;
  padding-right: 6px;
  
  border: 4px solid ${props => props.theme.background};
  border-radius: 50%;
  ${props => props.theme.neoInDepth};
  
  transition: border .2s ease-in, box-shadow .2s ease-in;
`;

export const TodoPieGroup = styled.g`
  border-radius: 50%;
  ${props => props.theme.neoSVGUp};

  transition: filter .2s ease-in;
`;

export const TodoBarStackWrapper = styled.div`
  position: relative;
`;

export const TodoBarStackGroup = styled.g`
  ${props => props.theme.neoSVGUp};
  transition: filter .2s ease-in;
`;

export const TodoTickWrapper = styled.text`
  font-size: 12px;
  text-anchor: middle;
  fill: ${props => props.theme.text};
  
  transition: fill .2s ease-in;
`;

export const TodoChartsPlug = styled.text`
  font-size: 16px;
  text-anchor: middle;
  
  stroke-width: 1px;
  stroke: ${props => props.theme.secondaryText};
  fill: ${props => props.theme.secondaryText};

  transition: fill .2s ease-in, stroke .2s ease-in;
`;
