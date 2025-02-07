import React, { useState, useEffect } from "react";
import '../css/myLod.css';
import { Link } from "react-router-dom";


function MyLodManagement() {
    return (
        <div className='myLod-management'>
            <div>
                <h2 style={{ color: "gray" }}>종합 관리</h2>
            </div>
            <div className="manage-box">
                <Link to="/room/app" className="myLodLink">
                    <div className="manage-btn-box">
                        <span className="manage-btn">객실 관리</span>
                    </div>
                </Link>
                <div className="current-box">
                    <span>객실현황</span>
                </div>
            </div>
            <div className="manage-box">
                <Link to="/reserve/app"  className="myLodLink">
                    <div className="manage-btn-box">
                        <span className="manage-btn">예약 관리</span>
                    </div>
                </Link>
                <div className="current-box">
                    ...
                </div>
            </div>
            <div className="manage-box">
                <Link to="/sales/app"  className="myLodLink">
                    <div className="manage-btn-box">
                        <span className="manage-btn">매출 관리</span>
                    </div>
                </Link>
                <div className="current-box">
                    ...
                </div>
            </div>
            <div className="manage-box">
                <Link to="/reserveUser/app"  className="myLodLink">
                    <div className="manage-btn-box">
                        <span className="manage-btn">예약한 회원 조회</span>
                    </div>
                </Link>
                <div className="current-box">
                    ...
                </div>
            </div>

        </div>
    );
}

export default MyLodManagement;