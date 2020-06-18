import React from 'react';
import Container from '../Container/Container';
import styled from 'styled-components';

const StlFooter = styled.footer`
    background: var(--header-bg);
    color: var(--header-color);
`;

const Footer: React.FC = () => {

    return (
        <StlFooter>
            <Container small>
                © MyStream 2020
            </Container>
        </StlFooter>
    );
};

export default Footer;

