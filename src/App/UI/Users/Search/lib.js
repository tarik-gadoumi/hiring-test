import styled from 'styled-components';
const WrapperIconInput = styled.div`
    position: relative;
    width: fit-content;
`;
const AbsoluteDiv = styled.div`
    position: absolute;
    right: 0;
    width: 250px;
    height: 100px;
    overflow-y: auto;
    margin-top: 5px;
`;
const UList = styled.ul`
    padding-inline-start: 0px;
    margin-block-start: 0em;
    //TODO: hmmm later i need to think how to implement something like this:
    //when i click outside WrapperIconInput  UList need to be set to display:none
    //then when i click inside the input the UList display should be block;
    //display: ${props => (props.testInvisibilite ? 'none' : 'block')};
`;
const List = styled.li`
    list-style: none;

    &:hover {
        background-color: lightgray;
        cursor: pointer;
    }
`;




export { WrapperIconInput, AbsoluteDiv, List, UList };
