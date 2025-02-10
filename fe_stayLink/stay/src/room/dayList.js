import React,{useState,useEffect} from 'react';
import axios from 'axios';

function DayList({setDayRoom}) {
    const [dayRooms, setDayRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/day/get", { withCredentials: true });

                if (res.status === 200 && Array.isArray(res.data.data)) {
                    const filteredStays = res.data.data.filter(day => Object.keys(day).length > 0);
                    setDayRooms(filteredStays);

                    // 🛠 stayRoom을 배열 형식으로 업데이트하도록 수정
                    const stayRoomArray = filteredStays.map(day => day.day_room_num);
                    setDayRoom(stayRoomArray);
                }
            } catch (error) {
                console.error("숙박 데이터 가져오기 실패:", error);
            }
        };

        fetchData();
    }, [setDayRoom]);

    return (
        <div>
            <h1>대실 관리</h1>
            <table className="stay-table">
                <thead className="stay-thead">
                    <tr>
                        <th>객실명</th>
                        <th>시작 시간</th>
                        <th>종료 시간</th>
                        <th>이용시간</th>
                        <th>금액</th>
                        <th>할인율</th>
                        <th>최종금액</th>
                        <th>객실수</th>
                        <th>기타</th>
                    </tr>
                </thead>
                <tbody className="stay-tbody">
                    {dayRooms.map((day, index) => (
                        <tr key={index}>
                            <td>{day.room?.room_name}</td>
                            <td>{day.day_start}</td>
                            <td>{day.day_end}</td>
                            <td>{day.day_max}시간</td>
                            <td>{day.day_price}원</td>
                            <td>{day.day_discount}%</td>
                            <td>{day.day_disc}원</td>
                            <td>{day.day_count}개</td>
                            <td>
                                <button onClick={() => setDayRoom(prev => [...prev, day.day_room_num])}>
                                    수정
                                </button>
                                <button>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default DayList;