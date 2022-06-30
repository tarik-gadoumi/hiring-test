import * as React from 'react'
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

    React.useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}


function useSafeDispatch(dispatch) {
    const isMounted = React.useRef(false);
    React.useLayoutEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    return React.useCallback((...args) => (isMounted.current ? dispatch(...args) : void 0), [
        dispatch,
    ]);
}
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
    const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
        status: 'idle',
        data: null,
        error: null,
        ...initialState,
    });
    const mySafeDispatch = useSafeDispatch(unsafeDispatch);
    React.useEffect(
        () => {
            const promise = asyncCallback();
            if (!promise) {
                return;
            }
            mySafeDispatch({ type: 'pending' });
            promise.then(
                dataD => {
                    mySafeDispatch({ type: 'resolved', data: dataD });
                },
                errorD => {
                    mySafeDispatch({ type: 'rejected', error: errorD });
                },
            );
        },
        [asyncCallback],
    );

    return [state, mySafeDispatch];
}

export {useWindowDimensions,useAsync,useSafeDispatch}