import styled from 'styled-components';

import {Colors} from '../../../common/styled/color-constants';

export const TodoTaskFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const TodoTaskFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 30px;
  
  border-right: 1px solid ${props => props.theme.secondaryText};
  
  transition: border-right .2s ease-in;
  
  :nth-child(2) {
    border-right: none;
  }
`;

export const TodoTaskFormInput = styled.input`
  display: block;
  width: 700px;

  border-radius: 25px;
  border: none;
  outline: none;
  background-color: ${Colors.TRANSPARENT};
  color: ${props => props.theme.text};

  font-size: 16px;
  margin-right: 20px;
  padding: 10px;
  padding-left: 20px;

  ${props => props.theme.neoDown};

  transition: box-shadow .2s ease-in, color .2s ease-in;
`;
