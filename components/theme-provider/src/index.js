import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import THEME from '@coffee-shope/theme';

const theme = {
  colors: THEME.COLORS,
  fonts: THEME.FONTS,
};

/**
 * Theme provider for CoffeeShope components built on Emotion Core
 */
const CoffeeShopeThemeProvider = ({ children }) => (
  <React.Fragment>
    <Global
      styles={css`
        html {
          box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        body {
          /* display: flex; */
          /* min-height: 100vh; */
          /* flex-direction: column; */
        }

        main {
          /* flex: 1 0 auto; */
        }

        html,
        body,
        button,
        input,
        optgroup,
        select,
        textarea {
          font-family: ${THEME.FONTS.STACK};
        }

        button {
          outline: none;
        }

        input::placeholder {
          font-family: ${THEME.FONTS.STACK};
        }
        input {
          outline: none;
        }
      `}
    />
    <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
  </React.Fragment>
);

export { CoffeeShopeThemeProvider };
