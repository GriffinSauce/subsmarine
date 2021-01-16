import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";
import Message from "../../components/Message";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const PageContent = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/email/messages/${id}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { message } = data;
  return <Message message={message} />;
};

export default function Page() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  );
}
