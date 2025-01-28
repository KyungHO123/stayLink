import '../css/header.css';
import React, { useState, useEffect } from 'react';
import mypageImage from '../img/white_user.png';
import readingImage from '../img/돋보기.png';
import heartImage from '../img/white_heart.png';
import reserveImage from '../img/white_schedule.png';
import viewImage from '../img/white_marker.png';
import loginImage from '../img/white_login.png';
import logoutImage from '../img/white_logout.png';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';



function Header({ isLogin, setIsLogin }) {
  const [login, setLogin] = useState(isLogin);

  const navigate = useNavigate();
  function handleMypage() {

    if (!isLogin) {
      let handleConfirm = window.confirm("로그인 후 이용가능합니다.\n로그인 페이지로 이동 하시겠습니까?");
      if (handleConfirm) {
        navigate("/login");
      }
    } else {
      navigate("/mypage")
    }

  }
  const CheckLoginStatus = async () => {
    try {
      const res = await axios.get("/api/checkSession", { withCredentials: true });

      if (res.status !== 200) {
        setIsLogin(false);
        return;
      } else {
        setIsLogin(true);
        return;
      }
    } catch (error) {
      console.error("세션 없음");
      setIsLogin(false);
    }
  };

  useEffect(() => {
    CheckLoginStatus();
  }, []);

  const handleLogout = async () => {
    const res = await axios.post("/api/logout", { withCredentials: true });
    if (res) {
      setLogin(false);
      setIsLogin(false);
      alert("로그아웃 되었습니다.");
      navigate("/");
      return;
    } else {
      alert("로그아웃 실패");
      return;
    }

  }
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
          {isLogin ? (
            <div className='logout' onClick={handleLogout} style={{ cursor: "pointer" }}>
              <div>
                <img src={logoutImage} alt='로그아웃 이미지' />
              </div>
              <div>
                <span>로그아웃</span>
              </div>
            </div>) :
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
            <li style={{ listStyle: 'none', cursor: 'pointer' }}
              role='button' id='mypage' onClick={handleMypage} >
              <div>
                <img src={mypageImage} alt='마이페이지 이미지' />
              </div>
              <div>
                <span>마이</span>
              </div>
            </li>
          </div>

          <div className='favorite'>
            <li style={{ listStyle: 'none', cursor: 'pointer' }}
            >
              <div>
                <img src={heartImage} alt='찜 이미지' />
              </div>
              <div>
                <span>찜</span>
              </div>
            </li>
          </div>
          <div className='reserve'>
            <li style={{ listStyle: 'none', cursor: 'pointer' }}>
              <div>
                <img src={reserveImage} alt='예약 이미지' />
              </div>
              <div>
                <span>예약</span>
              </div>
            </li>
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