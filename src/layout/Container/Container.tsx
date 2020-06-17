import React from 'react';
import styled from 'styled-components';
import breakpoints from '../../breakpoints';

interface ContainerProps {
  small?: boolean;
}
const Container: React.FC<ContainerProps> = ({ small, children }) => {

  const responsiveDef = Object.keys(breakpoints).map(breakpoint => {
    const currentBp = breakpoints[breakpoint];
    if (currentBp.min) {
      return `
       @media (min-width: ${currentBp.min}) {
          width: ${currentBp.container};
          padding: ${small ? currentBp.paddingYsm : currentBp.paddingY} ${currentBp.paddingX};
       }
    `;
    } else {
      return `
        width: ${breakpoints[breakpoint].container};
        padding: ${small ? currentBp.paddingYsm : currentBp.paddingY} ${currentBp.paddingX};
    `;
    }
  }).join('\n');

  const StlContainer = styled.div`
    margin: auto;
    ${responsiveDef}
  `;

  return (
    <StlContainer className="container">
      {children}
    </StlContainer>
  );
};

export default Container;
