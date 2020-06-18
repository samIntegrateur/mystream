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

// Tricky,
// see https://stackoverflow.com/questions/47077210/using-styled-components-with-props-and-typescript/52045733#52045733
interface StlTitleProps {
    as: any;
    type: TitleType;
    margin?: string;
}

const StlTitle = styled.h1`
    margin-top: 0;
    line-height: var(--line-height-sm);
    
    color: ${(props: StlTitleProps) => 'var(--' + props.type + '-color)'};
    font-size: ${(props: StlTitleProps) => 'var(--' + props.type + '-font-size)'};
    font-weight: ${(props: StlTitleProps) => 'var(--' + props.type + '-font-weight)'};
    
    margin-bottom: ${(props: StlTitleProps) => props.margin};
    
    &:last-child {
      margin-bottom: 0;
    }
`;

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

    return (
        <StlTitle as={tag} type={type} margin={marginVar}>
            {children}
        </StlTitle>
    );
};

export default Title;
