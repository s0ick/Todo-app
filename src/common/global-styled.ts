import {createGlobalStyle} from 'styled-components';

interface ThemeType {
  background: string,
  text: string,
  secondaryText: string,
  action: string,
  actionLight: string,
  hintAction: string,
  hintActionLight: string,
  success: string,
  successLight: string,
  iconTheme: string,
  error: string,
  neoInDepth: string,
  neoDown: string,
  neoUp: string
}

export const GlobalStyles = createGlobalStyle<{theme: ThemeType}>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };
  
  a {
    text-decoration: none;
  };
  
  body, textarea {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};

    font-family: 'Poppins', 'Roboto Mono', monospace, sans-serif;
    
    transition: background 0.2s ease-in, color 0.2s ease-in;
  };
  
  button {
    font-family: 'Poppins', 'Roboto Mono', monospace, sans-serif;
  }
  
  textarea {
    overflow: hidden;
  }

  input {outline: none; font-family: 'Poppins', 'Roboto Mono', monospace, sans-serif; appearance: none;};
  input::-moz-placeholder {color: ${props => props.theme.text}};
  input::-webkit-input-placeholder {color: ${props => props.theme.text}};
`;
