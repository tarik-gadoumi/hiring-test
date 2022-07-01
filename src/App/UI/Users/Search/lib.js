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
    z-index: 999;
    &:hover {
        background-color: lightgray;
        cursor: pointer;
    }
`;

const Wrapper = styled.div`
width : 100%;
height : 90px;
display: flex;
align-items: center;
justify-content: center;

`


export { WrapperIconInput, AbsoluteDiv, List, UList ,Wrapper};
