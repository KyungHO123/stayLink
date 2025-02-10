package kr.kh.sns.controller;

import jakarta.servlet.http.HttpSession;
import kr.kh.sns.model.vo.*;
import kr.kh.sns.service.LodService;
import kr.kh.sns.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
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
        List<RoomVO> dbRoom = roomService.getRoom(lod.getLod_num());
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
        for (RoomVO list : dbRoom) {
            if (list.getRoom_name().equals(room.getRoom_name())) {
                map.put("msg", "이미 존재하는 객실명입니다.");
                map.put("res", false);
                return ResponseEntity.status(409).body(map);
            }
        }
        boolean res = roomService.roomCreate(room, lod.getLod_num());
        if (!res) {
            map.put("msg", "객실 등록에 실패 했습니다.");
            map.put("res", res);
            return ResponseEntity.status(500).body(map);
        }
        map.put("msg", "객실을 등록 했습니다.");
        map.put("res", res);
        return ResponseEntity.ok(map);
    }

    @PostMapping("/room/upload")
    public ResponseEntity<Map<String, Object>> roomUpload(
            HttpSession session,
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("file_fk_num") int num) {
        Map<String, Object> map = new HashMap<>();
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
        boolean res = roomService.uploadFiles(files, num);
        map.put("res", res);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/room/get")
    public ResponseEntity<Map<String, Object>> getRoom(HttpSession session) {
        Map<String, Object> map = new HashMap<>();
        UserVO user = (UserVO) session.getAttribute("user");
        LodVO lod = lodService.getUserLod(user);
        if (user == null) {
            map.put("res", false);
            map.put("msg", "로그인이 필요합니다.");
            return ResponseEntity.status(401).body(map);
        }
        if (lod == null) {
            map.put("res", false);
            map.put("msg", "숙소 정보가 없습니다.");
            return ResponseEntity.status(404).body(map);
        }
        if (!user.getUser_auth().equals("숙소회원")) {
            map.put("res", false);
            map.put("msg", "숙소회원 권한이 필요합니다.");
            return ResponseEntity.status(403).body(map);
        }
        List<RoomVO> dbRoom = roomService.getRoom(lod.getLod_num());
        if (dbRoom == null) {
            map.put("res", true);
            map.put("room", new ArrayList<>()); // 빈 리스트 반환
            return ResponseEntity.ok(map);
        }
        map.put("res", true);
        map.put("rooms", dbRoom); // 객실 리스트 추가
        return ResponseEntity.ok(map);
    }

    @GetMapping("/room/img")
    public ResponseEntity<Map<String, Object>> getRoomImg(HttpSession session) {
        Map<String, Object> map = new HashMap<>();
        UserVO user = (UserVO) session.getAttribute("user");
        List<Map<String, Object>> fileList = new ArrayList<>();
        LodVO lod = lodService.getUserLod(user);
        List<RoomVO> rooms = roomService.getLodRoom(lod);
        for (RoomVO room : rooms) {
            List<FileVO> files = roomService.getRoomFile(room);
            if (files != null && !files.isEmpty()) {
                for (FileVO file : files) {
                    Map<String, Object> data = new HashMap<>();
                    data.put("file_fk_num", file.getFile_fk_num());
                    data.put("file_num", file.getFile_num());
                    data.put("img", "/img/" + file.getFile_name());
                    fileList.add(data);
                }
            }
        }
        map.put("res", true);
        map.put("files", fileList);
        return ResponseEntity.ok(map);
    }

    @DeleteMapping("/room/img/del")
    public ResponseEntity<Map<String, Object>> deleteRoomImg(
            @RequestParam("file_num") int file_num,
            @RequestParam("file_fk_num") int file_fk_num,
            HttpSession session) {
        System.out.println(file_num);
        Map<String, Object> map = new HashMap<>();
        UserVO user = (UserVO) session.getAttribute("user");
        LodVO lod = lodService.getUserLod(user);
        List<RoomVO> rooms = roomService.getRoom(lod.getLod_num());
        boolean check = false;
        for (RoomVO room : rooms) {
            if (room.getRoom_num() == file_fk_num) {
                boolean res = roomService.deleteFile(file_num, room);
                if (res)
                    check = true;
            }
        }
        map.put("res", check);
        return ResponseEntity.ok(map);
    }

    @PostMapping("/room/update")
    public ResponseEntity<Map<String, Object>> roomUpdate(@RequestBody RoomVO room) {
        Map<String, Object> map = new HashMap<>();
        boolean res = roomService.updateRoom(room);
        map.put("res", res);
        return ResponseEntity.ok(map);

    }

    @PostMapping("/day/insert")
    public ResponseEntity<Map<String, Object>> dayInsert(@RequestBody DayRoomVO day) {
        Map<String, Object> map = new HashMap<>();
        boolean res = roomService.dayInsert(day);
        map.put("res", res);
        return ResponseEntity.ok(map);
    }

    @PostMapping("/stay/insert")
    public ResponseEntity<Map<String, Object>> stayInsert(@RequestBody StayRoomVO stay) {
        Map<String, Object> map = new HashMap<>();
        boolean res = roomService.stayInsert(stay);
        map.put("res", res);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/stay/get")
    public ResponseEntity<Map<String, Object>> stayList(HttpSession session) {
        Map<String, Object> map = new HashMap<>();
        UserVO user = (UserVO) session.getAttribute("user");
        LodVO lod = lodService.getUserLod(user);
        List<RoomVO> rooms = roomService.getRoom(lod.getLod_num());
        List<StayRoomVO> stayList = new ArrayList<>();
        boolean check = false;
        for (RoomVO room : rooms) {
            List<StayRoomVO> stay = roomService.getStayList(room);

            if (stay != null) {
                check = true;
                stayList.addAll(stay);
            }
        }

        map.put("data", stayList);
        map.put("res", check);

        return ResponseEntity.ok(map);
    }
    @GetMapping("/day/get")
    public ResponseEntity<Map<String, Object>> dayList(HttpSession session) {
        Map<String, Object> map = new HashMap<>();
        UserVO user = (UserVO) session.getAttribute("user");
        LodVO lod = lodService.getUserLod(user);
        List<RoomVO> rooms = roomService.getRoom(lod.getLod_num());
        List<DayRoomVO> dayList = new ArrayList<>();
        boolean check = false;
        for (RoomVO room : rooms) {
            List<DayRoomVO> day = roomService.getDayList(room);

            if (day != null) {
                check = true;
                dayList.addAll(day);
            }
        }

        map.put("data", dayList);
        map.put("res", check);

        return ResponseEntity.ok(map);
    }

}
