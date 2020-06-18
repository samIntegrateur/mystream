import React, { PropsWithChildren, useContext } from 'react';
import Container from '../Container/Container';
import styled from 'styled-components';
import { AuthContext } from '../../shared/AuthContext';
import Btn from '../../ui/Btn/Btn';

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

interface HeaderProps {
    onLoginClicked: () => {},
    onLogoutClicked: () => {},
}
const Header: React.FC<PropsWithChildren<HeaderProps>> = ({onLoginClicked, onLogoutClicked}) => {

    const userContext = useContext(AuthContext);

    console.log('userContext', userContext);

    let btn = (
        <Btn btnType="button" onClick={onLoginClicked}>
            Login
        </Btn>
    );

    if (userContext.user) {
        btn = (
            <Btn btnType="button" onClick={onLogoutClicked}>
                Logout
            </Btn>
        );
    }

    return (
        <StlHeader>
            <Container small>
                <StlHeaderContent>
                    <StlTitle>MyStream</StlTitle>
                    <StlNav>
                        {btn}
                    </StlNav>
                </StlHeaderContent>
            </Container>
        </StlHeader>
    );
};

export default Header;

