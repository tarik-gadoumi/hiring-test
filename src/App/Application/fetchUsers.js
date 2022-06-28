/* @flow */

import FetchUsers from './Query/FetchUsers';
import usersFetched from './Action/usersFetched';
import users from './users.json';

export default (query: FetchUsers) => {
    const { page, perPage } = query;

    const startIndex = (page - 1) * perPage;

    return usersFetched(users.slice(startIndex, startIndex + perPage), {
        page: page,
        perPage: perPage,
        total: Math.ceil(users.length / perPage),
    });
};
