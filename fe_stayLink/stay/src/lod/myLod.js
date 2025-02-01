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
                서버 재가동 했을 때 숙소 관리가 떠야 하는데 
                숙소 등록이 뜸


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
                    객실 등록,수정,삭제
                        - 객실 명
                        - 객실 수
                        - 흡연여부
                        - 침대
                        - 객실 평수
                        - 최소 인원
                        - 최대 인원
                        - 객실 설명
                    대실 등록,수정,삭제
                        - 최대 이용 시간
                        - 할인율
                        - 금액
                        - 대실 가능 객실 수
                            - 객실 수만큼 입력 가능
                                - 대실 가능 객실 수 > 객실 수 => 대실 등록 불가능
                    숙박 등록,수정,삭제
                        - 체크인 시간
                        - 체크아웃 시간
                        - 할인율
                        - 금액
                        - 숙박 가능 객실 수
                            - 객실 수만큼 입력 가능
                                - 숙박 가능 객실 수 > 객실 수 => 숙박 등록 불가능
                    예약 관리
                        - 이용자 성명
                        - 이용자 휴대폰 번호
                            - 이용자는 예약자와 다르게 실제 이용자를 의미
                        - 방문 수단
                            - 도보,차량
                                - 주차 불가 시 차량 선택 불가
                        - 스케쥴 번호 FK
                            - 객실 타입 => 대실, 숙박
                            - 스케쥴 날짜를 가져옴
                            - 대실 및 숙박 테이블로 join하여 금액 정보 가져옴
                        - 예약 상태명 FK
                            - 예약 상태명 => 예약완료, 예약취소
                        - 회원 아이디 FK
                            - 예약자 아이디
                            - 예약자 명
                            - 예약자 휴대폰 번호
                        - 예약 날짜 Date
                            - 예약을 언제 했는지
                */}
            {lodImg && lodImg.length > 0 ? (
                lodImg.map((img, index) => (
                    <img style={{ width: '300px', height: '300px' }}
                        src={img} key={index} alt={`숙소 이미지${index + 1}`} />
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
                <div>
                    <h3>숙소명</h3>
                </div>
                <div>
                    <span>{lodInfo.lod_name}</span>
                </div>
            </div>
            <div className='myLod-title'>
                <div>
                    <h3>사업자 번호</h3>
                </div>
                <div>
                    <span>{lodInfo.lod_license}</span>
                </div>
            </div>
            <div>
                <div>
                    <h3>숙소유형</h3>
                </div>
                <span>{lodInfo.lod_type}</span>
            </div>
            <div className='myLod-title'>
                <div>
                    <h3>주소</h3>
                </div>
                <div>
                    <span>{lodInfo.lod_post}
                        {lodInfo.lod_address}
                        {lodInfo.lod_detail}
                    </span>
                </div>
            </div>
            <div className='myLod-title'>
                <div>
                    <h3>숙소정보</h3>
                </div>
                <div>
                    <label>공지사항</label>
                    <span>{lodInfo.lod_notice}</span>
                </div>
                <div>
                    <label>숙소소개</label>
                    <span>{lodInfo.lod_introduce}</span>
                </div>
                <div>
                    <label>서비스 언어</label>
                    <span>{lodInfo.lod_notice}</span>
                </div>
                <div>
                    <label>입장안내</label>
                    <span>{lodInfo.lod_entering}</span>
                </div>
                <div>
                    <label>이용안내</label>
                    <span>{lodInfo.lod_instruction}</span>
                </div>
                <div>
                    <label>편의시설</label>
                    <span>{lodInfo.lod_amenities}</span>
                </div>
                <div>
                    <label>주차여부</label>
                    <span>{lodInfo.lod_parking}</span>
                    <label>주차정보</label>
                    <span>{lodInfo.lod_parkingInfo}</span>
                </div>
                <div>
                    <label>흡연여부</label>
                    <span>{lodInfo.lod_smoke}</span>
                </div>
            </div>

        </div>
    );

}

export default MyLod;