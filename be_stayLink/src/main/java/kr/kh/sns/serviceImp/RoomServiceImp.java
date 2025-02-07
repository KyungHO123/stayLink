package kr.kh.sns.serviceImp;

import kr.kh.sns.DAO.RoomDAO;
import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.RoomVO;
import kr.kh.sns.service.RoomService;
import kr.kh.sns.utils.UploadFileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
        return roomDao.insertRoom(room,lodNum);
    }

    @Override
    public List<RoomVO> getRoom(int roomLodNum) {
        List<RoomVO>rooms = roomDao.getRoom(roomLodNum);
        return rooms;
    }

    @Override
    public boolean uploadFiles(MultipartFile[] files, LodVO lod) {
        if(files == null || files.length==0||lod == null){
            return false;
        }
        for (MultipartFile file : files){
            uploadFile(lod.getLod_num(), file);
        }
        return true;
    }
}
