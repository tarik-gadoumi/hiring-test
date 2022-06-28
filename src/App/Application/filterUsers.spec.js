/* @flow */

import mockStore from '../../Testing/mockStore';
import filterUsers from './filterUsers';
import FilterUsers from './Query/FilterUsers';

jest.mock('./users.json', () => [
    {
        id: { value: 'NO0' },
        name: { first: 'NO', last: 'NO' },
        email: 'NO@test.com',
    },
    {
        id: { value: 'YES1' },
        name: { first: 'NO', last: 'NO' },
        email: 'NO@test.com',
    },
    {
        id: { value: 'NO2' },
        name: { first: 'YES', last: 'NO' },
        email: 'NO@test.com',
    },
    {
        id: { value: 'NO3' },
        name: { first: 'NO', last: 'YES' },
        email: 'NO@test.com',
    },
    {
        id: { value: 'NO4' },
        name: { first: 'NO', last: 'NO' },
        email: 'YES@test.com',
    },
    {
        id: { value: 'YES6' },
        name: { first: 'YES', last: 'YES' },
        email: 'YES@test.com',
    },
]);

describe('filterUsers', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch users', () => {
        const store = mockStore();

        store.dispatch(filterUsers(new FilterUsers('yes', 4)));

        expect(store.getActions()).toEqual([
            {
                type: 'USERS_FILTERED',
                payload: [
                    {
                        id: { value: 'YES1' },
                        name: { first: 'NO', last: 'NO' },
                        email: 'NO@test.com',
                    },
                    {
                        id: { value: 'NO2' },
                        name: { first: 'YES', last: 'NO' },
                        email: 'NO@test.com',
                    },
                    {
                        id: { value: 'NO3' },
                        name: { first: 'NO', last: 'YES' },
                        email: 'NO@test.com',
                    },
                    {
                        id: { value: 'NO4' },
                        name: { first: 'NO', last: 'NO' },
                        email: 'YES@test.com',
                    },
                ],
            },
        ]);
    });
});
