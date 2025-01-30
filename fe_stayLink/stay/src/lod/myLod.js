import React, { useEffect, useState } from 'react';
import '../css/myLod.css';
import axios from 'axios';


function MyLod({ isLod, setIsLod }) {
               
    const [lodImg, setLodImg] = useState("");
    const [lodInfo, setLodInfo] = useState("");
    useEffect(() => {
        axios.get('api/lod/myLod',{ withCredentials: true })
            .then((res) => {
                setLodImg(res.data.img);
                setLodInfo(res.data.lod);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="myLod">
            <div className='myLod-container'>
                <div className='myLod-box'>
                    <div className='myLod-title'>
                        <h1>숙소 관리</h1>
                    </div>
                    <MyLodImg lodImg={lodImg} />
                    <MyLodInfo lodInfo={lodInfo}/>

                </div>
            </div>
        </div>
    );
}
function MyLodImg({ lodImg }) {
    return (
        <div className='myLod-imgBox'>
            숙소 이미지
        </div>
    );

}
function MyLodInfo({ lodInfo }) {
    return (
        <div className='myLod-infoBox'>
            <div className='myLod-title'>
                <h3>숙소명</h3>
            </div>
            <div className='myLod-title'>
                <h3>사업자 번호</h3>
            </div>
            <div className='myLod-title'>
                <h3>주소</h3>
            </div>
            <div className='myLod-title'>
                <h3>숙소정보</h3>

            </div>

        </div>
    );

}

export default MyLod;