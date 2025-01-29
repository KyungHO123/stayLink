package kr.kh.sns.serviceImp;

import kr.kh.sns.DAO.LodDAO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
import kr.kh.sns.service.LodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LodServiceImp implements LodService {

    @Autowired
    private LodDAO lodDao;

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
}
