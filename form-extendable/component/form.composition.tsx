import {
  GlobalStyles,
  defaultTheme,
} from '@form-extendable/composition-helpers';
import { TComponentMap } from '@form-extendable/lib';
import { FormStyled } from '@form-extendable/styles';
import React from 'react';
import { defaultProps } from './default-props';
import { demoFormData } from './dummy-data';
import { Form } from './form';
import { FormInputs } from './form-inputs';

const FormStyledExample = ({ children }) => (
  <GlobalStyles theme={defaultTheme}>
    <FormStyled
      sectionPadding="1.10rem"
      sectionBorder="1px solid grey"
      headingHeight="1rem"
      warningColor="tomato"
      lineHeight="1.4rem"
      grey30="#333"
      primaryColor="#aba122"
      mediaMediumWidth="1200px"
      rowPadding="0.5rem"
    >
      {children}
    </FormStyled>
  </GlobalStyles>
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
