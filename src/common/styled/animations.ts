import {keyframes} from 'styled-components';

import {Colors} from './color-constants';

export const ldsRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

export const slideLeft = keyframes`
  0% {
    margin-left: 120%;
  }

  100% {
    margin-left: 0;
  }
`;

export const slideRight = keyframes`
  0% {
    margin-left: 0;
  }

  100% {
    margin-left: 120%;
  }
`;
