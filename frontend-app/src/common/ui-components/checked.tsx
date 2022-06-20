import React, {FC} from 'react';
import styled from 'styled-components';
import {IconChecked} from './icons';

interface ComponentProps {
  checked: boolean,
  onChange?: () => void;
  label?: string;
}

const CheckboxWrapper = styled.label`
  font-size: 18px;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<ComponentProps>`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  background-color: ${props => props.checked ? props.theme.action : props.theme.secondaryBackground};
  border-radius: 3px;
  box-shadow: 0 0 1px 1px ${props => props.theme.secondaryText};
  transition: background-color 0.2s ease-in, box-shadow 0.2s ease-in;
  
  svg {
    fill: none;
    stroke-width: 2px;
    stroke: ${props => props.theme.text};
    visibility: ${props => props.checked ? 'visible' : 'hidden'}
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const Checked: FC<ComponentProps> = ({checked, label, ...props}) => (
  <CheckboxWrapper>
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props}/>
      <StyledCheckbox checked={checked}>
        <IconChecked/>
      </StyledCheckbox>
    </CheckboxContainer>
    <span>{label}</span>
  </CheckboxWrapper>
);
