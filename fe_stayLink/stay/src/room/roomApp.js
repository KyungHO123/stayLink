import React, { useState } from 'react';

function RoomApp() {
  // RoomVO의 각 필드에 대응하는 상태
  const [roomData, setRoomData] = useState({
    room_num: '',
    room_name: '',
    room_count: '',
    room_max: '',
    room_min: '',
    room_bed: '',
    room_size: '',
    room_smoke: '',
    room_detail: '',
    room_lod_num: '',
  });

  // 여러 장의 이미지 파일을 관리 (FileList 또는 배열 형태)
  const [roomImages, setRoomImages] = useState([]);

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
    // FileList 객체를 배열로 변환하여 저장합니다.
    setRoomImages(Array.from(e.target.files));
  };

  // 폼 제출 핸들러: FormData를 생성하여 텍스트 데이터와 이미지 파일을 함께 전송합니다.
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // 텍스트 및 숫자 데이터 추가
    for (const key in roomData) {
      formData.append(key, roomData[key]);
    }
    // 선택한 각 이미지 파일을 formData에 추가 (키 값은 서버에서 요구하는 이름으로 지정)
    if (roomImages.length > 0) {
      roomImages.forEach((file) => {
        formData.append('room_images', file);
      });
    }

    // 실제 API 호출 예시 (주석 처리한 fetch 코드를 필요에 맞게 수정하세요)
    // fetch('/api/rooms', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error(error));

    console.log('폼 제출:', roomData, roomImages);
  };

  return (
    <div>
      <h1>객실 등록 페이지</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>방 번호:</label>
          <input 
            type="number" 
            name="room_num" 
            value={roomData.room_num} 
            onChange={handleChange} 
            required 
          />
        </div>
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
        <div>
          <label>숙소 번호:</label>
          <input 
            type="number" 
            name="room_lod_num" 
            value={roomData.room_lod_num} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>객실 사진 (여러 장 선택 가능):</label>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleImageChange} 
          />
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}

export default RoomApp;
