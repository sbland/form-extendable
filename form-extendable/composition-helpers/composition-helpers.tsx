/* eslint react/prop-types:0 */
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { CompositionWrapDefault as ReactDbCompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';
import { defaultTheme, FormThemeProvider } from '@form-extendable/styles';
import { Uid } from '@react_db_client/constants.client-types';
import { PopupProvider } from '@react_db_client/components.popup-panel-v2';

// TODO: Temporarily copied this from /component to avoid circular dependency
export interface IFormFieldWrapProps {
  rowClassname?: string;
  children: React.ReactNode;
  uid: Uid;
  type: string;
  labelClassName?: string;
  hideLabel?: boolean;
  expandInput?: boolean;
  label: string;
  hasChanged?: boolean;
}

export const FormFieldWrap: React.FC<IFormFieldWrapProps> = ({
  rowClassname,
  children,
  uid,
  type,
  labelClassName,
  hideLabel,
  expandInput,
  label,
  hasChanged,
}) => (
  <div className={rowClassname} key={uid} data-testid={`${type}-${uid}`}>
    <div
      className={labelClassName}
      style={{ display: hideLabel && expandInput ? 'none' : 'inherit' }}
    >
      {/* <FieldLabel
        uid={uid}
        label={label}
        hasChanged={hasChanged}
        hidden={hideLabel}
      /> */}
    </div>
    <div className="formComponentWrap">{children}</div>
  </div>
);

export interface IWrapFieldComponentProps {
  debug?: boolean;
}
export const WrapFieldComponent: React.FC<IWrapFieldComponentProps> = ({
  debug,
  children,
}) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const [state, setState] = React.useState(
    childrenArray.map((child) => child.props.value)
  );

  const childrenWithProps = React.Children.map(
    childrenArray,
    (child: unknown | React.ReactElement<any>, i) => {
      if (React.isValidElement(child)) {
        const childEl: React.ReactElement<any> = child;

        return (
          <FormFieldWrap
            uid={childEl.props.uid}
            key={childEl.props.uid}
            type={childEl.props.type}
            label={childEl.props.label}
          >
            {React.cloneElement(child as React.ReactElement<any>, {
              // key: `${i}_${JSON.stringify(state[i])}`,
              value: state[i],
              onChange: (v) => {
                if (debug) {
                  // console.info('COMP HELPER: Value: ', childEl.props.value, v);
                  // console.info(v);
                }
                setState((prev) => {
                  const a = [...prev];
                  a[i] = v;
                  return a;
                });
              },
            })}
          </FormFieldWrap>
        );
      }
      return child;
    }
  );

  return (
    <div>
      {childrenWithProps}
      <hr />
      <div className="" data-testid="curState">
        {JSON.stringify(state)}
      </div>
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
      <PopupProvider>
        <div>
          <button onClick={() => setTheme(modTheme)}>Mod Theme</button>
          <button onClick={() => setTheme(defaultTheme)}>
            DefaultTheme Theme
          </button>
        </div>
        <ReactDbCompositionWrapDefault
          width="40rem"
          height="40rem"
          {...additionalProps}
        >
          {children}
        </ReactDbCompositionWrapDefault>
      </PopupProvider>
    </FormThemeProvider>
  );
};

export const FieldCompositionWrapDefault = ({
  children,
  ...additionalProps
}) => {
  const [theme, setTheme] = React.useState(defaultTheme);
  return (
    <FormThemeProvider theme={theme}>
      <PopupProvider>
        <form
          aria-label="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <button onClick={() => setTheme(modTheme)}>Mod Theme</button>
            <button onClick={() => setTheme(defaultTheme)}>
              DefaultTheme Theme
            </button>
          </div>
          <ReactDbCompositionWrapDefault
            width="40rem"
            height="40rem"
            {...additionalProps}
          >
            {children}
          </ReactDbCompositionWrapDefault>
        </form>
      </PopupProvider>
    </FormThemeProvider>
  );
};
