package kr.kh.sns.controller;

import jakarta.servlet.http.HttpSession;
import kr.kh.sns.model.dto.LoginDTO;
import kr.kh.sns.model.vo.UserVO;
import kr.kh.sns.service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
        System.out.println(user.getUser_id() + "킁12312킁" + user.getUser_pw());
        Map<String,Object> map = new HashMap<>();
        boolean res = userService.userRemove(user);
        map.put("res",res);
        return map;

    }


}
