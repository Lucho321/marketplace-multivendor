import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { Layout } from '../components/Layout';
import { HomeComponent } from '../components/HomeComponent';
import { Ejemplo } from '../components/ejemplo';
import { ProductosTienda } from '../components/Productos/ProductosTienda';

export default function Home() {
  

  return (
    <Layout>
      <HomeComponent />
    </Layout>
  )
}

