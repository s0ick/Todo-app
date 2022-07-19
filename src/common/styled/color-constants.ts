export const Themes = {
  light: {
    background: '#CAD3DC',
    text: '#1F2326',
    secondaryText: '#737577',
    action: '#0162C8',
    actionLight: '#55E7FC',
    hintAction: '#755BEA',
    hintActionLight: '#FF72C0',
    success: '#56C784',
    successLight: '#b2ff59',
    iconTheme: '#FFEA00',
    error: '#FF1744',
    neoInDepth: `box-shadow: 
      -8px -8px 15px rgba(255, 255, 255, 0.5),
      10px 10px 10px rgba(0, 0, 0, 0.1),
      inset -8px -8px 15px rgba(255, 255, 255, 0.5),
      inset 10px 10px 10px rgba(0, 0, 0, 0.1);
    `,
    neoDown: `box-shadow:
      inset 2px 2px 5px rgba(0, 0, 0, 0.1),
      inset -5px -5px 10px rgba(255, 255, 255, 0.5);
    `,
    neoUp: `box-shadow:
      -8px -8px 15px rgba(255, 255, 255, 0.5),
      8px 8px 10px rgba(0, 0, 0, 0.1);
    `,
    neoSVGUp: `filter:
      drop-shadow(-4px -4px 3px rgba(255, 255, 255, 0.85))
      drop-shadow(6px 6px 4px rgba(0, 0, 0, 0.2));
    `
  },
  dark: {
    background: '#091921',
    text: '#F1F1F1',
    secondaryText: '#919090',
    action: '#55E7FC',
    actionLight: '#0162C8',
    hintAction: '#755BEA',
    hintActionLight: '#FF72C0',
    success: '#43A047',
    successLight: '#00E676',
    iconTheme: '#EEFF41',
    error: '#FF1744',
    neoInDepth: `box-shadow: 
      -8px -8px 15px rgba(255, 255, 255, 0.05),
      20px 20px 20px rgba(0, 0, 0, 0.3),
      inset -8px -8px 15px rgba(255, 255, 255, 0.05),
      inset 20px 20px 20px rgba(0, 0, 0, 0.3);
    `,
    neoDown: `box-shadow:
      inset 2px 2px 5px rgba(0, 0, 0, 0.3),
      inset -5px -5px 10px rgba(255, 255, 255, 0.05);
    `,
    neoUp: `box-shadow:
      -8px -8px 15px rgba(255, 255, 255, 0.05),
      20px 20px 20px rgba(0, 0, 0, 0.3);
    `,
    neoSVGUp: `filter:
      drop-shadow(-2px -6px 4px rgba(255, 255, 255, 0.15))
      drop-shadow(6px 6px 4px rgba(0, 0, 0, 0.4));
    `
  }
};

export const Colors = {
  TRANSPARENT: 'transparent',
  WHITE: '#FFFFFF',
  DARK: '#263238',
  LIGHT: '#CAD3DC',
  SUCCESS: '#00E676',
  ERROR: '#FF1744',
  ACTION: '#0162C8'
};
