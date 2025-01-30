import React, { useEffect, useState } from 'react';
import '../css/myLod.css';
import axios from 'axios';

function MyLod() {
const [lodImg, setLodImg] = useState("");
    return (
        <div className="myLod">
            <div className='myLod-container'>
                <div className='myLod-box'>
                    <div className='myLod-title'>
                        <h1>숙소 관리</h1>
                    </div>
                    <MyLodImg lodImg={lodImg}/>
                    <MyLodInfo/>
                    
                </div>
            </div>
        </div>
    );
}
function MyLodImg({lodImg}){
    return(
        <div className='myLod-img'>
            숙소 이미지
        </div>
    );

}
function MyLodInfo(){
    return(
        <div className='myLod-info'>
            숙소 정보
        </div>
    );

}

export default MyLod;