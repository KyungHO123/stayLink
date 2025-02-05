import React, { useState } from 'react';
import RoomCreate from './roomCreate';
import RoomImg from './roomImg';

function RoomApp() {
  // RoomVO의 각 필드에 대응하는 상태
  const [roomData, setRoomData] = useState({
    room_name: '',
    room_count: '',
    room_max: '',
    room_min: '',
    room_bed: '',
    room_size: '',
    room_smoke: '',
    room_detail: '',
  });
  const [roomImages, setRoomImages] = useState([]);
  const [imageUrls, setImageUrls] = useState(Array(12).fill(""));

  // 텍스트/숫자 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 여러 이미지 파일 선택 시 상태 업데이트
  const handleImageChange = (e) => {
    setRoomImages(Array.from(e.target.files));

  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div>
      <RoomImg handleImageChange={handleImageChange} imageUrls={imageUrls} />
      <RoomCreate roomData={roomData} handleSubmit={handleSubmit} handleChange={handleChange}/>
    </div>
  );
}

export default RoomApp;
