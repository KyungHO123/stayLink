package kr.kh.sns.controller;

import kr.kh.sns.model.vo.MemberVO;
import kr.kh.sns.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/api")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @ResponseBody
    @GetMapping("/members")
    public ResponseEntity<List<MemberVO>> getMembers(){
        List<MemberVO> members = memberService.getMembers();
        return  ResponseEntity.ok(members);
    }
    @ResponseBody
    @PostMapping("/signup")
    public ResponseEntity<MemberVO> signup(@RequestBody MemberVO member){
        System.out.println(member);
        if(member == null)
            return null;
        boolean res = memberService.signup(member);
        if (res){
            return ResponseEntity.ok(member);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}
