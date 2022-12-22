import styled from 'styled-components';
import { defaultTheme } from './ThemeProvider';

// TODO: Replace this with theme provider
export const FormStyled = styled.div`
  .formSection {
    /* FORM SECTION */
    &,
    .formSection {
      position: relative;
      display: flex;
      overflow: visible;
      flex-grow: 1;
      flex-direction: row;

      padding: ${({ theme }) => theme.formExtendableTheme.section.padding};
      padding-bottom: ${({ theme }) =>
        theme.formExtendableTheme.section.padding};
      border: ${({ theme }) => theme.formExtendableTheme.section.border};
      border-radius: (1rem * 0.3);

      margin: 0; // Reset margin
      margin-top: ${({ theme }) => theme.formExtendableTheme.section.padding};
      box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.2);

      &.hasHeading {
        padding-top: ${({ theme }) =>
          `calc(${theme.formExtendableTheme.section.padding} + ${theme.formExtendableTheme.section.headingHeight})`}; // Allows for title
        margin-top: ${({ theme }) =>
          `calc(${theme.formExtendableTheme.section.padding} + ${theme.formExtendableTheme.section.headingHeight})`};
      }

      /* Child of vert section */
      &.vert > .formSection {
        &:not(:last-child) {
          margin-bottom: ${({ theme }) =>
            `calc(${theme.formExtendableTheme.section.padding} + ${theme.formExtendableTheme.section.headingHeight})`};
        }
      }
      &.horiz > .formSection {
        margin-left: ${({ theme }) =>
          theme.formExtendableTheme.section.padding};
        &:last-child {
          margin-right: ${({ theme }) =>
            theme.formExtendableTheme.section.padding};
        }
      }

      /* vert section */
      &.formSection.vert,
      .formSection.vert {
        flex-direction: column;
      }

      /* horiz section */
      &.formSection.horiz,
      .formSection.horiz {
        align-items: stretch;
        justify-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
      }
    }
  } /* end section */

  .form_row {
    flex-grow: 1;
    display: flex;
    margin: 0; // Reset margin
    padding: ${({ theme }) => theme.formExtendableTheme.row.padding};
    min-height: ${({ theme }) =>
      `calc(${theme.formExtendableTheme.typography.lineHeight} + 2 * ${theme.formExtendableTheme.row.padding})`};
  }

  .formSection.vert > .form_row {
    align-items: stretch; // Ensures inputs align to bottom of label
    flex-direction: column;

    &:not(:first-child) {
      margin-top: ${({ theme }) => theme.formExtendableTheme.section.padding};
    }

    &:not(:last-child) {
      margin-bottom: ${({ theme }) =>
        theme.formExtendableTheme.section.padding};
    }
  }
  .formSection.horiz > .form_row {
    flex-direction: column;
    margin-right: ${({ theme }) => theme.formExtendableTheme.section.padding};
    justify-content: flex-start;
    &:not(:first-child) {
      margin-left: ${({ theme }) => theme.formExtendableTheme.section.padding};
    }
  }

  /* FORM LABEL */
  .form_label {
    line-height: ${({ theme }) =>
      theme.formExtendableTheme.typography.lineHeight};

    &,
    label,
    .label_wrap_inner {
      line-height: ${({ theme }) =>
        theme.formExtendableTheme.typography.lineHeight};
    }

    &,
    * {
      &.required {
        color: ${({ theme }) => theme.formExtendableTheme.colors.warning};
      }
    }

    &.hasChanged {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        display: block;
        width: 2px;
        background: ${({ theme }) => theme.formExtendableTheme.colors.warning};
        height: 100%;
        z-index: 10;
        right: -1rem;
        top: 0;
      }
    }
  }
  .formSection.vert > .form_row > .form_label {
    &,
    * {
      width: inherit;
      flex-grow: 1;
      text-align: left;
      flex-grow: 1;
    }
  }
  .formSection.horiz > .form_row > .form_label {
    &,
    * {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: fit-content;
      width: fit-content;
    }
  }

  /* SECTION HEADING */

  .formSection_heading {
    position: absolute;
    margin: 0;
    background: whitesmoke;
    top: -${({ theme }) => theme.formExtendableTheme.section.headingHeight};
    left: 1rem;
    width: auto;
    border-radius: 3px;
  }
  h1,
  h2,
  h3,
  h4 {
    transition: all 0.2s ease-out;
  }

  input[type='text'],
  input[type='date'],
  input[type='number'] {
    box-sizing: border-box;
    min-width: 60%;
    min-height: ${({ theme }) =>
      theme.formExtendableTheme.typography.lineHeight};
    height: ${({ theme }) => theme.formExtendableTheme.typography.lineHeight};
    flex-grow: 1;
    outline: ${({ theme }) => theme.formExtendableTheme.input.outline};
    border: 0;
    height: ${({ theme }) => theme.formExtendableTheme.typography.lineHeight};
    max-height: ${({ theme }) =>
      theme.formExtendableTheme.typography.lineHeight};
    &:focus {
      ${({ theme }) => theme.formExtendableTheme.input.focus}
    }
    &:hover {
      ${({ theme }) => theme.formExtendableTheme.input.hover}
    }
  }

  select {
    min-width: 60%;
    border: ${({ theme }) => theme.formExtendableTheme.input.outline};
    outline: none;
  }

  .formFieldInput {
    .vert & {
      flex-grow: 1;
    }
    .horiz & {
      flex-grow: 0;
    }
  }

  .inputWrapper {
    padding: 2px;
    margin: 0;
    outline: ${({ theme }) => theme.formExtendableTheme.input.outline};

    &:focus-within {
      ${({ theme }) => theme.formExtendableTheme.input.focus}
    }
    &:hover {
      ${({ theme }) => theme.formExtendableTheme.input.hover}
    }
  }

  textarea {
    width: 100%;
    flex-grow: 1;
    padding: 0;
    margin: 0;
    border: none;
    outline: none; // Managed by wrapper
    min-height: ${({ theme }) =>
      theme.formExtendableTheme.typography.lineHeight};
  }

  input[type='checkbox'],
  input[type='radio'] {
    margin: 0 (1rem * 0.5);
  }

  .submitBtns {
    display: flex;
    width: 100%;
  }

  .formFieldInput {
    width: 100%;
  }

  .searchFieldWrap {
    .dropdownBtn {
      line-height: ${({ theme }) =>
        theme.formExtendableTheme.typography.lineHeight};
    }
  }

  @media (min-width: ${({ theme }) =>
      theme.formExtendableTheme.media.mediumWidth}) {
    .formSection {
      &.vert > .form_row > .form_label {
        &,
        * {
          text-align: right;
        }
      }
      &.horiz > .form_row > .form_label {
        &,
        * {
          text-align: left;
        }
      }
      &.vert > .form_row {
        flex-direction: row;
        align-items: flex-start; // Ensures inputs align to bottom of label
        .form_label {
          align-self: flex-start;
        }
      }
      &.horiz > .form_row {
      }
    }
    .formSection.vert > .form_row > .form_label {
      &,
      * {
        width: 30%;
        max-width: 200px;
      }
    }
    .form_label {
      margin-right: 1rem;
      &,
      label,
      .label_wrap_inner {
        height: ${({ theme }) =>
          theme.formExtendableTheme.typography.lineHeight};
      }
    }
  }
`;

FormStyled.defaultProps = {
  theme: {
    formExtendableTheme: defaultTheme,
  },
};
