package kr.kh.sns.controller;

import jakarta.servlet.http.HttpSession;
import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
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
    public ResponseEntity<Map<String,Object>> createLod(@RequestBody LodVO lod, HttpSession session){
        Map<String,Object> map = new HashMap<>();
        UserVO user = (UserVO)session.getAttribute("user");
        boolean create = lodService.createLod(lod,user);
        map.put("res",create);
        return ResponseEntity.ok(map);
    }
    @PostMapping("/lod/upload")
    public ResponseEntity<Map<String,Object>> fileUpload(
            HttpSession session,
            @RequestParam("files")MultipartFile[] files){
        Map<String,Object> map = new HashMap<>();
        UserVO user = (UserVO)session.getAttribute("user");
        boolean res = lodService.uploadFiles(files,user);
        map.put("res",res);
        return ResponseEntity.ok(map);
    }
    @GetMapping("/lod/myLod")
    public ResponseEntity<Map<String,Object>> getMyLod(HttpSession session){
        Map<String,Object> map = new HashMap<>();
        UserVO user = (UserVO)session.getAttribute("user");
        LodVO userLod = lodService.getUserLod(user);
        List<FileVO> lodFile = lodService.getLodFile(userLod);
        List<String> url = lodFile.stream()
                        .map(file -> file.getFilePath())
                                .collect(Collectors.toList());
        map.put("lod",userLod);
        map.put("img",url);
        return ResponseEntity.ok(map);
    }
}
