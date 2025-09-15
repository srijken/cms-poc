import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getContentBySlug, getAllSlugs, ContentData } from '../../lib/content';

interface PostProps {
  post: ContentData;
}

export default function Post({ post }: PostProps) {
  return (
    <Layout title={post.title} description={post.description}>
      <article className="max-w-4xl">
        <div className="mb-8">
          <Link href="/posts" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Posts
          </Link>
        </div>
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          {post.date && (
            <time className="text-sm text-gray-500 block mb-2">
              Published {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}
          
          {post.description && (
            <p className="text-lg text-gray-600">{post.description}</p>
          )}
        </header>
        
        <div className="prose prose-lg max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(post.content) }}
          />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllSlugs('posts');
  
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getContentBySlug('posts', slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      post,
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