import { NextPage } from 'next';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Logo from 'components/Logo';

const Page: NextPage = () => {
  return (
    <Layout>
      <Container>
        <div className="mt-6 space-y-6 text-center">
          <Logo className="inline-block h-24" />
          <h1 className="h1">Subsmarine</h1>
          <p className="text-lg">
            Subsmarine surfaces your email newsletters for easy reading.
          </p>
          <h2 className="h2">Terms of Service</h2>
          <p>
            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
            KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
          <h2 className="h2">Privacy Policy</h2>
          <p>
            This site uses JSON Web Tokens and an in-memory database which
            resets every ~2 hours.
          </p>
          <p>
            Data provided to this site is exclusively used to support reading
            your own email.
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default Page;
