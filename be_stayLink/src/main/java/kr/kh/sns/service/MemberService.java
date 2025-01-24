package kr.kh.sns.service;

import kr.kh.sns.model.vo.MemberVO;

import java.util.List;

public interface MemberService {
    List<MemberVO> getMembers();

    boolean signup(MemberVO member);
}
