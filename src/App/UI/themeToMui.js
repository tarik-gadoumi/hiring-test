/* @flow */

import type { Theme } from './theme';

export default (theme: Theme) => ({
    palette: {
        primary: {
            light: theme.colors.primary.light,
            main: theme.colors.primary.main,
            dark: theme.colors.primary.dark,
            contrastText: theme.colors.primary.contrast,
        },
        secondary: {
            light: theme.colors.secondary.light,
            main: theme.colors.secondary.main,
            dark: theme.colors.secondary.dark,
            contrastText: theme.colors.secondary.contrast,
        },
    },
    status: {
        error: theme.colors.status.error,
        danger: theme.colors.status.danger,
        success: theme.colors.status.success,
    },
    typography: {
        button: {
            fontWeight: theme.typography.button.fontWeight,
            textAlign: theme.typography.button.textTransform,
        },
    },
});
