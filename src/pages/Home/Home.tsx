import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { EffectFade, EffectCube, EffectCoverflow, EffectFlip } from 'swiper';
import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { default as Slider, Settings } from "react-slick";
import { BiCheckCircle } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { NavLink } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


type Props = {}
SwiperCore.use([Autoplay]);
SwiperCore.use([Pagination, Navigation]);
export interface CustomArrowProps {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onClick?: React.MouseEventHandler<any> | undefined;
  currentSlide?: number | undefined;
  slideCount?: number | undefined;
}


const source = [
  'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun',
  'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl',
  'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/rb8jtakrisiz0xtsffwi',
  'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw'
]

const dataIntroduce = [{
  id: 1,
  image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173395/testimonial-video-still-haerfest.jpg',
  ceoName: 'Tim and Dan Joo, Co-Founders',
  imageBrand: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/haerfest-logo-x2.03fa5c5.png',
  title: `"When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does."`
},
{
  id: 2,
  image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg',
  ceoName: 'Brighid Gannon (DNP, PMHNP-BC), Co-Founder',
  imageBrand: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lavender-logo-x2.89c5e2e.png',
  title: `"We used Fiverr for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world."`
},
{
  id: 3,
  image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173414/testimonial-video-still-naadam.jpg',
  ceoName: 'Caitlin Tormey, Chief Commercial Officer',
  imageBrand: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/naadam-logo-x2.0a3b198.png',
  title: `"We've used Fiverr for Shopify web development, graphic design, and backend web development. Working with Fiverr makes my job a little easier every day."`
},
{
  id: 4,
  image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173399/testimonial-video-still-rooted.jpg',
  ceoName: 'Kay Kim, Co-Founder',
  imageBrand: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/rooted-logo-x2.321d79d.png',
  title: `"It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working."`
}

]

const dataTrusted = [
  {
    id: 1,
    img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png',
    slogan: 'Build your brand',
    name: 'Logo Design'
  },
  {
    id: 2,
    img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png',
    slogan: 'Customize your site',
    name: 'WordPress'
  },
  {
    id: 3,
    img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png',
    slogan: 'Share your message',
    name: 'Voice Over'
  },
  {
    id: 4,
    img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png',
    slogan: 'Engage your audience',
    name: 'Video Explainer'
  },
  {
    id: 5,
    img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png',
    slogan: 'Reach more customers',
    name: 'Social Media'
  },
  {
    id: 6,
    img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png',
    slogan: 'Unlock growth online',
    name: 'SEO'
  },
  {
    id: 7,
    img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png',
    slogan: 'Color your dreams',
    name: 'Illustration'
  },
  {
    id: 8,
    img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741674/translation-2x.png',
    slogan: 'Go global',
    name: 'Translation'
  },
  {
    id: 9,
    img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/data-entry-2x.png',
    slogan: 'Learn your business',
    name: 'Data Entry'
  },
  {
    id: 10,
    img: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png',
    slogan: 'Showcase your story',
    name: 'Book Covers'
  },


]


