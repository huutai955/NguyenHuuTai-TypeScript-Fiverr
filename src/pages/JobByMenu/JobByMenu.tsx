import React, { useEffect, useState } from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { NavLink, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Slider from "react-slick";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getArrJobByDetailAPI, getArrTypeOfJobAPI } from '../../redux/reducers/jobReducer';


type Props = {}
export interface CustomArrowProps {
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
    onClick?: React.MouseEventHandler<any> | undefined;
    currentSlide?: number | undefined;
    slideCount?: number | undefined;
}

const SampleNextArrow = (props: CustomArrowProps) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green", position: 'absolute', top: '-35px', right: 0 }}
            onClick={onClick}
        />
    );

}

const SamplePrevArrow = (props: CustomArrowProps) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", position: 'absolute', top: '-35px', background: "red", right: '30px', left: 'auto' }}
            onClick={onClick}
        />
    );
}

export default function JobByMenu({ }: Props) {
    const { arrTypeOfJob } = useSelector((state: RootState) => state.jobReducer)
    const dispatch: AppDispatch = useDispatch()
    const param = useParams();
    const [modal, setModal] = useState<boolean>(false)
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 3,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 820,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
              }
            },
            {
                breakpoint: 620,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                }
              },
              {
                breakpoint: 467,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 2,
                }
              }
          ]
    };
    
    useEffect(() => {
        const action = getArrTypeOfJobAPI(param.result);
        dispatch(action);
    }, [])
    return (
        <div className='categories'>
            <div className="container">
                <div className="categories__carousel" style={{ backgroundImage: `url(${dataBg[Number(param.result) - 1].image})` }}>
                    <div className="categories__content">
                        <h2>{dataBg[Number(param.result) - 1].name}</h2>
                        <p>{dataBg[Number(param.result) - 1].title}</p>
                        <button className='btn' onClick={() => {
                            setModal(true);
                        }}><PlayCircleFilledWhiteIcon /> How Fiverr Works</button>
                    </div>
                </div>

                <div className="categories__popular">
                    <h2>Most Popular in {name[Number(param.result) - 1]}</h2>

                    <div className="content">
                        <Slider {...settings}>
                            {data[Number(param.result) - 1].map((item, index) => {
                                return <div className="item d-flex" key={index}>
                                    <div className="img">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <span style={{fontSize: 15}}>{item.name}</span>
                                    <i><ArrowForwardIcon style={{ fontSize: 20 }} /></i>
                                </div>
                            })}
                        </Slider>
                    </div>
                </div>

                {arrTypeOfJob.length >= 1 ? arrTypeOfJob.map((job, index) => {
                    return <div className="categories__explore" key={index}>
                        <h2>Explore {job.tenLoaiCongViec}</h2>
                        <div className="row">
                            {job.dsNhomChiTietLoai.map((group, index) => {
                                return <div className="col-3" key={index}>
                                    <div className="item">
                                        <div className="img">
                                            <img className='w-100' src={group.hinhAnh} alt="" />
                                        </div>
                                        <div className="content">
                                            <h2>{group.tenNhom}</h2>
                                            <ul>
                                                {group.dsChiTietLoai.map((list, index) => {
                                                    return <li key={index}>
                                                        <NavLink to={"/search/searchwithnamelist"} onClick={() => {
                                                               const action = getArrJobByDetailAPI(list.id)
                                                               dispatch(action);
                                                               window.scrollTo(0, 0)
                                                        }}> {list.tenChiTiet}</NavLink>
                                                        <i><ArrowForwardIcon style={{ fontSize: 20 }} /></i>
                                                    </li>
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                }) : <>Co Con Cac</>}
            </div>



            <Modal show={modal} onHide={() => {
                setModal(false)
            }}
                size="xl"
            >
                <Modal.Body style={{ padding: 0, height: '448.88px' }}>
                    <video style={{ width: '100%', height: 'auto' }} src={'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd_nl/v1/video-attachments/generic_asset/asset/ab0907217c9f9a2c1d2eee677beb7619-1626082923646/how_fiverr_works'} controls typeof="video/mp4"></video>
                </Modal.Body>
            </Modal>
        </div>
    )
}

const data = [
    [
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101614/Logo%20design_2x.png",
            name: 'Minimalist Logo Design'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101618/Architecture%20_%20Interior%20Design_2x.png",
            name: 'Architecture & Interior Design'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/55b9d6349057bb9fe177ea57e2d92f30-1670570507381/Web%20Design.png",
            name: 'Website Design'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101633/Illustration_2x.png",
            name: 'Illustration'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101624/Photoshop%20Editing_2x.png",
            name: 'Image Editing'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101623/T-Shirts%20_%20Merchandise_2x.png",
            name: 'T-Shirts & Merchandise'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/5987755afeb2d9ea01871fdee90a9a05-1670570470543/Product%20_%20industrial%20design.png",
            name: 'Industrial & Product Design'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101621/Social%20Media%20Design_2x.png",
            name: 'Social Media Design'
        },
        {
            image: "https://fiverr-res.cloudinary.com/f_auto,q_auto/v1/attachments/generic_asset/asset/fc6c7b8c1d155625e7878252a09c4437-1653222039380/Nft%20Art%20%281%29.png",
            name: 'NFT Art'
        },
    ],
    [
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/db18b6c9ba3af4778a5796b9e94137d7-1626177278710/SEO_2x.png",
            name: 'SEO'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/db18b6c9ba3af4778a5796b9e94137d7-1626177278701/Social%20Media%20Marketing_2x.png",
            name: 'Social Media Marketing '
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/db18b6c9ba3af4778a5796b9e94137d7-1626177278703/Video%20Marketing_2x.png",
            name: 'Video Marketing'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/db18b6c9ba3af4778a5796b9e94137d7-1626177278721/Music%20Promotion_2x.png",
            name: 'Music Promotion'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/db18b6c9ba3af4778a5796b9e94137d7-1626177278720/Social%20Media%20Advertising_2x.png",
            name: 'Social Media Advertising'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/db18b6c9ba3af4778a5796b9e94137d7-1626177278707/E-Commerce%20Marketing_2x.png",
            name: 'E-Commerce Marketing'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/db18b6c9ba3af4778a5796b9e94137d7-1626177278711/Email%20Marketing_2x.png",
            name: 'Email Marketing'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/db18b6c9ba3af4778a5796b9e94137d7-1626177278716/SEM_2x.png",
            name: 'SEM'
        }
    ],
    [
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/e72f248973b8a6b99a5786e63b6a3b1c-1630333285644/Articles%20_%20Blog%20Posts.png",
            name: 'Articles & Blog Posts'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/e72f248973b8a6b99a5786e63b6a3b1c-1630333285630/Translation.png",
            name: 'Translation'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/e72f248973b8a6b99a5786e63b6a3b1c-1630333285651/Ghostwriting.png",
            name: 'Ghostwriting'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/e72f248973b8a6b99a5786e63b6a3b1c-1630333285643/Proofreading%20_%20Editing.png",
            name: 'Proofreading & Editing'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/e72f248973b8a6b99a5786e63b6a3b1c-1630333285646/Resume%20Writing.png",
            name: 'Resume Writing'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/e72f248973b8a6b99a5786e63b6a3b1c-1630333285650/Website%20Content.png",
            name: 'Website Content'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/e72f248973b8a6b99a5786e63b6a3b1c-1630333285639/Product%20Descriptions.png",
            name: 'Product Descriptions'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/e72f248973b8a6b99a5786e63b6a3b1c-1630333285629/Scriptwriting.png",
            name: 'Scriptwriting'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/e72f248973b8a6b99a5786e63b6a3b1c-1630333285638/Book%20Editing.png",
            name: 'Book Editing'
        },
    ],
    [
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/9d0390ca87e4f946f4b4126d5cd15332-1653292063612/Social%20Media%20Videos%20icon%29.png",
            name: 'Social Media Videos'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/89ab9ac515a075a49a33b72518218e69-1630332670387/E-Commerce%20Product%20Videos.png",
            name: 'E-Commerce Product Videos'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/89ab9ac515a075a49a33b72518218e69-1630332670372/Logo%20Animation.png",
            name: 'Logo Animation'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/89ab9ac515a075a49a33b72518218e69-1630332670391/Visual%20Effects.png",
            name: 'Visual Effects'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/89ab9ac515a075a49a33b72518218e69-1630332670388/3D%20Product%20Animation.png",
            name: '3D Product Animation'
        }
    ],
    [
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323563/Voice%20Over_2x.png",
            name: 'Voice Over'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323574/Producers_Composers_2x.png",
            name: 'Producers & Composers'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323569/Singers_Vocalists_2x.png",
            name: 'Singers & Vocalists'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323569/Mixing_Mastering_2x.png",
            name: 'Mixing & Mastering'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323556/Session%20Musicians_2x.png",
            name: 'Session Musicians'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323560/Songwriters_2x.png",
            name: 'Songwriters'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323553/Podcast%20Editing_2x.png",
            name: 'Podcast Production'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323551/Beats%20%28Beat%20Making%29_2x.png",
            name: 'Beats'
        },
        {
            image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323558/Sound%20Design_2x.png",
            name: 'Sound Design'
        },
    ],

]

