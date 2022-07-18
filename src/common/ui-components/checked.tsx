import React, {FC, memo} from 'react';
import styled from 'styled-components';

import {Colors} from '../styled/color-constants';

import {IconChecked} from './icons';

interface ComponentProps {
  checked: boolean;
  onChange?: () => void;
  label?: string;
  disabled?: boolean;
}

interface WrapperProps {
  disabled?: boolean;
}

const CheckboxWrapper = styled.label<WrapperProps>`
  font-size: 18px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
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
  width: 28px;
  height: 28px;
  margin-right: 10px;
  background-color: ${Colors.TRANSPARENT};
  
  border: ${props => props.checked ? `0px solid ${props.theme.background}` : `2px solid ${props.theme.background}`};
  border-radius: 50%;
  ${props => props.checked ? props.theme.neoDown : props.theme.neoInDepth};

  transition: border .2s ease-in, box-shadow .2s ease-in;
  
  svg {
    padding: 5px;
    fill: none;
    stroke-width: 2px;
    stroke: ${props => props.checked ? props.theme.action : props.theme.text};
    filter: ${props => props.checked ? `drop-shadow(0 0 2px ${props.theme.action}) drop-shadow(0 0 10px ${props.theme.action})` : 'none'};
    visibility: ${props => props.checked ? 'visible' : 'hidden'}
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const Checked: FC<ComponentProps> = memo(({checked, label, ...props}) => (
  <CheckboxWrapper disabled={props.disabled}>
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props}/>
      <StyledCheckbox checked={checked}>
        <IconChecked/>
      </StyledCheckbox>
    </CheckboxContainer>
    {label && <span>{label}</span>}
  </CheckboxWrapper>
));
