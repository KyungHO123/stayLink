package kr.kh.sns.DAO;

import kr.kh.sns.model.vo.LodVO;
import org.apache.ibatis.annotations.Param;

public interface LodDAO {
    boolean createLod(@Param("ld") LodVO lod,@Param("num") int userNum);

    LodVO getLod(@Param("num") int userNum);
}
