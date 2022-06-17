import styled from 'styled-components';

import {ldsRing, slideLeft, slideRight} from './animations';

interface NotificationsStylesProps {
  isSuccess: boolean,
  exit: boolean
}

export const PageWrapper = styled.div`
  padding: 20px;
  position: relative;
`;

export const PageTitle = styled.h1`
  margin: 0;
  padding: 0;
  
  font-size: 32px;
`;

export const PageSubtitle = styled.p`
  margin: 0;
  margin-top: 8px;
  padding: 0;
  
  font-size: 18px;
  color: ${props => props.theme.secondaryText};
  transition: color 0.2s ease-in;
`;

export const PageTheme = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  
  z-index: 1;
  
  svg {
    fill: ${props => props.theme.action};
    border-radius: 50%;
    transition: fill 0.2s ease-in, box-shadow 0.2s ease-in;
  }
  
  :hover {
    cursor: pointer;
    svg {
      fill: ${props => props.theme.secondaryAction};
      box-shadow: 
             0 0 40px 1px ${props => props.theme.secondaryAction},
             inset 0 0 10px 0 ${props => props.theme.secondaryAction};
    }
  }
`;

export const PageContent = styled.div`
  margin-top: 50px;
`;

export const PageWrapperContent = styled.div`
  background-color: ${props => props.theme.secondaryBackground};
  padding: 15px;
  height: 730px;
  border-radius: 12px;
  overflow: auto;

  transition: background-color 0.2s ease-in;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  position: absolute;
  top: 48%;
  left: 50.5%;
  
  width: 80px;
  height: 80px;
  
  span {
    box-sizing: border-box;
    display: block;
    position: absolute;
    
    width: 64px;
    height: 64px;
    
    margin: 8px;
    border: 2px solid ${props => props.theme.action};
    border-color: ${props => props.theme.action} transparent ${props => props.theme.action} transparent;
    border-radius: 50%;
    
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  span:nth-child(1) {
    width: 54px;
    height: 54px;
    animation-delay: -0.15s;
  }

  span:nth-child(2) {
    width: 44px;
    height: 44px;
    animation-delay: -0.3s;
  }

  span:nth-child(3) {
    width: 34px;
    height: 34px;
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
  
  background-color: ${props => props.theme.secondaryBackground};
  
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
    background-color: ${props => props.isSuccess ? props.theme.successful : props.theme.error};
    height: 5px;
  }
`;
