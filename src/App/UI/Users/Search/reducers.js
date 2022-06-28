/* @flow */

import type { UsersFilteredAction } from '../../../Application/Action/usersFiltered';
import UserView from './UserView';

type State = {
    users: ?Array<UserView>,
};

type Action = UsersFilteredAction;

const initialState = {
    users: null,
};

const whenUsersFiltered = (state: State, { payload }: UsersFilteredAction) => {
    return Object.assign({}, state, {
        users: payload.map(
            ({ id, email, name }) => new UserView(id.value, email, name.first, name.last),
        ),
    });
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case 'USERS_FILTERED':
            return whenUsersFiltered(state, action);
        default:
            return state;
    }
};
