import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});
const Spinner = styled(FaSpinner)({
    position: 'absolute',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    margin: 'auto',
    color: 'black',
    animation: `${spin} 1s linear infinite`,
    fontSize: `130%`,
});

Spinner.defaultProps = {
    'aria-label': 'loading',
};
const Wrapper = styled.div`
    box-sizing: border-box;
    margin-bottom: 15px;
`;
const WrapperPagination = styled.div`
    box-sizing: border-box;
    padding: 12px;
    margin: 0 auto;
    max-width: 750px;
    min-width: 250px;
    @media (max-width: 460px) {
        border: none;
        min-width: 150px;
    }
`;
const MaxWithWrapper = styled.div`
    outline: 3px solid #1CE4A6;
    max-width: 750px;
    min-width: 460px;
    height: 150px;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr 4fr;
    grid-gap: 10px;
    @media (max-width: 460px) {
        min-width: 200px;
        height: 100px;
        outline: none;
    }
`;
const Centered = styled.div`
    @media (max-width: 460px) {
        padding-top: 0px;
        & > *:first-child {
            display: none;
        }
    }
    position: relative;
    min-width: 100px;
    padding-top: 12px;
    font-size: 1.5rem;
    & > *:last-child {
        color: ${({ theme }) => theme.colors.primary.light};
        font-size: 0.875rem;
        position: absolute;
        bottom: 12px;
        word-break: break-word;
    }
`;
const ImgWrapper = styled.div`
    box-sizing: border-box;
    border: 3px solid #1CE4A6;
    border-right : 6px solid #1CE4A6;
    overflow: hidden;
    position: relative;
    display: inline-flex;
    width: 150px;
    @media (max-width: 460px) {
        width: 100px;
        height: 100px;
        border: none;
    }
`;
const Img = styled.img`
    // display: block;
    @media (max-width: 460px) {
        border-radius: 50%;
    }
`;

const Right = styled.div`
    width: 150px;
    min-width: 150px;
    height: 100%;
    border-left: 3px solid  #1CE4A6;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    @media (max-width: 460px) {
        border: none;
    }
`;
const Button = styled.button`
    display: block;
    width: 130px;
    color: black;
    border:none;
    background-color: #1CE4A6;
    padding: 4px;
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.typography.button.fontWeight};
    border-radius: 16px;
    &:focus {
        outline: 3px auto black;
        outline-offset: 2px;
    }
`;
const Page = styled.div``;
const Pagination = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    justify-items: center;
    align-items: center;
    min-width: 300px;
    @media (max-width: 460px) {
        min-width: 230px;
        & > * {
            font-size: 1rem;
        }
        & > *:not(:nth-child(2)) {
            width: 100px;
            border-radius: 18px;
        }
    }
`;
const FirstAndLast = styled.div`
    @media (max-width: 460px) {
        display: flex;
        flex-direction: row-reverse;
        & > *:nth-child(2) {
            margin-right: 10px;
        }
    }
`;
const SuccessionDiv = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 10px;
    @media (max-width: 460px) {
        display: grid;
        height: inherit;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 30px;
        align-items: center;
        gap: 0;

        & > *:first-child > * {
            font-size: 1rem;
            position: static;
        }
        & > * > * {
            font-size: 0.875rem;
            width: fit-content;
        }
        & > *:last-child {
            grid-column-start: 1;
            grid-column-end: -1;
            grid-row-start: 2;
            grid-row-end: 3;
            display: flex;
            flex-direction: row;
            align-items: end;
            justify-content: start;
        }
        // btn Edit
        & > *:last-child > * {
            margin-right: 10px;
            padding: 4px 12px;
        }
        & > *:first-child > *:last-child {
            color: #1CE4A6;
            margin-top: 10px;

            font-size: 4vw;
        }
        & > *:first-child > *:first-child {
            font-size: 5vw;
        }
    }
`;
const Skeletton = styled.div``;
export {
    MaxWithWrapper,
    Page,
    Pagination,
    Wrapper,
    Img,
    Centered,
    Right,
    ImgWrapper,
    Button,
    WrapperPagination,
    SuccessionDiv,
    FirstAndLast,
    Spinner,
    Skeletton,
};
