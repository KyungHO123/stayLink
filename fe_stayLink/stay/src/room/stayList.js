import axios from "axios";
import React, { useState, useEffect } from "react";
import StayDetailModal from "./stayListModal";

function StayList({ setStayRoom }) {
    const [stayRooms, setStayRooms] = useState([]);
    const [stayListModal, setStayListModal] = useState(false);
    const [stayDetail, setStayDetail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/stay/get", { withCredentials: true });

                if (res.status === 200 && Array.isArray(res.data.data)) {
                    const filteredStays = res.data.data.filter(stay => Object.keys(stay).length > 0);
                    setStayRooms(filteredStays);

                    // stayRoom을 배열 형식으로 업데이트하도록 수정
                    const stayRoomArray = filteredStays.map(stay => stay.stay_room_num);
                    setStayRoom(stayRoomArray);
                }
            } catch (error) {
                console.error("숙박 데이터 가져오기 실패:", error);
            }
        };

        fetchData();
    }, [setStayRoom]);
    const openStayListModal = (stay) => {
        setStayDetail(stay)
        setStayListModal(true);
    }
    const closeModal = () => {
        setStayListModal(false)
    }
    const handleDelete = async (stay) => {
        if (window.confirm("등록된 숙박 객실을 삭제하시겠습니까?")) {
            try {
                const res = await axios.post("/api/stay/delete", stay, {
                    withCredentials: true
                });
                if (res.status === 200) {
                    setStayRooms(prev => prev.filter(d => d !== stay));
                } else {
                    alert("삭제에 실패했습니다.");
                }
            } catch (error) {
                console.error("삭제 요청 실패:", error);
                alert("삭제 요청 중 오류가 발생했습니다.");
            }
            window.location.reload();
            alert("삭제 되었습니다.")
        }
    }

    return (
        <div>
            <h1>숙박 관리</h1>
            <table className="stay-table">
                <thead className="stay-thead">
                    <tr>
                        <th>객실명</th>
                        <th>체크인</th>
                        <th>체크아웃</th>
                        <th>금액</th>
                        <th>할인율</th>
                        <th>최종금액</th>
                        <th>객실수</th>
                        <th>기타</th>
                    </tr>
                </thead>
                <tbody className="stay-tbody">
                    {stayRooms.map((stay, index) => (
                        <tr key={index}>
                            <td>{stay.room?.room_name}</td>
                            <td>{stay.stay_in}</td>
                            <td>{stay.stay_out}</td>
                            <td>{stay.stay_price}원</td>
                            <td>{stay.stay_discount}%</td>
                            <td>{stay.stay_disc}원</td>
                            <td>{stay.stay_count}개</td>
                            <td>
                                <button onClick={() => openStayListModal(stay)}>
                                    수정
                                </button>
                                <button onClick={() => handleDelete(stay)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {stayListModal && (<StayDetailModal closeModal={closeModal} stayDetail={stayDetail} />)}
        </div>
    );
}

export default StayList;
