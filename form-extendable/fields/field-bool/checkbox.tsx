import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from '@form-extendable/styles';
import { Uid } from '@react_db_client/constants.client-types';

export const CheckMark = styled.span`
  display: inline-block;
  padding: 0.2rem;
  min-height: 25px;
  min-width: 25px;
  width: auto;
  background-color: ${({ theme }) => theme.formExtendableTheme.background};
  border: 2px solid ${({ theme }) => theme.formExtendableTheme.colors.main};

  ${({ theme }) => theme.formExtendableTheme.checkbox.default}

  &:focus {
    ${({ theme }) => theme.formExtendableTheme.checkbox.onFocus}
  }
  &:hover {
    ${({ theme }) => theme.formExtendableTheme.checkbox.onHover}
  }
`;

CheckMark.defaultProps = {
  theme: {
    formExtendableTheme: defaultTheme,
  },
};

// export const CheckBoxContainer = styled(ButtonNoFormat)`
export const CheckBoxContainer = styled.div`
  display: block;
  position: relative;
  cursor: pointer;
  user-select: none;
  min-height: ${({ theme }) => theme.formExtendableTheme.typography.lineHeight};

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked {
      display: block;
    }
  }

  :after: {
    content: '';
    position: absolute;
    display: none;
  }
  .checkmark {
    &:after {
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }

  input:checked ~ .checkmark {
    background-color: ${({ theme }) => theme.formExtendableTheme.colors.main};
  }
  input:focus ~ .checkmark {
    outline: 2px solid ${({ theme }) => theme.formExtendableTheme.colors.main};
  }
`;

CheckBoxContainer.defaultProps = {
  theme: {
    formExtendableTheme: defaultTheme,
  },
};

export interface ICheckboxProps {
  uid: Uid;
  onChange: (e: { target: { value?: boolean; name: string } }) => void;
  text: string;
  value;
  inputProps?: React.ComponentProps<'input'>;
}

export const Checkbox = ({
  uid,
  onChange,
  text,
  value,
  inputProps,
}: ICheckboxProps) => {
  const [checked, setChecked] = React.useState(value);

  React.useEffect(() => {
    if (onChange) {
      if (checked !== undefined && checked !== value)
        onChange({ target: { value: checked, name: String(uid) } });
    }
  }, [checked, onChange, value, uid]);

  return (
    <CheckBoxContainer
      onClick={() => setChecked(!checked)}
      data-testid="checkbox-container"
    >
      <input
        id={String(uid)}
        type="checkbox"
        name={String(uid)}
        value={value || ''}
        checked={checked || false}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
        {...inputProps}
      />
      <CheckMark className="checkmark">{text}</CheckMark>
    </CheckBoxContainer>
  );
};

// export const CheckboxText = (props) => {
//   const { register } = useFormContext();

//   const { label, name, value, defaultChecked, required } = props;
//   const id = name;
//   const { onChange, ref } = register(id, {
//     required: required ? 'Required' : null,
//   });
//   const [checked, setChecked] = React.useState(defaultChecked || false);

//   React.useEffect(() => {
//     if (onChange) {
//       if (checked !== value) onChange({ target: { value: checked, name } });
//     }
//   }, [checked, onChange, value, name]);

//   // TODO: For accessability we should use a checkbox instead of a button
//   return (
//     <OnOffButtonStyle
//       ref={ref}
//       on={checked ? 'true' : undefined}
//       onClick={() => setChecked((prev) => !prev)}
//       type="button"
//     >
//       {label}
//     </OnOffButtonStyle>
//   );
// };
