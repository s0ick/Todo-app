import React, {FC} from 'react';

interface IconProps {
  size?: number;
}

export const IconThemeMode: FC<IconProps> = ({size = 32}) => (
  <svg
    width={size}
    height={size}
    viewBox={'0 0 512 512'}
    preserveAspectRatio={'xMidYMid meet'}
  >
    <g
      transform={'translate(0.000000,512.000000) scale(0.100000,-0.100000)'}
      stroke={'none'}
    >
      <path
        d={'M2330 5110 c-494 -48 -950 -230 -1350 -538 -195 -150 -448 -432 -594 -662 -63 -99 -186 -351 -230 -471 -49 -134 -102 -340 -128 -499 -31 -195 -31 -565 0 -760 45 -276 116 -498 237 -745 132 -269 269 -460 489 -681 221 -220 412 -357 681 -489 247 -121 469 -192 745 -237 195 -31 565 -31 760 0 276 45 498 116 745 237 269 132 460 269 681 489 220 221 357 412 489 681 88 179 132 296 180 476 63 240 78 371 78 649 0 278 -15 409 -78 649 -48 180 -92 297 -180 476 -132 269 -269 460 -489 681 -221 220 -412 357 -681 489 -246 121 -474 193 -740 235 -147 23 -475 34 -615 20z m230 -2550 l0 -2311 -102 6 c-398 24 -759 133 -1078 325 -528 318 -904 821 -1055 1414 -51 203 -68 342 -68 566 0 224 17 363 68 566 151 593 527 1096 1055 1414 339 204 714 312 1143 329 l37 1 0 -2310z'}
      />
    </g>
  </svg>
);

export const IconChecked = () => (
  <svg viewBox={'0 0 24 24'}>
    <polyline points={'20 6 9 17 4 12'}/>
  </svg>
);
