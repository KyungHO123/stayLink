package kr.kh.sns.serviceImp;

import kr.kh.sns.DAO.UserDAO;
import kr.kh.sns.model.dto.LoginDTO;
import kr.kh.sns.model.vo.UserVO;
import kr.kh.sns.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserDAO userDao;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


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
}
