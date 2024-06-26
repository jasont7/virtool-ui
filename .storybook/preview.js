import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../src/js/app/GlobalStyles";
import { theme } from "../src/js/app/theme";

export const decorators = [
    Story => (
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Story />
            </ThemeProvider>
        </MemoryRouter>
    ),
];

export const parameters = {
    actions: {
        argTypesRegex: "^on[A-Z].*",
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
