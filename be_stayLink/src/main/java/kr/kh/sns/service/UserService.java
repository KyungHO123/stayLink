package kr.kh.sns.service;

import kr.kh.sns.model.dto.LoginDTO;
import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    boolean signup(UserVO user);

    boolean checkId(String userId);

    boolean login(LoginDTO logDto);

    UserVO getUser(String id);

    boolean userUpdate(UserVO user);

    boolean userUpdatePw(UserVO user);

    boolean userRemove(UserVO user);

    boolean profileUpload(int user, MultipartFile file);

    FileVO getProfileImg(UserVO user);

    boolean getMyLod(UserVO user);
}
