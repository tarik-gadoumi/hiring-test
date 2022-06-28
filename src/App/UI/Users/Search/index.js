/* @flow */

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'react-redux';
import UserView from './UserView';

type Props = {|
    dispatch: Dispatch,
    users: ?Array<UserView>,
|};

class UsersSearch extends React.Component<Props> {
    render() {
        return null;
    }
}

const mapStateToProps = ({ usersSearchReducers }) => {
    return { ...usersSearchReducers };
};

export default connect(mapStateToProps)(UsersSearch);
