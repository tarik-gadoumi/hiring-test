/* @flow */

import mockStore from '../../Testing/mockStore';
import fetchUsers from './fetchUsers';
import FetchUsers from './Query/FetchUsers';

jest.mock('./users.json', () => [
    {
        id: { value: 1 },
    },
    {
        id: { value: 2 },
    },
    {
        id: { value: 3 },
    },
    {
        id: { value: 4 },
    },
    {
        id: { value: 5 },
    },
]);

describe('fetchUsers', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch users', () => {
        const store = mockStore();

        store.dispatch(fetchUsers(new FetchUsers(2, 2, 'Me')));

        expect(store.getActions()).toEqual([
            {
                type: 'USERS_FETCHED',
                payload: [
                    {
                        id: { value: 3 },
                    },
                    {
                        id: { value: 4 },
                    },
                ],
                pagination: {
                    page: 2,
                    perPage: 2,
                    total: 3,
                },
            },
        ]);
    });
});
