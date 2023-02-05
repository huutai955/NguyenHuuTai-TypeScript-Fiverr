import Rating from '@mui/material/Rating'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getJobDetailAPI, JobByDetail, JobByName } from '../../redux/reducers/jobReducer'
import { AppDispatch, RootState } from '../../redux/store'

export default function Product() {
    const [arrProduct, setArrProduct] = useState<JobByName[] | JobByDetail[]>([])
    const { arrJobByName, arrJobByDetail } = useSelector((state: RootState) => state.jobReducer)
    const dispatch:AppDispatch = useDispatch()

    useEffect(() => {
            setArrProduct(arrJobByName);
    }, [arrJobByName])

    useEffect(() => {
        if (arrJobByDetail.length >= 1) {
            setArrProduct(arrJobByDetail)
        }
    }, [arrJobByDetail])


    return (
        <>
            {arrProduct.length >= 1 ? arrProduct.map((job) => {
                return <NavLink to={`/jobdetail/${job.id}`} className="col-4" key={job.id} onClick={() => {
                    const action = getJobDetailAPI(job.id)
                    dispatch(action)
                }}>
                    <div className="item">
                        <div className="img text-center" style={{ padding: '30px 0', height: 300, display: 'flex' }}>
                            <img src={job.congViec.hinhAnh} alt="" />
                        </div>
                        <div className="content">
                            <div className="user" >
                                <div className="row d-flex">
                                    <div className="col-2 d-flex">
                                        <img src={job.avatar} style={{ height: '51.83px', borderRadius: '50%' }} className="w-100" alt="" />
                                    </div>
                                    <div className="col-10">
                                        <h5 className='m-0'>{job.tenNguoiTao}</h5>
                                        <p>{job.congViec.tenCongViec}</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ height: '150px' }} className="description p-3">
                                <p>{job.congViec.moTaNgan}</p>
                            </div>
                            <div className="rating d-flex" style={{ justifyContent: 'space-between' }}>
                                <Rating name="read-only" value={job.congViec.saoCongViec} readOnly />
                                <span>({job.congViec.danhGia})</span>
                            </div>
                        </div>
                    </div>
                </NavLink>
            }) : <h2>Sorry, The Job that you are finding.It's doesn't have!!</h2>}
        </>
    )
}
