import styled from 'styled-components';

interface StyledProps {
  pl?: number,
  accent?: boolean
}

export const TodoFormsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 500px;
  margin: auto;
  background-color: ${props => props.theme.secondaryBackground};
  
  padding: 50px;
  border-radius: 12px;
`;

export const TodoFormsTitle = styled.h2`
  margin: 0;
  padding: 0;
  letter-spacing: 2px;
  font-size: 28px;
`;

export const TodoFormsInputBlock = styled.div`
  position: relative;
  
  margin-top: 25px;
  
  display: flex;
  align-items: center;
  flex-direction: row;
  
  width: 100%;
  
  label {
    font-size: 18px;
    position: absolute;
    top: 10px;
    transition: top 0.2s ease-in;
  }
`;

export const TodoFormsInput = styled.input<StyledProps>`
  display: block;
  
  background-color: transparent;
  color: ${props => props.theme.text};
  
  font-size: 18px;

  outline: none;
  border: none;
  border-bottom: 2px solid ${props => props.theme.text};
  
  padding: 10px;
  padding-left: ${props => `${props.pl}px`};
  margin-bottom: 10px;
  
  width: 100%;
  
  transition: border-bottom 0.2s ease-in, padding-left 0.2s ease-in, color 0.2s ease-in;
  
  :focus {
    border-bottom: 2px solid ${props => props.theme.action};
    padding-left: 10px;
  }
  
  :focus + label {
    top: -20px;
    color: ${props => props.theme.action};
  }
`;

export const TodoFormsCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  margin-top: 25px;
  
  width: 100%;
`;

export const TodoFormsButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const TodoFormsButton = styled.div<StyledProps>`
  margin-top: 40px;
  margin-right: 10px;
  
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.03em;
  font-weight: 400;
  padding: 10px 40px;
  
  text-transform: uppercase;

  background-color: ${props => props.accent ? props.theme.successful : props.theme.action};
  border-radius: 12px;
  color: ${props => props.theme.text};
  
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
  
  :hover {
    cursor: pointer;
    background-color: ${props => props.accent ? props.theme.successfulLight : props.theme.secondaryAction};
  }
`;
