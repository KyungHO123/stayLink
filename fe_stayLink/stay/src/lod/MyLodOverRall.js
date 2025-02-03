import React from "react";
import '../css/myLod.css';
import MyLodManagement from "./MyLodManagement";
import MyLodInfo from "./MyLodInfo";


function MyLodOverall({ lodInfo ,setLodInfo}) {
    return (
        <div className='myLod-infoBox'>
            <MyLodManagement />
            <MyLodInfo lodInfo={lodInfo} setLodInfo={setLodInfo} />

        </div>
    );

}

export default MyLodOverall;