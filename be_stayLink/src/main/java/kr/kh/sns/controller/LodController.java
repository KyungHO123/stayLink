package kr.kh.sns.controller;

import jakarta.servlet.http.HttpSession;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
import kr.kh.sns.service.LodService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

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
}
