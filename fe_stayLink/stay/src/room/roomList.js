import React, { useState } from "react";
import RoomDetail from "./roomDetail";

function RoomList({ roomImg, roomList, check }) {
    const [modal, setModal] = useState(false);
    const [detail, setDetail] = useState(null);
    const openModal = (room) => {
        console.log(room)
        setDetail(room);
        setModal(true);
    };
    const closeModal = () => {
        setModal(false);
    }

    return (
        <div className="room-content">
            <div className="content-boxR">
                <div className="all-check-box">
                    <input type="checkbox" id="check-all" onClick={check} />
                    <label for="check-all">전체선택</label>
                </div>
                {roomList && roomList.length > 0 ? (
                    roomList.map((room, index) => {
                        const roomImage = roomImg.find(img => img.file_fk_num === room.room_num);

                        return (
                            <div className="room" key={room.room_num} onClick={() => openModal(room)}>
                                <input type="checkbox" id={`chek${index + 1}`} className="checkBox" />
                                <label for={`chek${index + 1}`}>선택</label>
                                <div className="room-content-img">
                                    {roomImage ? (
                                        <img src={roomImage.img}
                                            alt={`객실이미지${index + 1} `}
                                            style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
                                    ) : (
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "24px",
                                                color: "#ccc",
                                                margin: "auto",
                                                display: "flex",
                                                justifyContent: "center",
                                                lineHeight: "230px"
                                            }}
                                        >이미지가 없습니다.</span>
                                    )}
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
                                        <span>{room.room_smoke === "Y" ? "흡연가능" : "흡연불가"}</span>
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
            {modal && detail && (
                <RoomDetail room={detail} closeModal={closeModal} roomImg={roomImg} />
            )}
        </div>
    );
}

export default RoomList;