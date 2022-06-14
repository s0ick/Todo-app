import {createGlobalStyle} from 'styled-components';

interface ThemeType {
  background: string;
  secondaryBackground: string;
  text: string;
  secondaryText: string;
  action: string;
  secondaryAction: string;
}

export const GlobalStyles = createGlobalStyle<{theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
  }
  
  a {
    text-decoration: none;
  }
  
  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;
