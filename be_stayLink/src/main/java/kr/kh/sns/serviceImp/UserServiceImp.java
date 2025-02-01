package kr.kh.sns.serviceImp;

import kr.kh.sns.DAO.UserDAO;
import kr.kh.sns.model.dto.LoginDTO;
import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
import kr.kh.sns.service.UserService;
import kr.kh.sns.utils.UploadFileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserDAO userDao;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

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
            userDao.insertFile(fileVO);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    @Override
    public boolean signup(UserVO user) {
        if(user == null) {
            return false;
        }
        user.setUser_pw(passwordEncoder.encode(user.getUser_pw()));
        return userDao.signup(user);
    }

    @Override
    public boolean checkId(String userId) {
        if (userId == null)
            return false;
        UserVO user = userDao.checkId(userId);

        if (user == null){
            return true;
        }else{
            return false;
        }

    }

    @Override
    public boolean login(LoginDTO logDto) {
        UserVO user = userDao.login(logDto);
        if(user == null){
            return false;
        }
        if (passwordEncoder.matches(logDto.getPw(),user.getUser_pw())){
            return true;
        }
        return false;
    }

    @Override
    public UserVO getUser(String id) {
        return userDao.getUser(id);
    }

    @Override
    public boolean userUpdate(UserVO user) {
        if (user == null){
            return false;
        }

        return userDao.userUpdate(user);
    }

    @Override
    public boolean userUpdatePw(UserVO user) {
        if(user == null)
            return false;
        user.setUser_pw(passwordEncoder.encode(user.getUser_pw()));
        return userDao.userUpdatePw(user);
    }

    @Override
    public boolean userRemove(UserVO user) {
        if(user == null)
            return false;

        return userDao.userRemove(user);
    }

    @Override
    public boolean profileUpload(int user_num, MultipartFile file) {
        if(file == null ||file.isEmpty()||user_num==0){
            return false;
        }
        uploadFile(user_num,file);
        return true;
    }

    @Override
    public FileVO getProfileImg(UserVO user) {
        if(user == null){
            return null;
        }
        return userDao.getProfileImg(user.getUser_num());
    }

    @Override
    public boolean getMyLod(UserVO user) {
        if(user == null){
            return false;
        }
        LodVO lod = userDao.getMyLod(user.getUser_num());
        if(lod == null){
            return false;
        }
        return true;
    }

}
