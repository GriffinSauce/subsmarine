import Link from "next/link";
import { signIn, useSession } from "next-auth/client";
import Layout from "../components/Layout";

const GOOGLE_PROVIDER_ID = "google";

export default function Page() {
  const [session, loading] = useSession();

  return (
    <Layout>
      <h1>Letterbox</h1>
      <p>Letterbox is an app that lets you read your newsletters in peace.</p>

      <div style={{ opacity: loading ? 0 : 1 }}>
        {session ? (
          <p>
            Go read{" "}
            <Link href="/stack">
              <button>Your stack</button>
            </Link>
          </p>
        ) : (
          <>
            <p>
              Sign in with your Google Account to get started.
              <a
                href={`/api/auth/signin/Google`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn(GOOGLE_PROVIDER_ID);
                }}
              ></a>
            </p>
            <p>
              <button>Sign in</button>
            </p>
          </>
        )}
      </div>
    </Layout>
  );
}
