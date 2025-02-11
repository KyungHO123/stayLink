import React, { useState } from "react";
import axios from "axios";

function DayListModal({ closeModal, dayDetail }) {
    const [editedDayDetail, setEditedDayDetail] = useState({ ...dayDetail });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedDayDetail(prev => {
            const updatedStayRoom = {
                ...prev,
                [name]: value,
            };
            if (updatedStayRoom.day_price && updatedStayRoom.day_discount) {
                const price = parseFloat(updatedStayRoom.day_price);
                const discount = parseFloat(updatedStayRoom.day_discount);
                if (!isNaN(price) && !isNaN(discount) && price > 0 && discount >= 0) {
                    const discountedPrice = price - (price * (discount / 100));
                    updatedStayRoom.day_disc = discountedPrice.toFixed(0)
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
    const handleSave =async ()=>{
        if(!editedDayDetail){
            alert("모든 정보를 입력해주세요.");
            return;
        }
        if(editedDayDetail.day_start > editedDayDetail.day_end){
            alert("시작시간은 종료시간보다 작아야 합니다.");
            return;
        }
        if (editedDayDetail.day_discount < 0 || editedDayDetail.day_discount > 100) {
            alert("할인율은 0 이상 100 이하로 입력해야 합니다.");
            return;
        }
        if(editedDayDetail.day_count > editedDayDetail.room.room_count){
            alert(`객실 수는 최대 ${editedDayDetail.room.room_count}개 까지 가능합니다.`);
            return;
        }
        const res = await axios.post("/api/day/update", editedDayDetail, {
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
                <h2 className="stayDetail-modal-title">대실 객실 정보 수정</h2>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">객실명</label>
                    <input
                        type="text"
                        readOnly
                        name="room_name"
                        className="stayDetail-input"
                        value={editedDayDetail.room?.room_name || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">시작시간</label>
                    <input
                        type="time"
                        name="day_start"
                        className="stayDetail-input"
                        value={formatTime(editedDayDetail.day_start)}
                        onChange={handleChange}
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">종료시간</label>
                    <input
                        type="time"
                        name="day_end"
                        className="stayDetail-input"
                        value={formatTime(editedDayDetail.day_end)}
                        onChange={handleChange}
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">금액</label>
                    <input
                        type="number"
                        name="day_price"
                        className="stayDetail-input"
                        value={editedDayDetail.day_price}
                        onChange={handleChange}
                        placeholder="금액을 입력하세요."
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">할인율</label>
                    <input
                        type="number"
                        name="day_discount"
                        className="stayDetail-input"
                        value={editedDayDetail.day_discount || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">최종 금액</label>
                    <input
                        readOnly
                        type="number"
                        name="day_disc"
                        className="stayDetail-input"
                        value={editedDayDetail.day_disc || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="stayDetail-modal-title-box">
                    <label className="stayDetail-label">객실 수</label>
                    <input
                        type="number"
                        name="day_count"
                        className="stayDetail-input"
                        value={editedDayDetail.day_count || ""}
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
    )
}
export default DayListModal;