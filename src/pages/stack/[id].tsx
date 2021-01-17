import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import Container from 'components/Container';
import MessageBody from 'components/MessageBody';
import { getSubject } from 'utils/message';

import { useQuery } from 'react-query';
import { fetchMessage } from 'api';

const PageContent = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isIdle, isLoading, isError, data } = useQuery(
    ['messages', id],
    () => fetchMessage({ id: `${id}` }),
    {
      enabled: !!id,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  if (isIdle || isLoading) return <div>loading...</div>;

  if (isError) return <div>failed to load</div>;

  const { message } = data;
  return (
    <>
      <h2>{getSubject(message)}</h2>
      <MessageBody message={message} />
    </>
  );
};

const Page: NextPage = () => {
  return (
    <Layout>
      <Container>
        <PageContent />
      </Container>
    </Layout>
  );
};

export default Page;
