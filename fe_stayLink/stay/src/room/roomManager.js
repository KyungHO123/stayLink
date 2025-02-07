import React from "react";

function RoomManager({roomImg}) {
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
                    <div>
                        <input type="checkbox" id="check-all" onClick={check}/>
                        <span>전체선택</span>
                    </div>
                    <div className="room">
                        <input type="checkbox" id="chek" />
                        <span>선택</span>
                        <div className="room-content-img">
                            <img src="" alt="객실이미지" style={{ width: "100%", height: "100" }} />
                        </div>
                        <div className="room-content-info">
                            <div className="room-content-info-title">
                                <label>객실명 :</label>
                                <span> 홀</span>
                            </div>
                            <div className="room-content-info-title">
                                <label>객실수 :</label>
                            </div>
                            <div className="room-content-info-title">
                                <label>최소,대 인원 :</label>
                            </div>
                            <div className="room-content-info-title">
                                <label>흡연여부 :</label>
                            </div>
                            <div className="room-content-info-title">
                                <label>침대 :</label>
                            </div>
                            <div className="room-content-info-title">
                                <label>평수 :</label>
                            </div>
                            <div className="room-content-info-title">
                                <label>상세내용 :</label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );

}
export default RoomManager;