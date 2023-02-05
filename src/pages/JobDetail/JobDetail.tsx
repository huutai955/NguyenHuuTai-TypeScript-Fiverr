import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getJobDetailAPI, setModalConfirm } from '../../redux/reducers/jobReducer'
import { AppDispatch, RootState } from '../../redux/store'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Rating from '@mui/material/Rating'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Slider } from '@mui/material'
import { getArrCommentAPI, postComment } from '../../redux/reducers/commentReducer'
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
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { formatDate } from '../../util/config'




type Props = {}

export interface CommentForm {
    maCongViec: number;
    maNguoiBinhLuan: number | undefined;
    ngayBinhLuan: string;
    noiDung: string;
    saoBinhLuan: number | null;
}

export default function JobDetail({ }: Props) {
    const { jobDetail } = useSelector((state: RootState) => state.jobReducer)
    const { arrComment } = useSelector((state: RootState) => state.commentReducer)
    const { messageLogin, userInfor } = useSelector((state: RootState) => state.userReducer)
    const dispatch: AppDispatch = useDispatch()
    const param = useParams()
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [valueTab, setValueTab] = React.useState('1');
    const [maNguoiBinhLuan, setMaNguoiBinhLuan] = React.useState(0);
    const [valueStar, setValueStar] = React.useState<number | null>(0);
    const [commentForm, setCommentForm] = useState<CommentForm>({
        maCongViec: 0,
        maNguoiBinhLuan: 0,
        ngayBinhLuan: "",
        noiDung: "",
        saoBinhLuan: 0,
    })



    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setValueTab(newValue);
    };

    const handleChaneExpanded =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let { name, value } = e.target;
        setCommentForm({
            ...commentForm,
            noiDung: value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const action = postComment(commentForm, jobDetail[0].id);
        dispatch(action);
    }


    useEffect(() => {
        const action = getJobDetailAPI(param.result);
        dispatch(action);
    }, [])

    useEffect(() => {
        if (jobDetail.length >= 1) {
            let yourDate = new Date()
            yourDate.toISOString().split('T')[0]
            let formatDateResult = formatDate(yourDate)
            const action = getArrCommentAPI(jobDetail[0].id);
            dispatch(action);
            setCommentForm({
                ...commentForm,
                maCongViec: jobDetail[0].id,
                ngayBinhLuan: formatDateResult
            })
        }
    }, [jobDetail])

    useEffect(() => {
        if (userInfor !== undefined) {
            setMaNguoiBinhLuan(userInfor.id)
        }
    }, [userInfor])

    useEffect(() => {
        setCommentForm({
            ...commentForm,
            maNguoiBinhLuan: maNguoiBinhLuan
        })
    }, [maNguoiBinhLuan])


    useEffect(() => {
        setCommentForm({
            ...commentForm,
            saoBinhLuan: valueStar
        })
    }, [valueStar])



    return (
        <div className="jobdetail">
            {jobDetail.map((job, index) => {
                return <div className="container" key={index}>
                    <div className="jobdetail__list">
                        <NavLink to={""}>{job.tenLoaiCongViec}</NavLink>
                        <i><KeyboardArrowRightIcon /></i>
                        <NavLink to={""}>{job.tenNhomChiTietLoai}</NavLink>
                        <i><KeyboardArrowRightIcon /></i>
                        <NavLink to={""}>{job.tenChiTietLoai}</NavLink>
                    </div>
                    <div className="jobdetail_content">
                        <div className="row">
                            <div className="col-8">
                                <h2>{job.congViec.tenCongViec}</h2>
                                <div className="user">
                                    <div className="avatar">
                                        <img src={job.avatar} alt="" />
                                    </div>
                                    <span style={{ marginRight: 10 }}>{job.tenNguoiTao}</span>

                                    <div className="rating">
                                        <span style={{ fontWeight: 400, color: '#f2b525', borderRight: '1px solid #ccc', paddingRight: 10, marginRight: 15 }}>Top Rated Seller</span>
                                        <Rating style={{ fontSize: 23 }} name="read-only" value={job.congViec.saoCongViec} readOnly />
                                        <span style={{ fontWeight: 400, color: '#ccc', marginLeft: 5 }}>({job.congViec.danhGia})</span>
                                    </div>
                                    <p style={{ fontWeight: 400, borderLeft: '1px solid #ccc', paddingLeft: 10, marginLeft: 15 }}>{job.congViec.maChiTietLoaiCongViec} Orders in Queue</p>
                                </div>

                                <div className="jobdetail__img text-center">
                                    <img src={job.congViec.hinhAnh} alt="" />
                                </div>

                                <h2>About This Gig</h2>
                                <p>{job.congViec.moTaNgan}</p>
                                <p>{job.congViec.moTa}</p>
                                <p className='p-0 m-0'>Why you should Order from me?</p>
                                <ul style={{ margin: 0, padding: '8px 24px' }}>
                                    <li>Get best UI/UX layout for your websites.</li>
                                    <li>It's help you to find your dream design.</li>
                                    <li>Modern,Clean and professional look of your site.</li>
                                    <li>Flat,Material,Parallax,Metro UI/UX web layouts.</li>
                                </ul>
                                <p className='p-0 m-0'>Please Note:</p>
                                <ul style={{ margin: 0, padding: '8px 24px' }}>
                                    <li>Deliver design in PNG,PSD,JPEG format with high dpi.</li>
                                    <li>Deliver fully layered and sliced PSD files.</li>
                                    <li>Website layout from scratch with my unique creativity.</li>
                                    <li>High resolution with 100% colors accuracy.</li>
                                    <li>Extra fast delivery & 100% Customer satisfaction & friendly support  </li>
                                </ul>
                                <p style={{ padding: '12px 0' }} className="m-0">Looking forward to work with you!</p>
                                <div className="jobdetail__skill">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="skill__first">
                                                <h2>Programing Language</h2>
                                                <ul>
                                                    <li>PHP</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="skill__second">
                                                <h2>Expertlse</h2>
                                                <ul>
                                                    <li>Cross Browser</li>
                                                    <li>PSD to HTML, Performance</li>
                                                    <li>Adobe, XDAdobe Photoshop</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="abouttheseller">
                                    <h2>About The Seller</h2>
                                    <div className="abouttheseller__content">
                                        <div className="img">
                                            <img src={job.avatar} alt="" />
                                        </div>
                                        <div className="infor">
                                            <div className="top">
                                                <h4>{job.tenNguoiTao}</h4>
                                                <div className="status">
                                                    <span>Online</span>
                                                </div>
                                            </div>
                                            <div className="middle">
                                                <h5>Web Developer</h5>
                                            </div>
                                            <div className="bottom d-flex">
                                                <Rating name="read-only" value={job.congViec.saoCongViec} readOnly />
                                                <h5>({job.congViec.danhGia})</h5>
                                            </div>
                                            <button>Contact Me</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="inforseller">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className='m-0'>From</p>
                                            <span>Pakistan</span>
                                        </div>
                                        <div className="col-6">
                                            <p className='m-0'>Member since</p>
                                            <span>Jun 2016</span>
                                        </div>
                                        <div className="col-6">
                                            <p className='m-0'>Avg. response time</p>
                                            <span>1 hour</span>
                                        </div>
                                        <div className="col-6">
                                            <p className='m-0'>Last delivery</p>
                                            <span>about 46 minutes</span>
                                        </div>
                                    </div>
                                    <p className='mt-3'>Hi, I am a Professional UI/UX designer and Top notch Web developer having experience of 5+ year's from all over the world in the field of User Interface and User Experience Designing.</p>
                                    <p className='m-0'>If you want a professional Web solution for your business then contact me and enjoy the sweet fruit of my skills in your web/application/product.</p>
                                </div>

                                <div className="faq">
                                    <h2 className=' mb-3 mt-5'>FAQ</h2>
                                    <Accordion style={{ margin: 0 }} expanded={expanded === 'panel1'} onChange={handleChaneExpanded('panel1')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography>
                                                Do you provide regular updates on order?
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography style={{ fontWeight: 400 }}>
                                                Yes, I will provide you with all work according to your demand. Just let me know your requirements.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion style={{ margin: 0 }} expanded={expanded === 'panel2'} onChange={handleChaneExpanded('panel2')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            <Typography>How do you guarantee product quality ?</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography style={{ fontWeight: 400 }}>
                                                I will listen to your opinion and give you some advice to improve best quality product.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion style={{ margin: 0 }} expanded={expanded === 'panel3'} onChange={handleChaneExpanded('panel3')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel3bh-content"
                                            id="panel3bh-header"
                                        >
                                            <Typography >
                                                Do you give post-development support?
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography style={{ fontWeight: 400 }}>
                                                If you want to update the product i will support you to improve your product.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion style={{ margin: 0 }} expanded={expanded === 'panel4'} onChange={handleChaneExpanded('panel4')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel4bh-content"
                                            id="panel4bh-header"
                                        >
                                            <Typography>Do you convert PSD to HTML</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography style={{ fontWeight: 400 }}>
                                                Yes surely, that's my specialized.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>

                                <div className="reviews">
                                    <div className='d-flex' style={{ alignItems: 'center' }}>
                                        <h2 className='mt-5 me-3'>{job.congViec.danhGia} Reviews</h2>
                                        <Rating style={{ marginTop: 17 }} name="read-only" value={job.congViec.saoCongViec} readOnly />
                                    </div>
                                    <div className="reviews__stars d-flex">
                                        <div className="first">
                                            <div className="review__rating" style={{ cursor: 'pointer' }} onClick={() => {
                                                console.log("asdsa")
                                            }}>
                                                <h4>5 Stars</h4>
                                                <Slider
                                                    min={0}
                                                    max={5}
                                                    value={5}
                                                    name="read-only"
                                                    color="secondary"
                                                    disabled={true}
                                                    style={{ color: 'orange', height: 8 }}
                                                />
                                                <span>(5)</span>
                                            </div>
                                            <div className="review__rating" style={{ cursor: 'pointer' }} onClick={() => {
                                                console.log("asdsa")
                                            }}>
                                                <h4>5 Stars</h4>
                                                <Slider
                                                    min={0}
                                                    max={5}
                                                    value={5}
                                                    name="read-only"
                                                    color="secondary"
                                                    disabled
                                                    style={{ color: 'orange', height: 8 }}
                                                />
                                                <span>(5)</span>
                                            </div>

                                            <div className="review__rating" style={{ cursor: 'pointer' }} onClick={() => {
                                                console.log("asdsa")
                                            }}>
                                                <h4>5 Stars</h4>
                                                <Slider
                                                    min={0}
                                                    max={5}
                                                    value={5}
                                                    name="read-only"
                                                    color="secondary"
                                                    disabled
                                                    style={{ color: 'orange', height: 8 }}
                                                />
                                                <span>(5)</span>
                                            </div>

                                            <div className="review__rating" style={{ cursor: 'pointer' }} onClick={() => {
                                                console.log("asdsa")
                                            }}>
                                                <h4>5 Stars</h4>
                                                <Slider
                                                    min={0}
                                                    max={5}
                                                    value={5}
                                                    name="read-only"
                                                    color="secondary"
                                                    disabled
                                                    style={{ color: 'orange', height: 8 }}
                                                />
                                                <span>(5)</span>
                                            </div>

                                            <div className="review__rating" style={{ cursor: 'pointer' }} onClick={() => {
                                                console.log("asdsa")
                                            }}>
                                                <h4>5 Stars</h4>
                                                <Slider
                                                    min={0}
                                                    max={5}
                                                    value={5}
                                                    name="read-only"
                                                    color="secondary"
                                                    disabled
                                                    style={{ color: 'orange', height: 8 }}
                                                />
                                                <span>(5)</span>
                                            </div>
                                        </div>

                                        <div className="second">
                                            <h2>Rating Breakdown</h2>
                                            <ul>
                                                <li><span>Seller communication level</span></li>
                                                <li><span>Recommend to a friend</span></li>
                                                <li><span>Service as described</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="comment__container">
                                    <h2>Comment</h2>
                                    {arrComment.map((comment, index) => {
                                        return <div className="comment" key={index}>
                                            <div className="comment__avatar d-flex">
                                                <Avatar alt="Remy Sharp" style={{ marginRight: 20 }} src={comment.avatar} />
                                                <div className="comment__inforuser">
                                                    <h5 style={{ fontSize: 16 }}>{comment.tenNguoiBinhLuan}</h5>
                                                    <div className='d-flex' style={{ alignItems: 'center' }}>
                                                        <Rating name="read-only" value={comment.saoBinhLuan} readOnly />
                                                        <span style={{ borderLeft: '1px solid #ccc', marginLeft: 10, paddingLeft: 10 }}>{comment.ngayBinhLuan}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="comment__content">
                                                <p>{comment.noiDung}</p>
                                            </div>
                                        </div>
                                    })}

                                    <div className='row'>
                                        <div className="col-1 d-flex" style={{ justifyContent: 'center' }}>
                                            <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
                                        </div>
                                        <div className="col-11">
                                            <Rating
                                                name="simple-controlled"
                                                value={valueStar}
                                                onChange={(event, newValue) => {
                                                    setValueStar(newValue);

                                                }}
                                            />
                                            <form onSubmit={handleSubmit}>
                                                <textarea name="content" id="" className='form-control' onChange={handleChange} />
                                                <button className='btn btn-success mt-3'>Comment</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className="col-4">
                                <Box sx={{ width: '100%', typography: 'body1' }} className="boxdetail">
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
                            </div>
                        </div>
                    </div>
                </div>
            })}

            <ConfirmModal />
            <ToastContainer />
        </div>
    )
}