/* @flow */

import type { UsersFetchedAction } from '../../../Application/Action/usersFetched';
import UsersListView from './UsersListView';
import UserView from './UserView';

type State = {
    users: ?UsersListView,
};

type Action = UsersFetchedAction;

const initialState = {
    users: null,
};

const whenUsersFetched = (state: State, { payload, pagination }: UsersFetchedAction) => {
    const usersList = state.users || UsersListView.createEmpty(pagination.total);

    return Object.assign({}, state, {
        users: usersList.setUserPage(
            pagination.page,
            payload.map(
                ({ id, email, name, picture }) =>
                    new UserView(id.value, email, name.first, name.last, picture.large),
            ),
        ),
    });
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case 'USERS_FETCHED':
            return whenUsersFetched(state, action);
        default:
            return state;
    }
};
