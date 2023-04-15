import Head from 'next/head';

const Layout = (props) => (
  <>
    <Head>
      <title>POMPBoarding</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <main>
      <div className='container'>{props.children}</div>
    </main>
    <style jsx global>{`
      * {
        font-family: sans-serif !important;
        outline: none;
      }
      .container {
        max-width: 42rem;
        margin: 0 auto;
        padding: 0 10px;
      }
    `}</style>
  </>
);

export default Layout;
