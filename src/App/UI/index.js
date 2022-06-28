/* @flow */

import * as React from 'react';
import type { Store } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import themeToMui from './themeToMui';
import theme from './theme.json';
import UsersPage from './Users';

type Props = {|
    store: Store,
|};

class App extends React.Component<Props> {
    render() {
        const { store } = this.props;

        return (
            <ReduxProvider store={store}>
                <MuiThemeProvider theme={createMuiTheme(themeToMui(theme))}>
                    <StyledComponentsThemeProvider theme={theme}>
                        <UsersPage />
                    </StyledComponentsThemeProvider>
                </MuiThemeProvider>
            </ReduxProvider>
        );
    }
}

export default App;
