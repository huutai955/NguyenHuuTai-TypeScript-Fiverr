import React, { useState, useEffect, useRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';




type Props = {}
const style = {
  position: 'absolute' as 'absolute',
  top: 200,
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function App({ }: Props) {
  const elementRef = useRef<HTMLDivElement>(null)



  const scrollToElement = () => {
    elementRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <>
        <img style={{width: '100%', height: 900, objectFit: 'cover'}} src='https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/2413b8415dda9dbd7756d02cb87cd4b1-1599595203021/bg-hero-2-1792-x2.png' alt="" />
    </>
  )
}