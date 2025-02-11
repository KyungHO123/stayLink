import React from "react";
import RoomList from "./roomList";
import StayList from "./stayList";
import DayList from "./dayList";

function RoomManager({ roomImg, roomList, stayRoom, dayRoom, setStayRoom, setDayRoom }) {
    const check = () => {
        const checkboxes = document.querySelectorAll('.checkBox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = !checkbox.checked;
        });
    }
    return (
        <div className="room-manager">
            <div className="room-list-container">
                <div style={{ width: "200px", margin: "0 auto", height: "50px" }}>
                    <h1 style={{ margin: "0", padding: "0" }}>객실관리</h1>
                </div>
                <div className="room-list-content">
                    <div className="room-list">
                        <RoomList
                            setStayRoom={setStayRoom}
                            setDayRoom={setDayRoom}
                            stayRoom={stayRoom}
                            dayRoom={dayRoom}
                            roomImg={roomImg}
                            roomList={roomList}
                            check={check} />
                    </div>
                </div>
            </div>
            <div className="stay-day-box">
                <div className="stay-list-box">
                    <StayList
                        setStayRoom={setStayRoom}
                    />
                </div>
                <div className="day-list-box">
                    <DayList
                        setDayRoom={setDayRoom}
                    />
                </div>
            </div>

        </div>
    );

}


export default RoomManager;