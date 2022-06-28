/* @flow */

import * as React from 'react';
import { connect } from 'react-redux';
import fetchUsers from '../../../Application/fetchUsers';
import FetchUsers from '../../../Application/Query/FetchUsers';
import { WrapperPagination, Button, Page, Pagination, Spinner } from './lib';
import { ListView, ListInfoFallback } from './list';
function asyncReducer(state, action) {
    switch (action.type) {
        case 'idle': {
            return { status: 'idle', data: null, error: null };
        }
        case 'pending': {
            return { status: 'pending', data: null, error: null };
        }
        case 'resolved': {
            return { status: 'resolved', data: action.data, error: null };
        }
        case 'rejected': {
            return { status: 'rejected', data: null, error: action.error };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}
function useAsync(asyncCallback, initialState) {
    const [state, myDispatch] = React.useReducer(asyncReducer, {
        status: 'idle',
        data: null,
        error: null,
        ...initialState,
    });
    React.useEffect(
        () => {
            const promise = asyncCallback();
            if (!promise) {
                return;
            }
            myDispatch({ type: 'pending' });
            promise.then(
                dataD => {
                    myDispatch({ type: 'resolved', data: dataD });
                },
                errorD => {
                    myDispatch({ type: 'rejected', error: errorD });
                },
            );
        },
        [asyncCallback],
    );

    return [state, myDispatch];
}
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
const TransformToPromise = async function promise(value) {
    return new Promise((res, rej) => {
        res(value);
    });
};
function UserListInfo() {}
function UsersList(props) {
    const { users, dispatch } = props;
    const [page, setPage] = React.useState(1);
    const [payload, setPayload] = React.useState();

    const asyncCallback = React.useCallback(
        () => {
            if (users) {
                return TransformToPromise(payload);
            }
        },
        [users],
    );
    const [state, myDispatch] = useAsync(asyncCallback, {
        status: users ? 'pending' : 'idle',
    });
    const { data, status, error } = state;

    function handlePrevious() {
        if (page === 1) return;
        setPage(p => p - 1);
    }
    function handleNext() {
        if (users) {
            if (users.pages.size === page) return;
        }
        setPage(p => p + 1);
    }

    React.useEffect(
        () => {
            sleep(1000).then(
                () => setPayload(dispatch(fetchUsers(new FetchUsers(page, 1))).payload),
                myDispatch({ type: 'idle' }),
            );
        },
        [page],
    );

    return (
        <React.Fragment>
            {status !== 'resolved' ? (
                <ListInfoFallback />
            ) : (
                payload.map((value, i, list) => {
                    return <ListView key={value.id.value} user={value} />;
                })
            )}
            <WrapperPagination>
                <Pagination>
                    <Button onClick={handlePrevious}>Previous</Button>
                    <Page>
                        {' '}
                        {page} / {users ? users.pages.size : null}{' '}
                    </Page>
                    <Button onClick={handleNext}>Next</Button>
                </Pagination>
            </WrapperPagination>
        </React.Fragment>
    );
}
const mapStateToProps = ({ usersListReducers }) => {
    return { ...usersListReducers };
};

export default connect(mapStateToProps)(UsersList);
