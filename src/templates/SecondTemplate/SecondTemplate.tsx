import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import HeaderSecond from '../../components/Header/HeaderSecond'

type Props = {}

export default function SecondTemplate({ }: Props) {
    return (
        <>
            <HeaderSecond />
            <Outlet />
            <Footer />
        </>
    )
}