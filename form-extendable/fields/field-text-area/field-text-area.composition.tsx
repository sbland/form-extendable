import React, { useState } from 'react';
import { CompositionWrapDefault } from '@react_db_client/helpers.composition-wraps';
import { WrapFieldComponent } from '@form-extendable/composition-helpers';
import { EFilterType } from '@react_db_client/constants.client-types';
import { FieldTextArea, TFieldTextAreaProps } from './field-text-area';
import { defaultVal } from './demo-data';

const onChange = () => {};

const defaultProps: TFieldTextAreaProps = {
  type: EFilterType.textLong,
  label: 'Text Area Field',
  uid: 'uid',
  unit: 'unit',
  value: defaultVal,
  onChange,
};

export const BasicFieldTextArea = () => (
  <CompositionWrapDefault height="4rem" width="16rem">
    <WrapFieldComponent>
      <FieldTextArea {...defaultProps} required />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);

export const WithStyleOverride = () => (
  <CompositionWrapDefault height="4rem" width="16rem">
    <WrapFieldComponent>
      <FieldTextArea
        {...defaultProps}
        styleOverrides={{ color: 'red', width: '100%' }}
      />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);

export const FieldTextAreaMultiple = () => (
  <CompositionWrapDefault height="4rem" width="16rem">
    <WrapFieldComponent>
      <FieldTextArea {...defaultProps} required />
      <FieldTextArea {...defaultProps} required />
      <FieldTextArea {...defaultProps} required />
    </WrapFieldComponent>
  </CompositionWrapDefault>
);

export const FieldTextAreaMultipleHoriz = () => (
    <CompositionWrapDefault height="4rem" width="16rem">
      <div style={{ display: 'flex' }}>
        <WrapFieldComponent>
          <FieldTextArea {...defaultProps} required />
          <FieldTextArea {...defaultProps} required />
          <FieldTextArea {...defaultProps} required />
        </WrapFieldComponent>
      </div>
    </CompositionWrapDefault>
  );
