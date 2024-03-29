import styled from 'styled-components';
import { defaultTheme } from './ThemeProvider';

export const FormSection = styled.section`
  &,
  .formSection {
    position: relative;
    display: flex;
    overflow: visible;
    flex-grow: 1;
    flex-direction: row;

    padding: ${({ theme }) => theme.formExtendableTheme.section.padding};
    padding-bottom: ${({ theme }) => theme.formExtendableTheme.section.padding};
    border: ${({ theme }) => theme.formExtendableTheme.section.border};
    border-radius: (1rem * 0.3);

    margin: 0; // Reset margin
    box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.2);

    &.hasHeading.hasHeading.hasHeading.hasHeading.hasHeading {
      // We need to make sure these override other styles
      padding-top: ${({ theme }) =>
        `calc(${theme.formExtendableTheme.section.padding} + 0.5 * ${theme.formExtendableTheme.section.headingHeight})`}; // Allows for title
      margin-top: ${({ theme }) =>
        `calc(0.5 * ${theme.formExtendableTheme.section.headingHeight})`};
    }

    /* Child of vert section */
    &.vert > .formSection {
      margin-right: ${({ theme }) => theme.formExtendableTheme.section.padding};
      margin-bottom: ${({ theme }) =>
        `${theme.formExtendableTheme.section.padding}`};
    }
    &.horiz > .formSection {
      margin: ${({ theme }) => `${theme.formExtendableTheme.section.padding}`};
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

  .form_row {
    flex-grow: 1;
    position: relative;
    display: flex;
    border: ${({ theme }) => theme.formExtendableTheme.row.border};
    padding: ${({ theme }) => theme.formExtendableTheme.row.padding};
    min-height: ${({ theme }) =>
      `calc(${theme.formExtendableTheme.typography.lineHeight} + 2 * ${theme.formExtendableTheme.row.padding})`};
    margin: ${({ theme }) => theme.formExtendableTheme.section.padding};
    flex-direction: column; // Show labels above inputs when viewing on small screen
  }

  .formSection.vert > .form_row {
    align-items: stretch; // Ensures inputs align to bottom of label
  }
  .formSection.horiz > .form_row {
    justify-content: flex-start;
  }
  .form_row_inner {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    height: fit-content;
    max-width: ${({ theme }) => theme.formExtendableTheme.row.labelMaxWidth};
    align-self: flex-start;
  }

  /* FORM FIELD ERROR */
  .form_field_error {
    color: ${({ theme }) => theme.formExtendableTheme.errorPopup.color};
    font-size: ${({ theme }) => theme.formExtendableTheme.errorPopup.fontSize};
    line-height: ${({ theme }) =>
      theme.formExtendableTheme.typography.lineHeight};
    background: ${({ theme }) =>
      theme.formExtendableTheme.errorPopup.background};
    border: ${({ theme }) => theme.formExtendableTheme.errorPopup.border};
    outline: ${({ theme }) => theme.formExtendableTheme.errorPopup.border};
    padding: ${({ theme }) => theme.formExtendableTheme.errorPopup.padding};
    margin-right: 1rem;
    text-align: right;
  }

  /* FORM LABEL */
  .form_label {
    line-height: ${({ theme }) =>
      theme.formExtendableTheme.typography.lineHeight};
    display: flex;
    height: fit-content;

    &,
    label,
    .label_wrap_inner {
      height: fit-content;
      display: flex;
      justify-content: flex-end;
      line-height: ${({ theme }) =>
        theme.formExtendableTheme.typography.lineHeight};
      flex-grow: 1;
    }
    label {
      display: flex;
      justify-content: flex-end;
      max-width: fit-content;
    }

    &,
    * {
      &.required {
        color: ${({ theme }) => theme.formExtendableTheme.colors.warning};
      }
    }

    &.hasChanged {
      position: relative;
      &:after {
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
    ${({ theme }) => theme.formExtendableTheme.row.labelStyle}
  }
  .formSection.vert > .form_row > .form_label {
    &,
    * {
      width: inherit;
      text-align: left;
      label {
        flex-grow: 1;
      }
    }
  }
  .formSection.horiz > .form_row > .form_label {
    &.hidden {
      display: none;
    }
    &,
    * {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      width: fit-content;
      height: fit-content;
    }
  }

  /* FORM COMPONENT */

  .formComponentWrap {
    flex-grow: 1;
    display: flex;
    line-height: ${({ theme }) =>
      theme.formExtendableTheme.typography.lineHeight};
    min-height: ${({ theme }) =>
      theme.formExtendableTheme.typography.lineHeight};
  }

  /* SECTION HEADING */

  .formSection_heading {
    position: absolute;
    margin: 0;
    border: ${({ theme }) => theme.formExtendableTheme.section.headingBorder};
    background: ${({ theme }) =>
      theme.formExtendableTheme.section.headingBackground};

    top: calc(
      -0.5 * ${({ theme }) => theme.formExtendableTheme.section.headingHeight}
    );

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
    flex-grow: 1;
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
    flex-grow: 1;
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

  .toggleBoxRadioGroup_wrap {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        margin-right: ${({ theme }) => theme.formExtendableTheme.row.padding};
        margin-bottom: ${({ theme }) => theme.formExtendableTheme.row.padding};
      }
    }
  }

  .bubbleSelector {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: ${({ theme }) => theme.formExtendableTheme.row.padding};
        margin-bottom: ${({ theme }) => theme.formExtendableTheme.row.padding};
      }
    }
  }

  /* DESKTOP CSS */
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
          // align-self: flex-end;
        }
      }
      &.horiz > .form_row {
        flex-direction: row;
      }
    }
    .formSection.vert > .form_row > .form_label {
      &,
      * {
        width: ${({ theme }) => theme.formExtendableTheme.row.labelTargetWidth};
        height: fit-content;
        max-width: ${({ theme }) =>
          theme.formExtendableTheme.row.labelMaxWidth};
      }
    }
    .form_label {
      label,
      .label_wrap_inner {
        min-height: ${({ theme }) =>
          theme.formExtendableTheme.typography.lineHeight};
        height: fit-content;
      }
    }
  }
`;

