import React from "react";

function RoomManager({ roomImg, roomList }) {
    const check = () => {
        const checkboxes = document.querySelectorAll('#chek');
        checkboxes.forEach(checkbox => {
            checkbox.checked = !checkbox.checked;
        });
    }
    return (
        <div className="room-manager">
            <div className="room-list-container">

                <div className="room-content">
                    <div className="content-boxR">
                        <div className="all-check-box">
                            <input type="checkbox" id="check-all" onClick={check} />
                            <span>전체선택</span>
                        </div>
                        {roomList && roomList.length > 0 ? (
                            roomList.map((room, index) => {
                                const roomImage = (Array.isArray(roomImg) ? roomImg : []).find(
                                    img => {
                                        return img.file_fk_num === room.room_num
                                    });


                                return (
                                    <div className="room" key={room.room_num}>
                                        <input type="checkbox" id="chek" />
                                        <span>선택</span>
                                        <div className="room-content-img">
                                            <img src={roomImage?.img || ""}
                                                alt={`객실이미지${index + 1} `}
                                                style={{ width: "100%", height: "100%",borderRadius:"10px" }} />
                                        </div>
                                        <div className="room-content-info">
                                            <div className="room-content-info-title">
                                                <label>객실명 :</label>
                                                <span>{room.room_name}</span>
                                            </div>
                                            <div className="room-content-info-title">
                                                <label>객실수 :</label>
                                                <span>{room.room_count}개</span>
                                            </div>
                                            <div className="room-content-info-title">
                                                <label>최소,대 인원 :</label>
                                                <span>{room.room_min}명~{room.room_max}명</span>
                                            </div>
                                            <div className="room-content-info-title">
                                                <label>흡연여부 :</label>
                                                <span>{room.room_smoke ==="Y"?"흡연가능":"흡연불가"}</span>
                                            </div>
                                            <div className="room-content-info-title">
                                                <label>침대 :</label>
                                                <span>{room.room_bed}</span>
                                            </div>
                                            <div className="room-content-info-title">
                                                <label>평수 :</label>
                                                <span>{room.room_size}</span>
                                            </div>
                                            <div className="room-content-info-title">
                                                <label>상세내용 :</label>
                                                <span>{room.room_detail}</span>
                                            </div>
                                        </div>
                                    </div>

                                );
                            })
                        ) : (
                            <div>객실 정보가 없습니다.</div>
                        )}
                    </div>
                </div>

            </div>

        </div>
    );

}
export default RoomManager;