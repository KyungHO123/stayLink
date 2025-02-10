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

{/* 
                남은 기능 
                - 객실 페이지네이션
                - 객실 수정,삭제,조회
                - 조회
                - 객실을 누르면 상세보기 Modal이 띄워짐.
                - 이미지는 List로 전체로 가져오고 페이지네이션 적용.
                - 객실 정보가 조회됨.
                - 수정
                - 객실을 누르면 상세보기 Modal이 띄워짐.
                - 수정할 객실 정보를 수정 후 저장하기 버튼을 누르면 완료.
                - 삭제
                - 객실을 누르면 상세보기 Modal이 띄워짐.
                - 삭제하기 버튼을 누르면 객실이 삭제됨.
                - Modal외에 체크박스 여러개를 선택 후 삭제 버튼을 누르면 삭제됨.
                - 대실 등록
                - 숙박 등록
                */}
export default RoomManager;