FormSection.defaultProps = {
  theme: {
    formExtendableTheme: defaultTheme,
  },
};

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
      box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.2);

      &.hasHeading.hasHeading.hasHeading.hasHeading.hasHeading {
        // We need to make sure these override other styles
        padding-top: ${({ theme }) =>
          `calc(${theme.formExtendableTheme.section.padding} + 0.5 * ${theme.formExtendableTheme.section.headingHeight})`}; // Allows for title
        margin-top: ${({ theme }) =>
          `calc(0.5 * ${theme.formExtendableTheme.section.headingHeight})`};
      }

      /* Child of vert section */
      &.vert > .formSection {
        margin-right: ${({ theme }) =>
          theme.formExtendableTheme.section.padding};
        margin-bottom: ${({ theme }) =>
          `${theme.formExtendableTheme.section.padding}`};
      }
      &.horiz > .formSection {
        margin: ${({ theme }) =>
          `${theme.formExtendableTheme.section.padding}`};
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
    border: ${({ theme }) => theme.formExtendableTheme.row.border};
    padding: ${({ theme }) => theme.formExtendableTheme.row.padding};
    min-height: ${({ theme }) =>
      `calc(${theme.formExtendableTheme.typography.lineHeight} + 2 * ${theme.formExtendableTheme.row.padding})`};
    margin: ${({ theme }) => theme.formExtendableTheme.section.padding};
    flex-direction: column; // Show labels above inputs when viewing on small screen
  }

  .formSection.vert > .form_row {
    align-items: stretch; // Ensures inputs align to bottom of label
  }
  .formSection.horiz > .form_row {
    justify-content: flex-start;
  }

  /* FORM LABEL */
  .form_label {
    line-height: ${({ theme }) =>
      theme.formExtendableTheme.typography.lineHeight};
    display: flex;

    &,
    label,
    .label_wrap_inner {
      line-height: ${({ theme }) =>
        theme.formExtendableTheme.typography.lineHeight};
      flex-grow: 1;
    }

    &,
    * {
      &.required {
        color: ${({ theme }) => theme.formExtendableTheme.colors.warning};
      }
    }

    &.hasChanged {
      position: relative;
      &:after {
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
    ${({ theme }) => theme.formExtendableTheme.row.labelStyle}
  }
  .formSection.vert > .form_row > .form_label {
    &,
    * {
      width: inherit;
      text-align: left;
      flex-grow: 1;
    }
  }
  .formSection.horiz > .form_row > .form_label {
    &.hidden {
      display: none;
    }
    &,
    * {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      width: fit-content;
      height: fit-content;
    }
  }

  /* FORM COMPONENT */

  .formComponentWrap {
    flex-grow: 1;
    display: flex;
  }

  /* SECTION HEADING */

  .formSection_heading {
    position: absolute;
    margin: 0;
    border: ${({ theme }) => theme.formExtendableTheme.section.headingBorder};
    background: ${({ theme }) =>
      theme.formExtendableTheme.section.headingBackground};

    top: calc(
      -0.5 * ${({ theme }) => theme.formExtendableTheme.section.headingHeight}
    );

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
    flex-grow: 1;
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
    flex-grow: 1;
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

  .toggleBoxRadioGroup_wrap {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        margin-right: ${({ theme }) => theme.formExtendableTheme.row.padding};
        margin-bottom: ${({ theme }) => theme.formExtendableTheme.row.padding};
      }
    }
  }

  .bubbleSelector {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: ${({ theme }) => theme.formExtendableTheme.row.padding};
        margin-bottom: ${({ theme }) => theme.formExtendableTheme.row.padding};
      }
    }
  }

  /* DESKTOP CSS */
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
          // align-self: flex-start;
        }
      }
      &.horiz > .form_row {
        flex-direction: row;
      }
    }
    .formSection.vert > .form_row > .form_label {
      max-width: ${({ theme }) => theme.formExtendableTheme.row.labelMaxWidth};
      width: ${({ theme }) => theme.formExtendableTheme.row.labelTargetWidth};
      // &,
      label {
        height: fit-content;
        max-width: fit-content;
      }
    }
    .form_label {
      margin-right: 1rem;
      &,
      label,
      .label_wrap_inner {
        min-height: ${({ theme }) =>
          theme.formExtendableTheme.typography.lineHeight};
        height: fit-content;
      }
    }
  }
`;

FormStyled.defaultProps = {
  theme: {
    formExtendableTheme: defaultTheme,
  },
};