const dataExplore = [
  {
    id: 1,
    image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg",
    name: 'Graphics & Design'
  },
  {
    id: 2,
    image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg",
    name: 'Digital Marketing'
  },
  {
    id: 3,
    image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg",
    name: 'Writing & Translation'
  },
  {
    id: 4,
    image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg",
    name: 'Video & Animation'
  },
  {
    id: 5,
    image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg",
    name: 'Music & Audio'
  },
  {
    id: 6,
    image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg",
    name: 'Programming & Tech'
  },
  {
    id: 7,
    image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg",
    name: 'Business'
  },
  {
    id: 8,
    image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg",
    name: 'Lifestyle'
  },
  {
    id: 9,
    image: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg",
    name: 'Data'
  }
]
export default function Home({ }: Props) {
  const [show, setShow] = useState<boolean>(false)
  const [showCompany, setShowCompany] = useState<boolean>(false)
  const [srcVideoCompany, setSrcVideoCompany] = useState<string>("")
  const [opacity, setOpacity] = useState<number>(1)
  const [height, setHeight] = useState<number>(1)
  const SamplePrevArrow = (props: CustomArrowProps) => {
    const { style, onClick, className } = props;
    return <button className={className} style={{ display: "block", position: 'absolute', zIndex: 2 }} onClick={onClick}>
      <ArrowBackIosNewIcon style={{ color: '#000' }} />
    </button>
  }

  const changeHeight = (e: Event) => {
    setHeight(window.scrollY)
  }

  useEffect(() => {
    if (height >= 100) {
      setOpacity(1)
    } else {
      setOpacity(0)
    }
  }, [height])
  useEffect(() => {
    window.addEventListener('scroll', changeHeight)
    return () => {
      window.removeEventListener('scroll', changeHeight);
    }
  }, [])
  const SampleNextArrow = (props: CustomArrowProps) => {
    const { style, onClick, className } = props;
    return <button
      className={className}
      style={{ display: "block" }}
      onClick={onClick}>
      <ArrowForwardIosIcon style={{ color: '#000' }} />
    </button>
  }

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const settingsTrusted = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };


  const handleSetShowCompany = (id: number) => {
    switch (id) {
      case 1: {
        setShowCompany(true);
        setSrcVideoCompany(source[0])
        break;
      };
      case 2: {
        setShowCompany(true);
        setSrcVideoCompany(source[1])
        break;
      };
      case 3: {
        setShowCompany(true);
        setSrcVideoCompany(source[2])
        break;
      };
      case 4: {
        setShowCompany(true);
        setSrcVideoCompany(source[3])
        break;
      };
    }
  }
  return (
    <div className="home">
      <div className="carousel">
        <Swiper modules={[EffectFade]} className="swiperCarousel" effect="fade"
          autoplay={{ delay: 3000 }}>
          <SwiperSlide >
            <img style={{ width: '100%', height: 700, objectFit: 'cover' }} src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049984/bg-hero-1-1792-x2.png" alt="" />
          </SwiperSlide>
          <SwiperSlide >
            <img style={{ width: '100%', height: 700, objectFit: 'cover' }} src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/2413b8415dda9dbd7756d02cb87cd4b1-1599595203021/bg-hero-2-1792-x2.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img style={{ width: '100%', height: 700, objectFit: 'cover' }} src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/d14871e2d118f46db2c18ad882619ea8-1599835783974/bg-hero-3-1792-x2.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img style={{ width: '100%', height: 700, objectFit: 'cover' }} src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/93085acc959671e9e9e77f3ca8147f82-1599427734106/bg-hero-4-1792-x2.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img style={{ width: '100%', height: 700, objectFit: 'cover' }} src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/attachments/generic_asset/asset/bb5958e41c91bb37f4afe2a318b71599-1599344049977/bg-hero-5-1792-x2.png" alt="" />
          </SwiperSlide>
        </Swiper>

        <div className="carousel-responsive">
        </div>
        <div className="container">
          <div className="findingjob">
            <div className="findingjob__content">
              <h2>Find the perfect <span style={{ fontFamily: 'cursive' }}>freelance</span> services for your business</h2>
              <form>
                <div className="form-group group__input">
                  <i><AiOutlineSearch /></i>
                  <input type="text" className='form-control' placeholder='Try "building mobile app' />
                </div>

                <div className="form-group group__button">
                  <button className='btn btn-primary'>Search</button>
                </div>
              </form>

              <div className="popularjob">
                <p>Popular:</p>
                <div className="job">
                  <NavLink to={""}>Website Design</NavLink>
                  <NavLink to={""}>WordPress</NavLink>
                  <NavLink to={""}>Logo Design</NavLink>
                  <NavLink to={""}>Video Editing</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trusted">
        <div className="container">
          <p>Trusted by:</p>
          <ul>
            <li>
              <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook.31d5f92.png" alt="" />
            </li>
            <li>
              <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google.517da09.png" alt="" />
            </li>
            <li>
              <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix.e3ad953.png" alt="" />
            </li>
            <li>
              <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg.8b7310b.png" alt="" />
            </li>
            <li>
              <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal.ec56157.png" alt="" />
            </li>
          </ul>
        </div>
      </div>


      <div className="popularservices">
        <div className="container">
          <h2>Popular professional services</h2>
          <Slider {...settingsTrusted}
          >
            {dataTrusted.map((info, index) => {
              return <NavLink to={""} key={index}>
                <img src={info.img}/>
                <div className="content">
                  <p>{info.slogan}</p>
                  <h2>{info.name}</h2>
                </div>
              </NavLink>
            })}
          </Slider>
        </div>
      </div>

      <div className="selling">
        <div className="container">
          <div className="selling__first">
            <h2>A whole world of freelance talent at your fingertips</h2>
            <ul>
              <li>
                <h3>
                  <i><BiCheckCircle /></i>
                  The best for every budget
                </h3>
                <p>Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
              </li>
              <li>
                <h3>
                  <i><BiCheckCircle /></i>
                  Quality work done quickly
                </h3>
                <p>Find the right freelancer to begin working on your project within minutes.</p>
              </li>
              <li>
                <h3>
                  <i><BiCheckCircle /></i>
                  Protected payments, every time
                </h3>
                <p>Always know what you'll pay upfront. Your payment isn't released until you approve the work.</p>
              </li>
              <li>
                <h3>
                  <i><BiCheckCircle /></i>
                  24/7 support
                </h3>
                <p>Questions? Our round-the-clock support team is available to help anytime, anywhere.</p>
              </li>
            </ul>
          </div>

          <div className="selling__second">
            <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png" alt="" />
            <div className="play-video">
              <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/desktop-play-button.c1196d6.png" alt="" onClick={() => {
                setShow(true)
              }} />
            </div>
          </div>
        </div>
      </div>


      <div className="introduce">
        <div className="container">
          <Slider {...settings}
          >
            {dataIntroduce.map((info, index) => {
              return <div className='introduceParent d-flex' key={index}>
                <div className="introduce__first">
                  <img src={info.image} alt="" />
                  <div className="introduce__playvideo">
                    <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/desktop-play-button.c1196d6.png" alt="" onClick={() => {
                      handleSetShowCompany(info.id)
                    }} />
                  </div>
                </div>
                <div className="introduce__second">
                  <h5>
                    {info.ceoName}
                    <span>
                      <img src={info.imageBrand} alt="" />
                    </span>
                  </h5>
                  <p>{info.title}</p>
                </div>
              </div>
            })}
          </Slider>
        </div>
      </div>

      <div className="explore">
        <div className="container">
          <h2>Explore the marketplace</h2>
          <div className="row">
            {dataExplore.map((infor) => {
              return <div className="col-3" key={infor.id}>
                <NavLink to={""}>
                  <div className="img">
                    <img src={infor.image} alt="" />
                  </div>
                  <span>{infor.name}</span>
                </NavLink>
              </div>
            })}
          </div>
        </div>
      </div>



      <Modal show={show} onHide={() => {
        setShow(false)
      }}
        size="xl"
      >
        <Modal.Body style={{ padding: 0, height: '448.88px' }}>
          <video style={{ width: '100%', height: 'auto' }} src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7" controls typeof="video/mp4"></video>
        </Modal.Body>
      </Modal>

      <Modal show={showCompany} onHide={() => {
        setShowCompany(false)
      }}
        size="xl"
      >
        <Modal.Body style={{ padding: 0, height: '448.88px' }}>
          <video style={{ width: '100%', height: 'auto' }} src={srcVideoCompany} controls typeof="video/mp4"></video>
        </Modal.Body>
      </Modal>

      <span className='btnBackToTop' style={{ opacity: opacity }} onClick={() => {
        window.scrollTo(0, 0)
      }}><KeyboardArrowUpIcon /></span>
    </div>
  )
}