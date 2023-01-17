import React from 'react';

export interface IFormStatusProps {
  message?: string;
  submitting?: boolean;
  hasLocalChanges?: boolean;
  formDirty?: boolean;
}

export const FormStatus: React.FC<IFormStatusProps> = ({ message }) => {
  return <p>{message}</p>;
};
