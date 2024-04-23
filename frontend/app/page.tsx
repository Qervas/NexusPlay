// app/page.tsx: homepage
import Head from 'next/head';
import Layout from './layout';
import Link from 'next/link'; // Import Link component from Next.js
// import './styles/cyberpunk.css';

const HomePage = () => {
  return (
    <Layout>
	<Head>
		<title>Welcome to NexusPlay</title>
		<meta name="description" content="Explore the Next.js application NexusPlay" />
		<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />

	</Head>
	<h1>Welcome to NexusPlay</h1>
	<p>This is the beginning of your Next.js application.</p>
	{/* Add Link component with a button */}
	<Link href="/login" passHref>
		<button>Login</button>
	</Link>
</Layout>
  );
};

export default HomePage;
