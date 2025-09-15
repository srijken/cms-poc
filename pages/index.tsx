import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import TinaContent from '../components/TinaContent';
import { getContentBySlug, ContentData } from '../lib/content';

interface HomeProps {
  page: ContentData;
}

export default function Home({ page }: HomeProps) {
  return (
    <Layout title={page.title} description={page.description}>
      <TinaContent content={page.content} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const page = getContentBySlug('pages', 'home');
  
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