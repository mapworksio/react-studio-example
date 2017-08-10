import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  body {
    position: absolute;
    width: 100%;
    height: 100%;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    margin: 0;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    display: flex;
    flex: 1 1;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
