import React from 'react';
import styled, { useTheme } from 'styled-components';

export interface ICheckboxTheme {
  background: string;
  colors: {
    main: string;
  };
  typography: {
    lineHeight: string;
  };
}

const defaultTheme: ICheckboxTheme = {
  background: 'white',
  colors: {
    main: 'grey',
  },
  typography: {
    lineHeight: '1.2rem',
  },
};

export const CheckMark = styled.span`
  display: inline-block;
  padding: 0.2rem;
  min-height: 25px;
  min-width: 25px;
  width: auto;
  background-color: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.colors.main};
`;

// export const CheckBoxContainer = styled(ButtonNoFormat)`
export const CheckBoxContainer = styled.div`
  display: block;
  position: relative;
  cursor: pointer;
  user-select: none;
  min-height: ${({ theme }) => theme.typography.lineHeight};

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
    background-color: ${({ theme }) => theme.colors.main};
  }
  input:focus ~ .checkmark {
    outline: 2px solid ${({ theme }) => theme.colors.main};
  }
`;

export interface ICheckboxProps {
  uid: string;
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
  const theme = useTheme();

  React.useEffect(() => {
    if (onChange) {
      if (checked !== undefined && checked !== value)
        onChange({ target: { value: checked, name: uid } });
    }
  }, [checked, onChange, value, uid]);

  return (
    <CheckBoxContainer
      theme={theme || defaultTheme}
      onClick={() => setChecked(!checked)}
      data-testid="checkbox-container"
    >
      <input
        id={uid}
        type="checkbox"
        name={uid}
        value={value || ''}
        checked={checked || false}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
        {...inputProps}
      />
      <CheckMark theme={theme || defaultTheme} className="checkmark">
        {text}
      </CheckMark>
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
