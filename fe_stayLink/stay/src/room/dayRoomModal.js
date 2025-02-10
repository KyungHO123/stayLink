import React, { useState } from "react";
import axios from "axios";

function DayRoomModal({ room, closeModal, setDayRoom }) {
    const [dayRoom, updateDayRoom] = useState({
        day_start: '', // 대실 시작 시간
        day_end: '', // 대실 종료 시간
        day_price: '', // 대실 가격
        day_max: '',
        day_discount: '', // 할인율
        day_disc: '', // 할인 후 금액
        day_count: '', // 대실수량
        day_room_num: room.room_num, // 객실번호
    });

    // 가격과 할인율을 입력할 때마다 상태 업데이트 및 할인 후 금액 계산
    const handleChange = (e) => {
        const { name, value } = e.target;

        // 가격과 할인율이 변경될 때마다 할인 후 금액 계산
        updateDayRoom(prevDayRoom => {
            const updatedDayRoom = {
                ...prevDayRoom,
                [name]: value,
            };
            // 가격과 할인율을 입력할 때 할인 후 금액 자동 계산
            if (updatedDayRoom.day_price && updatedDayRoom.day_discount) {
                const price = parseFloat(updatedDayRoom.day_price);
                const discount = parseFloat(updatedDayRoom.day_discount);
                if (!isNaN(price) && !isNaN(discount) && price > 0 && discount >= 0) {
                    const discountedPrice = price - (price * (discount / 100));
                    updatedDayRoom.day_disc = discountedPrice.toFixed(0); // 소수점 없이 정수로만 표시
                }
            }

            return updatedDayRoom;
        });
    };

    // 저장하기
    const handleSave = async () => {
        if (!dayRoom) {
            alert("모든 정보를 입력해주세요.");
            return;
        }
        if (dayRoom.day_start && dayRoom.day_end && dayRoom.day_start > dayRoom.day_end) {
            updateDayRoom(prevDayRoom => ({
                ...prevDayRoom,
                day_start: ''
            }));
            alert("시작시간이 종료시간보다 클 순 없습니다.");
            return;
        }
        if (dayRoom.day_count > room.room_count) {
            alert("대실 가능 객실수가 현재 객실수보다 많습니다.");
            setDayRoom(prevDayRoom => ({
                ...prevDayRoom,
                day_count: ''
            }));
            return;
        }
        if (dayRoom.day_discount < 0 || dayRoom.day_discount > 100) {
            alert("할인율은 0미만 100초과로 입력할 수 없습니다.")
            setDayRoom(prevDayRoom => ({
                ...prevDayRoom,
                day_discount: ''
            }));
            return;
        }
        try {
            const res = await axios.post("/api/day/insert", dayRoom, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                setDayRoom(true)
                alert("대실 정보가 저장되었습니다.");
                closeModal();
            }
        } catch (err) {
            console.error("저장 실패", err);
            alert("대실 정보 저장에 실패했습니다.");
        }
    };

    return (
        <div className="day-modal">
            <div className="day-modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>대실 등록</h2>
                <form>
                    <div className="day-modal-input">
                        <label>대실 시작 시간</label>
                        <input
                            type="time"
                            name="day_start"
                            value={dayRoom.day_start}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="day-modal-input">
                        <label>대실 종료 시간</label>
                        <input
                            type="time"
                            name="day_end"
                            value={dayRoom.day_end}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="day-modal-input">
                        <label>대실가능 객실 수</label>
                        <input
                            type="text"
                            name="day_count"
                            value={dayRoom.day_count}
                            onChange={handleChange}
                            placeholder={`객실수 ${room.room_count}개 보다 많으면 등록 불가`}
                        />
                    </div>
                    <div className="day-modal-input">
                        <label>대실 이용시간</label>
                        <input
                            type="text"
                            name="day_max"
                            value={dayRoom.day_max}
                            onChange={handleChange}
                            placeholder='대실 이용시간을 입력하세요.'
                        />
                    </div>
                    <div className="day-modal-input">
                        <label>금액</label>
                        <input
                            type="number"
                            name="day_price"
                            value={dayRoom.day_price}
                            onChange={handleChange}
                            placeholder="금액을 입력해주세요."
                        />
                    </div>
                    <div className="day-modal-input">
                        <label>할인율</label>
                        <input
                            type="number"
                            name="day_discount"
                            value={dayRoom.day_discount}
                            onChange={handleChange}
                            placeholder="할인율을 입력해주세요."
                        />
                    </div>
                    <div className="day-modal-input">
                        <label>할인 후 금액</label>
                        <input
                            type="text"
                            name="day_disc"
                            value={dayRoom.day_disc}
                            readOnly // 자동 계산되므로 사용자가 수정할 수 없도록
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

export default DayRoomModal;
