import { useRouter } from 'next/router'
import { EditarProducto  } from '../../components/EditarProducto';
import { Layout } from '../../components/Layout';

const EditarP = () => {
  const router = useRouter()
  const { pid } = router.query

  return(
    <Layout>
        <EditarProducto productoId = {pid} />
    </Layout>
  )
}

export default EditarP