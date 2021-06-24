import { useRouter } from 'next/router'
import { useState } from 'react';
import { Layout } from '../../components/Layout';
import { TiendaContainer } from '../../components/Tienda/TiendaContainer';

const Tienda = () => {
  const router = useRouter()
  
  const { tid } = router.query;
  
  return(
    <Layout>
        <TiendaContainer tiendaId = {tid} />
    </Layout>
  )
}


export default Tienda