import styled from 'styled-components';

interface DateBlockProps {
  isHide: boolean
}

interface IconProps {
  isEditMode?: boolean
}

export const TodoTasksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TodoTaskWrapper = styled.div`
  padding: 15px;
  padding-left: 20px;

  display: flex;
  align-items: center;
`;

export const TodoTasksDateBlock = styled.div<DateBlockProps>`
  overflow: hidden;
  height: ${props => props.isHide ? `60px` : 'auto'};
  color: ${props => props.theme.text};
  border-bottom: 1px solid ${props => props.theme.background};
  padding: 15px;
  transition: color .2s ease-in, border-bottom .2s ease-in;
  
  display: flex;
  flex-direction: column;
`;

export const TodoTasksPanelControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  
  :hover {
    cursor: pointer;
  }
`;

export const TodoTasksDateTitle = styled.div`
  font-size: 20px;
`;

export const TodoTasksStatus = styled.div`
  font-size: 18px;
  margin-left: 30px;
`;

export const TodoTasksArrow = styled.div<DateBlockProps>`
  margin-right: 20px;
  
  svg {
    fill: ${props => props.theme.action};
    transform: ${props => props.isHide ? 'rotate(0)' : 'rotate(180deg)'};
    transition: transform 0.2s ease-in, fill 0.2s ease-in;
    
    :hover {
      fill: ${props => props.theme.secondaryAction};
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

  p {
    color: ${props => props.theme.text};
    transition: color 0.2s ease-in;
  }

  div {
    border-left: 2px solid ${props => props.theme.action};
    transition: border-left 0.2s ease-in;
  }
`;

export const TodoTasksListCompleted = styled.div`
  display: flex;
  flex-direction: column;
  
  p {
    color: ${props => props.theme.secondaryText};
    transition: color 0.2s ease-in;
    padding-left: 18px;
  }
  
  div {
    border-left: 2px solid ${props => props.theme.successful};
    transition: border-left 0.2s ease-in;
  }
`;

export const TodoTasksIcon = styled.span<IconProps>`
  margin-right: 5px;
  
  svg {
    fill: ${props => props.isEditMode ? props.theme.action : props.theme.secondaryText};
    transition: transform 0.2s ease-in, fill 0.2s ease-in;
  }

  :hover {
    cursor: pointer;
    
    svg {
      fill: ${props => props.theme.secondaryAction};
    }
  }
`;

export const TodoTasksActions = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const TodoTasksMessage = styled.p`
  margin: 0;
  padding: 10px;
  font-size: 18px;
  margin-left: 10px;
`;

export const TodoTasksTextarea = styled.textarea`
  width: 100%;
  min-height: 22px;
  overflow: hidden;
  resize: none;
  outline: none;
  border: none;
  border-radius: 12px;

  margin: 0;
  padding: 10px;
  font-size: 18px;
  margin-left: 10px;
`;
