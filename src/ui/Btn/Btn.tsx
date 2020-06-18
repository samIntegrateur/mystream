import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { UrlObject } from "url";

type BtnType = 'a' | 'button' | 'submit';
type BtnUi = 'main' | 'alt';

// Tricky,
// see https://stackoverflow.com/questions/47077210/using-styled-components-with-props-and-typescript/52045733#52045733
interface StlBtnProps {
    as: any;
    type: any;
    ui: BtnUi;
    disabled?: boolean,
    href? : string | UrlObject;
    onClick?: () => {},
}

const StlBtn = styled.button`
  cursor: pointer;
  font-family: var(--btn-font);
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  line-height: var(--btn-line-height);
  border-width: var(--btn-border-width);
  border-style: var(--btn-border-style);
  border-radius: var(--btn-border-radius);
  padding: var(--btn-padding);
  transition: var(--btn-transition);
  
  color: ${(props: StlBtnProps) => 'var(--btn-' + props.ui + '-color)'};
  background-color: ${(props: StlBtnProps) => 'var(--btn-' + props.ui + '-bg)'};
  border-color: ${(props: StlBtnProps) => 'var(--btn-' + props.ui + '-border-color)'};
  
  &:hover,
  &:focus {
    color: ${(props: StlBtnProps) => 'var(--btn-' + props.ui + '-color-hover)'};
    background-color: ${(props: StlBtnProps) => 'var(--btn-' + props.ui + '-bg-hover)'};
    border-color: ${(props: StlBtnProps) => 'var(--btn-' + props.ui + '-border-color-hover)'};
  }
`;

interface BtnProps {
    btnType?: BtnType;
    ui?: BtnUi;
    disabled?: boolean;
    href?: string | UrlObject;
    onClick?: () => {},
}
const Btn: React.FC<PropsWithChildren<BtnProps>> = (
{
    btnType= 'button',
    ui = 'main',
    children,
    disabled,
    href,
    onClick,
}) => {

    const tag: 'a' | 'button' = btnType === 'a' ? 'a' : 'button';
    const typeAttr: any = btnType === 'a' ? null : btnType;

    return (
        <StlBtn as={tag}
                type={typeAttr}
                ui={ui}
                onClick={onClick}
                disabled={disabled}
                href={href}>
            {children}
        </StlBtn>
    );
};

export default Btn;
