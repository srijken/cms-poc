import { TinaCMS, TinaProvider } from 'tinacms';
import { client } from '../tina/__generated__/client';

// The TinaCMS configuration object
const cms = new TinaCMS({
  enabled: process.env.NODE_ENV !== 'production',
  client,
});

export function TinaDynamicProvider({ children }: { children: React.ReactNode }) {
  return (
    <TinaProvider cms={cms}>
      {children}
    </TinaProvider>
  );
}

export default TinaDynamicProvider;