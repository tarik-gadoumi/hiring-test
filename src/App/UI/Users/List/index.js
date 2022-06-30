/* @flow */

import * as React from 'react';
import { connect } from 'react-redux';
import fetchUsers from '../../../Application/fetchUsers';
import FetchUsers from '../../../Application/Query/FetchUsers';
import { WrapperPagination, Button, Page, Pagination } from './lib';
import { sleep, TransformToPromise } from './utils';
import { ListView, ListInfoFallback } from './list';
import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';
import { useDebounce } from 'use-debounce';
import { useSafeDispatch, useAsync } from './customHooks';

function App({ mountApp, speenLatency, perPage, ...props }) {
    const { users, dispatch } = props;
    const safeDispatch = useSafeDispatch(dispatch);
    const [page, setPage] = React.useState(1);

    const [payload, setPayload] = React.useState();
    const [value] = useDebounce(page, 300);
    const asyncCallback = React.useCallback(
        () => {
            if (users) {
                return TransformToPromise(payload);
            }
        },
        [users],
    );

    const [state, mySafeDispatch] = useAsync(asyncCallback, {
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
            sleep(speenLatency).then(() => {
                let arrived = safeDispatch(fetchUsers(new FetchUsers(page, perPage)));
                if (arrived) {
                    setPayload(arrived.payload);
                }
            }, mySafeDispatch({ type: 'idle' }));

            return () => setPayload(null);
        },
        [value, perPage],
    );

    return (
        <div>
            {status !== 'resolved'
                ? Array.from(Array(perPage)).map((v, i, list) => {
                      return <ListInfoFallback  key={i}/>;
                  })
                : payload
                    ? payload.map((value, i, list) => {
                          return <ListView key={value.id.value} user={value} />;
                      })
                    : null}

            <WrapperPagination>
                <Pagination>
                    <Button onClick={handlePrevious}>Previous</Button>
                    <Page>
                        {' '}
                        {/* TODO : calculate the number of users programmatically
                          * but because my users comes from a static json where there total number is 17 
                          * i use raw data 17
                        */}
                        {page} / {payload ? parseInt(17 / perPage) : 'Loading...'}{' '}
                    </Page>
                    <Button onClick={handleNext}>Next</Button>
                </Pagination>
            </WrapperPagination>
        </div>
    );
}
function UsersList(props) {
    const [mountApp, setMountApp] = React.useState(true);
    const [speenLatency, setSpeedLatency] = React.useState(1000);
    const [perPage, setperPage] = React.useState(2);

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={mountApp}
                    onChange={e => setMountApp(e.target.checked)}
                />{' '}
                Mount Component
            </label>
            <hr />
            <div>
                <InputRange
                    step={100}
                    formatLabel={value => null}
                    draggableTrack={false}
                    allowSameValues={false}
                    maxValue={3000}
                    minValue={0}
                    value={speenLatency}
                    onChange={setSpeedLatency}
                    onChangeComplete={args => console.log(args)}
                />
                <hr />
                <label htmlFor="internet speed">
                    Internet speed latency{' '}
                    <span>
                        <div>{`${speenLatency} ms`}</div>
                    </span>
                </label>
            </div>
            <hr />
            <div>
                <InputRange
                    step={1}
                    formatLabel={value => null}
                    draggableTrack={false}
                    allowSameValues={false}
                    maxValue={17}
                    minValue={1}
                    value={perPage}
                    onChange={setperPage}
                    onChangeComplete={args => console.log(args)}
                />
                <hr />
                <label htmlFor="internet speed">
                    Users per page{' '}
                    <span>
                        <div>{`${perPage} x Users`}</div>
                    </span>
                </label>
            </div>
            <hr />
            {mountApp ? (
                <App mountApp={mountApp} speenLatency={speenLatency} perPage={perPage} {...props} />
            ) : null}
        </div>
    );
}

const mapStateToProps = ({ usersListReducers }) => {
    return { ...usersListReducers };
};

export default connect(mapStateToProps)(UsersList);
