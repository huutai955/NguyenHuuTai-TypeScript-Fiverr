import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setModalConfirm } from '../../redux/reducers/jobReducer';
import dayjs, { Dayjs } from 'dayjs';
import { formatDate } from '../../util/config';
import { rentTheJobAPI } from '../../redux/reducers/typeOfJobReducer';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



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
      <div className="container">
        <button className="button" onClick={scrollToElement}>Scroll down</button>
        <div style={{height: 3000}}>
          <p>asdsa</p>
        </div>
        <div className="content">
          <div ref={elementRef}>Element</div>
        </div>
      </div>


    </>
  )
}