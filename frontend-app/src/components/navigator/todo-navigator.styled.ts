import styled from 'styled-components';

interface StyleProps {
  isCurrent: boolean,
  isPlug?: boolean
}

export const TodoNavigatorWrapper = styled.div`
  padding-top: 5px;
  padding-left: 40px;
  
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${props => props.theme.background};
  
  transition: background-color 0.2s ease-in;
`;

export const TodoNavigatorLink = styled.div<StyleProps>`
  font-size: 13px;
  width: ${props => props.isPlug ? '10px' : '150px'};
  height: ${props => props.isPlug ? '15px' : 'auto'};;
  
  color: ${props => props.theme.text};
  background-color: ${props => props.isCurrent ? props.theme.secondaryBackground : props.theme.background};

  padding: 8px;
  padding-left: 20px;
  margin-left: -7px;

  position: relative;

  ${props => props.isCurrent && `
    border-top-left-radius: 17px;
    border-top-right-radius: 17px;
    z-index: 1;
  `};

  ${props => !props.isCurrent && `
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    z-index: 2;
    
    :hover {
      color: ${props.theme.secondaryText};
    }
  `};

  transition: color 0.2s ease-in, background-color 0.2s ease-in, border-radius 0.2s ease-in;
`;

export const TodoNavigatorPlug = styled.div`
  color: ${props => props.theme.background};
  transition: color 0.2s ease-in;
`;
