import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId="OUR_GOOGLE_CLIENT_ID">
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}

export default App