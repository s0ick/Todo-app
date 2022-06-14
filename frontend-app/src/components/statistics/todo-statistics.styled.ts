import styled from 'styled-components';

export const TodoStatisticsWrapper = styled.div`
  background-color: ${props => props.theme.secondaryBackground};
  padding: 15px;
  height: 720px;
  overflow: auto;
  
  transition: background-color 0.2s ease-in;
`;
