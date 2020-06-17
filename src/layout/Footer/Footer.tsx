import React from 'react';
import Container from '../Container/Container';
import styled from 'styled-components';

const Footer: React.FC = () => {

    const StlFooter = styled.footer`
        background: var(--header-bg);
        color: var(--header-color);
    `;

    return (
        <StlFooter>
            <Container small>
                © MyStream 2020
            </Container>
        </StlFooter>
    );
};

export default Footer;

