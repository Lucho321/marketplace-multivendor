import { Layout } from '../components/Layout';
import { ProductosComprador  } from '../components/Productos/ProductosComprador';
import { ProductosTienda } from '../components/Productos/ProductosTienda';

export default function Productos() {
  return (
    <Layout>
        <ProductosComprador />
    </Layout>
  )
}