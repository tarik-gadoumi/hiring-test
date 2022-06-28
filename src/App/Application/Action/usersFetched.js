/* @flow */

export type UserPayload = {|
    id: {
        name: string,
        value: string,
    },
    email: string,
    name: {
        title: string,
        first: string,
        last: string,
    },
    picture: {
        large: string,
        medium: string,
        thumbnail: string,
    },
|};

type UsersPayload = Array<UserPayload>;

type PaginationPayload = {
    page: number,
    perPage: number,
    total: number,
};

export type UsersFetchedAction = {
    type: 'USERS_FETCHED',
    payload: UsersPayload,
    pagination: PaginationPayload,
};

export default (payload: UsersPayload, pagination: PaginationPayload): UsersFetchedAction => {
    return {
        type: 'USERS_FETCHED',
        payload: payload,
        pagination: pagination,
    };
};
