import React from "react";

function RoomCreate({ handleSubmit, handleChange, roomData }) {
    return (
        <div className="room-create-container">
            <h2>객실 등록</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="room-create-info">
                    <div className="room-info-title">
                        <h3>방 이름</h3>
                        <input
                            type="text"
                            name="room_name"
                            value={roomData.room_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="room-info-title">
                        <h3>방 개수</h3>
                        <input
                            type="number"
                            name="room_count"
                            value={roomData.room_count}
                            onChange={handleChange}
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
                        />
                    </div>
                    <div className="room-info-title">
                        <h3>방 크기</h3>
                        <input
                            type="text"
                            name="room_size"
                            value={roomData.room_size}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="room-info-title">
                        <h3>흡연 가능 여부</h3>
                        <select
                            name="room_smoke"
                            value={roomData.room_smoke}
                            onChange={handleChange}
                            required
                        >
                            <option value="">선택</option>
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
                        <button type="submit">등록하기</button>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default RoomCreate;