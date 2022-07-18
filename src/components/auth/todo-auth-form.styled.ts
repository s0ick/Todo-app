import styled from 'styled-components';

import {Colors} from '../../common/styled/color-constants';

interface ActionBlockProps {
  notMargin?: boolean
}

export const TodoAuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-top: 100px;
  padding-left: 100px;
`;

export const TodoAuthSubtitle = styled.div`
  max-width: 650px;
`;

export const TodoAuthActionsBlock = styled.div<ActionBlockProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  margin-top: ${props => props.notMargin ? '20px' : '44px'};
`;

export const TodoAuthInput = styled.input`
  display: block;
  width: 250px;
  
  border-radius: 25px;
  border: none;
  outline: none;
  background-color: ${Colors.TRANSPARENT};
  color: ${props => props.theme.text};
  
  font-size: 18px;
  margin-right: 20px;
  padding: 15px;
  padding-left: 25px;

  ${props => props.theme.neoDown};
  
  transition: box-shadow .2s ease-in, color .2s ease-in;
`;

export const TodoAuthCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
`;

export const TodoAuthGuest = styled.div`
  color: ${props => props.theme.secondaryText};
  margin-top: 30px;
  font-size: 16px;
  text-align: center;
  transition: color 0.2s ease-in;

  :hover {
    cursor: pointer;
    color: ${props => props.theme.action};
  }
`;
