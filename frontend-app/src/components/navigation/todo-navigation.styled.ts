import styled from 'styled-components';

interface StyleProps {
  isCurrent?: boolean,
  mainColor: string
}

export const TodoNavigationWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  
  margin-bottom: 15px;
  
  background-color: ${props => props.theme.background};
  
  transition: background-color 0.2s ease-in;
`;

export const TodoNavigationMenu = styled.div`
  width: 400px;
  height: 60px;
  
  background-color: ${props => props.theme.secondaryBackground};
  position: relative;
  border-radius: 12px;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s ease-in;
  
  ul {
    display: flex;
    width: 350px;
  }
`;

export const TodoNavigationList = styled.li<StyleProps>`
  list-style: none;
  width: 116px; // 350 / 3 = 116px
  height: 60px;
  
  a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    height: 100%;
    width: 100%;
  }
  
  :nth-child(1) ~ div {
    transform: translateX(calc(116px * 0));
  }
  
  :nth-child(2) ~ div {
    transform: translateX(calc(116px * 1));
  }
  
  :nth-child(3) ~ div {
    transform: translateX(calc(116px * 2));
  }

  ${props => {
    let color = '';
    
    switch (props.mainColor) {
      case 'green':
        color = props.theme.iconComplete;
        break;
      case 'blue':
        color = props.theme.iconList;
        break;
      case 'yellow':
        color = props.theme.iconStat;
        break;
      default: break;  
    }
    
    return props.isCurrent && `span {
      background-color: ${color};
      transform: translateY(-27px);
      
      :before {
        opacity: .5;
      }
      
      svg {
        fill: #000;
        transition-delay: .25s;
      }
  `}};
`;

export const TodoNavigationIcon = styled.span<StyleProps>`
  position: relative;
  display: block;
  text-align: center;

  width: 55px;
  height: 55px;
  line-height: 70px;
  font-size: 1.5em;
  border-radius: 50%;
  z-index: 2;
  background-color: transparent;
  transition: transform 0.5s, background-color .5s;
  transition-delay: 0s;

  svg {
    fill: ${props => props.theme.text};
    transition: fill 0.2s ease-in;
  }
  
  :before {
    content: '';
    position: absolute;
    
    top: 10px;
    left: 0;
    
    width: 100%;
    height: 100%;
    
    background-color: ${props => {
      switch (props.mainColor) {
        case 'green':
          return props.theme.iconComplete;
        case 'blue':
          return props.theme.iconList;
        case 'yellow':
          return props.theme.iconStat;
        default: return;
      }}
    };
  
    border-radius: 50%;
    filter: blur(5px);
    opacity: 0;
  }
`;

export const TodoNavigationIndicator = styled.div`
  position: absolute;
  top: -35px;
  left: 48px;
  width: 70px;
  height: 70px;
  background-color: ${props => props.theme.secondaryBackground};
  border-radius: 50%;
  z-index: 1;
  transition: background-color 0.2s ease-in, transform .5s;
  transform: translateX(0);

  :before, :after {
    content: '';
    position: absolute;
    top: 5px;
    left: -28px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: transparent;
    box-shadow: 15px 18px ${props => props.theme.secondaryBackground};
    transition: box-shadow 0.2s ease-in;
  }
  
  :after {
    right: -28px;
    left: auto;
    box-shadow: -15px 18px ${props => props.theme.secondaryBackground};
    transition: box-shadow 0.2s ease-in;
  }
`;
