/* @flow */

import type { UserPayload } from './usersFetched';

type UsersPayload = Array<UserPayload>;

export type UsersFilteredAction = {
    type: 'USERS_FILTERED',
    payload: UsersPayload,
};

export default (payload: UsersPayload): UsersFilteredAction => {
    return {
        type: 'USERS_FILTERED',
        payload: payload,
    };
};
