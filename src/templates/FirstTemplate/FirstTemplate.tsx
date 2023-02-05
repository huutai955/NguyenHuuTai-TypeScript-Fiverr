import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import HeaderSecond from '../../components/Header/HeaderSecond'

type Props = {}

export default function FirstTemplate({}: Props) {
  const param = useParams();

  return (
    <>
      {param.result ? <HeaderSecond /> : <Header />}
      <Outlet />
      <Footer />
      
    </>
  )
}