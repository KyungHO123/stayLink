import React, { useState } from "react";
import '../css/createLod.css';
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

function CreateLod() {
    return (
        <div className="createLod">
            <CreateLodImg />
            <CreateLodInfo />
        </div>
    );
}

function CreateLodImg() {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="createLod-imgContainer">
            <div className="createLod-img">
                {imageUrl ? <img src={imageUrl} alt="숙소 이미지" /> : <p>이미지를 선택해주세요.</p>}
                <input type="file" name="lod_bname" onChange={handleImageChange} />
            </div>
        </div>
    );
}

function CreateLodInfo() {
    const [formData, setFormData] = useState({
        lod_name: '',
        lod_license: '',
        lod_post: '',
        lod_address: '',
        lod_detail: '',
        lod_introduce: '',
        lod_language: '',
        lod_amenities: '',
        lod_entering: '',
        lod_instruction: '',
        lod_parkingInfo: '',
        lod_notice: '',
        lod_smoke: '',
        lod_parking: '',
        lod_type: '',
        lod_bname: null,
        lod_sido: '',  // 시도
        lod_sigungu: '',  // 시군구
        lod_bname: '',  // 동
    });

    const [zonecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');
    const [sido, setSido] = useState('');
    const [sigungu, setSigungu] = useState('');
    const [bname, setBname] = useState('');
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    const navigate = useNavigate();

    const handleComplete = (data) => {
        setZonecode(data.zonecode);  // 우편번호
        setAddress(data.address);     // 전체 주소
        setSido(data.sido);           // 시도
        setSigungu(data.sigungu);     // 시군구
        setBname(data.bname);         // 동
        setFormData({
            ...formData,
            lod_post: data.zonecode,
            lod_address: data.address,
            lod_sido: data.sido,   // 시도
            lod_sigungu: data.sigungu,  // 시군구
            lod_bname: data.bname, // 동
        });
        setIsPostcodeOpen(false);     // 주소 검색 창 닫기
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post('/api/lod/create', formData);
        if(res.status === 200){
            alert("숙소 등록 신청을 완료했습니다.\n관리자의 승인 후 숙소가 등록됩니다.");
            navigate("/");
            return;
        }else{
            alert("이미 등록된 숙소가 있습니다.");
            return;
        }
    };
    
    return (
        <div className="createLod-container" style={{ backgroundColor: 'white' }}>
            <h1>숙소 등록</h1>
            <form onSubmit={handleSubmit}>
                <div className="createLod-form">
                    <div className="createLod-form-title">
                        <label>숙소명</label>
                        <input type="text" name="lod_name" value={formData.lod_name} onChange={handleChange} placeholder="숙소명을 입력해주세요." />
                    </div>
                    <div className="createLod-form-title">
                        <label>숙소 유형</label>
                        <select name="lod_type" value={formData.lod_type} onChange={handleChange}>
                            <option value="호텔/리조트">호텔/리조트</option>
                            <option value="프리미엄">프리미엄</option>
                            <option value="펜션/풀빌라">펜션/풀빌라</option>
                            <option value="게스트하우스">게스트하우스</option>
                            <option value="모텔">모텔</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                    <div className="createLod-form-title">
                        <label>사업자 번호</label>
                        <input type="text" name="lod_license" value={formData.lod_license} onChange={handleChange} placeholder="사업자 번호를 입력해주세요 '-' 제외" />
                    </div>
                    <div className="createLod-form-title">
                        <label>우편번호</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="text" name="lod_post" value={zonecode} readOnly placeholder="우편번호를 입력해주세요." style={{ flex: 1, height: '40px', border: '1px solid #ccc', outline: 'none', borderTopRightRadius: '0', borderBottomRightRadius: '0', borderRight: 'none' }} />
                            <button id="post-btn" classNam="post-btn" type="button" onClick={() => setIsPostcodeOpen(true)}>주소 검색</button>
                        </div>
                        {isPostcodeOpen && <DaumPostcode onComplete={handleComplete} />}
                    </div>
                    <div className="createLod-form-title">
                        <label>주소</label>
                        <input type="text" name="lod_address" value={formData.lod_address} readOnly placeholder="주소를 입력해주세요." />
                    </div>
                    <div className="createLod-form-title">
                        <label>상세 주소</label>
                        <input type="text" name="lod_detail" value={formData.lod_detail} onChange={handleChange} placeholder="상세 주소를 입력해주세요." />
                    </div>
                    <div className="createLod-form-title">
                        <label>숙소 설명</label>
                        <textarea name="lod_introduce" value={formData.lod_introduce} onChange={handleChange} placeholder="숙소 설명을 입력해주세요." />
                    </div>
                    <div className="createLod-form-title">
                        <label>숙소 소개</label>
                        <textarea type="text" name="lod_language" value={formData.lod_language} onChange={handleChange} placeholder="숙소 소개를 입력해주세요." />
                    </div>
                    <div className="createLod-form-title">
                        <label>편의 시설</label>
                        <textarea type="text" name="lod_amenities" value={formData.lod_amenities} onChange={handleChange} placeholder="편의 시설을 입력해주세요." />
                    </div>
                    <div className="createLod-form-title">
                        <label>입장 안내</label>
                        <textarea type="text" name="lod_entering" value={formData.lod_entering} onChange={handleChange} placeholder="입장 안내를 입력해주세요." />
                    </div>
                    <div className="createLod-form-title">
                        <label>이용 안내</label>
                        <textarea type="text" name="lod_instruction" value={formData.lod_instruction} onChange={handleChange} placeholder="이용 안내를 입력해주세요." />
                    </div>
                    <div className="createLod-form-title">
                        <label>주차 정보</label>
                        <textarea type="text" name="lod_parkingInfo" value={formData.lod_parkingInfo} onChange={handleChange} placeholder="주차 정보를 입력해주세요." />
                    </div>
                    <div className="createLod-form-title">
                        <label>공지 사항</label>
                        <textarea type="text" name="lod_notice" value={formData.lod_notice} onChange={handleChange} placeholder="숙소 공지 사항을 입력해주세요." />
                    </div>
                    <div className="createLod-form-title">
                        <label>흡연 정보</label>
                        <select type="text" name="lod_smoke" value={formData.lod_smoke} onChange={handleChange}>
                            <option value="흡연 가능">흡연 가능</option>
                            <option value="흡연 불가">흡연 불가</option>
                        </select>
                    </div>
                    <div className="createLod-form-title">
                        <label>주차 가능 여부</label>
                        <select name="lod_parking" value={formData.lod_parking} onChange={handleChange}>
                            <option value="주차 가능">주차 가능</option>
                            <option value="주차 불가">주차 불가</option>
                        </select>
                    </div>

                    <button className="create-btn" type="submit" >숙소 등록</button>
                </div>
            </form>
        </div>
    );
}

export default CreateLod;
