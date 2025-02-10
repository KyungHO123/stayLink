package kr.kh.sns.serviceImp;

import kr.kh.sns.DAO.RoomDAO;
import kr.kh.sns.model.vo.*;
import kr.kh.sns.service.RoomService;
import kr.kh.sns.utils.UploadFileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
public class RoomServiceImp implements RoomService {
    @Autowired
    private RoomDAO roomDao;

    @Value("${file.upload-dir}")
    private String uploadPath;

    private void uploadFile(int file_fk_num, MultipartFile file) {
        if (file == null || file.getOriginalFilename().length() == 0) {
            return;
        }
        try {
            String fileOriName = file.getOriginalFilename();
            // 첨부파일 업로드 후 경로를 가져옴
            String fileName = UploadFileUtils.uploadFile(uploadPath, fileOriName, file.getBytes());
            FileVO fileVO = new FileVO(file_fk_num, fileName, fileOriName);
            // DB에 첨부파일 정보를 추가
            roomDao.insertFile(fileVO);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public boolean roomCreate(RoomVO room, int lodNum) {
        if (room == null)
            return false;
        return roomDao.insertRoom(room, lodNum);
    }

    @Override
    public List<RoomVO> getRoom(int roomLodNum) {
        List<RoomVO> rooms = roomDao.getRoom(roomLodNum);
        return rooms;
    }

    @Override
    public boolean uploadFiles(MultipartFile[] files, int lod) {
        if (files == null || files.length == 0) {
            return false;
        }
        for (MultipartFile file : files) {
            uploadFile(lod, file);
        }
        return true;
    }

    @Override
    public List<FileVO> getRoomFile(RoomVO room) {
        if (room == null)
            return null;

        return roomDao.getRoomImg(room.getRoom_num());
    }

    @Override
    public List<RoomVO> getLodRoom(LodVO lod) {
        if (lod == null)
            return null;

        return roomDao.getLodRoom(lod.getLod_num());
    }

    @Override
    public boolean deleteFile(int file_num, RoomVO room) {
        if ( room == null)
            return false;
        FileVO fileDb = roomDao.getDeleteFile(file_num);
        if (fileDb == null || fileDb.getFile_fk_num() != room.getRoom_num()) {
            return false;
        }
        String path = "D:/study/stayLink";
        File fileDelete = new File(path + fileDb.getFilePath());
        if (fileDelete.exists()) {
            if (fileDelete.delete()) {
                roomDao.roomImgDelete(fileDb.getFile_num());
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public boolean updateRoom(RoomVO room) {
        if(room == null){
            return false;
        }
        return roomDao.updateRoom(room);
    }

    @Override
    public boolean dayInsert(DayRoomVO day) {
        if(day == null)
        return false;

        return roomDao.dayInsert(day);
    }

    @Override
    public boolean stayInsert(StayRoomVO stay) {
        if (stay == null)
        return false;
        return roomDao.stayInsert(stay);
    }
}
