import React from "react";
import '../css/login.css';
import { Link } from "react-router-dom";

function Login(){
    return(
        <div className="login-container">
            <div className="login-box">
                <div className="login-form">
                    <div className="login-header">
                        <h2>로그인</h2>
                    </div>
                    <div className="login-id">
                        <input type="text" className="id-input" placeholder="아이디"/>
                    </div>
                    <div className="login-pw">
                        <input type="password" className="pw-input" placeholder="비밀번호"/>
                    </div>
                    <button type="button" className="login-btn">로그인</button>
                    <div className="save-login">
                        <div className="auto-login">
                            <input type="checkbox"/>로그인 유지
                        </div>  
                        
                    </div>
                    <div className="signup-url">
                        <p>아직 회원이 아니시라면? <Link to='/signup'>회원가입</Link></p>
                    </div>
                    <br/>
                    <div className="api-login-container">
                        <span>---------------&ensp;또는&ensp;---------------</span>
                    </div>
                    <br/>
                    <button type="button" className="login-btn">카카오 로그인</button>
                    <button type="button" className="login-btn">구글 로그인</button>
                </div>
            </div>

        </div>

    );
}

export default Login;