import React, { useState, useEffect } from "react";
import "../css/mypage.css";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

function Mypage({ isLogin, setIsLogin }) {
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);
    const [pwModal, setPwModal] = useState(false);
    const [newPw, setNewPw] = useState("");
    const [cofirmPw, setConfrimPw] = useState("");
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
    useEffect(() => {
        axios.get("/api/mypage", { withCredentials: true })
            .then((res) => {
                setInfo(res.data.user);
            })
            .catch((error) => {
                console.error("마이페이지 정보 로드 실패:", error);
            });
    }, []);

    // 사용
    if (!info) {
        return <div className="loading-container">
            <div className="loading-message">로딩 중...</div>
        </div>
    }

    // onChange 이벤트 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
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

    return (
        <div className="mypage-js">
            <div className="mypage-container">
                <div className="mypage-box">
                    <Profile info={info} handleChange={handleChange}
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

function Profile({ info, handleChange, setInfo, openPwModal, handleLogout, handleRemove }) {
    return (
        <div className="mypage-profile">
            <ProfileLeft info={info} handleChange={handleChange}
                handleLogout={handleLogout} handleRemove={handleRemove} />
            <ProfileInfo openPwModal={openPwModal}
                info={info} handleChange={handleChange} setInfo={setInfo} />

        </div>
    );
}

function ProfileLeft({ info, handleChange, openPwModal, handleLogout, handleRemove }) {
    return (
        <div className="profile-img-box">
            <ProfileImg />
            <ProfileEtc info={info}
                handleChange={handleChange} openPwModal={openPwModal}
                handleRemove={handleRemove} handleLogout={handleLogout} />
        </div>
    );
}

function ProfileImg() {
    return (
        <div className="profile-img">
            프사
        </div>
    );
}

function ProfileEtc({ info, handleChange, handleLogout, handleRemove }) {
    return (
        <div className="profile-etc">
            <div className="etc-btn">
                <span>예약내역</span>
            </div>
            <div className="etc-btn">
                <span>결제내역</span>
            </div>
            <div className="etc-btn">
                <span>찜한 숙소 목록</span>
            </div>
            <div className="etc-btn">
                <span>최근 본 숙소</span>
            </div>
            <div style={{ width: "80%", backgroundColor: "lightgray", margin: "30px auto", padding: "1px" }}></div>
            <div className="etc-btn">
                <span>프로필 사진변경</span>
            </div>
            <div className="etc-btn" onClick={handleLogout}>
                <span>로그아웃</span>
            </div>
            <div style={{ marginTop: "auto" }} className="user-remove" onClick={handleRemove}>
                <span style={{ color: "gray", cursor: "pointer" }}>회원탈퇴</span>
            </div>
        </div>
    );
}

function ProfileInfo({ info, handleChange, setInfo, openPwModal }) {
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
        <div className="profile-info">
            <div className="profile-info-h2">
                <h2 style={{ color: "gray", padding: "0 25px" }}>내정보</h2>
            </div>
            <div className="profile-info-box">
                <div className="profile-id">
                    <label>아이디</label>
                    <input type="text" value={info.user_id} readOnly />
                </div>
                <div className="profile-pw">
                    <label>비밀번호</label>
                    <div className="post-input-box"
                        style={{ display: "flex", width: "100%", flexDirection: "row", marginBottom: "15px" }}>
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
                    <input type="text"
                        value={info.user_nickName}
                        placeholder={info.user_nickName}
                        onChange={handleChange}
                        name="user_nickName" />
                </div>
                <div className="profile-phone">
                    <label>전화번호</label>
                    <input type="text"
                        value={info.user_phone}
                        placeholder={info.user_phone || "전화번호를 입력하세요."}
                        onChange={handleChange}
                        name="user_phone" />
                </div>
                <div className="profile-email">
                    <label>이메일</label>
                    <div className="post-input-box"
                        style={{ display: "flex", width: "100%", flexDirection: "row", marginBottom: "15px" }}>
                        <input style={{ width: "70%" }}
                            className="mypage-post-input"
                            type="text"
                            value={info.user_email}
                            placeholder={info.user_email}
                            onChange={handleChange}
                            name="user_email"
                        />
                        <button style={{ width: "30%" }} type="button">인증하기</button>
                    </div>
                </div>
                <div className="profile-gender">
                    <label>성별</label>
                    <input type="text" value={info.user_gender} name="user_gender" readOnly />
                </div>
                <div className="profile-post">
                    <label>우편번호</label>
                    <div className="post-input-box"
                        style={{ display: "flex", width: "100%", flexDirection: "row", marginBottom: "15px" }}>
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
                <div className="profile-address">
                    <label>주소</label>
                    <input type="text" value={info.user_address} onChange={handleChange} name="user_address" />
                </div>
                <div className="profile-detail">
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
