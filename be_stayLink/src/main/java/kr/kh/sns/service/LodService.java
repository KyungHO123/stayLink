package kr.kh.sns.service;

import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
import kr.kh.sns.pagination.Criteria;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LodService {
    boolean createLod(LodVO lod, UserVO user);

    boolean uploadFiles(MultipartFile[] files, UserVO user);

    LodVO getUserLod(UserVO user);

    List<FileVO> getLodFile(LodVO userLod, Criteria cri);

    boolean updateLod(LodVO lod);

    int getLodFileCount(LodVO userLod);

    boolean lodImgDelete(int num, UserVO user);

    boolean imgUpload(MultipartFile file, int num);
}
