import React from 'react';
import styled from 'styled-components';
import breakpoints from '../../breakpoints';

interface ContainerProps {
  small?: boolean;
  full?: boolean;
}

// This may not be the best way but currently I don't know how to use a complex process like this
// outside of a functional component (inside is bad for performance, but seems ok with class)
class Container extends React.Component<ContainerProps> {

  // todo: remove it from component for per, but how use props ?
  responsiveDef = Object.keys(breakpoints).map(breakpoint => {
    const currentBp = breakpoints[breakpoint];
    if (currentBp.min) {
      return `
       @media (min-width: ${currentBp.min}) {
          width: ${this.props.full ? '100%' : currentBp.container};
          padding: ${this.props.small ? currentBp.paddingYsm : currentBp.paddingY} ${currentBp.paddingX};
       }
    `;
    } else {
      return `
        width: ${this.props.full ? '100%' : breakpoints[breakpoint].container};
        padding: ${this.props.small ? currentBp.paddingYsm : currentBp.paddingY} ${currentBp.paddingX};
    `;
    }
  }).join('\n');

  StlContainer = styled.div`
    margin: auto;
    ${this.responsiveDef}
  `;

  render() {
    return (
        <this.StlContainer className="container">
          {this.props.children}
        </this.StlContainer>
    );
  }
};

export default Container;
