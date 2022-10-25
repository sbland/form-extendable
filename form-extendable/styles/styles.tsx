import styled from 'styled-components';

export const FormStyled = styled.form``;

/* See below for legacy scss */

// .form,
// .form_inputs,
// .formSection {
//   /* FORM SECTION */
//   &.formSection,
//   .formSection {
//     position: relative;
//     display: flex;
//     overflow: visible;
//     flex-grow: 1;

//     // Styling
//     padding: $section-padding;
//     padding-bottom: $section-padding;
//     border: $section-border;
//     border-radius: ($unit * 0.3);

//     margin: 0; // Reset margin
//     margin-top: $section-padding;
//     box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.2);

//     &.hasHeading {
//       padding-top: $section-padding + $heading-height; // Allows for title
//       margin-top: $section-padding + $heading-height;
//     }
//   }
//   // Child of vert section
//   &.vert > .formSection {
//     &:not(:last-child) {
//       margin-bottom: $section-padding + $heading-height;
//     }
//   }
//   // Child of horiz section
//   &.horiz > .formSection {
//     // border: 3px green solid;
//     margin-left: $section-padding;
//     &:last-child {
//       margin-right: $section-padding;
//     }
//   }
//   // vert section
//   &.formSection.vert,
//   .formSection.vert {
//     flex-direction: column;
//   }
//   // horiz section
//   &.formSection.horiz,
//   .formSection.horiz {
//     align-items: stretch;
//     justify-items: center;
//     justify-content: space-between;
//     flex-wrap: wrap;
//   }

//   /* FORM ROW */
//   .form_row {
//     flex-grow: 1;
//     display: flex;
//     margin: 0; // Reset margin
//     padding: 2px;
//   }
//   &.vert > .form_row {
//     align-items: stretch; // Ensures inputs align to bottom of label
//     flex-direction: column;

//     &:not(:first-child) {
//       margin-top: $section-padding;
//     }

//     &:not(:last-child) {
//       margin-bottom: $section-padding;
//     }
//   }
//   &.horiz > .form_row {
//     flex-direction: column;
//     margin-right: $section-padding;
//     justify-content: flex-start;
//     outline: 1px solid $grey-20;
//     &:not(:first-child) {
//       margin-left: $section-padding;
//     }
//   }

//   /* FORM LABEL */
//   .form_label {
//     margin-right: $unit;
//     &.required {
//       color: $warningColour;
//     }

//     &.hasChanged {
//       position: relative;
//       &::after {
//         content: '';
//         position: absolute;
//         display: block;
//         width: 2px;
//         background: $warningColour;
//         height: 100%;
//         z-index: 10;
//         right: -$unit;
//         top: 0;
//       }
//     }
//   }
//   &.vert > .form_row > .form_label {
//     text-align: left;
//     width: 30%;
//     max-width: 200px;
//     flex-grow: 1;
//   }
//   &.horiz > .form_row > .form_label {
//     text-align: left;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     max-width: fit-content;
//     width: fit-content;
//   }

//   /* SECTION HEADING */

//   .formSection_heading {
//     position: absolute;
//     margin: 0;
//     background: whitesmoke;
//     top: -$heading-height;
//     left: $unit;
//     width: auto;
//     border-radius: 3px;
//   }
//   h1,
//   h2,
//   h3,
//   h4 {
//     transition: all 0.2s ease-out;
//   }

//   /* Uncomment to add heading hover effect
//   // &:hover {
//   //   h1,
//   //   h2,
//   //   h3,
//   //   h4 {
//   //     color: $primaryColour;
//   //   }
//   //   & > .formSection_heading {
//   //     background: white;
//   //   }
//   // }

//   /* INPUTS */

//   input[type='text'],
//   input[type='date'],
//   input[type='number'] {
//     min-width: 60%;
//     flex-grow: 1;
//     outline: 1px $grey-30 solid;
//     border: 0;
//     height: $line-height-1;
//     max-height: $line-height-1;
//     // padding: 0;
//     &:focus {
//       outline: 2px $grey-30 solid;
//     }
//   }

//   select {
//     min-width: 60%;
//     border: 1px $grey-30 solid;
//     outline: none;
//   }

//   .formFieldFile {
//     border: 1px $primaryColour solid;
//     background: $grey-20;
//   }

//   .formFieldInput {
//     .vert & {
//       flex-grow: 1;
//     }
//     .horiz & {
//       flex-grow: 0;
//     }
//   }

//   textarea {
//     width: 100%;
//     flex-grow: 1;
//     padding: 0;
//     margin: 0;
//     border: none;
//     outline: none;
//     &:focus {
//       outline: 2px $grey-30 solid;
//     }
//   }

//   input[type='checkbox'],
//   input[type='radio'] {
//     margin: 0 ($unit * 0.5);
//   }

//   .submitBtns {
//     display: flex;
//     width: 100%;
//   }

//   .formFieldInput {
//     width: 100%;
//   }
// }

// @media (min-width: $mq-medium) {
//   .formSection {
//     &.vert > .form_row > .form_label {
//       text-align: right;
//     }
//     &.horiz > .form_row > .form_label {
//       text-align: left;
//     }
//     &.vert > .form_row {
//       flex-direction: row;
//     align-items: flex-end; // Ensures inputs align to bottom of label
//   }
//     &.horiz > .form_row {
//       // flex-direction: column;
//     }
//   }
// }
