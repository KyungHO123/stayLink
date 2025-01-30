package kr.kh.sns.DAO;

import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LodDAO {
    boolean createLod(@Param("ld") LodVO lod,@Param("num") int userNum);

    LodVO getLod(@Param("num") int userNum);

    void insertFile(@Param("fi")FileVO fileVO);

    LodVO getUserLod(@Param("num")int userNum);

    List<FileVO> getLodFile(@Param("num")int lodUserNum);
}
