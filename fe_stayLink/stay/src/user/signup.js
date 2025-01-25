import React from "react";
import '../css/signup.css';

function Signup() {
    return (
        <div className="signup">
            <div className="signup-container">
                <div className="signup-form">
                    <h1 style={{marginBottom : '50px'}}>회원가입</h1>
                    <div className="signup-id">
                        <input type="text" placeholder="아이디" 
                        style={{width:'70%',borderTopRightRadius:'0',borderBottomRightRadius:'0'}} />
                        <button className="duplication-btn">중복확인</button>
                    </div>
                    <div className="signup-pw">
                        <input type="text" placeholder="비밀번호" />
                    </div>
                    <div className="signup-pw">
                        <input type="text" placeholder="비밀번호 확인" />
                    </div>
                    <div className="signup-name">
                        <input type="text" placeholder="닉네임" />
                    </div>
                    <div className="signup-gender">
                        <span>
                            <input type="radio" />남자
                            <input type="radio" />여자
                        </span>
                    </div>
                    <div className="signup-email">
                        <input type="text" placeholder="이메일" />
                    </div>
                    <div className="signup-phone">
                        <input type="text" placeholder="휴대폰" />
                    </div>
                    <div className="signup-post">
                        <input type="text" placeholder="우편번호" readOnly
                        style={{width:'70%',borderTopRightRadius:'0',borderBottomRightRadius:'0'}} />
                        <button className="address-btn">주소찾기</button>
                    </div>
                    <div className="signup-address"> 
                        <input type="text" placeholder="주소" readOnly/>
                    </div>
                    <div className="signup-detail">
                        <input type="text" placeholder="상세주소" />
                    </div>
                    <div className="signup-btn">
                        <button>회원 가입</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Signup;