import React, { useEffect, useState } from 'react';
import '../css/myLod.css';
import axios from 'axios';
import MyLodImg from './MyLodImg';
import MyLodOverRall from './MyLodOverRall';


function MyLod({ isLod, setIsLod }) {
    const [file,setFile] = useState(null);
    const [lodImg, setLodImg] = useState([]);
    const [lodInfo, setLodInfo] = useState("");
    const [page,setPage] = useState(1);
    const [perPageNum,setPerPageNum] = useState(6);
    const [pageMaker,setPageMaker] = useState(null);
    useEffect(() => {
        axios.get('api/lod/myLod', { 
            withCredentials: true ,
            params : {page,perPageNum}
            })
            .then((res) => {
                setFile(res.data.file_num);
                setLodImg(res.data.img);
                setLodInfo(res.data.lod);
                setPageMaker(res.data.pageMaker)
                console.log(res.data.img)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page,perPageNum],[lodImg]);

    return (
        <div className="myLod">
            <div className='myLod-container'>
                <div className='myLod-box'>
                    <div className='myLod-title' style={{ display: 'flex', width: "100%" }}>
                        <h1>
                            <span style={{ color: "gray", }}>&lt;
                                {lodInfo.lod_name}숙소
                            </span>
                        </h1>

                    </div>
                    <MyLodImg lodInfo={lodInfo} file={file}setFile={setFile}lodImg={lodImg} page={page} setPage={setPage} pageMaker={pageMaker} setLodImg={setLodImg} perPageNum={perPageNum}/>
                    <MyLodOverRall lodInfo={lodInfo} setLodInfo={setLodInfo} />
                </div>
            </div>
        </div>
    );
}

export default MyLod;







