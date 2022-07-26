import styled from 'styled-components';

interface DateBlockProps {
  isHide: boolean
}

interface PanelControlProps {
  isCompleted: boolean
}

interface TextareaProps {
  isEditMode: boolean
}

interface ActionProps {
  isHide: boolean;
}

export const TodoTasksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TodoTaskWrapper = styled.div`
  padding: 10px;
  padding-left: 20px;

  display: flex;
  align-items: center;
`;

export const TodoTasksDateBlock = styled.div<DateBlockProps>`
  overflow: hidden;
  height: ${props => (props.isHide ? '60px' : 'auto')};
  color: ${props => props.theme.text};
  padding: 15px;
  transition: color .2s ease-in;
  
  display: flex;
  flex-direction: column;
`;

export const TodoTasksPanelControl = styled.div<PanelControlProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  
  color: ${props => (props.isCompleted ? props.theme.secondaryText : props.theme.text)};
  transition: color .2s ease-in;
  
  :hover {
    cursor: pointer;
  }
`;

export const TodoTasksDateTitle = styled.div`
  font-size: 20px;
  width: 325px;

  ::first-letter {
    text-transform: uppercase;
  }
`;

export const TodoTasksStatus = styled.div`
  font-size: 18px;
  margin-left: 30px;
`;

export const TodoTasksArrow = styled.div<DateBlockProps>`
  margin-right: 20px;
  
  svg {
    fill: ${props => props.theme.action};
    transform: ${props => (props.isHide ? 'rotate(0)' : 'rotate(-180deg)')};
    transition: transform 0.2s ease-in, fill 0.2s ease-in;
    
    :hover {
      fill: ${props => props.theme.hintAction};
    }
  }
`;

export const TodoTasksList = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 32px;
`;

export const TodoTasksListActive = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  position: relative;

  p {
    color: ${props => props.theme.text};
    transition: color 0.2s ease-in;
    
    :hover {
      cursor: pointer;
      color: ${props => props.theme.secondaryText};
    }
  }

  :after {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;

    background-image: ${props => `linear-gradient(0, ${props.theme.actionLight}, ${props.theme.action});`};
  }
`;

export const TodoTasksListCompleted = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  
  p {
    color: ${props => props.theme.secondaryText};
    transition: color 0.2s ease-in;
    padding-left: 28px;
    
    :hover {
      cursor: pointer;
      color: ${props => props.theme.text};
    }
  }
  
  :after {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    
    background-image: ${props => `linear-gradient(180deg, ${props.theme.success}, ${props.theme.successLight});`};
  }
`;

export const TodoTasksAction = styled.span<ActionProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  div {
    ${props => props.isHide && 'box-shadow: none;'};
    transition: border .2s ease-in, box-shadow .2s ease-in;
  }
`;

export const TodoTasksTextarea = styled.textarea<TextareaProps>`
  width: 100%;
  overflow: hidden;
  resize: none;
  outline: none;
  border: none;
  background: none;
  border-radius: 12px;
  
  ${props => props.isEditMode && props.theme.neoDown};

  margin: 0;
  padding: 10px;

  font-size: 18px;
  
  transition: box-shadow .2s ease-in, color .2s ease-in;
  cursor: pointer;
`;

export const TodoTasksStub = styled.div`
  margin-left: 10px;
  
  font-size: 24px;
  letter-spacing: 1px;
  
  color: ${props => props.theme.secondaryText};
  transition: color .2s ease-in;
`;
