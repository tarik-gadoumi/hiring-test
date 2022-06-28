/* @flow */

import FilterUsers from './Query/FilterUsers';
import usersFiltered from './Action/usersFiltered';
import users from './users.json';

export default (query: FilterUsers) => {
    const { filter, maxResults } = query;

    return usersFiltered(
        users
            .filter(({ id, name, email }) => {
                const re = new RegExp(filter, 'i');

                return [id.value, name.first, name.last, email].reduce((match, test) => {
                    return match || re.test(test);
                }, false);
            })
            .slice(0, maxResults),
    );
};
