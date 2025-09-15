import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title = 'CMS POC', description = 'Headless CMS with Next.js and TinaCMS' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        
        {/* Content Security Policy - stricter for production */}
        <meta httpEquiv="Content-Security-Policy" content={
          process.env.NODE_ENV === 'production' 
            ? "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
            : "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;"
        } />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <nav className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold text-gray-900">
                CMS POC
              </Link>
              <div className="flex space-x-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
                <Link href="/posts" className="text-gray-600 hover:text-gray-900">
                  Posts
                </Link>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        
        <footer className="bg-white border-t mt-12">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
            <p>Built with Next.js and TinaCMS • Deployed on GitHub Pages</p>
          </div>
        </footer>
      </div>
      
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        
        a:hover {
          text-decoration: underline;
        }
        
        h1, h2, h3, h4, h5, h6 {
          color: #1a202c;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        
        h1 {
          font-size: 2.25rem;
          font-weight: 700;
        }
        
        h2 {
          font-size: 1.875rem;
          font-weight: 600;
        }
        
        h3 {
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        p {
          margin-bottom: 1rem;
          color: #4a5568;
        }
        
        code {
          background-color: #f7fafc;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.875em;
        }
        
        pre {
          background-color: #f7fafc;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        pre code {
          background-color: transparent;
          padding: 0;
        }
        
        strong {
          font-weight: 600;
          color: #2d3748;
        }
        
        ul, ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        li {
          margin-bottom: 0.25rem;
          color: #4a5568;
        }
      `}</style>
    </>
  );
}