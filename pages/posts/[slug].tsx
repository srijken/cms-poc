import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import TinaContent from '../../components/TinaContent';
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
        
        <TinaContent content={post.content} />
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