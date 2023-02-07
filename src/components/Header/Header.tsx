import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { getArrJopMenuAPI, JobMenu } from '../../redux/reducers/jobReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import styled, { keyframes } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { default as Slider, Settings } from "react-slick";
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import _, { cloneDeep } from 'lodash'
import TagNavLink from '../TagNavLink/TagNavLink';
import TagNavLinkParent from '../TagNavLink/TagNavLinkParent';
import { setLogOut } from '../../redux/reducers/userReducer';
import DrawerHeader from '../Drawer/DrawerHeader';
import {ACCESSTOKEN, settings as settingUlti} from '../../util/config'




const rotate = keyframes` 0% {
  transform: rotateX(0);
}

50% {
  transform: rotateX(90deg);
}

100% {
  transform: rotateX(0);
}`;


export const rotateAnimation = styled.div`
  animation: ${rotate} 0.5s normal;
`


const HomeHeader = styled.div`
  animation: ${rotate} 1s normal;
`;

export interface CustomArrowProps {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onClick?: React.MouseEventHandler<any> | undefined;
  currentSlide?: number | undefined;
  slideCount?: number | undefined;
}


SwiperCore.use([Autoplay]);
type Props = {}
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    minWidth: 400,
    border: '1px solid #dadde9',
    fontSize: 20
  },
}));

const HtmlTooltipSecond = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    minWidth: 160,
    border: '1px solid #dadde9',
    fontSize: 16
  },
}));

export default function Header({ }: Props) {
  const { messageLogin, userInfor } = useSelector((state: RootState) => state.userReducer)
  const dispatch: AppDispatch = useDispatch()
  const [backGroundHeader, setBackGroundHeader] = useState<string>(" background-color: rgba(0, 0, 0, 0)");
  const [color, setColor] = useState<string>("#fff");
  const [height, setHeight] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(0);
  const [displayMenu, setDisplay] = useState<string>("none");
  const [valueSearching, setValueSearching] = useState<string>("");
  const { arrJob } = useSelector((state: RootState) => state.jobReducer);
  const [arrJobMenu, setArrJobMenu] = useState<JobMenu[]>([])
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1077,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 705,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  };

  const changeHeight = (e: Event) => {
    setHeight(window.scrollY)
  }
  useEffect(() => {
    const action = getArrJopMenuAPI();
    dispatch(action);
    window.addEventListener('scroll', changeHeight)
    return () => {
      window.removeEventListener('scroll', changeHeight);
    }
  }, [])


  useEffect(() => {
    if (arrJob.length >= 1) {
      const newValue = _.cloneDeep(arrJob);
      newValue.splice(5, 3)
      const newValue2 = _.cloneDeep(arrJob);
      newValue2.splice(3, 5);
      const merge = newValue.concat(newValue2);
      setArrJobMenu(merge);
    }
  }, [arrJob])

  useEffect(() => {
    if (height >= 100) {
      setBackGroundHeader('#fff')
      setColor('#000')
      setOpacity(1)
      setDisplay("block")
    } else if (height === 0) {
      setBackGroundHeader("rgba(0, 0, 0, 0)")
      setColor('#fff')
      setOpacity(0)
      setDisplay("none")
    }
  }, [height])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    setValueSearching(value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search/${valueSearching}`)
  }


  return (
    <>
      <div className='header' style={{ backgroundColor: backGroundHeader }}>
        <div className="container d-flex">
          <div className="header__first">
            <svg width="89" style={{ marginTop: 8 }} height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill={color}><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path></g></svg>
            <form style={{ opacity: opacity }} onSubmit={handleSubmit}>
              <div className="form-group group__input">
                <input type="text" style={{ width: 550 }} className='form-control' placeholder='What service are you looking for today?' onChange={handleChange} />
              </div>
              <div className="form-group group__button">
                <button type='submit' className='btn btn-primary'><SearchIcon /></button>
              </div>
            </form>
          </div>
          <div className="header__second">
            <ul>
              <li className="becomeaseller"><NavLink to={""} style={{ color: color }}>Become a Seller</NavLink></li>
              {messageLogin ? <li>
                <HtmlTooltipSecond
                  title={
                    <React.Fragment>
                      <ul className='text-center m-0 p-0'>
                      <li style={{listStyle: 'none', marginBottom: '10px'}}><NavLink to={`user/${userInfor.id}`} style={{color: '#62646a', textDecoration: 'none'}}>Information</NavLink></li>
                        <li style={{listStyle: 'none', cursor: 'pointer'}} onClick={()=> {
                          const action = setLogOut("");
                          dispatch(action);
                        }}>Log out</li>
                      </ul>
                    </React.Fragment>
                  }
                >
                  <NavLink to={""} style={{ color: color }}>Hi {userInfor?.name}</NavLink>
                </HtmlTooltipSecond>
              </li>
                : <li className='signin'><NavLink to={"/login"} style={{ color: color }}>Sign in</NavLink></li>
              }
              {settingUlti.getStore(ACCESSTOKEN) ? <> </> 
              : <li><NavLink className={'btn-signup'} to={"/signup"} style={{ color: color, border: `1px solid ${color}` }}>
              Join</NavLink></li>}
            </ul>
          </div>
        </div>
      </div>
      <HomeHeader className='homeheader' style={{ display: displayMenu }}>
        <div className="menu">
          <div className="container" style={{ maxWidth: 1200 }}>
            <Slider {...settings}>
              {arrJobMenu.map((job, index) => {
                return <HtmlTooltip
                  key={index}
                  title={<div className='row'>
                    {job.dsNhomChiTietLoai.map((nameGroup, index) => {
                      return <div className="col-6" key={index} >
                        <span style={{ color: '#414040', fontSize: 17, marginBottom: 10, textAlign: 'center' }}>{nameGroup.tenNhom}</span>
                        <ul style={{ margin: 0, padding: 0 }}>
                          {nameGroup.dsChiTietLoai.map((nameList, index) => {
                            return <li style={{ listStyle: 'none' }} key={index}>
                              <TagNavLink keyNavLink={index} name={nameList.tenChiTiet} id={nameList.id} />
                            </li>
                          })}
                        </ul>
                      </div>
                    })}
                  </div>}>
                  <div className='text-center'>
                    <TagNavLinkParent key={index} id={job.id} name={job.tenLoaiCongViec} />
                  </div>
                </HtmlTooltip>
              })}
            </Slider>
          </div>
        </div>
      </HomeHeader>
      <DrawerHeader />
    </>
  )
}
