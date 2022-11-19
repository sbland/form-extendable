import styled from 'styled-components';

export interface IFormStyledProps {
  sectionPadding: string | number;
  sectionBorder: string;
  headingHeight: string | number;
  warningColor: string;
  lineHeight: string | number;
  grey30: string;
  primaryColor: string;
  mediaMediumWidth: string | number;
  rowPadding: string | number;
}

export const FormStyled = styled.div<IFormStyledProps>`
  .formSection {
    /* FORM SECTION */
    &,
    .formSection {
      position: relative;
      display: flex;
      overflow: visible;
      flex-grow: 1;
      flex-direction: row;

      padding: ${({ sectionPadding }) => sectionPadding};
      padding-bottom: ${({ sectionPadding }) => sectionPadding};
      border: ${({ sectionBorder }) => sectionBorder};
      border-radius: (1rem * 0.3);

      margin: 0; // Reset margin
      margin-top: ${({ sectionPadding }) => sectionPadding};
      box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.2);

      &.hasHeading {
        padding-top: ${({ sectionPadding, headingHeight }) =>
          `calc(${sectionPadding} + ${headingHeight})`}; // Allows for title
        margin-top: ${({ sectionPadding, headingHeight }) =>
          `calc(${sectionPadding} + ${headingHeight})`};
      }

      /* Child of vert section */
      &.vert > .formSection {
        &:not(:last-child) {
          margin-bottom: ${({ sectionPadding, headingHeight }) =>
            `calc(${sectionPadding} + ${headingHeight})`};
        }
      }
      &.horiz > .formSection {
        margin-left: ${({ sectionPadding }) => sectionPadding};
        &:last-child {
          margin-right: ${({ sectionPadding }) => sectionPadding};
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
    padding: ${({ rowPadding }) => rowPadding};
    min-height: ${({ lineHeight, rowPadding }) =>
      `calc(${lineHeight} + 2 * ${rowPadding})`};
  }

  .formSection.vert > .form_row {
    align-items: stretch; // Ensures inputs align to bottom of label
    flex-direction: column;

    &:not(:first-child) {
      margin-top: ${({ sectionPadding }) => sectionPadding};
    }

    &:not(:last-child) {
      margin-bottom: ${({ sectionPadding }) => sectionPadding};
    }
  }
  .formSection.horiz > .form_row {
    flex-direction: column;
    margin-right: ${({ sectionPadding }) => sectionPadding};
    justify-content: flex-start;
    &:not(:first-child) {
      margin-left: ${({ sectionPadding }) => sectionPadding};
    }
  }

  /* FORM LABEL */
  .form_label {
    line-height: ${({ lineHeight }) => lineHeight};

    &,
    label,
    .label_wrap_inner {
      line-height: ${({ lineHeight }) => lineHeight};
    }

    &,
    * {
      &.required {
        color: ${({ warningColor }) => warningColor};
      }
    }

    &.hasChanged {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        display: block;
        width: 2px;
        background: ${({ warningColor }) => warningColor};
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
    top: -${({ headingHeight }) => headingHeight};
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
    min-height: ${({ lineHeight }) => lineHeight};
    height: ${({ lineHeight }) => lineHeight};
    flex-grow: 1;
    outline: 1px solid green; // default if not provided below;
    outline: 1px ${({ grey30 }) => grey30} solid;
    border: 0;
    height: ${({ lineHeight }) => lineHeight};
    max-height: ${({ lineHeight }) => lineHeight};
    &:focus {
      outline: 2px ${({ grey30 }) => grey30} solid;
    }
  }

  select {
    min-width: 60%;
    border: 1px ${({ grey30 }) => grey30} solid;
    outline: none;
  }

  .formFieldFile {
    border: 1px ${({ primaryColor }) => primaryColor} solid;
    background: ${({ grey30 }) => grey30};
  }

  .formFieldInput {
    .vert & {
      flex-grow: 1;
    }
    .horiz & {
      flex-grow: 0;
    }
  }

  textarea {
    width: 100%;
    flex-grow: 1;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    min-height: ${({ lineHeight }) => lineHeight};
    &:focus {
      outline: 2px ${({ grey30 }) => grey30} solid;
    }
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

  @media (min-width: ${({ mediaMediumWidth }) => mediaMediumWidth}) {
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
        height: ${({ lineHeight }) => lineHeight};
      }
    }
  }
`;
