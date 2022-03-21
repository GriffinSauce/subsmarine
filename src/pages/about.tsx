import { NextPage } from 'next';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Logo from 'components/Logo';

const Page: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="mt-6 space-y-6">
          <div className="flex items-center space-x-3">
            <Logo className="inline-block h-12" />
            <h1 className="h1">Subsmarine</h1>
          </div>
          <p className="text-lg">
            Subsmarine surfaces your email newsletters for easy reading.
          </p>
          <section>
            <h2 className="h2">Terms of Service</h2>
            <p>
              The software is provided &quot;as is&quot;, without warranty of
              any kind, express or implied, including but not limited to the
              warranties of merchantability, fitness for a particular purpose
              and noninfringement. In no event shall the authors or copyright
              holders be liable for any claim, damages or other liability,
              whether in an action of contract, tort or otherwise, arising from,
              out of or in connection with the software or the use or other
              dealings in the software.
            </p>
          </section>
          <section>
            <h2 className="h2">Privacy Policy</h2>
            <p>
              Data provided to this site is exclusively used to support reading
              emails subscribed to in the app.
            </p>
          </section>
        </div>
      </Container>
    </Layout>
  );
};

export default Page;
