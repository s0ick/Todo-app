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
      <path d={'M2330 5110 c-494 -48 -950 -230 -1350 -538 -195 -150 -448 -432 -594 -662 -63 -99 -186 -351 -230 -471 -49 -134 -102 -340 -128 -499 -31 -195 -31 -565 0 -760 45 -276 116 -498 237 -745 132 -269 269 -460 489 -681 221 -220 412 -357 681 -489 247 -121 469 -192 745 -237 195 -31 565 -31 760 0 276 45 498 116 745 237 269 132 460 269 681 489 220 221 357 412 489 681 88 179 132 296 180 476 63 240 78 371 78 649 0 278 -15 409 -78 649 -48 180 -92 297 -180 476 -132 269 -269 460 -489 681 -221 220 -412 357 -681 489 -246 121 -474 193 -740 235 -147 23 -475 34 -615 20z m230 -2550 l0 -2311 -102 6 c-398 24 -759 133 -1078 325 -528 318 -904 821 -1055 1414 -51 203 -68 342 -68 566 0 224 17 363 68 566 151 593 527 1096 1055 1414 339 204 714 312 1143 329 l37 1 0 -2310z'}/>
    </g>
  </svg>
);

export const IconChecked = () => (
  <svg viewBox={'0 0 24 24'}>
    <polyline points={'20 6 9 17 4 12'}/>
  </svg>
);

export const IconComplete: FC<IconProps> = ({size = 32}) => (
  <svg
    width={size}
    height={size}
    viewBox={'0 0 64 64'}
    preserveAspectRatio={'xMidYMid meet'}
  >
    <g
      transform={'translate(0.000000,64.000000) scale(0.100000,-0.100000)'}
      stroke={'none'}
    >
      <path d={'M223 622 c-109 -39 -178 -112 -210 -221 -29 -102 4 -228 82 -306 122 -121 328 -121 450 0 91 92 118 241 64 356 -69 146 -241 223 -386 171z m239 -45 c49 -29 97 -79 125 -130 25 -46 25 -208 0 -254 -28 -52 -76 -102 -126 -131 -41 -24 -56 -27 -141 -27 -85 0 -100 3 -141 27 -93 55 -140 130 -147 233 -5 84 8 138 47 192 66 91 138 125 257 120 66 -3 89 -8 126 -30z'}/>
      <path d={'M384 353 c-48 -54 -90 -102 -95 -107 -4 -4 -33 12 -64 38 -31 25 -61 46 -66 46 -22 0 -4 -22 56 -70 54 -43 68 -50 80 -40 21 17 189 210 193 221 11 30 -27 -3 -104 -88z'}/>
    </g>
  </svg>
);

export const IconList: FC<IconProps> = ({size = 32}) => (
  <svg
    width={size}
    height={size}
    viewBox={'0 0 64 64'}
    preserveAspectRatio={'xMidYMid meet'}
  >
    <g
      transform={'translate(0.000000,64.000000) scale(0.100000,-0.100000)'}
      stroke={'none'}
    >
      <path d={'M75 591 c-45 -20 -70 -60 -70 -112 0 -42 5 -53 33 -81 28 -28 39 -33 82 -33 43 0 54 5 82 33 28 28 33 39 33 82 0 42 -5 54 -31 81 -33 33 -92 46 -129 30z m110 -46 c19 -18 25 -35 25 -65 0 -56 -34 -90 -90 -90 -30 0 -47 6 -65 25 -35 34 -35 96 0 130 18 19 35 25 65 25 30 0 47 -6 65 -25z'}/>
      <path d={'M310 535 c0 -13 24 -15 166 -15 128 0 165 3 162 13 -4 9 -48 13 -166 15 -140 2 -162 0 -162 -13z'}/>
      <path d={'M310 425 c0 -12 19 -15 110 -15 91 0 110 3 110 15 0 12 -19 15 -110 15 -91 0 -110 -3 -110 -15z'}/>
      <path d={'M75 271 c-45 -20 -70 -60 -70 -112 0 -42 5 -53 33 -81 28 -28 39 -33 82 -33 43 0 54 5 82 33 28 28 33 39 33 82 0 42 -5 54 -31 81 -33 33 -92 46 -129 30z m110 -46 c19 -18 25 -35 25 -65 0 -56 -34 -90 -90 -90 -56 0 -90 34 -90 90 0 56 34 90 90 90 30 0 47 -6 65 -25z'}/>
      <path d={'M310 215 c0 -13 24 -15 166 -15 128 0 165 3 162 13 -4 9 -48 13 -166 15 -140 2 -162 0 -162 -13z'}/>
      <path d={'M310 105 c0 -12 19 -15 110 -15 91 0 110 3 110 15 0 12 -19 15 -110 15 -91 0 -110 -3 -110 -15z'}/>
    </g>
  </svg>
);

export const IconStatistic: FC<IconProps> = ({size = 32}) => (
  <svg
    width={size}
    height={size}
    viewBox={'0 0 64 64'}
    preserveAspectRatio={'xMidYMid meet'}
  >
    <g
      transform={'translate(0.000000,64.000000) scale(0.100000,-0.100000)'}
      stroke={'none'}
    >
      <path d={'M482 343 l3 -298 60 0 60 0 0 295 0 295 -63 3 -62 3 2 -298z m106 0 l-3 -278 -42 -3 -43 -3 0 280 0 281 45 0 45 0 -2 -277z'}/>
      <path d={'M182 278 l3 -233 60 0 60 0 3 233 2 232 -65 0 -65 0 2 -232z m106 0 l-3 -213 -40 0 -40 0 -3 213 -2 212 45 0 45 0 -2 -212z'}/>
      <path d={'M332 213 l3 -168 60 0 60 0 3 168 2 167 -65 0 -65 0 2 -167z m106 0 l-3 -148 -40 0 -40 0 -3 148 -3 147 46 0 46 0 -3 -147z'}/>
      <path d={'M34 247 c-2 -7 -3 -56 -2 -108 l3 -94 60 0 60 0 0 105 0 105 -58 3 c-41 2 -59 -1 -63 -11z m106 -103 l0 -85 -42 3 -43 3 -3 83 -3 82 46 0 45 0 0 -86z'}/>
      <path d={'M0 10 c0 -6 113 -10 320 -10 207 0 320 4 320 10 0 6 -113 10 -320 10 -207 0 -320 -4 -320 -10z'}/>
    </g>
  </svg>
);