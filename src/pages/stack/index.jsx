import Layout from 'components/Layout';
import Container from 'components/Container';
import Messages from 'components/MessageList';

const Page = () => {
  return (
    <Layout>
      <Container>
        <h1>Stack</h1>
        <Messages />
      </Container>
    </Layout>
  );
};

export default Page;
