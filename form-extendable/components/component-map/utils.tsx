import React from 'react';
import { FieldReadOnly } from '@form-extendable/fields.field-read-only';

type OrProps<C> = C extends React.FC<any> ? React.ComponentProps<C> : C;
type OrComponent<C> = C extends React.FC<any> ? C : React.FC<C>;

export const allowReadOnly =
  <C extends React.FC<any> | { [id: string]: any }>(
    Component: OrComponent<C>
  ) =>
  (props: OrProps<C>) =>
    props.readOnly ? (
      <FieldReadOnly {...(props as any)} />
    ) : (
      <Component {...props} />
    );
