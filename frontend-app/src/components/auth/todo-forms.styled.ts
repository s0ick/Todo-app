import styled from 'styled-components';

interface StyledProps {
  pl?: number,
  accent?: boolean
}

export const TodoFormsContent = styled.div`
  display: flex;
  justify-content: center;
`;

export const TodoFormsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  flex-basis: 30%;
  border-radius: 12px;
  
  margin-top: 150px;
  padding: 30px;  
  z-index: 1;
  background-color: ${props => props.theme.form};
  transition: background-color 0.2s ease-in;
`;

export const TodoFormsTitle = styled.h2`
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
  font-size: 24px;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
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
  justify-content: center;
  width: 100%;
`;

export const TodoFormsButton = styled.div<StyledProps>`
  margin-top: 40px;
  margin-right: 10px;
  
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.03em;
  font-weight: 400;
  padding: 10px 40px;
  

  background-color: ${props => props.accent ? props.theme.successful : props.theme.action};
  border-radius: 12px;
  color: ${props => props.theme.text};
  
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
  
  :hover {
    cursor: pointer;
    background-color: ${props => props.accent ? props.theme.successfulLight : props.theme.secondaryAction};
  }
`;

export const TodoFormsGuest = styled.div`
  color: ${props => props.theme.secondaryText};
  margin-top: 30px;
  font-size: 16px;
  text-align: center;
  width: 100%;
  transition: color 0.2s ease-in;

  :hover {
    cursor: pointer;
    color: ${props => props.theme.action};
  }
`;

export const TodoFormsImgContainer = styled.div`
  display: flex;
  
  position: absolute;
  top: 0;
  right: 0;
  
  z-index: 0;
  opacity: .5;
  
  img {
    width: 100%;
  }
`;
