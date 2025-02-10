import React, { useState } from "react";
import axios from 'axios';

function RoomDetail({ room, closeModal, roomImg,handleRoomUpdate }) {
    const [roomData, setRoomData] = useState(room);
    const [imageFiles, setImageFiles] = useState([]);

    // 해당 객실에 해당하는 이미지들 필터링
    const imgs = roomImg.filter(img => img.file_fk_num === room.room_num);

    // 입력 필드에서 값이 변경될 때마다 roomData 상태 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData({
            ...roomData,
            [name]: value
        });
    };

    // 이미지 업로드 핸들러
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setImageFiles([...imageFiles, ...imageUrls]);
    };

    // 이미지 삭제 핸들러
    const handleImageDelete = async (e, index, isUpload = false, img) => {
        e.preventDefault();
        if (window.confirm("이미지를 삭제 하시겠습니까?")) {
            const updatedImages = imageFiles.filter((_, i) => i !== index);
            if (isUpload) {
                await axios.delete("/api/room/img/del", {
                    headers: {
                        'Content-Type': "application/json"
                    },
                    params: {
                        file_num: img.file_num,  // 실제 file_num
                        file_fk_num: img.file_fk_num  // 해당 room에 대한 fk
                    }
                })
                    .then(res => {
                        console.log('이미지 삭제 성공', res);
                        setImageFiles(updatedImages);  // 삭제 후 상태 업데이트
                    })
                    .catch(err => {
                        console.error('이미지 삭제 실패', err);
                        alert("이미지 삭제에 실패했습니다.");
                    });
            } else {
                setImageFiles(updatedImages);
            }
        }
    };

    // 저장하기
    const handleSave = async () => {
        const res = await axios.post("/api/room/update", roomData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        window.location.reload(); 
        handleRoomUpdate(res.data);
        alert("저장 되었습니다.");
        closeModal();  // 저장 후 모달 닫기
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>{room.room_name} 객실 정보</h2>

                <div className="room-modal-img-box">
                    {imgs.map((img, index) => (
                        <form onSubmit={(e) => handleImageDelete(e, index, true, img)} >
                            <div key={index} style={{ position: 'relative', display: 'inline-block', marginBottom: '10px' }}>
                                <img
                                    className="room-modal-img"
                                    key={index}
                                    src={img.img || ""}
                                    alt={`객실이미지${index + 1}`}
                                />
                                <button className="room-img-del-btn">
                                    X
                                </button>
                            </div>
                        </form>
                    ))}
                    {imageFiles.length > 0 && imageFiles.map((image, index) => (
                        <form onSubmit={(e) => handleImageDelete(e, index, false)} >
                            <div key={index} style={{ position: 'relative', display: 'inline-block', marginBottom: '10px' }}>
                                <img
                                    className="room-modal-img"
                                    src={image}
                                    alt={`미리보기 이미지 ${index + 1}`}
                                />
                                {/* 삭제 버튼 (X) */}
                                <button className="room-img-del-btn">
                                    X
                                </button>
                            </div>
                        </form>
                    ))}
                </div>

                {/* 객실 정보 입력 폼 */}
                <div className="room-modal-info">
                    <h2>객실 수정</h2>
                    <div className="room-modal-info-title">
                        <label htmlFor="room_name">객실명</label>
                        <input
                            type="text"
                            id="room_name"
                            name="room_name"
                            value={roomData.room_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="room-modal-info-title">
                        <label htmlFor="room_count">객실수</label>
                        <input
                            type="number"
                            id="room_count"
                            name="room_count"
                            value={roomData.room_count}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="room-modal-info-title">
                        <label htmlFor="room_min">최소 인원</label>
                        <input
                            type="number"
                            id="room_min"
                            name="room_min"
                            value={roomData.room_min}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="room-modal-info-title">
                        <label htmlFor="room_max">최대 인원</label>
                        <input
                            type="number"
                            id="room_max"
                            name="room_max"
                            value={roomData.room_max}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="room-modal-info-title">
                        <label htmlFor="room_smoke">흡연여부</label>
                        <input
                            type="text"
                            id="room_smoke"
                            name="room_smoke"
                            value={roomData.room_smoke === "Y" ? "흡연가능" : "흡연불가"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="room-modal-info-title">
                        <label htmlFor="room_bed">침대</label>
                        <input
                            type="text"
                            id="room_bed"
                            name="room_bed"
                            value={roomData.room_bed}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="room-modal-info-title">
                        <label htmlFor="room_size">평수</label>
                        <input
                            type="text"
                            id="room_size"
                            name="room_size"
                            value={roomData.room_size}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="room-modal-info-title">
                        <label htmlFor="room_detail">상세내용</label>
                        <textarea
                            id="room_detail"
                            name="room_detail"
                            value={roomData.room_detail}
                            onChange={handleChange}
                        />
                    </div>

                    {/* 이미지 업로드 */}
                    <div className="room-modal-info-title">
                        <label htmlFor="room_images">이미지 업로드</label>
                        <input
                            type="file"
                            id="room_images"
                            name="room_images"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="room-modal-info-title">
                        <button onClick={handleSave}>저장하기</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default RoomDetail;
