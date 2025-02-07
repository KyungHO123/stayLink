package kr.kh.sns.controller;

import jakarta.servlet.http.HttpSession;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.RoomVO;
import kr.kh.sns.model.vo.UserVO;
import kr.kh.sns.service.LodService;
import kr.kh.sns.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RoomController {
    @Autowired
    private RoomService roomService;
    @Autowired
    private LodService lodService;

    @PostMapping("/room/create")
    public ResponseEntity<Map<String, Object>> roomCreate(HttpSession session, @RequestBody RoomVO room) {
        Map<String, Object> map = new HashMap<>();
        UserVO user = (UserVO) session.getAttribute("user");
        LodVO lod = lodService.getUserLod(user);
        List<RoomVO> dbRoom =  roomService.getRoom(lod.getLod_num());
        if (user == null) {
            map.put("msg", "로그인이 필요합니다.");
            map.put("res", false);
            return ResponseEntity.status(401).body(map);
        }
        if (!user.getUser_auth().equals("숙소회원")) {
            map.put("msg", "숙소회원 권한이 필요합니다.");
            map.put("res", false);
            return ResponseEntity.status(403).body(map);
        }
        for (RoomVO list : dbRoom){
            if (list.getRoom_name().equals(room.getRoom_name())){
                map.put("msg","이미 존재하는 객실명입니다.");
                map.put("res",false);
                return ResponseEntity.status(409).body(map);
            }
        }
        boolean res = roomService.roomCreate(room,lod.getLod_num());
        if (!res) {
            map.put("msg","객실 등록에 실패 했습니다.");
            map.put("res", res);
            return ResponseEntity.status(500).body(map);
        }
        map.put("msg","객실을 등록 했습니다.");
        map.put("res", res);
        return ResponseEntity.ok(map);
    }
    @PostMapping("/room/upload")
    public ResponseEntity<Map<String,Object>> roomUpload(
            HttpSession session,
            @RequestParam("files")MultipartFile[] files){
        Map<String,Object> map = new HashMap<>();
        UserVO user = (UserVO) session.getAttribute("user");
        LodVO lod = lodService.getUserLod(user);
        if (user == null) {
            map.put("res", false);
            map.put("msg", "로그인이 필요합니다.");
            return ResponseEntity.status(401).body(map);
        }
        if (!user.getUser_auth().equals("숙소회원")) {
            map.put("res", false);
            map.put("msg", "숙소회원 권한이 필요합니다.");
            return ResponseEntity.status(403).body(map);
        }
        boolean res = roomService.uploadFiles(files,lod);
        map.put("res",res);
        return ResponseEntity.ok(map);
    }
}
