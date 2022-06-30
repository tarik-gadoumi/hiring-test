/* @flow */

import * as React from 'react';
import { connect } from 'react-redux';
import filterUsers from '../../../Application/filterUsers';
import FilterUsers from '../../../Application/Query/FilterUsers';
import { WrapperIconInput, AbsoluteDiv, List, UList } from './lib';
import { useKeyPress } from './customHooks';
import { useDebounce } from 'use-debounce';
import IconInput from './search';

function UsersSearch(props) {
    //some improvement i need to do later :
    //because my solution is based on direved state 
    //the best pattern to follow here ise the useReducer 

    const { users, dispatch } = props;
    const [query, setQuery] = React.useState('');
    const [queried, setQueried] = React.useState(false);
    const [value] = useDebounce(query, 300);
    
    const [selected, setSelected] = React.useState(false);
    const [cursor, setCursor] = React.useState(0);
    const downPress = useKeyPress('ArrowDown');
    const upPress = useKeyPress('ArrowUp');
    const enterPress = useKeyPress('Enter');
    

    function handleChange(e) {
        setQueried(true);
        setQuery(e.target.value);
    }

    React.useEffect(
        () => {
            if(!query){ 
                return 
            }
         
            if (queried && query) {
                dispatch(filterUsers(new FilterUsers(value, 10)));
                return;
            }
        
        },
        [query,queried,selected],
    );

    React.useEffect(
        () => {
            if (users && downPress) {
                setCursor(prevState => (prevState < users.length - 1 ? prevState + 1 : prevState));
            }
        },
        [downPress],
    );
    React.useEffect(
        () => {
            if (users && upPress) {
                setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
            }
        },
        [upPress],
    );
    React.useEffect(
        () => {
           
            if (users && enterPress && queried) {
                setQuery(users[cursor].firstname + ' ' + users[cursor].lastname);
                setQueried(false);
                setSelected(true); 
            }
          
        },
        [cursor,enterPress,queried],
        
    );
    if(selected && !queried){
        users.length = 0 
    }

    return (
        <WrapperIconInput>
            <IconInput
                onChange={handleChange}
                value={query}
                icon={'search'}
                label={'icon-input'}
                size={'small'}
            />
            <AbsoluteDiv>
                <UList>
                    {users
                        ? users.map((v, i, list) => {
                              let active = i === cursor;
                              return (
                                  <List
                                      key={v.id}
                                      value={v.firstname + v.lastname}
                                      onClick={e => {
                                          setQuery(e.target.textContent);
                                          setQueried(false);
                                          return (users.length = 0);
                                      }}
                                      style={active ? { background: 'lightgrey' } : null}
                                  >
                                      {`${v.firstname} ${v.lastname}`}
                                  </List>
                              );
                          })
                        : null}
                </UList>
            </AbsoluteDiv>
        </WrapperIconInput>
    );
}
const mapStateToProps = ({ usersSearchReducers }) => {
    return { ...usersSearchReducers };
};

export default connect(mapStateToProps)(UsersSearch);
