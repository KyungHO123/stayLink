import React, { useState, useEffect } from "react";
import "../css/mypage.css";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import { useNavigate, Link } from "react-router-dom";
import whiteUser from "../img/defaultProfile.png";

function Mypage({ isLogin,setIsLod, setIsLogin, isLod }) {

    const navigate = useNavigate();
    const [info, setInfo] = useState(null);
    const [pwModal, setPwModal] = useState(false);
    const [newPw, setNewPw] = useState("");
    const [cofirmPw, setConfrimPw] = useState("");
    const [nickMsg, setNickMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");
    const [phoneMsg, setPhoneMsg] = useState("");
    const [profileImg, setProfileImg] = useState(null);

    const number = /^[0-9]*$/;
    const specialCharNick = /[^a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    //비번 모달 열기
    const openPwModal = () => {
        setPwModal(true);
    };
    //비번 모달 닫기
    const closePwModal = () => {
        setPwModal(false);
    };
    const handlePasswordChange = async () => {
        if (newPw !== cofirmPw) {
            alert("비밀번호가 일치하지 않습니다.");
            console.log(newPw);
            return;
        }
        if (!newPw || !cofirmPw) {
            alert("비밀번호를 입력해 주세요.");
            return;
        }
        const updateInfo = { ...info, user_pw: newPw };
        setInfo(updateInfo);

        axios.post("/api/mypage/updatePw", { user_id: info.user_id, user_pw: newPw })
            .then((res) => {
                alert(res.data.msg);
                closePwModal();
                return;
            })
    }
    const handleLogout = async () => {
        const res = await axios.post("/api/logout", {}, { withCredentials: true });
        if (res) {
            setIsLogin(false);
            alert("로그아웃 되었습니다.");
            navigate("/");
            return;
        } else {
            alert("로그아웃 실패");
            return;
        }
    }


    // onChange 이벤트 핸들러
    const handleChange = (e) => {

        const { name, value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));

        if (name === "user_nickName") {
            setNickMsg(
                value.length < 2 || value.length > 8
                    ? "닉네임은 2자 ~ 8자로 입력해주세요."
                    : specialCharNick.test(value)
                        ? "닉네임에 특수문자를 사용할 수 없습니다."
                        : value.length >= 2 || value.length <= 8
                            ? "사용 가능한 닉네임 입니다."
                            : ""
            );
        } else if (name === "user_email") {
            setEmailMsg(
                !emailRegex.test(value)
                    ? "이메일 형식이 올바르지 않습니다. example@example.com"
                    : "사용 가능한 이메일 입니다."
            );
        } else if (name === "user_phone") {
            setPhoneMsg(
                value.length !== 11
                    ? "전화번호는 11자로 입력해주세요."
                    : !number.test(value)
                        ? "전화번호는 숫자만 입력 가능합니다."
                        : "사용가능한 전화번호 입니다."
            );
        }

    };
    const handleRemove = async () => {
        let confirm = window.confirm("회원탈퇴를 진행 하시겠습니까?");
        if (confirm) {
            axios.post("/api/user/remove", { user_id: info.user_id })
                .then((res) => {
                    if (res) {
                        setIsLogin(false);
                        alert("회원탈퇴를 정상적으로 완료 했습니다.")
                        navigate("/");
                        return;
                    } else {
                        alert("회원탈퇴에 실패 했습니다.")
                        return;
                    }

                })
        }
    };
    const handleProfileImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImg(URL.createObjectURL(file));  // 미리보기용 이미지 설정
        }


        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_num", info.user_num);
        try {
            const res = await axios.post("/api/mypage/uploadImg", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            alert("프로필 이미지가 변경되었습니다.");
        } catch (error) {
            console.error("프로필 사진 업로드 실패:", error);
            alert("프로필 사진 업로드에 실패했습니다.");
        }
    };
    const handleProfileImgUpload = async () => {
        const fileInput = document.getElementById("profileImageInput")
        fileInput.click();

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/mypage/getImg", { withCredentials: true });
                if (res.data.img) {
                    console.log(res.data);
                    setProfileImg(res.data.img);  // 서버에서 가져온 프로필 이미지 URL로 상태 업데이트
                } else {
                    setProfileImg(whiteUser);  // 기본 이미지 설정
                }
            } catch (error) {
                console.error("프로필 이미지 로드 실패:", error);
                setProfileImg(whiteUser);  // 실패 시 기본 이미지
            }

            // 마이페이지 정보 가져오기
            try {
                const res = await axios.get("/api/mypage", { withCredentials: true });
                setInfo(res.data.user);
            } catch (error) {
                console.error("마이페이지 정보 로드 실패:", error);
            }
            const res = await axios.get("/api/mypage/getLod", { withCredentials: true });
            if (res.data.lod) {
                console.log(res.data.lod);
                setIsLod(true);
            } else {
                console.log(res.data.lod);
                setIsLod(false);
            }
        };

        fetchData();
    }, []);

    // 사용
    if (!info) {
        return <div className="loading-container">
            <div className="loading-message">로딩 중...</div>
        </div>
    }

    return (
        <div className="mypage-js">
            <div className="mypage-container">
                <div className="mypage-box">
                    <Profile
                        profileImg={profileImg} isLod={isLod}
                        handleProfileImageChange={handleProfileImageChange}
                        handleProfileImgUpload={handleProfileImgUpload}
                        info={info} handleChange={handleChange}
                        nickMsg={nickMsg} emailMsg={emailMsg} phoneMsg={phoneMsg}
                        handleRemove={handleRemove} handleLogout={handleLogout}
                        openPwModal={openPwModal} setInfo={setInfo} />
                </div>
            </div>
            {pwModal && (
                <div className="pw-modal">
                    <div className="pw-modal-content">
                        <h3>비밀번호 변경</h3>
                        <input value={newPw} onChange={(e) => setNewPw(e.target.value)}
                            type="password" placeholder="새 비밀번호" />
                        <input value={cofirmPw} onChange={(e) => setConfrimPw(e.target.value)}
                            type="password" placeholder="비밀번호 확인" />
                        <button onClick={handlePasswordChange}>변경하기</button>
                        <button onClick={closePwModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

function Profile({ info, isLod, handleChange, setInfo, handleProfileImageChange, handleProfileImgUpload, profileImg,
    openPwModal, handleLogout, handleRemove, nickMsg, emailMsg, phoneMsg }) {
    return (
        <div className="mypage-profile">
            <ProfileLeft info={info} handleChange={handleChange} profileImg={profileImg} isLod={isLod}
                handleProfileImageChange={handleProfileImageChange} handleProfileImgUpload={handleProfileImgUpload}
                handleLogout={handleLogout} handleRemove={handleRemove} />
            <ProfileInfo openPwModal={openPwModal} nickMsg={nickMsg} emailMsg={emailMsg} phoneMsg={phoneMsg}
                info={info} handleChange={handleChange} setInfo={setInfo} />

        </div>
    );
}

function ProfileLeft({ info, handleChange, openPwModal, handleLogout, isLod,
    handleRemove, handleProfileImageChange, handleProfileImgUpload, profileImg, }) {
    return (
        <div className="profile-img-box">
            <ProfileImg profileImg={profileImg} />
            <ProfileEtc info={info} handleProfileImgUpload={handleProfileImgUpload}
                handleProfileImageChange={handleProfileImageChange} isLod={isLod}
                handleChange={handleChange} openPwModal={openPwModal}
                handleRemove={handleRemove} handleLogout={handleLogout} />
        </div>
    );
}

function ProfileImg({ profileImg }) {
    return (
        <div className="profile-img">
            {profileImg ? (
                <img src={profileImg} alt="Profile" style={{ width: "100%", height: "250px" }} />
            ) : (
                <div style={{ padding: "15px", display: "flex", flexDirection: "column", textAlign: "center" }}>
                    <img src={whiteUser} alt="Profile" style={{ width: "100%", height: "auto" }} />
                    <p style={{ margin: "0" }}>기본 이미지</p>
                </div>
            )}
        </div>
    );
}

function ProfileEtc({ isLod, info, handleChange, handleLogout, handleRemove, handleProfileImgUpload, handleProfileImageChange }) {
   console.log(isLod);
   
    return (
        <div className="profile-etc">
            <Link to="/userReserve" style={{ color: "black", "textDecoration": "none" }}>
                <div className="etc-btn">
                    <span>예약내역</span>
                </div>
            </Link>
            <Link to="/userPayment" style={{ color: "black", "textDecoration": "none" }}>
                <div className="etc-btn">
                    <span>결제내역</span>
                </div>
            </Link>
            <Link to="/userFavorite" style={{ color: "black", "textDecoration": "none" }}>
                <div className="etc-btn">
                    <span>찜한 숙소 목록</span>
                </div>
            </Link>
            <Link to="/userView" style={{ color: "black", "textDecoration": "none" }}>
                <div className="etc-btn">
                    <span>최근 본 숙소</span>
                </div>
            </Link>
            <div style={{ width: "80%", backgroundColor: "lightgray", margin: "30px auto", padding: "1px" }}></div>
            <div className="etc-btn" onClick={handleProfileImgUpload}>
                <span>프로필 사진변경</span>
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                style={{ display: "none" }}
                id="profileImageInput"
            />
            <div style={{ width: "80%", backgroundColor: "lightgray", margin: "30px auto", padding: "1px" }}></div>

            {isLod ? (
                <Link to="/myLod" style={{ color: "black", "textDecoration": "none" }}>
                    <p style={{ margin: "0 0 15px 0", color: "gray", fontWeight: "bold" }}>숙소 관리는 여기!</p>
                    <div className="etc-btn" >
                        <span>숙소 관리</span>
                    </div>
                </Link>
            ) : (
                <Link to="/createLod" style={{ color: "black", "textDecoration": "none" }}>
                    <p style={{ margin: "0 0 15px 0", color: "gray", fontWeight: "bold" }}>숙소 회원이시면?</p>
                    <div className="etc-btn" >
                        <span>숙소 등록</span>
                    </div>
                </Link>
            )}
            <div style={{ marginTop: "auto" }} className="user-remove" >
                <span onClick={handleLogout} style={{ color: "gray", cursor: "pointer" }} >로그아웃&nbsp;|</span>
                <span onClick={handleRemove} style={{ color: "gray", cursor: "pointer" }}>&nbsp;회원탈퇴</span>
            </div>
        </div>
    );
}

function ProfileInfo({ info, handleChange, setInfo, openPwModal, nickMsg, emailMsg, phoneMsg }) {
    const passwordDisplay = info.user_pw.slice(0, 14);
    const [open, setOpen] = useState(false);

    //주소찾기
    const toggleHandler = () => {
        setOpen((prevState) => !prevState);
    };
    const completeHandler = (data) => {
        setInfo((prev) => ({
            ...prev,
            user_post: data.zonecode,
            user_address: data.address,
            user_sido: data.sido,
            user_sigungu: data.sigungu,
            user_bname: data.bname || "",
            user_detail: "",
        }));

        setOpen(false);
    }

    //끝
    //수정 axios
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!info.user_pw) {
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (!info.user_nickName) {
            alert("닉네임을 입력해주세요");
            return;
        }
        if (!info.user_email) {
            alert("이메일을 입력해주세요");
            return;
        }
        if (!info.user_phone) {
            alert("전화번호를 입력해주세요")
            return;
        }
        if (!info.user_post) {
            alert("주소를 입력해주세요")
            return;
        }



        const res = await axios.post("/api/mypage/update", info, { withCredentials: true });
        if (res) {
            alert(res.data.msg);
            return;
        } else {
            alert(res.data.msg)
            return;
        }

    }

    return (
        <div className="profile-info" style={{ overflow: "hidden" }}>
            <div className="profile-info-h2">
                <h2 style={{ color: "gray", padding: "0 25px" }}>내정보</h2>
            </div>
            <div className="profile-info-box">
                <div style={{ marginBottom: "15px" }}
                    className="profile-id">
                    <label>아이디</label>
                    <input type="text" value={info.user_id} readOnly />
                </div>
                <div className="profile-pw">
                    <label>비밀번호</label>
                    <div className="post-input-box"
                        style={{ display: "flex", width: "100%", flexDirection: "row", marginBottom: "30px" }}>
                        <input style={{ width: "70%" }}
                            className="mypage-post-input"
                            type="password"
                            value={passwordDisplay}
                            name="user_pw"
                            readOnly
                        />
                        <button onClick={openPwModal}
                            style={{ width: "30%" }} type="button">변경하기</button>
                    </div>
                </div>
                <div className="profile-nick">
                    <label>닉네임</label>
                    <input
                        style={{ marginBottom: "0" }}
                        type="text"
                        value={info.user_nickName}
                        placeholder={info.user_nickName}
                        onChange={handleChange}
                        name="user_nickName" />
                    <div style={{ width: "100%", height: "30px" }}>
                        {nickMsg && <label style={{ color: nickMsg === "사용 가능한 닉네임 입니다." ? "green" : "red" }}>{nickMsg}</label>}
                    </div>
                </div>
                <div className="profile-phone">
                    <label>전화번호</label>
                    <input
                        style={{ marginBottom: "0" }}
                        type="text"
                        value={info.user_phone}
                        placeholder={info.user_phone || "전화번호를 입력하세요."}
                        onChange={handleChange}
                        name="user_phone" />
                    <div style={{ width: "100%", height: "30px" }}>
                        {phoneMsg && <label style={{ color: phoneMsg === "사용가능한 전화번호 입니다." ? "green" : "red" }}>{phoneMsg}</label>}
                    </div>
                </div>
                <div className="profile-email">
                    <label>이메일</label>
                    <div className="post-input-box"
                        style={{ display: "flex", width: "100%", flexDirection: "row", }}>
                        <input style={{ width: "70%", marginBottom: "0" }}
                            className="mypage-post-input"
                            type="text"
                            value={info.user_email}
                            placeholder={info.user_email}
                            onChange={handleChange}
                            name="user_email"
                        />
                        <button style={{ width: "30%" }} type="button">인증하기</button>
                    </div>
                    <div style={{ width: "100%", height: "30px" }}>
                        {emailMsg &&
                            <label style={{ color: emailMsg === "사용 가능한 이메일 입니다." ? "green" : "red" }}>{emailMsg}</label>}
                    </div>
                </div>
                <div style={{ marginBottom: "15px" }}
                    className="profile-gender">
                    <label>성별</label>
                    <input type="text" value={info.user_gender} name="user_gender" readOnly />
                </div>
                <div className="profile-post">
                    <label>우편번호</label>
                    <div className="post-input-box"
                        style={{ display: "flex", width: "100%", flexDirection: "row", marginBottom: "25px" }}>
                        <input style={{ width: "70%" }}
                            className="mypage-post-input"
                            type="text"
                            value={info.user_post}
                            onChange={handleChange}
                            name="user_post"
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
                    <label>주소</label>
                    <input type="text" value={info.user_address} onChange={handleChange} name="user_address" />
                </div>
                <div style={{ marginBottom: "15px" }}
                    className="profile-detail">
                    <label>상세주소</label>
                    <input placeholder="상세주소를 입력하세요."
                        type="text" value={info.user_detail} onChange={handleChange} name="user_detail" />
                </div>
                <div className="profile-save">
                    <button onClick={handleUpdate}
                        className="save-btn">저장하기</button>
                </div>
            </div>
        </div>
    );
}

export default Mypage;
