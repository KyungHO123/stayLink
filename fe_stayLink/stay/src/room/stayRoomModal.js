import React, { useState } from "react";
import axios from "axios";

function StayRoomModal({ room, closeModal }) {
    const [stayRoom, setStayRoom] = useState({
        stay_in: "",             // 체크인 시간
        stay_out: "",            // 체크아웃 시간
        stay_discount: "", // 할인 금액
        stay_price: "",          // 가격
        stay_disc: "",           // 할인액
        stay_count: "",          // 숙박 수
        stay_room_num: room.room_num       // 방 번호
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStayRoom(prev => {
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

    const handleSave = async () => {
        if(!stayRoom){
            alert("모든 정보를 입력해주세요.");
            return;
        }
        if(stayRoom.stay_count > room.room_count){
            alert("숙박 가능 객실수가 현재 객실수보다 많습니다.");
            setStayRoom(prev => ({
                ...prev,
                stay_count: ''
            }));
            return;
        }
        try {
            const res = await axios.post("/api/stay/insert", stayRoom, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                alert("숙박 정보가 저장되었습니다.");
                closeModal();  // 저장 후 모달 닫기
            }
        } catch (err) {
            console.error("저장 실패", err);
            alert("숙박 정보 저장에 실패했습니다.");
        }
    };

    return (
        <div className="day-modal">
            <div className="day-modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>숙박 등록</h2>
                <form>
                    <div className="day-modal-input">
                        <label>체크인 시간</label>
                        <input
                            type="time"
                            name="stay_in"
                            value={stayRoom.stay_in}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="day-modal-input">
                        <label>체크아웃 시간</label>
                        <input
                            type="time"
                            name="stay_out"
                            value={stayRoom.stay_out}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="day-modal-input">
                        <label>숙박 가능 객실수</label>
                        <input
                            type="number"
                            name="stay_count"
                            value={stayRoom.stay_count}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="day-modal-input">
                        <label>가격</label>
                        <input
                            type="number"
                            name="stay_price"
                            value={stayRoom.stay_price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="day-modal-input">
                        <label>할인율</label>
                        <input
                            type="text"
                            name="stay_discount"
                            value={stayRoom.stay_discount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="day-modal-input">
                        <label>할인후 금액</label>
                        <input
                            type="text"
                            name="stay_disc"
                            value={stayRoom.stay_disc}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <div className="day-modal-btn">
                        <button type="button" onClick={handleSave}>등록하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StayRoomModal;
