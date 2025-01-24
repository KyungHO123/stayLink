package kr.kh.sns.controller;

import org.springframework.stereotype.Controller;

@Controller
public class HomeController {

    public String home(){

        return "index.html";
    }
}
