import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from 'components/Layout';
import Container from 'components/Container';
import MessageBody from 'components/MessageBody';
import { getSubject } from 'utils/message';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PageContent = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/email/messages/${id}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { message } = data;
  return (
    <>
      <h2>{getSubject(message)}</h2>
      <MessageBody message={message} />
    </>
  );
};

const Page = () => {
  return (
    <Layout>
      <Container>
        <PageContent />
      </Container>
    </Layout>
  );
};

export default Page;
