package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDateTime;

//회원 VO
@Data
@NoArgsConstructor
public class UserVO {
    private int user_num;
    private String  user_id;
    private String user_pw;
    private String user_email;
    private String user_phone;
    private Date user_create;
    private String user_cookie;
    private Date user_cookie_limit;
    private String user_nickName;
    private String user_post;
    private String user_address;
    private String user_detail;
    private String user_gender;
    private String user_auth;
    private String user_state;
    private String user_sido;
    private String user_sigungu;
    private String user_bname;

    public String getUser_sido() {
        return user_sido;
    }

    public void setUser_sido(String user_sido) {
        this.user_sido = user_sido;
    }

    public String getUser_sigungu() {
        return user_sigungu;
    }

    public void setUser_sigungu(String user_sigungu) {
        this.user_sigungu = user_sigungu;
    }

    public String getUser_bname() {
        return user_bname;
    }

    public void setUser_bname(String user_bname) {
        this.user_bname = user_bname;
    }

    public int getUser_num() {
        return user_num;
    }

    public void setUser_num(int user_num) {
        this.user_num = user_num;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUser_pw() {
        return user_pw;
    }

    public void setUser_pw(String user_pw) {
        this.user_pw = user_pw;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getUser_phone() {
        return user_phone;
    }

    public void setUser_phone(String user_phone) {
        this.user_phone = user_phone;
    }

    public Date getUser_create() {
        return user_create;
    }

    public void setUser_create(Date user_create) {
        this.user_create = user_create;
    }

    public String getUser_cookie() {
        return user_cookie;
    }

    public void setUser_cookie(String user_cookie) {
        this.user_cookie = user_cookie;
    }

    public Date getUser_cookie_limit() {
        return user_cookie_limit;
    }

    public void setUser_cookie_limit(Date user_cookie_limit) {
        this.user_cookie_limit = user_cookie_limit;
    }

    public String getUser_nickName() {
        return user_nickName;
    }

    public void setUser_nickName(String user_nickName) {
        this.user_nickName = user_nickName;
    }

    public String getUser_post() {
        return user_post;
    }

    public void setUser_post(String user_post) {
        this.user_post = user_post;
    }

    public String getUser_address() {
        return user_address;
    }

    public void setUser_address(String user_address) {
        this.user_address = user_address;
    }

    public String getUser_detail() {
        return user_detail;
    }

    public void setUser_detail(String user_detail) {
        this.user_detail = user_detail;
    }

    public String getUser_gender() {
        return user_gender;
    }

    public void setUser_gender(String user_gender) {
        this.user_gender = user_gender;
    }

    public String getUser_auth() {
        return user_auth;
    }

    public void setUser_auth(String user_auth) {
        this.user_auth = user_auth;
    }

    public String getUser_state() {
        return user_state;
    }

    public void setUser_state(String user_state) {
        this.user_state = user_state;
    }
}
