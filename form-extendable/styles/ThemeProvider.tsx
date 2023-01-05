import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ITheme as IReactDbTheme } from '@react_db_client/constants.style';
import { FormStyled } from './styles';

export interface IFormTheme extends IReactDbTheme {
  formStyle: {};
  background: string | number;
  button: {
    default: string;
    onHover: string;
    onFocus: string;
  };
  colors: {
    main: string;
    warning: string;
    error: string;
    text: string;
  };
  section: {
    padding: string | number;
    border: string;
    headingHeight: string | number;
    headingBorder: string;
    headingBackground: string;
  };
  row: {
    padding: string | number;
    border: string;
  };
  media: {
    mediumWidth: string | number;
  };
  input: {
    focus: string;
    hover: string;
    outline: string;
  };
}

export interface ITheme {
  formExtendableTheme: IFormTheme;
  reactDbClientTheme: IReactDbTheme;
}

export const defaultTheme: IFormTheme = {
  formStyle: {},
  background: 'blue',
  typography: {
    fontSize: '1.2rem',
    lineHeight: '1.5rem',
  },
  select: {
    menu: {
      minWidth: '8rem',
      border: '1px solid blue',
    },
    item: {
      default: 'background: grey;',
      onHover: 'background: pink;',
      onFocus: 'background: purple;',
    },
  },
  button: {
    default: 'outline: 1px solid red;',
    onHover: `background: yellow;`,
    onFocus: `background: green;`,
  },
  ctabutton: {},
  colors: {
    main: '#DFD324',
    warning: 'orange',
    error: 'tomato',
    text: 'blue',
  },
  section: {
    padding: '1.2rem',
    border: '1px solid green',
    headingHeight: '1.1rem',
    headingBorder: '1px solid green',
    headingBackground: 'grey',
  },
  input: {
    focus: 'outline: 1px solid red;',
    hover: 'outline: 1px solid yellow;',
    outline: '1px dashed grey',
  },
  row: {
    padding: '0.2rem',
    border: '1px solid rgba(100,0,0,1)',
  },
  media: {
    mediumWidth: '800px',
  },
};

export interface IFormThemeProviderProps {
  theme: Partial<IFormTheme>;
  children: React.ReactNode;
}

export const FormThemeProvider = (props: IFormThemeProviderProps) => {
  const theme: ITheme = {
    reactDbClientTheme: Object.assign({}, defaultTheme, props.theme),
    formExtendableTheme: Object.assign({}, defaultTheme, props.theme),
  };
  return (
    <ThemeProvider theme={theme}>
      <FormStyled>{props.children}</FormStyled>
    </ThemeProvider>
  );
};
