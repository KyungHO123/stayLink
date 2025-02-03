import React, { useState, useEffect } from 'react';
import '../css/myLod.css';
import axios from 'axios';


function MyLodImg({ lodInfo, setLodImg, lodImg, page, setPage, pageMaker, perPageNum }) {
    const [imgCount, setImgCount] = useState(Array(12));
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageChange = async (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImg = URL.createObjectURL(file);
            setLodImg(prevLodImg => [...prevLodImg, { file_path: newImg }]);
        } else {
            return;
        }
        const form = new FormData();
        form.append("file", file);
        form.append("lod_user_num", lodInfo.lod_user_num);
        const res = await axios.post("/api/img/upload", form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
        alert(res.data.msg);
        if (res.data.res) {
            setLodImg(prevLodImg => prevLodImg.map((img, i) => i === index ? { ...img, file_num: lodImg.file_num } : img));
            
        } else {
            setLodImg(prevLodImg => prevLodImg.filter((_, i) => i !== index));
        }
    };

    const handleImgDelete = async (e, fileNum, index) => {
        e.preventDefault();
        if (window.confirm("숙소 이미지를 삭제 하시겠습니까?")) {


            const res = await axios.post("/api/img/delete", null,{
                params :{ file_num: fileNum }
            });
            alert(res.data.msg);
            if (res.data.res) {
                setLodImg(prevLodImg => prevLodImg.filter((_, i) => i !== index));
            }
        } else {
            return;
        }


    }
    return (
        <div className='myLod-imgBox'>
            <div className='img-list'>
                {/* 현재 페이지에 해당하는 이미지들만 표시 */}
                {Array.isArray(lodImg)&&lodImg.map((img, index) => (
                    <form onSubmit={(e) => handleImgDelete(e, img.file_num, index)}>
                        <div key={index} className="img-container">
                            <button className="delete-btn" >X</button>
                            <img src={img.file_path} alt={`숙소 이미지 ${index + 1}`} className="lod-img"
                                onClick={() => setSelectedImg(img.file_path)} />
                        </div>
                    </form>
                ))}


                {Array.from({
                    length: Math.max(0, perPageNum - lodImg.slice((page - 1)).length) -1
                }).map((_, index) => {
                    const uploadIndex = perPageNum + lodImg.slice((page - 1) * perPageNum).length + index;
                    return (
                        <React.Fragment key={`upload-${uploadIndex}`}>
                            <div className='label-container'>
                                <label htmlFor={`file-upload-${uploadIndex}`} className="upload-label">
                                    +
                                </label>
                            </div>
                            <input
                                id={`file-upload-${uploadIndex}`}
                                type="file"
                                name={`lod_image-${uploadIndex}`}
                                accept="image/*"
                                className="file-input-hidden"
                                onChange={(e) => handleImageChange(e, uploadIndex)}
                            />
                        </React.Fragment>
                    );
                })}


            </div>

            {pageMaker && (
                <div className="pagination-container">
                    <button className="page-arrow" onClick={() => setPage(page - 1)} disabled={page === 1}>
                        ◀
                    </button>
                    {Array.from({ length: pageMaker.endPage - pageMaker.startPage + 1 }, (_, i) => (
                        <button
                            key={i}
                            className={`page-button ${page === pageMaker.startPage + i ? "active" : ""}`}
                            onClick={() => setPage(pageMaker.startPage + i)}
                        >
                            {pageMaker.startPage + i}
                        </button>
                    ))}
                    <button className="page-arrow" onClick={() => setPage(page + 1)} >
                        ▶
                    </button>
                </div>
            )}
            {selectedImg && (
                <div className="modal-overlay" onClick={() => setSelectedImg(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedImg(null)}>X</button>
                        <img src={selectedImg} onClick={() => setSelectedImg(null)} alt="확대된 숙소 이미지" className="full-image" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyLodImg;
