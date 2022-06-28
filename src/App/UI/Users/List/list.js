import * as React from 'react';
import { captaliseFirstLetter, ImageLoader } from './utils';
import {
    MaxWithWrapper,
    Wrapper,
    Img,
    ImgWrapper,
    Centered,
    Right,
    Button,
    SuccessionDiv,
    FirstAndLast,
    Spinner,
    Skeletton,
} from './lib';

function ListInfoFallback() {
    // const initialName = React.useRef(name).current;

    const fallbackListData = {
        name: { title: 'XXX', first: 'XXX', last: 'XXX' },
        loader: <ImageLoader />,
        spinner: <Spinner />,
        email: 'XXX@XXX.XXX',
        id: { name: 'XXX', value: 'XXX' },
        picture: {
            large: '',
            medium: '',
            thumbnail: '',
        },
    };
    return <ListView user={fallbackListData} />;
}
function ListView({ user }) {
    return (
        <Wrapper>
            <MaxWithWrapper>
                <ImgWrapper>
                    {
                        <Img
                            alt="avatar"
                            src={user.picture.large}
                            onError={e => {
                                e.target.style.display = 'none';
                            }}
                        />
                    }
                    <Skeletton size={user.size}>{user.loader}</Skeletton>
                </ImgWrapper>
                <SuccessionDiv>
                    <Centered>
                        <div>{user.spinner}</div>
                        <FirstAndLast>
                            <div>{user.name.last.toUpperCase()}</div>
                            <div>{captaliseFirstLetter(user.name.first)}</div>
                        </FirstAndLast>
                        <div>{user.email}</div>
                    </Centered>
                    <Right>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </Right>
                </SuccessionDiv>
            </MaxWithWrapper>
        </Wrapper>
    );
}
export { ListView, ListInfoFallback };
