import React from "react";

function RoomCreate({handleSubmit,handleChange,roomData}) {
    return (
        <div>
            <h1>객실 등록 페이지</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>방 이름:</label>
                    <input
                        type="text"
                        name="room_name"
                        value={roomData.room_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>방 개수:</label>
                    <input
                        type="number"
                        name="room_count"
                        value={roomData.room_count}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>최대 인원:</label>
                    <input
                        type="number"
                        name="room_max"
                        value={roomData.room_max}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>최소 인원:</label>
                    <input
                        type="number"
                        name="room_min"
                        value={roomData.room_min}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>침대 유형:</label>
                    <input
                        type="text"
                        name="room_bed"
                        value={roomData.room_bed}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>방 크기:</label>
                    <input
                        type="text"
                        name="room_size"
                        value={roomData.room_size}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>흡연 가능 여부:</label>
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
                <div>
                    <label>방 상세 설명:</label>
                    <textarea
                        name="room_detail"
                        value={roomData.room_detail}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">등록하기</button>
            </form>
        </div>

    );
}

export default RoomCreate;