import React from 'react'
import {NavLink} from 'react-router-dom'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

type Props = {}

export default function Footer({}: Props) {
  return (
    <div className='footer'>
      <div className="container">
        <div className="footer__top">
        <div className="footer__content">
          <h2>Categories</h2>
          <ul>
            <li>
              <NavLink to={""}>Graphics & Design</NavLink>
            </li>
            <li>
              <NavLink to={""}>Digital Marketing</NavLink>
            </li>
            <li>
              <NavLink to={""}>Writing & Translation</NavLink>
            </li>
            <li>
              <NavLink to={""}>Video & Animation</NavLink>
            </li>
            <li>
              <NavLink to={""}>Music & Audio</NavLink>
            </li>
            <li>
              <NavLink to={""}>Programming & Tech</NavLink>
            </li>
            <li>
              <NavLink to={""}>Data</NavLink>
            </li>
            <li>
              <NavLink to={""}>Business</NavLink>
            </li>
            <li>
              <NavLink to={""}>Lifestyle</NavLink>
            </li>
            <li>
              <NavLink to={""}>Photography</NavLink>
            </li>
            <li>
              <NavLink to={""}>Sitemap</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h2>About</h2>
          <ul>
            <li>
              <NavLink to={""}>Careers</NavLink>
            </li>
            <li>
              <NavLink to={""}>Press & News</NavLink>
            </li>
            <li>
              <NavLink to={""}>Partnerships</NavLink>
            </li>
            <li>
              <NavLink to={""}>Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to={""}>Terms of Service</NavLink>
            </li>
            <li>
              <NavLink to={""}>Intellectual Property Claims</NavLink>
            </li>
            <li>
              <NavLink to={""}>Investor Relations</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h2>Support</h2>
          <ul>
            <li>
              <NavLink to={""}>Help & Support</NavLink>
            </li>
            <li>
              <NavLink to={""}>Trust & Safety</NavLink>
            </li>
            <li>
              <NavLink to={""}>Selling on Fiverr</NavLink>
            </li>
            <li>
              <NavLink to={""}>Buying on Fiverr</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h2>Community</h2>
          <ul>
            <li>
              <NavLink to={""}>Events</NavLink>
            </li>
            <li>
              <NavLink to={""}>Blog</NavLink>
            </li>
            <li>
              <NavLink to={""}>Forum</NavLink>
            </li>
            <li>
              <NavLink to={""}>Community Standards</NavLink>
            </li>
            <li>
              <NavLink to={""}>Podcast</NavLink>
            </li>
            <li>
              <NavLink to={""}>Influencers</NavLink>
            </li>
            <li>
              <NavLink to={""}>Affiliates</NavLink>
            </li>
            <li>
              <NavLink to={""}>Invite a Friend</NavLink>
            </li>
            <li>
              <NavLink to={""}>Become a Seller</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer__content">
          <h2>More From Fiverr</h2>
          <ul>
            <li>
              <NavLink to={""}>Fiverr Business</NavLink>
            </li>
            <li>
              <NavLink to={""}>Fiverr Pro</NavLink>
            </li>
            <li>
              <NavLink to={""}>Fiverr Studios</NavLink>
            </li>
            <li>
              <NavLink to={""}>Fiverr Logo Maker</NavLink>
            </li>
            <li>
              <NavLink to={""}>Fiverr Guides</NavLink>
            </li>
            <li>
              <NavLink to={""}>Get Inspired</NavLink>
            </li>
            <li>
              <NavLink to={""}>Fiverr Select</NavLink>
            </li>
            <li>
              <NavLink to={""}>
                ClearVoice
                <p className='footer__blurtext'>Content Marketing</p>
                </NavLink>
            </li>
            <li>
              <NavLink to={""}>
              Fiverr Workspace
              <p className='footer__blurtext'>Invoice Software</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={""}>
                Learn
                <p className='footer__blurtext'>Online Courses</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={""}>
              Working Not Working
              </NavLink>
            </li>
          </ul>
        </div>
        </div>
        <div className="footer__bottom">
          <div className="first">
            <img src="./img/Fiverr-Logo-2009.png" alt="" />
            <span>© Fiverr International Ltd. 2023</span>
          </div>
          <div className="second">
            <div className="socialicons">
            <ul>
              <li><i><TwitterIcon/></i></li>
              <li><i><FacebookIcon/></i></li>
              <li><i><LinkedInIcon/></i></li>
              <li><i><PinterestIcon/></i></li>
              <li><i><InstagramIcon/></i></li>
            </ul>
            </div>
            <div className="settings">
                <div className="language">
                  <i><LanguageIcon /></i>
                  English
                </div>
                <div className="money">
                <i><AttachMoneyIcon /></i>
                  USD
                </div>
            </div>
            <i className='peopleicons'><AccessibilityNewIcon /></i>
            
          </div>
        </div>
      </div>
    </div>
  )
}