package kr.kh.sns.service;

import kr.kh.sns.model.vo.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RoomService {
    boolean roomCreate(RoomVO room, int lodNum);

    List<RoomVO> getRoom(int roomLodNum);

    boolean uploadFiles(MultipartFile[] files, int lod);

    List<FileVO> getRoomFile(RoomVO room);

    List<RoomVO> getLodRoom(LodVO lod);

    boolean deleteFile(int file, RoomVO room);

    boolean updateRoom(RoomVO room);

    boolean dayInsert(DayRoomVO day);

    boolean stayInsert(StayRoomVO stay);

    List<StayRoomVO> getStayList(RoomVO room);

    List<DayRoomVO> getDayList(RoomVO room);
}
