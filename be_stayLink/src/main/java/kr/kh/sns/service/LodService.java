package kr.kh.sns.service;

import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;

public interface LodService {
    boolean createLod(LodVO lod, UserVO user);
}
