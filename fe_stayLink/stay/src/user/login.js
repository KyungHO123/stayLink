import React, { useState } from "react";
import '../css/login.css';
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";

function Login({setIsLogin}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        pw: ""
    });
    const handleChange = ((e) => {
        const {name, value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name] : value,
        }));
    });
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!formData.id || !formData.pw){
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }
        const res = await axios.post("/api/login", formData,{ withCredentials: true });
            console.log(res.data);
            if (res.data.msg) {
                setIsLogin(false);
                alert(res.data.msg);
                return;
            } else {
                setIsLogin(true);
                alert("로그인이 완료되었습니다");
                navigate("/");
                return;
               
            }
       
    };
   
    return (
        <form onSubmit={handleSubmit}>
            <div className="login-container">
                <div className="login-box">
                    <div className="login-form">
                        <div className="login-header">
                            <h2>로그인</h2>
                        </div>
                        <div className="login-id">
                            <input name="id"
                            value={formData.id} onChange={handleChange}
                            type="text" className="id-input" placeholder="아이디" />
                        </div>
                        <div className="login-pw">
                            <input name="pw"
                            value={formData.pw} onChange={handleChange}
                            type="password" className="pw-input" placeholder="비밀번호" />
                        </div>
                        <button  className="login-btn">로그인</button>
                        <div className="save-login">
                            <div className="auto-login">
                                <input type="checkbox" />로그인 유지
                            </div>

                        </div>
                        <div className="signup-url">
                            <p>아직 회원이 아니시라면? <Link to='/signup'>회원가입</Link></p>
                        </div>
                        <br />
                        <div className="api-login-container">
                            <span>---------------&ensp;또는&ensp;---------------</span>
                        </div>
                        <br />
                        <button type="button" className="login-btn">카카오 로그인</button>
                        <button type="button" className="login-btn">구글 로그인</button>
                    </div>
                </div>

            </div>
        </form>

    );
}

export default Login;