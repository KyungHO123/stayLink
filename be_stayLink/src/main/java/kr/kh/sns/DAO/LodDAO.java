package kr.kh.sns.DAO;

import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.pagination.Criteria;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LodDAO {
    boolean createLod(@Param("ld") LodVO lod,@Param("num") int userNum);

    LodVO getLod(@Param("num") int userNum);

    void insertFile(@Param("fi")FileVO fileVO);

    LodVO getUserLod(@Param("num")int userNum);

    List<FileVO> getLodFile(@Param("num")int lodUserNum,@Param("cri") Criteria cri);

    boolean updateLod(@Param("ld") LodVO lod);

    int getLodFileCount(@Param("num")int lodUserNum);

    FileVO getDeleteFile(@Param("num")int fileNum);

    boolean lodImgDelete(@Param("num")int fileNum);
}
