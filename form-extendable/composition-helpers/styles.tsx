import styled from 'styled-components';

export const GlobalStyles = styled.div`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.colors.text};
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: Helvetica, serif, Helvetica, Arial, sans-serif;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .App {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
  }

  button {
    cursor: pointer;
  }

  :focus {
    outline: ${({ theme }) => theme.colors.mainHover} solid 2px;
    outline-offset: -1px;
    border-color: ${({ theme }) => theme.colors.mainHover};
  }
  ::-moz-focus-inner {
    outline: 1px ${({ theme }) => theme.colors.grey2} dashed;
  }

  /* BASE STYLES */
  // TODO: Need to fix some old references to scss variables
  html {
    font-size: (${({ theme }) => theme.typography.fontSize3} / 16px) * 1em;
    overflow-y: hidden;
    min-height: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    position: relative;
    overflow-y: hidden;
    overflow-x: hidden;
    width: 100%;
    padding: 0;
    margin: auto;

    transition: padding 0.4s ease-in;
  }

  :focus {
    outline: $focus_outline;
    outline-offset: $focus_offset;
    border-color: $focus_color;
  }
  ::-moz-focus-inner {
    outline: 1px $grey-40 dashed;
  }

  // /* Typography */
  * {
    font-weight: ${({ theme }) => theme.typography.fontWeightStandard};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    // font-size: ${({ theme }) => theme.typography.fontSize3};
    // line-height: ${({ theme }) => theme.typography.lineHeight};
  }

  b {
    font-weight: bold;
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize6};
  }
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize5};
  }
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize4};
  }
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize3};
  }
  h5 {
    font-size: ${({ theme }) => theme.typography.fontSize2};
  }

  a {
    color: ${({ theme }) => theme.colors.link};
    text-decoration: underline;
    font-weight: bold;
    border: none;
    outline: none;
    &:hover {
      color: ${({ theme }) => theme.colors.linkHover};
    }
  }
`;
