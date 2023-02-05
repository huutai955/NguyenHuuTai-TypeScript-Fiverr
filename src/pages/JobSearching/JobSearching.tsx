import { Pagination, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Product from '../../components/Product/Product';
import { getArrJobByNameAPI, getArrJobByNameWithPaginationAPI } from '../../redux/reducers/jobReducer';
import { AppDispatch, RootState } from '../../redux/store';

type Props = {}

export default function JobSearching({ }: Props) {
  const { totalRow } = useSelector((state: RootState) => state.jobReducer)
  const param = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<number>(Math.floor(totalRow/9))


  



  useEffect(() => {
    if (param.result !== 'searchwithnamelist') {
      const action = getArrJobByNameAPI(param.result);
    dispatch(action);
    }
  }, [param.result])


  return (
    <div style={{ minHeight: 500 }} className="jobsearching">
      <div className="container">
        <h2 className='pb-5'>Result for {param.result}</h2>
        <div className="row">
          <Product />
        </div>
      </div>
    </div>
  )
}