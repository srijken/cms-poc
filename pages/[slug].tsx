import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../components/Layout';
import { getContentBySlug, getAllSlugs, ContentData } from '../lib/content';

interface PageProps {
  page: ContentData;
}

export default function Page({ page }: PageProps) {
  return (
    <Layout title={page.title} description={page.description}>
      <div className="prose prose-lg max-w-none">
        <div 
          dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(page.content) }}
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSlugs('pages');
  
  // Filter out 'home' since it's handled by index.tsx
  const paths = slugs
    .filter(slug => slug !== 'home')
    .map((slug) => ({
      params: { slug },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const page = getContentBySlug('pages', slug);
  
  if (!page) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      page,
    },
  };
};

// Simple markdown to HTML converter for basic formatting
function convertMarkdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // Code blocks
    .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|p|l])(.+)$/gm, '<p>$1</p>')
    // Clean up
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[1-6]>)/g, '$1')
    .replace(/(<\/h[1-6]>)<\/p>/g, '$1');
}