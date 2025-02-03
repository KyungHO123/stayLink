package kr.kh.sns.serviceImp;

import kr.kh.sns.DAO.LodDAO;
import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
import kr.kh.sns.pagination.Criteria;
import kr.kh.sns.service.LodService;
import kr.kh.sns.utils.UploadFileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
public class LodServiceImp implements LodService {

    @Autowired
    private LodDAO lodDao;

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
        if (dbLod != null) {
            return false;
        }
        return lodDao.createLod(lod, user.getUser_num());
    }

    @Override
    public boolean uploadFiles(MultipartFile[] files, UserVO user) {
        if (files == null || files.length == 0 || user == null) {
            return false;
        }
        for (MultipartFile file : files) {
            uploadFile(user.getUser_num(), file);
        }
        return true;
    }

    @Override
    public LodVO getUserLod(UserVO user) {
        if (user == null)
            return null;
        return lodDao.getUserLod(user.getUser_num());
    }

    @Override
    public List<FileVO> getLodFile(LodVO userLod, Criteria cri) {
        if (userLod == null || cri == null)
            return null;
        return lodDao.getLodFile(userLod.getLod_user_num(),cri);
    }

    @Override
    public boolean updateLod(LodVO lod) {
        if (lod == null){
            return false;
        }
        return lodDao.updateLod(lod);
    }

    @Override
    public int getLodFileCount(LodVO userLod) {
        return lodDao.getLodFileCount(userLod.getLod_user_num());
    }



    @Override
    public boolean lodImgDelete(int num, UserVO user) {
        LodVO lodDb = lodDao.getLod(user.getUser_num());
        if(lodDb == null){
            return false;
        }
        FileVO fileDb = lodDao.getDeleteFile(num);
        if(fileDb == null || fileDb.getFile_fk_num() != lodDb.getLod_user_num()){
            return false;
        }
        String path = "D:/study/stayLink";
        File fileDelete = new File(path+fileDb.getFilePath());
        System.out.println("삭제 경로 :"+fileDelete );
        if(fileDelete.exists()){
            System.out.println("파일 있음");
            if(fileDelete.delete()){
                System.out.println("파일 삭제 성공");
            }else{
                System.out.println("실패");
            }
        }
        if (lodDao.lodImgDelete(fileDb.getFile_num())){
            return true;
        }
        return false;
    }

    @Override
    public boolean imgUpload(MultipartFile file, int num) {
        if(file == null||file.isEmpty())
        return false;
        uploadFile(num,file);
        return true;
    }
}
