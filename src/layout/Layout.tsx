import React, { PropsWithChildren } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styled from 'styled-components';

const StlLayout = styled.div`
   display: flex;
   width: 100%;
   min-height: 100vh;
   flex-direction: column;
`;

const StlMain = styled.main`
  flex-grow: 1;
`;

interface LayoutPros {
    loginClicked: () => {},
    logoutClicked: () => {},
}

const Layout: React.FC<PropsWithChildren<LayoutPros>> = ({children, loginClicked, logoutClicked}) => {

    return (
        <StlLayout>
            <Header onLoginClicked={loginClicked} onLogoutClicked={logoutClicked} />
            <StlMain role="main">
                {children}
            </StlMain>
            <Footer />
        </StlLayout>
    );
};

export default Layout;
