import styled from 'styled-components';

interface StyledProps {
  pl: number,
}

export const TodoTaskFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const TodoTaskFormInputBlock = styled.div`
  position: relative;
  
  margin-right: 25px;
  
  display: flex;
  align-items: center;
  flex-direction: row;
  
  width: 500px;
  
  label {
    font-size: 16px;
    position: absolute;
    top: 10px;
    color: ${props => props.theme.secondaryText};
    transition: top 0.2s ease-in, color 0.2s ease-in;
  }
`;

export const TodoTaskFormInput = styled.input<StyledProps>`
  display: block;
  
  background-color: transparent;
  color: ${props => props.theme.secondaryText};
  
  font-size: 16px;

  outline: none;
  border: none;
  border-bottom: 1px solid ${props => props.theme.secondaryText};
  
  padding: 10px;
  padding-left: ${props => `${props.pl}px`};
  margin-bottom: 10px;
  
  width: 100%;
  
  transition: border-bottom 0.2s ease-in, padding-left 0.2s ease-in, color 0.2s ease-in;
  
  :focus {
    border-bottom: 1px solid ${props => props.theme.action};
    padding-left: 10px;
  }
  
  :focus + label {
    top: -20px;
    color: ${props => props.theme.action};
  }
`;

export const TodoTaskButton = styled.div`
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.03em;
  padding: 8px 20px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.theme.action};
  border-radius: 12px;
  color: ${props => props.theme.text};
  
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
  
  :hover {
    cursor: pointer;
    background-color: ${props => props.theme.secondaryAction};
  }
`;
