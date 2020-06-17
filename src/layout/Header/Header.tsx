import React from 'react';
import Container from '../Container/Container';
import styled from 'styled-components';

const StlHeader = styled.header`
    background: var(--header-bg);
    color: var(--header-color);
    display: flex;
`;

const StlHeaderContent = styled.div`
    display: flex;
    align-items:center;
`;

const StlTitle = styled.strong`
  font-size: 2rem;
`;

const StlNav = styled.nav`
  flex-grow: 1;
  text-align:right;
`;

const Header: React.FC = () => {

    return (
        <StlHeader>
            <Container small>
                <StlHeaderContent>
                    <StlTitle>MyStream</StlTitle>
                    <StlNav>
                        Nav should be there
                    </StlNav>
                </StlHeaderContent>
            </Container>
        </StlHeader>
    );
};

export default Header;

