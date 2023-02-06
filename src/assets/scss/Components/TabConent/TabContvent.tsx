import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LoopIcon from '@mui/icons-material/Loop';
import CheckIcon from '@mui/icons-material/Check';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { setModalConfirm } from '../../../../redux/reducers/jobReducer';
import { NavLink } from 'react-router-dom';


type Props = {}

export default function TabContvent({ }: Props) {
    const { jobDetail } = useSelector((state: RootState) => state.jobReducer)
    const dispatch: AppDispatch = useDispatch()
    const [valueTab, setValueTab] = React.useState("1");
    const { messageLogin, userInfor } = useSelector((state: RootState) => state.userReducer)


    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setValueTab(newValue);
    };
    return (
        <>
            {jobDetail.map((job, index) => {
                return <Box sx={{ width: '100%', typography: 'body1' }} key={index} className="boxdetail">
                    <TabContext value={valueTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                <Tab label="Basic" value="1" style={{ textTransform: 'none' }} />
                                <Tab label="Standard" value="2" style={{ textTransform: 'none' }} />
                                <Tab label="Prenium" value="3" style={{ textTransform: 'none' }} />
                            </TabList>
                        </Box>
                        <TabPanel className='tabcol' value="1">
                            <div className='d-flex' style={{ justifyContent: 'space-between', alignItems: "center", marginBottom: 25 }}>
                                <h2 style={{ fontSize: 18, color: '#404145', textTransform: 'uppercase' }}>BASIC</h2>
                                <span>US$30</span>
                            </div>
                            <p style={{ color: '#62646a', fontSize: 14, fontWeight: 600 }}>{job.congViec.moTaNgan}</p>
                            <div className='d-flex mb-3' >
                                <div className='d-flex me-3' style={{ alignItems: 'center' }}>
                                    <AccessTimeIcon />
                                    <h4 style={{ color: '#62646a', fontSize: 14, fontWeight: 600, margin: 0 }}>1 Day Delivery</h4>
                                </div>
                                <div className='d-flex' style={{ alignItems: 'center' }}>
                                    <LoopIcon />
                                    <h4 style={{ color: '#62646a', fontSize: 14, fontWeight: 600, margin: 0 }}>3 Revisions</h4>
                                </div>
                            </div>
                            <ul>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>Up to 500 words</span></li>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>Topic research</span></li>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>SEO keywords</span></li>
                                <li style={{ color: '#b5b6ba', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ marginRight: 7 }} /><span>SEO Keyword Research</span></li>
                                <li style={{ color: '#b5b6ba', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ marginRight: 7 }} /><span>References & citations</span></li>
                                <li style={{ color: '#b5b6ba', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ marginRight: 7 }} /><span>Data chart</span></li>
                            </ul>
                            {messageLogin ? <span style={{ display: 'flex', borderRadius: 10, cursor: 'pointer', textDecoration: 'none', justifyContent: 'center', padding: '12px 0', color: '#ffffff', marginTop: 18, backgroundColor: '#1dbf73' }} onClick={() => {
                                const action = setModalConfirm(true)
                                dispatch(action)
                            }}>Continue ({job.congViec.giaTien}$)</span> : <NavLink to={"/login"} style={{ display: 'flex', textDecoration: 'none', justifyContent: 'center', padding: '12px 0', color: '#ffffff', marginTop: 18, backgroundColor: '#1dbf73', borderRadius: 9 }}>Continue ({job.congViec.giaTien}$)</NavLink>}                                        </TabPanel>
                        <TabPanel className='tabcol' value="2">
                            <div className='d-flex' style={{ justifyContent: 'space-between', alignItems: "center", marginBottom: 25 }}>
                                <h2 style={{ fontSize: 18, color: '#404145', textTransform: 'uppercase' }}>BASIC</h2>
                                <span>US$30</span>
                            </div>
                            <p style={{ color: '#62646a', fontSize: 14, fontWeight: 600 }}>{job.congViec.moTaNgan}</p>
                            <div className='d-flex mb-3' >
                                <div className='d-flex me-3' style={{ alignItems: 'center' }}>
                                    <AccessTimeIcon />
                                    <h4 style={{ color: '#62646a', fontSize: 14, fontWeight: 600, margin: 0 }}>1 Day Delivery</h4>
                                </div>
                                <div className='d-flex' style={{ alignItems: 'center' }}>
                                    <LoopIcon />
                                    <h4 style={{ color: '#62646a', fontSize: 14, fontWeight: 600, margin: 0 }}>3 Revisions</h4>
                                </div>
                            </div>
                            <ul>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>Up to 500 words</span></li>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>Topic research</span></li>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>SEO keywords</span></li>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>SEO Keyword Research</span></li>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>References & citations</span></li>
                                <li style={{ color: '#b5b6ba', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ marginRight: 7 }} /><span>Data chart</span></li>
                            </ul>
                            {messageLogin ? <span style={{ display: 'flex', borderRadius: 10, cursor: 'pointer', textDecoration: 'none', justifyContent: 'center', padding: '12px 0', color: '#ffffff', marginTop: 18, backgroundColor: '#1dbf73' }} onClick={() => {
                                const action = setModalConfirm(true)
                                dispatch(action)
                            }}>Continue ({job.congViec.giaTien}$)</span> : <NavLink to={"/login"} style={{ display: 'flex', textDecoration: 'none', justifyContent: 'center', padding: '12px 0', color: '#ffffff', marginTop: 18, backgroundColor: '#1dbf73', borderRadius: 9 }}>Continue ({job.congViec.giaTien}$)</NavLink>}                                        </TabPanel>
                        <TabPanel className='tabcol' value="3">
                            <div className='d-flex' style={{ justifyContent: 'space-between', alignItems: "center", marginBottom: 25 }}>
                                <h2 style={{ fontSize: 18, color: '#404145', textTransform: 'uppercase' }}>BASIC</h2>
                                <span>US$30</span>
                            </div>
                            <p style={{ color: '#62646a', fontSize: 14, fontWeight: 600 }}>{job.congViec.moTaNgan}</p>
                            <div className='d-flex mb-3' >
                                <div className='d-flex me-3' style={{ alignItems: 'center' }}>
                                    <AccessTimeIcon />
                                    <h4 style={{ color: '#62646a', fontSize: 14, fontWeight: 600, margin: 0 }}>1 Day Delivery</h4>
                                </div>
                                <div className='d-flex' style={{ alignItems: 'center' }}>
                                    <LoopIcon />
                                    <h4 style={{ color: '#62646a', fontSize: 14, fontWeight: 600, margin: 0 }}>3 Revisions</h4>
                                </div>
                            </div>
                            <ul>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>Up to 500 words</span></li>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>Topic research</span></li>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>SEO keywords</span></li>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>SEO Keyword Research</span></li>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>References & citations</span></li>
                                <li style={{ color: '#62646a', fontWeight: 600, marginBottom: 5 }}><CheckIcon style={{ color: '#1dbf73', marginRight: 7 }} /><span>Data chart</span></li>
                            </ul>

                            {messageLogin ? <span style={{ display: 'flex', borderRadius: 10, cursor: 'pointer', textDecoration: 'none', justifyContent: 'center', padding: '12px 0', color: '#ffffff', marginTop: 18, backgroundColor: '#1dbf73' }} onClick={() => {
                                const action = setModalConfirm(true)
                                dispatch(action)
                            }}>Continue ({job.congViec.giaTien}$)</span> : <NavLink to={"/login"} style={{ display: 'flex', textDecoration: 'none', justifyContent: 'center', padding: '12px 0', color: '#ffffff', marginTop: 18, backgroundColor: '#1dbf73', borderRadius: 9 }}>Continue ({job.congViec.giaTien}$)</NavLink>}
                        </TabPanel>
                    </TabContext>
                </Box>
            })}
        </>
    )
}