import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LandingPage from './pages/LandingPage';
export function App() {
  return <HelmetProvider>
      <Helmet>
        {/* Base SEO tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <LandingPage />
    </HelmetProvider>;
}