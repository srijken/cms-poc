import type { AppProps } from 'next/app';

// Global styles would go here
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}