import { useRouter } from 'next/router'
import { ProductoContainer } from '../../components/Producto/ProductoContainer';
import { Layout } from '../../components/Layout';

const Producto = () => {
  const router = useRouter()
  const { pid } = router.query

  return(
    <Layout>
        <ProductoContainer productoId={pid} />
    </Layout>
  )
}

export default Producto