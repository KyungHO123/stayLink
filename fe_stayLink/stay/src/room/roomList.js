import React, { useState, useEffect } from "react";
import RoomDetail from "./roomDetail";
import DayRoomModal from "./dayRoomModal";
import StayRoomModal from "./stayRoomModal";

function RoomList({ roomImg, roomList, check, stayRoom, dayRoom, setDayRoom, setStayRoom }) {
    const [modal, setModal] = useState(false);
    const [detail, setDetail] = useState(null);
    const [newList, setNewList] = useState(roomList);
    const [dayModal, setDayModal] = useState(false);
    const [stayModal, setStayModal] = useState(false);

    const roomDetailOpenModal = (room) => {
        setDetail(room);
        setModal(true);
    };
    useEffect(() => {
        setNewList(roomList);
    }, [roomList]);

    const closeModal = () => {
        setModal(false);
        setDayModal(false);
        setStayModal(false);
    }
    const handleRoomUpdate = (updateRoom) => {
        const updateList = newList.map(room =>
            room.room_num === updateRoom.room_num ? updateRoom : room
        );
        setNewList(updateList);
    }
    const [day, setDay] = useState(null);
    const [stay, setStay] = useState(null);
    const dayRoomOpenModal = (room) => {
        setDay(room);
        setDayModal(true);
    }
    const stayRoomOpenModal = (room) => {
        setStay(room);
        setStayModal(true);

    }


    return (
        <div className="room-content">
            <div className="content-boxR">

                {newList && newList.length > 0 ? (
                    newList.map((room, index) => {
                        const roomImage = roomImg.find(img => img.file_fk_num === room.room_num);
                        const stayRoomArray = Array.isArray(stayRoom) ? stayRoom : Object.values(stayRoom);
                        const haveStay = stayRoomArray.includes(room.room_num);
                        const DayRoomArray = Array.isArray(dayRoom) ? dayRoom : Object.values(dayRoom);
                        const haveDay =  DayRoomArray.includes(room.room_num)
                        return (
                            <div className="room">
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
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px"
                                    }}
                                    className="room-service">
                                    <div>
                                        <h4 style={{ margin: "0" }}>숙박</h4>
                                        {haveStay ?
                                            (<span
                                                style={{
                                                    cursor: "pointer",
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    padding: "2px",
                                                    borderRadius: "10px"

                                                }}
                                            >등록중</span>)
                                            :
                                            (<span
                                                key={room.room_num}
                                                onClick={() => stayRoomOpenModal(room)}
                                                style={{
                                                    cursor: "pointer",
                                                    backgroundColor: "green",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    padding: "2px",
                                                    borderRadius: "10px"

                                                }}
                                            >등록가능</span>)}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: "0" }}>대실</h4>
                                        {haveDay ?
                                            (<span
                                                style={{
                                                    cursor: "pointer",
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    padding: "2px",
                                                    borderRadius: "10px"

                                                }}
                                            >등록중</span>)
                                            :
                                            (<span
                                                key={room.room_num}
                                                onClick={() => dayRoomOpenModal(room)}
                                                style={{
                                                    cursor: "pointer",
                                                    backgroundColor: "green",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    padding: "2px",
                                                    borderRadius: "10px"

                                                }}
                                            >등록가능</span>)}
                                    </div>
                                </div>
                                <hr />
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
                                    <div
                                        key={room.room_num} onClick={() => roomDetailOpenModal(room)}
                                        style={{
                                            width: "200px",
                                            margin: "0 auto",
                                            textAlign: "center",
                                            border: "1px solid #ccc",
                                            padding: "5px",
                                            borderRadius: "10px",
                                            cursor: "pointer"
                                        }}
                                        className="room-content-modal">
                                        <span>상세보기</span>
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
                <RoomDetail
                    room={detail}
                    closeModal={closeModal}
                    roomImg={roomImg}
                    handleRoomUpdate={handleRoomUpdate} // RoomDetail로 상태 업데이트 전달
                />
            )}
            {dayModal && day && (
                <DayRoomModal
                    setDayRoom={setDayRoom}
                    room={day}
                    closeModal={closeModal} />
            )}
            {stayModal && stay && (
                <StayRoomModal
                    setStayRoom={setDayRoom}
                    room={stay}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}

export default RoomList;