package kr.kh.sns.serviceImp;

import kr.kh.sns.DAO.MemberDAO;
import kr.kh.sns.model.vo.MemberVO;
import kr.kh.sns.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceImp implements MemberService {

    @Autowired
    private MemberDAO meDao;

    @Override
    public List<MemberVO> getMembers() {

        return meDao.getMembers();
    }

    @Override
    public boolean signup(MemberVO member) {
        return meDao.signup(member);
    }
}
