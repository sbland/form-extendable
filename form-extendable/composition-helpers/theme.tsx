export interface DefaultTheme {
  background: string;
  typography: {
    fontFamily: string;
    fontWeightStandard: number;
    fontWeightBold: number;
    fontSize1: string;
    fontSize2: string;
    fontSize3: string;
    fontSize4: string;
    fontSize5: string;
    fontSize6: string;
    lineHeight: string;
    lineHeight1: string;
    lineHeight2: string;
    lineHeight3: string;
    lineHeight4: string;
    lineHeight5: string;
    lineHeight6: string;
  };
  colors: {
    baseBackground: string;
    main: string;
    mainHover: string;
    mainLighter: string;
    secondary: string;
    text: string;
    link: string;
    linkHover: string;
    cta: string;
    ctaHover: string;
    ctaText: string;
    warning: string;
    off: string;
    offHover: string;
    grey1: string;
    grey2: string;
    grey5: string;
    grey9: string;
    textBoxBackground: string;
    infoButtonForeground: string;
    infoButtonBackground: string;
  };
  shape: {
    defaultRadius: string;
    defaultPadding: string;
  };
  mediaBoundaries: {
    small: string;
    medium: string;
    large: string;
  };
}

export const defaultTheme: DefaultTheme = {
  background: 'white',
  typography: {
    fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
    fontWeightStandard: 400,
    fontWeightBold: 800,
    fontSize1: '0.8rem',
    fontSize2: '0.9rem',
    fontSize3: '1.0rem',
    fontSize4: '1.3rem',
    fontSize5: '1.5rem',
    fontSize6: '1.8rem',
    lineHeight: '1.6rem',
    lineHeight1: '1.3rem',
    lineHeight2: '1.6rem',
    lineHeight3: '1.7rem',
    lineHeight4: '1.9rem',
    lineHeight5: '2.0rem',
    lineHeight6: '2.2rem',
  },
  colors: {
    baseBackground: 'white',
    main: 'pink',
    mainHover: 'red',
    mainLighter: 'pink',
    secondary: 'green',
    text: 'blue',
    link: 'yellow',
    linkHover: 'orange',
    cta: 'pink',
    ctaHover: 'red',
    ctaText: 'white',
    warning: 'tomato',
    off: '#eee',
    offHover: '#ddd',
    grey1: '#ddd',
    grey2: '#ccc',
    grey5: '#777',
    grey9: '#444',
    textBoxBackground: '#eee',
    infoButtonForeground: '#eee',
    infoButtonBackground: 'red',
  },
  shape: {
    defaultRadius: '0.5rem 0',
    defaultPadding: '0.5rem',
  },
  mediaBoundaries: {
    small: '200px',
    medium: '600px',
    large: '1080px',
  },
};
