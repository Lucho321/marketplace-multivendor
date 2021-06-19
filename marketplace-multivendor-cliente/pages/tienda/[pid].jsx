import { useRouter } from 'next/router'
import { Layout } from '../../components/Layout';
import { TiendaContainer } from '../../components/Tienda/TiendaContainer';

const Producto = () => {
  const router = useRouter()
  const { pid } = router.query

  return(
    <Layout>
        <TiendaContainer tiendaId = {pid} />
    </Layout>
  )
}

export default Producto