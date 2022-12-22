import {
  GlobalStyles,
  defaultTheme,
  CompositionWrapDefault,
} from '@form-extendable/composition-helpers';
import { TComponentMap } from '@form-extendable/lib';
import { FormStyled } from '@form-extendable/styles';
import React from 'react';
import { defaultProps } from './default-props';
import { demoFormData } from './dummy-data';
import { Form } from './form';
import { FormInputs } from './form-inputs';

const FormStyledExample = ({ children }) => (
  <CompositionWrapDefault>
    {children}
    {/* <GlobalStyles theme={defaultTheme}>
      <FormStyled>{children}</FormStyled>
    </GlobalStyles> */}
  </CompositionWrapDefault>
);

export const BasicForm = () => {
  const [direction, setDirection] = React.useState<'vert' | 'horiz'>('vert');
  return (
    <div>
      <button
        onClick={() =>
          setDirection((prev) => (prev === 'vert' ? 'horiz' : 'vert'))
        }
      >
        {direction}
      </button>
      <FormStyledExample>
        <Form
          {...defaultProps}
          onSubmit={(data) => console.info(data)}
          orientation={direction}
        />
      </FormStyledExample>
    </div>
  );
};

BasicForm.waitForReady = async () => {};

export const BasicFormComplete = () => {
  const [direction, setDirection] = React.useState<'vert' | 'horiz'>('vert');
  return (
    <div>
      <button
        onClick={() =>
          setDirection((prev) => (prev === 'vert' ? 'horiz' : 'vert'))
        }
      >
        {direction}
      </button>
      <FormStyledExample>
        <Form
          {...defaultProps}
          formDataInitial={demoFormData}
          onSubmit={(data) => console.info(data)}
          orientation={direction}
        />
      </FormStyledExample>
    </div>
  );
};

BasicFormComplete.waitForReady = async () => {};

export const BasicFormInputs = () => (
  <FormStyledExample>
    <FormInputs
      headings={defaultProps.headings}
      formData={{}}
      onFormInputChange={() => {}}
      FormField={defaultProps.FormField}
      componentMap={defaultProps.componentMap as TComponentMap}
      orientation="vert"
    />
  </FormStyledExample>
);

BasicFormInputs.waitForReady = async () => {};

// export const FormWithoutTheme = () => {
//   const [direction, setDirection] = React.useState<'vert' | 'horiz'>('vert');
//   return (
//     <div>
//       <button
//         onClick={() =>
//           setDirection((prev) => (prev === 'vert' ? 'horiz' : 'vert'))
//         }
//       >
//         {direction}
//       </button>
//       <Form
//         {...defaultProps}
//         formDataInitial={demoFormData}
//         onSubmit={(data) => console.info(data)}
//         orientation={direction}
//       />
//     </div>
//   );
// };

// BasicFormComplete.waitForReady = async () => {};
