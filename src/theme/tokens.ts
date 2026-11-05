// Design tokens observed from the Figma designs (see docs/DESIGN-TOKENS.md).
// All colors are named tokens so a dark theme can be added later without touching screens.
export const colors = {
  primary: '#008FD9',
  text: '#001B2D',
  muted: '#7A88A0',
  white: '#FFFFFF',
  background: '#FFFFFF',
  inputFill: '#F5F4F9',
  headerTint: '#F2F9FD',
  online: '#24A15E',
  offline: '#7A88A0',
  error: '#FF3B30',
  // Route cards
  larchmont: '#D6F7DE',
  effingham: '#D1EBF8',
  islands: '#F8D4D4',
  blackCreek: '#FFF4CC',
  // Pins (SVG fills from the design export)
  pinRed: '#FF3B30',
  pinGreen: '#24A15E',
  pinBlue: '#008FD9',
  // Address status cards
  cardRed: '#F8D4D4',
  cardGreen: '#D6F7DE',
  cardBlue: '#D1EBF8',
  overlay: 'rgba(0, 27, 45, 0.4)',
} as const;

export const radius = { card: 20, pill: 28 } as const;
export const layout = { margin: 29, buttonHeight: 56, inputHeight: 56 } as const;

// Montserrat stands in for Avenir (D-018). Weight mapping: Avenir 900 -> ExtraBold, 350 -> Regular.
export const fonts = {
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  semibold: 'Montserrat_600SemiBold',
  bold: 'Montserrat_700Bold',
  black: 'Montserrat_800ExtraBold',
} as const;
