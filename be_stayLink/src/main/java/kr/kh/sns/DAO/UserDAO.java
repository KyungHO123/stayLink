package kr.kh.sns.DAO;


import kr.kh.sns.model.dto.LoginDTO;
import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserDAO {

    boolean signup(@Param("user") UserVO user);

    UserVO checkId(@Param("id")String userId);

    UserVO login(@Param("ld")LoginDTO logDto);

    UserVO getUser(@Param("id")String id);

    boolean userUpdate(@Param("user")UserVO user);

    boolean userUpdatePw(@Param("user")UserVO user);

    boolean userRemove(@Param("user")UserVO user);

    void insertFile(@Param("fi")FileVO fileVO);

    FileVO getProfileImg(@Param("num")int userNum);

    LodVO getMyLod(@Param("num")int userNum);
}
