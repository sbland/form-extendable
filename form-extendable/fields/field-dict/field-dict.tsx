import React from 'react';
import ReactJSON, { InteractionProps } from 'react-json-view';
import { IFieldComponentProps, IHeadingDict } from '@form-extendable/lib';

export const FieldDict: React.FC<
  IFieldComponentProps<string | object, IHeadingDict>
> = ({ uid, unit, onChange, value = {}, required, defaultValue={} }) => {
  const handleOnChange = React.useCallback(
    ({
      updated_src,
      existing_src,
      name,
      namespace,
      existing_value,
    }: InteractionProps) => {
      onChange(updated_src);
    },
    [onChange]
  );

  return (
    <div>
      {/* @ts-ignore */}
      <ReactJSON
        // @ts-ignore
        src={value || defaultValue}
        onEdit={handleOnChange}
        onAdd={handleOnChange}
        onDelete={handleOnChange}
      />
    </div>
  );
};
