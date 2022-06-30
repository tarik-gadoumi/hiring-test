import React from 'react';
import styled from 'styled-components';
import { COLORS } from './constants';
import Icon from './Icon';
import VisuallyHidden from './VisuallyHidden';

const STYLES = {
    small: {
        fontSize: 14,
        iconSize: 30,
        borderThikness: 1,
        height: 24,
        strokeWidth: 1,
    },
    large: {
        fontSize: 18,
        iconSize: 44,
        borderThikness: 2,
        height: 36,
        strokeWidth: 2,
    },
};
const IconInput = ({
    label,
    icon,
    width = 250,
    size,

    ...props
}) => {
    const styles = STYLES[size];
    if (!styles) {
        throw new Error(`no style found  for ${size} size`);
    }

    return (
        <WrapperAll>
            <IconWrapper
                style={{
                    '--size': styles.iconSize + 'px',
                }}
            >
                <Icon id={icon} strokeWidth={styles.strokeWidth} size={styles.iconSize} />
            </IconWrapper>
            <Wrapper>
                <VisuallyHidden>{label}</VisuallyHidden>
                <TextInput
                    {...props}
                    style={{
                        '--width': width + 'px',
                        '--height': styles.height / 16 + 'rem',
                        '--border-thikness': styles.borderThikness + 'px',
                        '--font-size': styles.fontSize / 16 + 'rem',
                    }}
                />
            </Wrapper>
        </WrapperAll>
    );
};
const WrapperAll = styled.div`
    display :flex;
`
const Wrapper = styled.label`
    display: block;
    position: relative;
    color: ${COLORS.gray700};
    width: fit-content;
    &:hover {
        color: ${COLORS.black};
    }
`;
const IconWrapper = styled.div`
    margin: auto 0;
    margin-right:10px;
    height: var(--size);
    width: var(--size);
`;
const TextInput = styled.input`
    font-size: var(--font-size);
    width: var(--width);
    height: var(--height);
    border: none;
    border: var(--border-thikness) solid ${COLORS.black};
    // padding-left: var(--height);
    color: inherit;
    font-weight: 700;
    &::placeholder {
        color: ${COLORS.gray500};
        font-weight: 400;
    }
    &:focus {
        outline-offset: 2px;
    }
`;
export default IconInput;
