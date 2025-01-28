import React, { useState } from "react";
import "../css/signup.css";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [idMsg, setIdMsg] = useState("");
    const [pwMsg, setPwMsg] = useState("");
    const [pw2Msg, setPw2Msg] = useState("");
    const [nickMsg, setNickMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");
    const [phoneMsg, setPhoneMsg] = useState("");
    const [idCheck, setIdCheck] = useState(false);
    
    const number = /^[0-9]*$/;
    const specialCharRegex = /[^a-zA-Z0-9]/;
    const specialCharNick = /[^a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const koreanCharRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [formData, setFormData] = useState({
        user_id: "",
        user_pw: "",
        user_pw2: "",
        user_email: "",
        user_phone: "",
        user_nickName: "",
        user_post: "",
        user_address: "",
        user_detail: "",
        user_sido: "",
        user_sigungu: "",
        user_bname: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Validation for each field
        if (name === "user_id") {
            setIdMsg(
                value.length < 8 || value.length > 14
                    ? "아이디는 8자 ~ 14자로 입력해주세요."
                    : specialCharRegex.test(value) || koreanCharRegex.test(value)
                        ? "아이디에 한글 또는 특수문자를 사용할 수 없습니다."
                        : ""
            );
        } else if (name === "user_pw") {
            setPwMsg(
                value.length < 12 || value.length > 20
                    ? "비밀번호는 12자 ~ 20자로 입력해주세요."
                    : value.length >= 12 || value.length <=20
                    ? "사용 가능한 비밀번호 입니다."
                    :""
            )
        } else if (name === "user_pw2") {
            setPw2Msg(
                value.length < 12 || value.length > 20
                    ? "비밀번호는 12자 ~ 20자로 입력해주세요."
                    : value !== formData.user_pw
                        ? "비밀번호가 일치하지 않습니다."
                        : "비밀번호가 일치합니다."
            );

        } else if (name === "user_nickName") {
            setNickMsg(
                value.length < 2 || value.length > 8
                    ? "닉네임은 2자 ~ 8자로 입력해주세요."
                    : specialCharNick.test(value)
                        ? "닉네임에 특수문자를 사용할 수 없습니다."
                        : value.length >= 2 || value.length <=8
                        ? "사용 가능한 닉네임 입니다."
                        :""
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!idCheck) {
            alert("아이디 중복확인을 해주세요.");
            return;
        }

        if (!formData.user_id) {
            alert("아이디를 입력해주세요.");
            return;
        }
        if (!formData.user_pw) {
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (!formData.user_nickName) {
            alert("닉네임을 입력해주세요");
            return;
        }
        if (!formData.user_gender) {
            alert("성별을 선택해주세요.");
            return;
        }
        if (!formData.user_email) {
            alert("이메일을 입력해주세요");
            return;
        }
        if (!formData.user_phone) {
            alert("전화번호를 입력해주세요")
            return;
        }
        if (!formData.user_post) {
            alert("주소를 입력해주세요")
            return;
        }

        const { user_pw2, ...requestData } = formData; // user_pw2 제외
        const res = await axios.post("/api/signup", requestData);
        try {
            if (res.status === 200) {
                alert("회원가입이 완료되었습니다!");
                navigate("/login");
            } else {
                alert("회원가입에 실패했습니다.");
            }
        } catch (error) {
            console.log(error);

        }

    };

    const completeHandler = (data) => {
        setFormData((prev) => ({
            ...prev,
            user_post: data.zonecode,
            user_address: data.address,
            user_sido: data.sido,
            user_sigungu: data.sigungu,
            user_bname: data.bname || "",
        }));
        setOpen(false); // Close address modal
    };

    const toggleHandler = () => {
        setOpen((prevOpenState) => !prevOpenState);
    };

    const handleIdCheck = async () => {
        if (!formData.user_id) {
            alert("아이디를 입력해주세요.")
            return;
        } else if (formData.user_id.length < 8
            || formData.user_id.length > 14) {
            alert("아이디는 8자 ~ 14자로 입력해주세요.");
            setIdMsg("아이디는 8자 ~ 14자로 입력해주세요.");
            return;
        } else if (specialCharRegex.test(formData.user_id)
            || koreanCharRegex.test(formData.user_id)) {
            alert("아이디에 한글 또는 특수문자를 사용할 수 없습니다.");
            setIdMsg("아이디에 한글 또는 특수문자를 사용할 수 없습니다.");
            return;
        }
        
        const res = await axios.post("/api/checkId", { user_id: formData.user_id });
        if (res.data.res) {
            alert("사용 가능한 아이디입니다.");
            setIdMsg("사용 가능한 아이디입니다.");
            setIdCheck(true);
        } else {
            alert("이미 사용중인 아이디입니다.");
            setIdMsg("이미 사용중인 아이디입니다.");
            setIdCheck(false);
        }

    }
    return (
        <div className="signup">
            <div className="signup-container">
                <form onSubmit={handleSubmit}>
                    <div className="signup-form">
                        <h1 style={{ marginBottom: "50px" }}>회원가입</h1>

                        <div className="signup-id" style={{ display: "flex", alignItems: "center" }}>
                            <input
                                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                type="text"
                                name="user_id"
                                placeholder="아이디 8~14자, 특수문자, 한글 불가"
                                value={formData.user_id}
                                onChange={handleChange}
                            />
                            <button type="button" onClick={handleIdCheck} className="dupl-btn" id="idBtn">중복확인</button>
                        </div>
                        <div style={{ width: "100%", height: "30px" }}>
                            {idMsg && <label style={{ color: idMsg ==="사용 가능한 아이디입니다."? "green" : "red"}}>{idMsg}</label>}
                        </div>

                        <div className="signup-pw" style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                            <input
                                type="password"
                                name="user_pw"
                                placeholder="비밀번호 12자 ~ 20자 특수문자 포함"
                                value={formData.user_pw}
                                onChange={handleChange}
                            />
                            <div style={{ width: "100%", height: "30px" }}>

                                {pwMsg && <label style={{ color: pwMsg ==="사용 가능한 비밀번호 입니다."?"green":"red" }}>{pwMsg}</label>}
                            </div>

                        </div>

                        <div className="signup-pw" style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                            <input
                                type="password"
                                name="user_pw2"
                                placeholder="비밀번호 확인"
                                value={formData.user_pw2}
                                onChange={handleChange}

                            />
                            <div style={{ width: "100%", height: "30px" }}>
                                {pw2Msg && (
                                    <label
                                        style={{
                                            color: pw2Msg === "비밀번호가 일치합니다." ? "green" : "red",
                                        }}
                                    >
                                        {pw2Msg}
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="signup-name" style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                            <input
                                type="text"
                                name="user_nickName"
                                placeholder="닉네임 2자 ~ 8자 특수문자 제외"
                                value={formData.user_nickName}
                                onChange={handleChange}
                            />
                            <div style={{ width: "100%", height: "30px" }}>
                                {nickMsg && <label style={{ color: nickMsg ==="사용 가능한 닉네임 입니다."?"green":"red" }}>{nickMsg}</label>}
                            </div>
                        </div>

                        <div className="signup-gender" style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                            <span>
                                <input
                                    type="radio"
                                    name="user_gender"
                                    value="남자"
                                    checked={formData.user_gender === "남자"}
                                    onChange={handleChange}
                                />{" "}
                                남자
                                <input
                                    type="radio"
                                    name="user_gender"
                                    value="여자"
                                    checked={formData.user_gender === "여자"}
                                    onChange={handleChange}
                                />{" "}
                                여자
                            </span>
                        </div>

                        <div className="signup-email" style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                            <input
                                type="email"
                                name="user_email"
                                placeholder="이메일 (example@example.com)"
                                value={formData.user_email}
                                onChange={handleChange}
                            />
                            <div style={{ width: "100%", height: "30px" }}>
                                {emailMsg && <label style={{ color: emailMsg === "사용 가능한 이메일 입니다."?"green" :"red" }}>{emailMsg}</label>}
                            </div>
                        </div>

                        <div className="signup-phone" style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                            <input
                                type="text"
                                name="user_phone"
                                placeholder="휴대폰 '-'없이 11자"
                                value={formData.user_phone}
                                onChange={handleChange}
                            />
                            <div style={{ width: "100%", height: "30px" }}>
                                {phoneMsg && <label style={{ color: phoneMsg ==="사용가능한 전화번호 입니다."?"green" :"red" }}>{phoneMsg}</label>}
                            </div>
                        </div>

                        {/* 우편번호, 주소 */}
                        <div className="signup-post" style={{ marginBottom: "30px" }} >
                            <input
                                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                type="text"
                                name="user_post"
                                placeholder="우편번호"
                                value={formData.user_post}
                                readOnly
                            />
                            <button type="button" onClick={toggleHandler}>
                                주소찾기
                            </button>
                        </div>
                        {open && (
                            <DaumPostcode
                                onComplete={completeHandler}
                                style={{ width: "100%", height: "480px" }}
                            />
                        )}

                        <div className="signup-address" style={{ marginBottom: "30px" }}>
                            <input
                                type="text"
                                name="user_address"
                                placeholder="주소"
                                value={formData.user_address}
                                readOnly
                            />
                        </div>

                        <div className="signup-detail" style={{ marginBottom: "30px" }}>
                            <input
                                type="text"
                                name="user_detail"
                                placeholder="상세주소"
                                value={formData.user_detail}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="signup-btn">
                            <button type="submit">회원가입</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
