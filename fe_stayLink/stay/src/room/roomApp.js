import React, { useState } from 'react';
import RoomCreate from './roomCreate';
import RoomImg from './roomImg';
import '../css/room.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RoomApp() {
  const navigate = useNavigate();
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
    room_lod_num: '',
  });
  const [roomImages, setRoomImages] = useState([]);
  const [imageUrls, setImageUrls] = useState(Array(15).fill(""));
  const handleSubmit = async (e) => {
    console.log(2);

    e.preventDefault();
    if (!roomData.room_name
      || !roomData.room_count
      || !roomData.room_min
      || !roomData.room_max
      || !roomData.room_bed
      || !roomData.room_size
      || !roomData.room_smoke
      || !roomData.room_detail) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    const roomNamePattern = /^[a-zA-Z0-9가-힣\s]{1,20}$/;
    const roomCountPattern = /^[0-9]+$/;
    const roomBedPattern = /^[0-9가-힣]+$/;
    if (!roomNamePattern.test(roomData.room_name)) {
      alert('방 이름은 1~20자의 영문, 숫자, 한글만 가능합니다.');
      return;
    }
    if (!roomCountPattern.test(roomData.room_count)) {
      alert('객실 갯수는 숫자만 입력 가능합니다.');
      return;
    }
    if (!roomBedPattern.test(roomData.room_bed)) {
      alert('침대 유형은 한글과 숫자만 입력 가능합니다.');
      return;
    }
    if (!imageUrls || imageUrls.length === 0 || imageUrls.every(url => url === "")) {
      if (window.confirm("이미지 파일을 업로드하지 않았습니다. 계속 진행 하시겠습니까?")) {
        const res = await axios.post("/api/room/create", roomData);
        alert(res.data.msg);
        if (res.status === 200) {
          navigate("/myLod");
          return;
        }
      }
    }
    try{
      const res = await axios.post("/api/room/create", roomData);
      alert(res.data.msg);
      if (res.status === 200) {
        const form = new FormData();
        if (Array.isArray(imageUrls) && imageUrls.length > 0) {
          imageUrls.forEach((url, index) => {
            const fileInput = document.getElementById(`file-upload${index + 1}`);
            if (fileInput.files[0]) {
              form.append("files", fileInput.files[0]);
            }
          })
        }
        for (let key in roomData) {
          if (roomData[key]) {
            form.append(key, roomData[key]);
          }
        }
        const roomFile = await axios.post("/api/room/upload", form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (roomFile.status === 200) {
  
        }
        else {
          alert("이미지 업로드에 실패 했습니다.")
        }
        navigate("/myLod");
        return;
      }
     
    }catch(err){
      if(err.response){
        if(err.response.status === 409
          ||err.response.status === 401
          ||err.response.status === 403
          ||err.response.status === 500
        )
          alert(err.response.data.msg);
      }
    }
  

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 여러 이미지 파일 선택 시 상태 업데이트
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrls = [...imageUrls];
      const reader = new FileReader();
      reader.onloadend = () => {
        newImageUrls[index] = reader.result;
        setImageUrls(newImageUrls);
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <div className='roomApp'>
      <RoomImg handleImageChange={handleImageChange} imageUrls={imageUrls} />
      <RoomCreate roomData={roomData} handleSubmit={handleSubmit} handleChange={handleChange} />
    </div>
  );
}

export default RoomApp;
