import { useState, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import { CommunityContext } from "../lib/CommunityContext";
import Router from 'next/router';
import { magic } from '../lib/magic';
import Layout from '../components/layout';
import { ThemeProvider } from '@magiclabs/ui';
import '@magiclabs/ui/dist/cjs/index.css';
import { createTheme, NextUIProvider } from '@nextui-org/react'
import "./styles.css";

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      primary: '#4ADE7B',
      secondary: '#F9CB80',
      error: '#FCC5D8',
    },
  }
})

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const [community, setCommunity] = useState();

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, redirect to /login and set UserContext to { user: null }
  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then((userData) => setUser(userData));
      } else {
        Router.push('/login');
        setUser({ user: null });
      }
    });
  }, []);

  return (
    <NextUIProvider theme={theme}>
      <ThemeProvider root>
        <UserContext.Provider value={[user, setUser]}>
          <CommunityContext.Provider value={[community, setCommunity]}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CommunityContext.Provider >
        </UserContext.Provider>
      </ThemeProvider>
    </NextUIProvider >
  );
}

export default MyApp;
