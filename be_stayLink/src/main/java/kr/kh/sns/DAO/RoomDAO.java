package kr.kh.sns.DAO;

import kr.kh.sns.model.vo.DayRoomVO;
import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.RoomVO;
import kr.kh.sns.model.vo.StayRoomVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoomDAO {

    List<RoomVO> getRoom(@Param("num") int roomLodNum);

    boolean insertRoom(@Param("ro")RoomVO room,@Param("num") int lodNum);

    void insertFile(@Param("fi") FileVO fileVO);

    List<RoomVO> getLodRoom(@Param("num") int lodNum);

    List<FileVO>  getRoomImg(@Param("num")int roomNum);

    FileVO getDeleteFile(@Param("num") int fileNum);

    void roomImgDelete(@Param("num")int fileNum);

    boolean updateRoom(@Param("ro")RoomVO room);

    boolean dayInsert(@Param("day") DayRoomVO day);

    boolean stayInsert(@Param("stay")StayRoomVO stay);

    List<StayRoomVO> getStayList(@Param("num")int roomNum);

    List<DayRoomVO> getDayList(@Param("num")int roomNum);

    boolean roomDelete(@Param("num")int roomNum);

    List<FileVO> getFileList(@Param("num")int num);

    boolean deleteFileList(@Param("num")int fileFkNum);

    boolean stayUpdate(@Param("stay")StayRoomVO stay);

    boolean dayUpdate(@Param("day")DayRoomVO day);
}