const dataPopular = [
    {
        image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323563/Voice%20Over_2x.png",
        name: 'Voice Over'
    },
    {
        image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323574/Producers_Composers_2x.png",
        name: 'Producers & Composers'
    },
    {
        image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323569/Singers_Vocalists_2x.png",
        name: 'Singers & Vocalists'
    },
    {
        image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323569/Mixing_Mastering_2x.png",
        name: 'Mixing & Mastering'
    },
    {
        image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323556/Session%20Musicians_2x.png",
        name: 'Session Musicians'
    },
    {
        image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323560/Songwriters_2x.png",
        name: 'Songwriters'
    },
    {
        image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323553/Podcast%20Editing_2x.png",
        name: 'Podcast Production'
    },
    {
        image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323551/Beats%20%28Beat%20Making%29_2x.png",
        name: 'Beats'
    },
    {
        image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/849e7cac6e16783b5dc3ab006b128c00-1626181323558/Sound%20Design_2x.png",
        name: 'Sound Design'
    },

]


const dataBg = [
    {
        image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/3f1b7ea10295936b6846bcff0afd38cf-1626595415203/graphics-design-desktop.png',
        name: 'Graphics & Design',
        title: 'Designs to make you stand out.'
    },
    {
        image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/3f1b7ea10295936b6846bcff0afd38cf-1626595415207/digital-marketing-desktop.png',
        name: 'Digital Marketing',
        title: 'Build your brand. Grow your business.'
    },
    {
        image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/42593ecc6f1e40fd735892b99f001ea4-1631622804534/writing%20_%20translation.png',
        name: 'Writing & Translation',
        title: 'Get your words across—in any language.'
    },
    {
        image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/0f6552319e77504dc5f59479b7ad83f1-1631622668242/Video%20_%20Animation.png',
        name: 'Video & Animation',
        title: 'Bring your story to life with creative videos.'
    },
    {
        image: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/3f1b7ea10295936b6846bcff0afd38cf-1626595415210/music-audio-desktop.png',
        name: 'Music & Audio',
        title: `Don't miss a beat. Bring your sound to life.`
    }
]

const name = ['Graphics & Design', 'Digital Marketing', 'Writing & Translation', 'Video & Animation', 'Music & Audio']