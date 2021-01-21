import { NextPage } from 'next';
import Layout from 'components/Layout';
import Container from 'components/Container';
import MessageList from 'components/MessageList';

const Page: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="grid gap-3">
          <h1 className="h1">Stack</h1>
          <MessageList />
        </div>
      </Container>
    </Layout>
  );
};

export default Page;
