import '../css/header.css';
import React,{useState}from 'react';
import mypageImage from '../img/white_user.png';
import readingImage from '../img/돋보기.png';
import heartImage from '../img/white_heart.png';
import reserveImage from '../img/white_schedule.png';
import viewImage from '../img/white_marker.png';
import loginImage from '../img/white_login.png';
import logoutImage from '../img/white_logout.png';
import { Link } from 'react-router-dom'



function Header() {
  const [login,setLogin] = useState(false);
  return (
    <div className="header">
      <div className='header-container'>
        <div className='header-logo'>
          <div className='logo'>
            <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
              <h2>Stay Link</h2>
            </Link>
          </div>
        </div>
        <div className="search-container">
          <img src={readingImage} />
          <input
            type="text"
            className="search-input"
            placeholder="어디로 놀러 갈까요?"
          />
        </div>
        <div className='mypage-conpainer'>
          {login ?(
             <div className='logout'>
               <div>
                 <img src={logoutImage} alt='로그아웃 이미지' />
               </div>
               <div>
                 <span>로그아웃</span>
               </div>
           </div>):
           (
            <div className='login'>
            <Link to='/login' >
              <div>
                <img src={loginImage} alt='로그인 이미지' />
              </div>
              <div>
                <span>로그인</span>
              </div>
            </Link>
          </div>
          )}
         
          <div className='mypage'>
            <Link to='/mypage' >
              <div>
                <img src={mypageImage} alt='마이페이지 이미지' />
              </div>
              <div>
                <span>마이</span>
              </div>
            </Link>
          </div>
          <div className='favorite'>
            <a href='#'>
              <div>
                <img src={heartImage} alt='찜 이미지' />
              </div>
              <div>
                <span>찜</span>
              </div>
            </a>
          </div>
          <div className='reserve'>
            <a href='#'>
              <div>
                <img src={reserveImage} alt='예약 이미지' />
              </div>
              <div>
                <span>예약</span>
              </div>
            </a>
          </div>
          <div className='view'>
            <a href='#'>
              <div>
                <img src={viewImage} alt="최근본숙소 이미지" />
              </div>
              <div>
                <span>최근 본 숙소</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;