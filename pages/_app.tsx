import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

// Global styles would go here
import '../styles/globals.css';

const TinaProvider = dynamic(() => import('../components/TinaDynamicProvider'), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TinaProvider>
      <Component {...pageProps} />
    </TinaProvider>
  );
}