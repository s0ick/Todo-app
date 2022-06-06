import styled from 'styled-components';

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

export const PageContent = styled.div`

`;

export const PageTheme = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  
  svg {
    fill: ${props => props.theme.action};
    transition: fill 0.2s ease-in;
  }
  
  :hover {
    cursor: pointer;
    svg {
      fill: ${props => props.theme.secondaryAction};
    }
  }
`;
