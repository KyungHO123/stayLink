import axios from "axios";
import React, { useState } from "react";

function StayListModal({ closeModal, stayDetail }) {

    const [editedStayDetail, setEditedStayDetail] = useState({ ...stayDetail });
    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedStayDetail(prev => {
            const updatedStayRoom = {
                ...prev,
                [name]: value,
            };
            if (updatedStayRoom.stay_price && updatedStayRoom.stay_discount) {
                const price = parseFloat(updatedStayRoom.stay_price);
                const discount = parseFloat(updatedStayRoom.stay_discount);
                if (!isNaN(price) && !isNaN(discount) && price > 0 && discount >= 0) {
                    const discountedPrice = price - (price * (discount / 100));
                    updatedStayRoom.stay_disc = discountedPrice.toFixed(0)
                }
            }
            return updatedStayRoom;
        })

    };

    const formatTime = (localTime) => {
        if (!localTime) return;
        const timeString = typeof localTime === "object"
            &&
            localTime.toString ? localTime.toString() : localTime

        return timeString.replace(",", ":").slice(0, 5);
    };
    const handleSave = async () => {
        if (!editedStayDetail) {
            alert("모든 항목을 입력해주세요.");
            return;
        }
        if (editedStayDetail.stay_count > editedStayDetail.room.romm_count) {
            alert("이용 가능 객실이 현재 객실수보다 많습니다.")
            return;
        }
        if(editedStayDetail.stay_discount < 0 && editedStayDetail.stay_discount > 100){
            alert("할인율을 제대로 입력해주세요.\n(0~100)")
            return;
        }

        const res = await axios.post("/api/stay/update", editedStayDetail, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res.status === 200) {
            window.location.reload();
            alert("저장 되었습니다.")
            closeModal();
        }
    }


    return (
        <div className="stayDetail-modal-overlay">
            <div className="stayDetail-modal-content">
                <h2 className="stayDetail-modal-title">숙박 객실 정보 수정</h2>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">객실명</label>
                    <input
                        type="text" 
                        readOnly
                        name="room_name"
                        className="stayDetail-input"
                        value={editedStayDetail.room?.room_name || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">체크인</label>
                    <input
                        type="time"
                        name="stay_in"
                        className="stayDetail-input"
                        value={formatTime(editedStayDetail.stay_in)}
                        onChange={handleChange}
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">체크아웃</label>
                    <input
                        type="time"
                        name="stay_out"
                        className="stayDetail-input"
                        value={formatTime(editedStayDetail.stay_out)}
                        onChange={handleChange}
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">금액</label>
                    <input
                        type="number"
                        name="stay_price"
                        className="stayDetail-input"
                        value={editedStayDetail.stay_price}
                        onChange={handleChange}
                        placeholder="금액을 입력하세요."
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">할인율</label>
                    <input
                        type="number"
                        name="stay_discount"
                        className="stayDetail-input"
                        value={editedStayDetail.stay_discount || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">최종 금액</label>
                    <input
                        readOnly
                        type="number"
                        name="stay_disc"
                        className="stayDetail-input"
                        value={editedStayDetail.stay_disc || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">객실 수</label>
                    <input
                        type="number"
                        name="stay_count"
                        className="stayDetail-input"
                        value={editedStayDetail.stay_count || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className="stayDetail-modal-buttons">
                    <button className="stayDetail-save-button" onClick={handleSave}>저장</button>
                    <button className="stayDetail-close-button" onClick={closeModal}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StayListModal;
