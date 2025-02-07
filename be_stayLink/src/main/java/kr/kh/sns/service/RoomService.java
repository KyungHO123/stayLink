package kr.kh.sns.service;

import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.RoomVO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RoomService {
    boolean roomCreate(RoomVO room, int lodNum);

    List<RoomVO> getRoom(int roomLodNum);

    boolean uploadFiles(MultipartFile[] files, LodVO lod);

    FileVO getRoomFile(RoomVO lod);

    RoomVO getLodRoom(LodVO lod);
}
