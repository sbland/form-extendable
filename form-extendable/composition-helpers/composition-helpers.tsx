/* eslint react/prop-types:0 */
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { CompositionWrapDefault as ReactDbCompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';
import { defaultTheme, FormThemeProvider } from '@form-extendable/styles';

export const WrapFieldComponent: React.FC = ({ children }) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const [state, setState] = React.useState(
    childrenArray.map((child) => child.props.value)
  );

  const childrenWithProps = React.Children.map(childrenArray, (child, i) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        key: `${i}_${JSON.stringify(state[i])}`,
        value: state[i],
        onChange: (v) => {
          setState((prev) => {
            const a = [...prev];
            a[i] = v;
            return a;
          });
        },
      });
    }
    return child;
  });

  return (
    <div>
      {childrenWithProps}
      <hr />
      <div className="">{JSON.stringify(state)}</div>
    </div>
  );
};

const modTheme = cloneDeep(defaultTheme);
modTheme.row.border = 'none';
modTheme.row.labelStyle = '';
modTheme.section.border = 'none';

export const CompositionWrapDefault = ({ children, ...additionalProps }) => {
  const [theme, setTheme] = React.useState(defaultTheme);
  return (
    <FormThemeProvider theme={theme}>
      <div>
        <button onClick={() => setTheme(modTheme)}>Mod Theme</button>
        <button onClick={() => setTheme(defaultTheme)}>
          DefaultTheme Theme
        </button>
      </div>
      <ReactDbCompositionWrapDefault
        width="20rem"
        height="20rem"
        {...additionalProps}
      >
        {children}
      </ReactDbCompositionWrapDefault>
    </FormThemeProvider>
  );
};
