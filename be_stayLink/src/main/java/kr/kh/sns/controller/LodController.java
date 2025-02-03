package kr.kh.sns.controller;

import jakarta.servlet.http.HttpSession;
import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
import kr.kh.sns.pagination.Criteria;
import kr.kh.sns.pagination.PageMaker;
import kr.kh.sns.service.LodService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class LodController {
    @Autowired
    private LodService lodService;

    @PostMapping("/lod/create")
    public ResponseEntity<Map<String, Object>> createLod(@RequestBody LodVO lod, HttpSession session) {
        Map<String, Object> map = new HashMap<>();
        UserVO user = (UserVO) session.getAttribute("user");
        boolean create = lodService.createLod(lod, user);
        map.put("res", create);
        return ResponseEntity.ok(map);
    }

    @PostMapping("/lod/upload")
    public ResponseEntity<Map<String, Object>> fileUpload(
            HttpSession session,
            @RequestParam("files") MultipartFile[] files) {
        Map<String, Object> map = new HashMap<>();
        UserVO user = (UserVO) session.getAttribute("user");
        boolean res = lodService.uploadFiles(files, user);
        map.put("res", res);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/lod/myLod")
    public ResponseEntity<Map<String, Object>> getMyLod(
            HttpSession session,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int perPageNum) {
        Map<String, Object> map = new HashMap<>();
        UserVO user = (UserVO) session.getAttribute("user");
        LodVO userLod = lodService.getUserLod(user);
        Criteria cri = new Criteria(page, perPageNum);
        List<FileVO> lodFile = lodService.getLodFile(userLod, cri);
        int totalCount = lodService.getLodFileCount(userLod);
        PageMaker pm = new PageMaker(6, cri, totalCount);
        List<Map<String,Object>> url = lodFile.stream()
                .map(file -> {
                    Map<String,Object> data = new HashMap<>();
                    data.put("file_num",file.getFile_num());
                    data.put("file_path",file.getFilePath());
                    return data;
                }).collect(Collectors.toList());
        map.put("lod", userLod);
        map.put("img", url);
        map.put("pageMaker", pm);
        return ResponseEntity.ok(map);
    }

    @PostMapping("/lod/update")
    public ResponseEntity<Map<String, Object>> updateLod(@RequestBody LodVO lod) {
        Map<String, Object> map = new HashMap<>();
        boolean res = lodService.updateLod(lod);
        map.put("res", res);
        return ResponseEntity.ok(map);
    }

    @PostMapping("/img/delete")
    public ResponseEntity<Map<String, Object>> imgDelete(
            HttpSession session
            , @RequestParam("file_num") int num) {
        Map<String, Object> map = new HashMap<>();
        UserVO user = (UserVO)session.getAttribute("user");
        if (user == null){
            map.put("res",false);
            map.put("msg","로그인이 필요합니다.");
            return ResponseEntity.status(401).body(map);
        }
        if (!user.getUser_auth().equals("숙소회원")){
            map.put("res",false);
            map.put("msg","숙소회원 권한이 필요합니다.");
            return ResponseEntity.status(403).body(map);
        }


        boolean res = lodService.lodImgDelete(num,user);
        if(res){
            map.put("res",true);
            map.put("msg","이미지가 삭제 되었습니다.");
        }else {
            map.put("res",false);
            map.put("msg","이미지가 삭제에 실패했습니다.");
        }
        return ResponseEntity.ok(map);
    }
    @PostMapping("/img/upload")
    public ResponseEntity<Map<String,Object>> imgUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("lod_user_num") int num,
            HttpSession session){
        Map<String,Object> map = new HashMap<>();
        UserVO user = (UserVO) session.getAttribute("user");

        if (user == null) {
            map.put("res", false);
            map.put("msg", "로그인이 필요합니다.");
            return ResponseEntity.status(401).body(map);
        }
        boolean res = lodService.imgUpload(file,num);
        if(res){
            map.put("res",res);
            map.put("msg","이미지 업로드를 했습니다.");
        }else {
            map.put("res",res);
            map.put("msg","이미지 업로드에 실패 했습니다.");
        }
        return ResponseEntity.ok(map);
    }

}
