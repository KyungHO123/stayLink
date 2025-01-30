import React, { useEffect, useState } from 'react';
import '../css/myLod.css';
import axios from 'axios';


function MyLod({ isLod, setIsLod }) {

    const [lodImg, setLodImg] = useState([]);
    const [lodInfo, setLodInfo] = useState("");
    useEffect(() => {
        axios.get('api/lod/myLod', { withCredentials: true })
            .then((res) => {
                setLodImg(res.data.img);
                setLodInfo(res.data.lod);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="myLod">
            <div className='myLod-container'>
                <div className='myLod-box'>
                    <div className='myLod-title'>
                        <h1>숙소 관리</h1>
                    </div>
                    <MyLodImg lodImg={lodImg} />
                    <MyLodInfo lodInfo={lodInfo} />

                </div>
            </div>
        </div>
    );
}
function MyLodImg({ lodImg }) {
    console.log(lodImg);
    return (
        <div className='myLod-imgBox'>
            {/*
                숙소 관리
                    숙소 이미지
                        - 페이지 네이션 <, > 버튼
                        - 이미지 삭제 버튼 (이미지 삭제시 바로 삭제)
                            - DB에서 완전히 삭제 및 폴더에서도 삭제
                        - 이미지 추가 버튼 (이미지 추가시 바로 추가)

                    숙소 정보
                        - 수정
                            - 숙소명
                            - 사업자 번호
                            - 주소
                            - 숙소정보 등
                        - 삭제(숙소 등록 해제)
                            - 숙소 삭제시 모든 정보 삭제
                                - 이미지 포함 삭제
                        


                */}
            {lodImg && lodImg.length > 0 ? (
                lodImg.map((img, index) => (
                    <img style={{ width: '300px', height: '300px' }}
                    src={img} key={index} alt={`숙소 이미지${index +1}`}/>
                ))
            ) : (
                <div>이미지가 없습니다.</div>
            )}
        </div>
    );

}
function MyLodInfo({ lodInfo }) {
    return (
        <div className='myLod-infoBox'>
            <div className='myLod-title'>
                <h3>숙소명</h3>
                <p>{lodInfo.lod_name}</p>
            </div>
            <div className='myLod-title'>
                <h3>사업자 번호</h3>
            </div>
            <div className='myLod-title'>
                <h3>주소</h3>
            </div>
            <div className='myLod-title'>
                <h3>숙소정보</h3>

            </div>

        </div>
    );

}

export default MyLod;