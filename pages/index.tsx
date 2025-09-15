import { GetStaticProps } from 'next';
import { useTina } from 'tinacms/dist/react';
import Layout from '../components/Layout';
import TinaContent from '../components/TinaContent';
import { client } from '../tina/__generated__/client';

interface HomeProps {
  data: any;
  query: string;
  variables: any;
}

export default function Home(props: HomeProps) {
  const { data } = useTina(props);
  const page = data.page;
  
  return (
    <Layout title={page.title} description={page.description}>
      <TinaContent content={page.body} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const query = `
    query HomeQuery($relativePath: String!) {
      page(relativePath: $relativePath) {
        title
        description
        body
      }
    }
  `;
  
  const variables = {
    relativePath: 'home.md'
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
    console.error('Error loading home page:', error);
    // Fallback to simple home page
    return {
      props: {
        data: {
          page: {
            title: 'CMS POC',
            description: 'A minimal headless CMS powered by Next.js and TinaCMS',
            body: null
          }
        },
        query,
        variables,
      },
    };
  }
};