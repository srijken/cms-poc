import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../components/Layout';
import TinaContent from '../components/TinaContent';
import { getContentBySlug, getAllSlugs, ContentData } from '../lib/content';

interface PageProps {
  page: ContentData;
}

export default function Page({ page }: PageProps) {
  return (
    <Layout title={page.title} description={page.description}>
      <TinaContent content={page.content} />
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