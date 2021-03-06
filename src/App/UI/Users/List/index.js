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

function App({ mountApp, speedLatency, perPage, ...props }) {
    const { users, dispatch: unsafeDispatch } = props;
    // 🌟  comment line  bellow
    const dispatch = useSafeDispatch(unsafeDispatch);
    //🌟  uncomment line  bellow
    //const dispatch = unsafeDispatch ;
    const [page, setPage] = React.useState(1);
    let dynamicNbPage = perPage === 1 ? parseInt(17 / perPage) :perPage === 17 ?  1 :parseInt(17 / perPage) + 1;
    //here i m setting the page number for everry input range toggle (from line 24 to 33)
    const prevKeyRef = React.useRef(dynamicNbPage);
    React.useEffect(
        () => {
            const prevKey = prevKeyRef.current;
            if (prevKey !== dynamicNbPage) {
                setPage(1);
            }
        },
        [dynamicNbPage],
    );

    const [value] = useDebounce(page, 300);
    const asyncCallback = React.useCallback(
        () => {
            if (users) {
                return TransformToPromise(data);
            }
        },
        [data],
    );
    const [state, mySafeDispatch] = useAsync(asyncCallback);
    const {data,status} = state;

    function handlePrevious() {
        if (page === 1) return;
        mySafeDispatch({ type: 'idle' })
        setPage(p => p - 1);
    }
    function handleNext() {
        if (users) {
            if (dynamicNbPage === page) return;
        }
        mySafeDispatch({ type: 'idle' })
        setPage(p => p + 1);
    }
    React.useEffect(
        () => {
            mySafeDispatch({ type: 'pending' })
            sleep(speedLatency).then(() => {
                let arrived = dispatch(fetchUsers(new FetchUsers(value, perPage)));
                if (arrived) {
                    mySafeDispatch({ type: 'resolved' , data :arrived.payload })
                }
            });
        },
        [value, perPage],
    );
    
    return (
        <div style={{ isolation: 'isolate', zIndex: -99999 }}>
            {status !== 'resolved'
                ? Array.from(Array(perPage)).map((v, i, list) => {
                      //the rule say do not pass index as a key !
                      //is this  one of the use cases where it's okay ?!
                      return <ListInfoFallback key={i} />;
                  })
                : data
                    ? data.map((value, i, list) => {
                          return <ListView key={value.id.value} user={value} />;
                      })
                    : null}

            <WrapperPagination>
                <Pagination>
                    <Button onClick={handlePrevious}>Previous</Button>
                    <Page>
                        {' '}
                        {page} / {data ? dynamicNbPage : 'Loading...'}{' '}
                    </Page>
                    <Button onClick={handleNext}>Next</Button>
                </Pagination>
            </WrapperPagination>
        </div>
    );
}
function UsersList(props) {
    const [mountApp, setMountApp] = React.useState(true);
    const [speedLatency, setSpeedLatency] = React.useState(300);
    const [perPage, setperPage] = React.useState(2);
    return (
        <div style={{ marginTop: '60px' }}>
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
                    value={speedLatency}
                    onChange={setSpeedLatency}
                    onChangeComplete={args => console.log(args)}
                />
                <hr />
                <label htmlFor="internet speed">
                    Internet speed latency (try to increase i it so u can see how the component
                    look's like when loading status is "Pending")
                    <span>
                        <div>{`${speedLatency} ms`}</div>
                        <span>
                            {speedLatency > 1200 ? (
                                <span style={{ backgroundColor: '#DC143C' }}> Bad<span role='img' aria-label='bad'>❌</span> </span>
                            ) : speedLatency > 300 ? (
                                <span style={{ backgroundColor: 'Yellow' }}>Slow <span role='img' aria-label='sad'>😔</span> </span>
                            ) : (
                                <span style={{ backgroundColor: 'lightgreen' }}>Good <span role='img' aria-label='good'>👍</span> </span>
                            )}
                        </span>
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
                <App mountApp={mountApp} speedLatency={speedLatency} perPage={perPage} {...props} />
            ) : null}
        </div>
    );
}
const mapStateToProps = ({ usersListReducers }) => {
    return { ...usersListReducers };
};
export default connect(mapStateToProps)(UsersList);
