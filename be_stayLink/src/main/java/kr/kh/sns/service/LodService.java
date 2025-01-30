package kr.kh.sns.service;

import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
import org.springframework.web.multipart.MultipartFile;

public interface LodService {
    boolean createLod(LodVO lod, UserVO user);

    boolean uploadFiles(MultipartFile[] files, UserVO user);
}
