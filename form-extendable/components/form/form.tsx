import React, { ReactNode } from 'react';

export type FormProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function Form({ children }: FormProps) {
  return (
    <div>
      {children}
    </div>
  );
}
