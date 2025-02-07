import React from "react";

function RoomCreate({ handleSubmit, handleChange, roomData }) {
    return (
        <div className="room-create-container">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="room-form">
                <div className="room-create-info">
                    <h2>객실 등록</h2>
                    <div className="room-info-title">
                        <h3>객실명</h3>
                        <input
                            type="text"
                            name="room_name"
                            value={roomData.room_name}
                            onChange={handleChange}
                            placeholder="객실명을 입력해주세요"
                            required
                        />
                    </div>
                    <div className="room-info-title">
                        <h3>객실 갯수</h3>
                        <input
                            type="number"
                            name="room_count"
                            value={roomData.room_count}
                            onChange={handleChange}
                            placeholder="보유한 객실 수를 입력하세요"
                            required
                        />
                    </div>
                    <div className="room-info-title">
                        <h3>최소 인원</h3>
                        <input
                            type="number"
                            name="room_min"
                            value={roomData.room_min}
                            onChange={handleChange}
                            placeholder="입장 가능한 최소 인원"
                            required
                        />
                    </div>
                    <div className="room-info-title">
                        <h3>최대 인원</h3>
                        <input
                            type="number"
                            name="room_max"
                            value={roomData.room_max}
                            onChange={handleChange}
                            placeholder="입장 가능한 최대 인원"
                            required
                        />
                    </div>
                    <div className="room-info-title">
                        <h3>침대 유형</h3>
                        <input
                            type="text"
                            name="room_bed"
                            value={roomData.room_bed}
                            onChange={handleChange}
                            placeholder="예시(킹 침대 1개, 퀸 침대 1개)"
                        />
                    </div>
                    <div className="room-info-title">
                        <h3>방 크기</h3>
                        <input
                            type="text"
                            name="room_size"
                            value={roomData.room_size}
                            onChange={handleChange}
                            placeholder="방 크기를 입력해주세요(24m2)"
                        />
                    </div>
                    <div className="room-info-title">
                        <h3>흡연 가능 여부</h3>
                        <select
                            name="room_smoke"
                            value={roomData.room_smoke || "X"}
                            onChange={handleChange}
                            required
                        >
                            <option value="X" disabled>선택</option>
                            <option value="Y">가능</option>
                            <option value="N">불가능</option>
                        </select>
                    </div>
                    <div className="room-info-title">
                        <h3>객실 설명</h3>
                        <textarea
                            name="room_detail"
                            value={roomData.room_detail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="room-info-title">
                        <button >등록하기</button>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default RoomCreate;