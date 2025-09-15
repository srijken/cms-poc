import { GetStaticProps, GetStaticPaths } from 'next';
import { useTina } from 'tinacms/dist/react';
import Layout from '../components/Layout';
import TinaContent from '../components/TinaContent';
import { getContentBySlug, getAllSlugs, ContentData } from '../lib/content';
import { client } from '../tina/__generated__/client';

interface PageProps {
  data: any;
  query: string;
  variables: any;
}

export default function Page(props: PageProps) {
  const { data } = useTina(props);
  const page = data.page;
  
  return (
    <Layout title={page.title} description={page.description}>
      <TinaContent content={page.body} />
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
  
  const query = `
    query PageQuery($relativePath: String!) {
      page(relativePath: $relativePath) {
        title
        description
        body
      }
    }
  `;
  
  const variables = {
    relativePath: `${slug}.md`
  };
  
  try {
    const res = await client.queries.page(variables);
    return {
      props: {
        data: res.data,
        query: res.query,
        variables: res.variables,
      },
    };
  } catch (error) {
    console.error(`Error loading page ${slug}:`, error);
    return {
      notFound: true,
    };
  }
};