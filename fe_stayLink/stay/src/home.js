import React, { useState, useEffect } from "react";
import './css/home.css';
import hotelImage from './img/hotel.png';
import premiumImage from './img/premium.png';
import poolImage from './img/poolvilla.png';
import familyImage from './img/family.png';
import motelImage from './img/motel.png';
import locationImage from './img/location.png';
import { Link } from 'react-router-dom';
function HrTag(){
    return(
<div style={{width:'90%', border :'1px solid lightGray',margin:'100px auto'}}/>
    );
}

function HomeHeader() {
    return (
        <div className="home-header">
            <div>
                <span>
                    <img src={hotelImage} alt="호텔 이미지"></img>
                </span>
                <span>호텔/리조트</span>
            </div>
            <div>
                <span>
                    <img src={premiumImage} alt="프리미엄 이미지"></img>
                </span>
                <span>프리미엄</span>
            </div>
            <div>
                <span>
                    <img src={poolImage} alt="펜션/풀빌라 이미지"></img>
                </span>
                <span>펜션/풀빌라</span>
            </div>
            <div>
                <span>
                    <img src={familyImage} alt="가족형숙소 이미지"></img>
                </span>
                <span>가족형숙소</span>
            </div>
            <div>
                <span>
                    <img src={motelImage} alt="모텔 이미지"></img>
                </span>
                <span>모텔</span>
            </div>
            <div className="line" style={{ backgroundColor: 'lightGray', width: '1px', height: '99px', margin: '0 20px', padding: '0' }} />
            <div>
                <span>
                    <img src={locationImage} alt="내주변 이미지"></img>
                </span>
                <span>내주변</span>
            </div>
        </div>

    );
}
function HomeBody() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "https://image6.yanolja.com/cx-ydm/H3jMbMZqedXHk0Pc",
        "https://image6.yanolja.com/cx-ydm/g7iEUCViwKCoNu5W",
        "https://image6.yanolja.com/cx-ydm/hvBIWPCx0IXOnHD6",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 2) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const visibleImages = images.slice(currentIndex, currentIndex + 2);

    return (
        <div className="home-body">
            <div className="home-event">
                {visibleImages.map((img, index) => (
                    <span key={index}>
                        <img src={img} alt={`Slide ${currentIndex + index}`} />
                    </span>
                ))}
            </div>
            <HrTag/>
            <div className="home-best-view" style={{marginTop:'5%'}}>
                <div className="home-best-view-h2">
                    <span>
                        <h2>이런 상품은 어떠세요?</h2>
                    </span>
                    <span style={{ margin: 'auto 20px', fontWeight: 'bold', fontSize: '16px' }}>
                        최근 회원이 많이 조회한 숙소
                    </span>
                </div>
                <div className="home-best-view-lod">
                    <div className="best-lod">
                        <div className="lod-img">
                            <img />
                        </div>
                        <span className="lod-name">숙소이름</span>
                        <span className="lod-price">금액</span>
                    </div>
                    <div className="best-lod">
                        <div className="lod-img">
                            <img />
                        </div>
                        <span className="lod-name">신중동 노블레스</span>
                        <span className="lod-price"><p>10%</p>25,000원</span>
                    </div>
                </div>
            </div>
            <HrTag/>
            <div className="home-best-reserve">
                <div className="home-best-reserve-h2">
                    <span >
                        <h2>예약 많이 하는 숙소</h2>
                    </span>
                    <span style={{ margin: 'auto 20px', fontWeight: 'bold', fontSize: '16px' }}>
                        최근 한 주간 예약 많은 순
                    </span>
                </div>
                <div className="home-reserve-best-lod">
                    <div className="best-reserve">
                        <div className="lod-img">
                            <img />
                        </div>
                        <span className="lod-name">신중동 노블레스</span>
                        <span className="lod-price"><p>10%</p>25,000원</span>
                    </div>
                    <div className="best-reserve">
                        <div className="lod-img">
                            <img />
                        </div>
                        <span className="lod-name">신중동 노블레스</span>
                        <span className="lod-price"><p>10%</p>25,000원</span>
                    </div>
                </div>
            </div>
            <HrTag/>
        </div>
        
    );
}

function Home() {


    return (
        <div className="home">
            <div className="home-container">
                <HomeHeader />
                <HomeBody />
            </div>
        </div>
    );
}

export default Home;