import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IFieldComponentProps, IHeadingTextArea } from '@form-extendable/lib';

export type TFieldTextAreaProps = IFieldComponentProps<
  string,
  HTMLTextAreaElement
> &
  IHeadingTextArea;

export const FieldTextArea: React.FC<TFieldTextAreaProps> = ({
  uid,
  unit,
  onChange,
  value,
  required,
  initHeight = 10,
  scaleToContent,
  styleOverrides,
  inputProps,
}) => {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState(initHeight);
  const [resizing, setResizing] = useState(scaleToContent);

  const manageInputChange = (newValue) => {
    // This makes the textbox auto size
    onChange(newValue);
    if (scaleToContent) {
      setResizing(true);
    }
  };

  useEffect(() => {
    if (scaleToContent) {
      setResizing(true);
    }
  }, [value]);

  useEffect(() => {
    if (scaleToContent && resizing && ref.current) {
      if (ref.current.scrollHeight + 2 > initHeight) {
        setTextareaHeight(ref.current.scrollHeight);
      }
      setResizing(false);
    }
  }, [scaleToContent, value, resizing, ref, initHeight]);

  return (
    <>
      <div
        className="inputWrapper"
        style={{
          ...styleOverrides,
        }}
      >
        <textarea
          style={{
            height: resizing ? 'auto' : `${textareaHeight + 2}px`,
            // height: textareaHeight + 'px',
            maxHeight: '100%',
            minHeight: '1rem',
            maxWidth: '100%',
            // minWidth: '100%',
            ...styleOverrides,
          }}
          value={value || ''}
          id={`${uid}-input`}
          name={uid}
          onFocus={() => {
            ref.current?.select();
          }}
          onChange={(e) => manageInputChange(e.target.value)}
          required={required}
          aria-labelledby={`${uid}-label`}
          ref={ref}
          {...inputProps}
        />
      </div>
      {unit && <span>{unit}</span>}
    </>
  );
};

FieldTextArea.propTypes = {
  uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  initHeight: PropTypes.number,
  scaleToContent: PropTypes.bool,
  styleOverrides: PropTypes.shape({}),
};

FieldTextArea.defaultProps = {
  unit: '',
  value: '',
  required: false,
  initHeight: 10,
  scaleToContent: true,
  styleOverrides: {},
};
