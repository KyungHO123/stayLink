package kr.kh.sns.DAO;


import kr.kh.sns.model.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MemberDAO {
    List<MemberVO> getMembers();

    boolean signup(@Param("me") MemberVO member);
}
