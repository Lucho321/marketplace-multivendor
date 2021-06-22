import Image from 'next/image';
import { Layout } from '../components/Layout';
import { HomeComponent } from '../components/HomeComponent';
import { Ejemplo } from '../components/ejemplo';

export default function Home() {
  return (
    <Layout>
      <HomeComponent />
    </Layout>
  )
}

