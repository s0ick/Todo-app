import styled from 'styled-components';

import {ButtonColors, InitializationStages} from '../../utils/constants';

import {ldsRing, slideLeft, slideRight} from './animations';
import {Colors} from './color-constants';

interface NotificationsStylesProps {
  isSuccess: boolean;
  exit: boolean;
}

interface ButtonProps {
  bgc?: ButtonColors;
  isLarge?: boolean;
  isActive?: boolean;
}

interface LoaderProps {
  stage: InitializationStages
}

interface TooltipProps {
  bgc: string;
}

export const PageTitle = styled.h1`
  padding: 0;
  margin: 0;
  margin-bottom: 30px;

  color: ${props => props.theme.secondaryText};
  font-size: 128px;
  font-weight: 700;
  
  transition: color .2s ease-in;
`;

export const PageSubtitle = styled.p`
  padding: 0;
  margin: 0;

  font-size: 24px;
`;

export const PageWrapper = styled.div`
  margin-top: 25px;
`;

export const PageContent = styled.div`
  margin-top: 30px;
  padding: 20px;
`;

export const PageLoader = styled.div<LoaderProps>`
  width: 100vw;
  height: 100vh;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  position: absolute;
  left: 0;
  top: 0;
  
  opacity: ${props => props.stage === InitializationStages.START ? 1 : 0};
  
  z-index: 9999;
  
  background-color: ${props => props.theme.background};
  transition: background-color .2s ease-in, opacity .35s ease-in;
`;

export const PageButton = styled.div<ButtonProps>`
  position: relative;
  padding: 12px 18px;
  margin-right: 30px;
  
  display: flex;
  justify-content: center;
  
  min-width: ${props => props.isLarge ? '210px' : '160px'};
  
  text-transform: uppercase;
  overflow: hidden;
  font-size: ${props => props.isLarge ? '18px' : '16px'};
  letter-spacing: 2px;
  
  border-radius: 40px;
  color: ${props => props.theme.text};
  ${props => props.theme.neoUp};

  background: ${Colors.TRANSPARENT};

  svg {
    margin-top: 4px;
    margin-right: 5px;
    fill: ${props => props.theme.secondaryText};

    transition: fill .2s ease-in;
  }
  
  span {
    z-index: 1;
  }
  
  :after {
    content: '';
    position: absolute;
    left: ${props => props.isActive ? '0' : '-100%'};
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    background-image: ${props => {
      let color1;
      let color2;
      
      switch (props.bgc) {
        case ButtonColors.GREEN:
          color1 = props.theme.success;
          color2 = props.theme.successLight;
          break;
        case ButtonColors.PURPLE:
          color1 = props.theme.hintAction;
          color2 = props.theme.hintActionLight;
          break;
        default:
          color1 = props.theme.action;
          color2 = props.theme.actionLight;
          break;  
      }
      
      return `linear-gradient(90deg, ${color1}, ${color2});`;
    }};
    z-index: -1;

    transition: left .35s ease-in, color .2s ease-in;
  }

  :hover {
    cursor: pointer;

    :after {
      left: 0;
    }
  }

  transition: box-shadow .2s ease-in;
`;

export const PagePhone = styled.div`
  position: absolute;

  right: 80px;
  top: 100px;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100px;
  height: 100px;
  
  span {
    box-sizing: border-box;
    display: block;
    position: absolute;
    
    width: 80px;
    height: 80px;
    
    margin: 8px;
    border: 2px solid ${props => props.theme.action};
    border-color: ${props => props.theme.action} transparent ${props => props.theme.action} transparent;
    border-radius: 50%;
    
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  span:nth-child(1) {
    width: 60px;
    height: 60px;
    animation-delay: -0.15s;
  }

  span:nth-child(2) {
    width: 40px;
    height: 40px;
    animation-delay: -0.3s;
  }

  span:nth-child(3) {
    width: 20px;
    height: 20px;
    animation-delay: -0.45s;
  }
`;

export const NotificationsWrapper = styled.div`
  width: 300px;
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 9999;
`;

export const NotificationItem = styled.div<NotificationsStylesProps>`
  overflow: hidden;
  margin-bottom: 20px;
  width: 300px;
  
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  animation: ${props => props.exit ? slideRight : slideLeft} .4s;
  animation-fill-mode: forwards;
  
  background-color: ${Colors.DARK};
  color: ${Colors.LIGHT};
  
  transition: background-color .2s ease-in;
  
  h3 {
    padding: 0;
    padding-left: 15px;
    padding-top: 10px;
    margin: 0;
    
    font-size: 16px;
  }
  
  p {
    margin: 0;
    padding: 10px;
    padding-left: 15px;
    margin-bottom: 8px;
    font-size: 14px;
  }
  
  div {
    background-color: ${props => props.isSuccess ? Colors.SUCCESS : Colors.ERROR};
    height: 5px;
  }
`;

export const TooltipWrapper = styled.div`
  padding: 10px 5px;
  
  strong {
    font-size: 18px;
    padding-bottom: 5px;
  }
  
  strong::first-letter {
    text-transform: uppercase;
  }
`;

export const TooltipRow = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

export const TooltipLine = styled.div<TooltipProps>`
  width: 20px;
  height: 2px;
  background-color: ${props => props.bgc};
  margin-right: 8px;
`;
