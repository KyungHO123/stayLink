package kr.kh.sns.controller;

import jakarta.mail.Multipart;
import jakarta.servlet.http.HttpSession;
import kr.kh.sns.model.dto.LoginDTO;
import kr.kh.sns.model.vo.FileVO;
import kr.kh.sns.model.vo.LodVO;
import kr.kh.sns.model.vo.UserVO;
import kr.kh.sns.service.UserService;
import org.apache.catalina.User;
import org.apache.ibatis.util.MapUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<UserVO> signup(@RequestBody UserVO user){
        boolean res = userService.signup(user);
        if (res){
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
    @PostMapping("/checkId")
    public ResponseEntity<Map<String, Boolean>> checkId(@RequestBody Map<String,String> request){
        Map<String, Boolean> map = new HashMap<>();
        String user_id = request.get("user_id");
        if(user_id == null || user_id.isEmpty()){
            throw new IllegalArgumentException("아이디를 입력하세요.");
        }
        boolean res =userService.checkId(user_id);
        map.put("res", res);
        return ResponseEntity.ok(map);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO logDto, HttpSession session){
        Map<String,String> map = new HashMap<>();
        boolean res = userService.login(logDto);
        if (!res){
            map.put("msg","아이디 혹은 비밀번호가 틀렸습니다.");
            return  ResponseEntity.ok(map);
        }else{
            UserVO user = userService.getUser(logDto.getId());
            session.setAttribute("user",user);
            return ResponseEntity.ok(res);
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session){
        UserVO user = (UserVO)session.getAttribute("user");
        if (user == null){
            return null;
        }
        session.invalidate();
        return ResponseEntity.ok("로그아웃 성공");
    }
    @GetMapping("/checkSession")
    public ResponseEntity<?> checkSession(HttpSession session){
        try{
            UserVO user = (UserVO)session.getAttribute("user");
            if(user != null){
                return ResponseEntity.ok(user);
            }else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션없음");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/mypage")
    public Map<String, Object> mypage(HttpSession session){
        Map<String,Object> map = new HashMap<>();
        UserVO user = (UserVO)session.getAttribute("user");
        UserVO userInfo = userService.getUser(user.getUser_id());
        if(userInfo == null){
            return null;
        }
        map.put("user",userInfo);
        return map;
    }
    @PostMapping("/mypage/update")
    public Map<String,Object> userUpdate(@RequestBody UserVO user){
        Map<String,Object> map = new HashMap<>();
        boolean res = userService.userUpdate(user);
        if(!res){
            map.put("msg","입력하지 않은 정보가 있습니다.");
            return map;
        }else {
            map.put("msg","저장 완료 했습니다.");
            map.put("res",res);
            return map;
        }

    }
    @PostMapping("/mypage/updatePw")
      public Map<String,Object> userPwUpdate(@RequestBody UserVO user){
        Map<String,Object> map = new HashMap<>();
        boolean res = userService.userUpdatePw(user);
        if(!res){
            map.put("msg","비밀번호가 일치하지 않습니다.");
            return map;
        }else {
            map.put("msg","비밀번호 변경 완료 했습니다.");
            map.put("res",res);
            return map;
        }

    }@PostMapping("/user/remove")
      public Map<String,Object> userRemove(@RequestBody UserVO user){
        Map<String,Object> map = new HashMap<>();
        boolean res = userService.userRemove(user);
        map.put("res",res);
        return map;

    }
    @PostMapping("/mypage/uploadImg")
    public Map<String,Object> profileUpload(@RequestParam("user_num")int user_num,
                                            @RequestParam("file") MultipartFile file){
        Map<String,Object> map = new HashMap<>();

        boolean res = userService.profileUpload(user_num,file);
        map.put("res",res);
        return map;
    }
    @GetMapping("/mypage/getImg")
    public ResponseEntity<Map<String,Object>> getProfileImg(HttpSession session){
        Map<String,Object> map = new HashMap<>();
        UserVO user = (UserVO)session.getAttribute("user");
        FileVO img = userService.getProfileImg(user);
        String url = "/img/"+ img.getFile_name();
        map.put("img",url);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/mypage/getLod")
    public ResponseEntity<Map<String,Object>> getMyLod(HttpSession session){
        Map<String,Object> map = new HashMap<>();
        UserVO user = (UserVO)session.getAttribute("user");
        boolean lod = userService.getMyLod(user);
        map.put("lod",lod);
        return ResponseEntity.ok(map);
    }


}
