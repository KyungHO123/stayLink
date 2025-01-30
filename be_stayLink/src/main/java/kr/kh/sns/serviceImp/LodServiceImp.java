package kr.kh.sns.serviceImp;

import kr.kh.sns.DAO.LodDAO;
import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
import kr.kh.sns.service.LodService;
import kr.kh.sns.utils.UploadFileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class LodServiceImp implements LodService {

    @Autowired
    private LodDAO lodDao;

    @Value("${file.upload-dir}")
    private String uploadPath;

    private void uploadFile(int file_fk_num,MultipartFile file) {
        if (file == null || file.getOriginalFilename().length() == 0) {
            return;
        }
        try {
            String fileOriName = file.getOriginalFilename();
            // 첨부파일 업로드 후 경로를 가져옴
            String fileName = UploadFileUtils.uploadFile(uploadPath, fileOriName, file.getBytes());
            FileVO fileVO = new FileVO(file_fk_num, fileName, fileOriName);
            // DB에 첨부파일 정보를 추가
            lodDao.insertFile(fileVO);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public boolean createLod(LodVO lod, UserVO user) {
        if (lod == null || user == null)
            return false;
        LodVO dbLod = lodDao.getLod(user.getUser_num());
        if(dbLod != null){
            return false;
        }
        return lodDao.createLod(lod,user.getUser_num());
    }

    @Override
    public boolean uploadFiles(MultipartFile[] files, UserVO user) {
        if(files == null||files.length == 0|| user == null){
            return false;
        }
        for(MultipartFile file : files){
            uploadFile(user.getUser_num(),file);
        }
        return true;
    }
}
