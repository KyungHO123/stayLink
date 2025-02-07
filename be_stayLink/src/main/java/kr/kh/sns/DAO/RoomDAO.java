package kr.kh.sns.DAO;

import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.RoomVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoomDAO {

    List<RoomVO> getRoom(@Param("num") int roomLodNum);

    boolean insertRoom(@Param("ro")RoomVO room,@Param("num") int lodNum);

    void insertFile(@Param("fi") FileVO fileVO);

    RoomVO getLodRoom(@Param("num") int lodNum);

    FileVO getRoomImg(@Param("num")int roomLodNum);
}
