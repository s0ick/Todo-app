import styled from 'styled-components';

interface IconProps {
  isLight?: boolean;
}

interface IconNavProps {
  isCurrent: boolean;
}

export const TodoMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
`;

export const TodoMenuList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const TodoMenuIconNav = styled.div<IconNavProps>`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  border-radius: 50%;
  ${props => props.isCurrent ? props.theme.neoDown : props.theme.neoUp};
  
  transition: box-shadow .2s ease-in;
  
  svg {
    fill: ${props => props.isCurrent ? props.theme.action : props.theme.secondaryText};
    filter: ${props => props.isCurrent ? `drop-shadow(0 0 5px ${props.theme.actionLight})` : 'none'};
    
    transition: fill 0.2s ease-in, box-shadow 0.2s ease-in, filter .2s ease-in;
  }
  
  :hover {
    cursor: pointer;
  }
`;

export const TodoMenuIcon = styled.div<IconProps>`
  width: 50px;
  height: 50px;
  margin-left: 20px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  border: 2px solid ${props => props.theme.background};
  border-radius: 50%;
  ${props => props.theme.neoInDepth};
  
  transition: border .2s ease-in, box-shadow .2s ease-in;
  
  svg {
    border-radius: 50%;
    fill: ${props => props.isLight ? props.theme.secondaryText : props.theme.iconTheme};
    filter: ${props => !props.isLight ? `drop-shadow(0 0 2px ${props.theme.iconTheme}) drop-shadow(0 0 10px ${props.theme.iconTheme})` : 'none'};
    
    transition: fill 0.2s ease-in, box-shadow 0.2s ease-in, filter .2s ease-in;
  }
  
  :hover {
    cursor: pointer;
  }
`;
