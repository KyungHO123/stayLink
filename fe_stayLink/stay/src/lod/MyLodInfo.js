import React, { useState, useEffect } from 'react';
import DaumPostcode from "react-daum-postcode";
import '../css/myLod.css';
import axios from 'axios';


function MyLodInfo({ lodInfo, setLodInfo }) {
    const [open, setOpen] = useState(false);
    const handleChange = (e) => {

        const { name, value } = e.target;
        setLodInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));

    };
    const toggleHandler = () => {
        setOpen((prevState) => !prevState);
    };
    const completeHandler = (data) => {
        setLodInfo((prev) => ({
            ...prev,
            lod_post: data.zonecode,
            lod_address: data.address,
            lod_sido: data.sido,
            lod_sigungu: data.sigungu,
            lod_bname: data.bname || "",
            lod_detail: "",
        }));

        setOpen(false);
    }
    const handleUpdate = async () => {
        try {
            const res = await axios.post("/api/lod/update", lodInfo);
            if (res.status === 200) {
                alert("숙소 정보가 저장 되었습니다.");
            } else {
                alert("숙소 정보 저장에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error updating lod info:", error);
            alert("숙소 정보 업데이트 중 오류가 발생했습니다.");
        }
    }

    return (
        <div className="profile-info">
            <div className="profile-info-h2">
                <h2 style={{ color: "gray", padding: "0 25px" }}>숙소정보</h2>
            </div>
            <div className="profile-info-box">
                <div style={{ marginBottom: "15px" }}
                    className="profile-id">
                    <h3>숙소명</h3>
                    <input type="text" value={lodInfo.lod_name} readOnly />
                </div>
                <div className='myLod-info'>
                    <div>
                        <h3>사업자 번호</h3>
                        <input type='text' value={lodInfo.lod_license} onChange={handleChange} name="lod_license" readOnly/>
                    </div>
                    <div>
                        <h3>숙소유형</h3>
                        <select
                            name="lod_type"
                            value={lodInfo.lod_type || "X"}
                            onChange={handleChange}
                        >
                            <option value="X" disabled>숙소 유형을 선택해주세요.</option>
                            <option value="호텔/리조트">호텔/리조트</option>
                            <option value="프리미엄">프리미엄</option>
                            <option value="펜션/풀빌라">펜션/풀빌라</option>
                            <option value="게스트하우스">게스트하우스</option>
                            <option value="모텔">모텔</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                    <div className="profile-post">
                        <h3>우편번호</h3>
                        <div className="post-input-box"
                            style={{ display: "flex", width: "100%", flexDirection: "row", marginBottom: "25px" }}>
                            <input style={{ width: "70%" }}
                                className="mypage-post-input"
                                type="text"
                                value={lodInfo.lod_post}
                                onChange={handleChange}
                                name="lod_post"
                            />
                            <button onClick={toggleHandler}
                                style={{ width: "30%" }} type="button">주소찾기</button>
                        </div>
                    </div>
                    {open && (
                        <DaumPostcode
                            onComplete={completeHandler}
                            style={{ width: "100%", height: "480px" }}
                        />
                    )}
                    <div style={{ marginBottom: "15px" }}
                        className="profile-address">
                        <h3>주소</h3>
                        <input type="text" value={lodInfo.lod_address} onChange={handleChange} name="lod_address" />
                    </div>
                    <div style={{ marginBottom: "15px" }}
                        className="profile-detail">
                        <h3>상세주소</h3>
                        <input placeholder="상세주소를 입력하세요."
                            type="text" value={lodInfo.lod_detail} onChange={handleChange} name="lod_detail" />
                    </div>

                    <div>
                        <h3>상세정보</h3>
                    </div>
                    <div className="info-section">
                        <label>공지사항</label>
                        <textarea type="text" value={lodInfo.lod_notice} onChange={handleChange} name="lod_notice" />
                    </div>
                    <div className="info-section">
                        <label>숙소소개</label>
                        <textarea type="text" value={lodInfo.lod_introduce} onChange={handleChange} name="lod_introduce" />
                    </div>
                    <div className="info-section">
                        <label>서비스 언어</label>
                        <input type="text" value={lodInfo.lod_language} onChange={handleChange} name="lod_language"  placeholder="서비스 언어를 입력해주세요.(한국어,영어,일본어 등.)"/>
                    </div>
                    <div className="info-section">
                        <label>입장안내</label>
                        <textarea type="text" value={lodInfo.lod_entering} onChange={handleChange} name="lod_entering" />
                    </div>
                    <div className="info-section">
                        <label>이용안내</label>
                        <textarea type="text" value={lodInfo.lod_instruction} onChange={handleChange} name="lod_instruction" />
                    </div>
                    <div className="info-section">
                        <label>편의시설</label>
                        <textarea type="text" value={lodInfo.lod_amenities} onChange={handleChange} name="lod_amenities" />
                    </div>
                    <div className="info-section">
                        <label>흡연여부</label>
                        <select type="text" value={lodInfo.lod_smoke} onChange={handleChange} name="lod_smoke" >
                            <option value="X" disabled>흡연여부를 선택해주세요.</option>
                            <option value="흡연가능">흡연가능</option>
                            <option value="흡연불가능">흡연불가능</option>
                        </select>
                    </div>
                    <div className="info-section">
                        <label>주차여부</label>
                        <select type="text" value={lodInfo.lod_parking} onChange={handleChange} name="lod_parking" >
                            <option value="X" disabled>주차여부를 선택해주세요.</option>
                            <option value="주차가능">주차가능</option>
                            <option value="주차불가능">주차불가능</option>
                        </select>
                        <label>주차정보</label>
                        <textarea type="text" value={lodInfo.lod_parkingInfo} onChange={handleChange} name="lod_parkingInfo" />
                    </div>

                </div>



                <div className="profile-save">
                    <button onClick={handleUpdate}
                        className="save-btn">저장하기</button>
                </div>
            </div>
        </div>
    );
}
// 

export default MyLodInfo;