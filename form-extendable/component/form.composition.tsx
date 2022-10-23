import React from 'react';
import { defaultProps } from './default-props';
import { Form } from './form';

export const BasicForm = () => (
  <Form {...defaultProps} onSubmit={(data) => console.info(data)} />
);

BasicForm.waitForReady = async () => {};
