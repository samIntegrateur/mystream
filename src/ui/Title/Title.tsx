import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

type TitleType = 'title1' | 'title2' | 'title3';
type TitleTag = 'h1' | 'h2' | 'h3';
type TitleMargin = 'small' | 'normal' | 'big' | 'extra';

interface TitleProps {
    type: TitleType;
    tag: TitleTag;
    margin?: TitleMargin;
}
const Title: React.FC<PropsWithChildren<TitleProps>> = (
    {
        type,
        tag,
        margin= "normal",
        children
    }) => {

    let marginVar = '';

    switch (margin) {
        case ('small'):
            marginVar = 'var(--space-sm)';
            break;
        case ('normal'):
            marginVar = 'var(--space-md)';
            break;
        case ('big'):
            marginVar = 'var(--space-lg)';
            break;
        case ('extra'):
            marginVar = 'var(--space-xl)';
            break;
        default :
            marginVar = 'var(--space-md)';
    }

    const StlTitle = styled[tag]`
        margin-top: 0;
        line-height: var(--line-height-sm);
        
        color: var(--${type}-color);
        font-size: var(--${type}-font-size);
        font-weight: var(--${type}-font-weight);
        
        &:not(:last-child) {
          margin-bottom: ${marginVar};
        }
    `;

    return (
        <StlTitle>
            {children}
        </StlTitle>
    );
};

export default Title;
