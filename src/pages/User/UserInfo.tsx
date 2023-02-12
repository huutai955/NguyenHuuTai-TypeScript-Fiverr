import { Avatar, Rating } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { Scrollbars } from 'react-custom-scrollbars';
import { getArrJobWasRented } from '../../redux/reducers/jobReducer';
import { getUserInforAPI, updateUserAction, updateUserAPI, UserInfor } from '../../redux/reducers/userReducer';
import * as _ from "lodash"
import { useParams } from 'react-router-dom';
import { Popconfirm } from 'antd';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



type Props = {}

export default function UserInfo({ }: Props) {
  const { userInfor } = useSelector((state: RootState) => state.userReducer);
  const [showSkillForm, setShowSkillForm] = useState<boolean>(false)
  const [arrSkill, setarrSkill] = useState(userInfor?.skill)
  const [skill, setSkill] = useState<string>("")
  const [arrCertification, setarrCertification] = useState(userInfor?.certification)
  const [certification, setCertification] = useState<string>("")
  const [showCertificationForm, setShowCertificationForm] = useState<boolean>(false)
  const { arrJobWasRented } = useSelector((state: RootState) => state.jobReducer);
  const dispatch: AppDispatch = useDispatch()
  const params = useParams();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  const handleAddSkills = () => {
    const cloneArrSkill: any = _.cloneDeep(arrSkill)
    cloneArrSkill.push(skill);
    setarrSkill(cloneArrSkill)
    setSkill("")
  }


  const handleAddCertification = () => {
    const cloneArrCertification: any = _.cloneDeep(arrCertification)
    cloneArrCertification.push(certification);
    setarrCertification(cloneArrCertification)
    setCertification("")
  }

  const handleChangeSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSkill(value);
  }

  const handleChangeCertification = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCertification(value);
  }

  useEffect(() => {
    const value = {
      ...userInfor,
      skill: arrSkill
    }

    if (arrSkill.length !== userInfor.skill.length) {
      const action = updateUserAPI(value, params.result);
      dispatch(action);
    }
  }, [arrSkill])


  useEffect(() => {
    const value = {
      ...userInfor,
      certification: arrCertification
    }
    if (arrCertification.length !== userInfor.certification.length) {
      const action = updateUserAPI(value, params.result);
    dispatch(action)
    }
  }, [arrCertification])



  useEffect(() => {
    const action = getArrJobWasRented();
    dispatch(action)
    const actionUser = getUserInforAPI(params.result)
    dispatch(actionUser)
  }, [])
  return (
    <div className='userinfor' style={{ padding: '50px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="top">
              <div className='d-flex mb-4' style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ width: 100, height: 100 }}>H</Avatar>
                <h2 className='mt-3'>Tài</h2>
              </div>
              <div className="row p-4">
                <div className="col-12 d-flex mb-2" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <LocationOnIcon />
                    <h2 className='m-0'>From</h2>
                  </div>
                  <p className='m-0'>Vietnam</p>
                </div>
                <div className="col-12 d-flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <PersonIcon />
                    <h2 className='m-0'>Member since</h2>
                  </div>
                  <p className='m-0'>17/01/2017</p>
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="skills">
                <div className='d-flex mb-2' style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 className='m-0'>Skills</h2>
                  <span onClick={() => {
                    setShowSkillForm(true)
                  }} style={{cursor: 'pointer'}}>Add New</span>
                </div>
                {userInfor?.skill ? <div className='d-flex' style={{ flexDirection: 'column' }}>
                  {userInfor?.skill.map((item, index) => {
                    return <p className='m-0 mb-2 d-flex' style={{ justifyContent: 'space-between' }} key={index}>{item} <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => {
                        let cloneArrSkill = _.cloneDeep(arrSkill);
                        cloneArrSkill = cloneArrSkill.filter((itemDeleted) => {
                          return itemDeleted !== item
                        })
                        setarrSkill(cloneArrSkill);
                        toast('Delete skill sucessfully!', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          });
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <i style={{ cursor: 'pointer' }}> <DeleteIcon /></i>
                    </Popconfirm></p>
                  })}
                </div> : <p>Add your skills</p>}
                {showSkillForm ? <form onClick={handleSubmit}>
                  <div className="form-group">
                    <input type="text" className='form-control' value={skill} placeholder='Enter your skill' onChange={handleChangeSkill} />
                  </div>
                  <div className="form-group d-flex">
                    <button className='btncancel' style={{ width: '50%' }} onClick={() => {
                      setShowSkillForm(false)
                    }}>Cancel</button>
                    <button className='btnadd' style={{ width: '50%' }} onClick={() => {
                      handleAddSkills()
                    }}>Add</button>
                  </div>
                </form> : <></>}
              </div>

              <div className="certification">
                <div className='d-flex mb-2' style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 className='m-0'>Certification</h2>
                  <span onClick={() => {
                    setShowCertificationForm(true)
                  }} style={{cursor: 'pointer'}}>Add New</span>
                </div>
                {userInfor?.certification ? <div className='d-flex' style={{ flexDirection: 'column' }}>
                  {userInfor?.certification.map((item, index) => {
                    return <p className='m-0 mb-2 d-flex' style={{ justifyContent: 'space-between' }} key={index}>{item}  <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => {
                        let cloneArrCertification = _.cloneDeep(arrCertification);
                        cloneArrCertification = cloneArrCertification.filter((itemDeleted) => {
                          return itemDeleted !== item
                        })
                        setarrCertification(cloneArrCertification);
                        toast('Delete certification sucessfully!', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          });
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <i style={{ cursor: 'pointer' }}> <DeleteIcon /></i>
                    </Popconfirm></p>
                  })}
                </div> : <p>Add your certification</p>}

                {showCertificationForm ? <form onClick={handleSubmit}>
                  <div className="form-group">
                    <input type="text" className='form-control' value={certification} placeholder='Enter your certification' onChange={handleChangeCertification} />
                  </div>
                  <div className="form-group d-flex">
                    <button className='btncancel' style={{ width: '50%' }} onClick={() => {
                      setShowCertificationForm(false)
                    }}>Cancel</button>
                    <button className='btnadd' style={{ width: '50%' }} onClick={() => {
                      handleAddCertification()
                    }}>Add</button>
                  </div>
                </form> : <></>}
              </div>
            </div>
          </div>
          <div className="col-8">
            <h2>HISTORY BOOKING</h2>
            <Scrollbars className='scrollbar' style={{ width: '100%', height: 630 }}>
              {arrJobWasRented.map((item, index) => {
                return <div className=" p-4" key={index}>
                  <div className="row p-2">
                    <div className="col-4 p-0">
                      <img className='w-100' src={item.congViec.hinhAnh} alt="" />
                    </div>
                    <div className="col-8">
                      <h2>{item.congViec.tenCongViec}</h2>
                      <p>{item.congViec.moTa}</p>
                      <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                        <Rating name="read-only" value={item.congViec.saoCongViec} readOnly />
                        <p>{item.ngayThue}</p>
                      </div>
                    </div>
                  </div>
                </div>
              })}
            </Scrollbars>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}