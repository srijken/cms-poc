import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllContent, ContentData } from '../../lib/content';

interface PostsProps {
  posts: ContentData[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <Layout title="Posts" description="Latest posts from the CMS POC">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Posts</h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts available yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:text-blue-800">
                    {post.title}
                  </Link>
                </h2>
                
                {post.date && (
                  <time className="text-sm text-gray-500 mb-3 block">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
                
                {post.description && (
                  <p className="text-gray-600 mb-4">{post.description}</p>
                )}
                
                <Link 
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllContent('posts');
  
  return {
    props: {
      posts,
    },
  };
};