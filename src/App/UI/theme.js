/* @flow */

export type Theme = {
    colors: {
        primary: {
            main: string,
            light: string,
            dark: string,
            contrast: string,
        },
        secondary: {
            main: string,
            light: string,
            dark: string,
            contrast: string,
        },
        status: {
            error: string,
            danger: string,
            success: string,
        },
    },
    typography: {
        button: {
            fontWeight: number,
            textTransform: string,
        },
    },
};
