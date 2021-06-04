import Image from 'next/image';
import { Layout } from '../components/Layout';
import { HomeComponent } from '../components/HomeComponent';

export default function Home() {
  return (
    <Layout>
      <HomeComponent />
    </Layout>
  )
}
