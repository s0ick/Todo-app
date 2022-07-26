import React, {FC, memo} from 'react';

interface IconProps {
  size: number;
}

export const IconThemeMode: FC<IconProps> = memo(({size = 32}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0,64) scale(0.1,-0.1)"
      stroke="none"
    >
      <path d="M285 590 l-25 -50 60 0 60 0 -25 50 c-14 28 -30 50 -35 50 -5 0 -21 -22 -35 -50z" />
      <path d="M91 533 c0 -10 8 -36 17 -58 l17 -40 41 41 41 41 -46 17 c-58 20 -71 20 -70 -1z" />
      <path d="M475 532 l-40 -17 41 -41 41 -41 17 46 c9 25 16 52 16 59 0 16 -27 14 -75 -6z" />
      <path d="M266 498 c-54 -15 -110 -74 -125 -131 -45 -182 177 -309 309 -177 135 135 2 358 -184 308z" />
      <path d="M48 354 c-27 -13 -48 -29 -48 -34 0 -5 23 -21 50 -35 l50 -25 0 60 c0 33 -1 60 -2 60 -2 -1 -24 -12 -50 -26z" />
      <path d="M540 320 l0 -60 50 25 c28 14 50 30 50 35 0 5 -22 21 -50 35 l-50 25 0 -60z" />
      <path d="M105 156 c-11 -31 -16 -59 -12 -63 4 -4 33 2 63 12 l56 19 -24 17 c-12 10 -32 30 -44 44 l-20 26 -19 -55z" />
      <path d="M474 164 l-41 -41 46 -17 c25 -9 52 -16 59 -16 16 0 14 27 -6 75 l-17 40 -41 -41z" />
      <path d="M285 50 c14 -27 30 -50 35 -50 5 0 21 23 35 50 l25 50 -60 0 -60 0 25 -50z" />
    </g>
  </svg>
));

export function IconChecked() {
  return (
    <svg viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export const IconList: FC<IconProps> = memo(({size = 32}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
      stroke="none"
    >
      <path d="M75 591 c-45 -20 -70 -60 -70 -112 0 -42 5 -53 33 -81 28 -28 39 -33 82 -33 43 0 54 5 82 33 28 28 33 39 33 82 0 42 -5 54 -31 81 -33 33 -92 46 -129 30z m110 -46 c19 -18 25 -35 25 -65 0 -56 -34 -90 -90 -90 -30 0 -47 6 -65 25 -35 34 -35 96 0 130 18 19 35 25 65 25 30 0 47 -6 65 -25z" />
      <path d="M310 535 c0 -13 24 -15 166 -15 128 0 165 3 162 13 -4 9 -48 13 -166 15 -140 2 -162 0 -162 -13z" />
      <path d="M310 425 c0 -12 19 -15 110 -15 91 0 110 3 110 15 0 12 -19 15 -110 15 -91 0 -110 -3 -110 -15z" />
      <path d="M75 271 c-45 -20 -70 -60 -70 -112 0 -42 5 -53 33 -81 28 -28 39 -33 82 -33 43 0 54 5 82 33 28 28 33 39 33 82 0 42 -5 54 -31 81 -33 33 -92 46 -129 30z m110 -46 c19 -18 25 -35 25 -65 0 -56 -34 -90 -90 -90 -56 0 -90 34 -90 90 0 56 34 90 90 90 30 0 47 -6 65 -25z" />
      <path d="M310 215 c0 -13 24 -15 166 -15 128 0 165 3 162 13 -4 9 -48 13 -166 15 -140 2 -162 0 -162 -13z" />
      <path d="M310 105 c0 -12 19 -15 110 -15 91 0 110 3 110 15 0 12 -19 15 -110 15 -91 0 -110 -3 -110 -15z" />
    </g>
  </svg>
));

export const IconStatistic: FC<IconProps> = memo(({size = 32}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
      stroke="none"
    >
      <path d="M482 343 l3 -298 60 0 60 0 0 295 0 295 -63 3 -62 3 2 -298z m106 0 l-3 -278 -42 -3 -43 -3 0 280 0 281 45 0 45 0 -2 -277z" />
      <path d="M182 278 l3 -233 60 0 60 0 3 233 2 232 -65 0 -65 0 2 -232z m106 0 l-3 -213 -40 0 -40 0 -3 213 -2 212 45 0 45 0 -2 -212z" />
      <path d="M332 213 l3 -168 60 0 60 0 3 168 2 167 -65 0 -65 0 2 -167z m106 0 l-3 -148 -40 0 -40 0 -3 148 -3 147 46 0 46 0 -3 -147z" />
      <path d="M34 247 c-2 -7 -3 -56 -2 -108 l3 -94 60 0 60 0 0 105 0 105 -58 3 c-41 2 -59 -1 -63 -11z m106 -103 l0 -85 -42 3 -43 3 -3 83 -3 82 46 0 45 0 0 -86z" />
      <path d="M0 10 c0 -6 113 -10 320 -10 207 0 320 4 320 10 0 6 -113 10 -320 10 -207 0 -320 -4 -320 -10z" />
    </g>
  </svg>
));

export const IconArrow: FC<IconProps> = memo(({size = 32}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
      stroke="none"
    >
      <path d="M12 478 c-7 -7 -12 -17 -12 -23 0 -14 305 -305 320 -305 15 0 320 291 320 305 0 13 -20 35 -32 35 -5 0 -70 -58 -146 -130 -75 -71 -139 -130 -142 -130 -3 0 -67 59 -142 130 -76 72 -141 130 -146 130 -4 0 -13 -5 -20 -12z" />
    </g>
  </svg>
));

export const IconComplete: FC<IconProps> = memo(({size = 14}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
      stroke="none"
    >
      <path d="M398 383 l-168 -167 -79 77 c-44 43 -87 77 -98 77 -29 0 -57 -35 -50 -62 9 -36 199 -218 228 -218 16 0 75 52 211 187 104 104 191 198 195 211 7 28 -21 62 -50 62 -13 0 -82 -61 -189 -167z" />
    </g>
  </svg>
));

export const IconDelete: FC<IconProps> = memo(({size = 14}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
      stroke="none"
    >
      <path d="M211 620 c-17 -15 -38 -20 -82 -20 l-59 0 0 -35 0 -35 250 0 250 0 0 35 0 35 -59 0 c-43 0 -65 5 -84 20 -36 29 -181 29 -216 0z" />
      <path d="M110 270 c0 -293 -18 -270 210 -270 228 0 210 -23 210 270 l0 230 -210 0 -210 0 0 -230z" />
    </g>
  </svg>
));
