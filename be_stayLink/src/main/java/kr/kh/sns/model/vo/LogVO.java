package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
//로그 VO
@Data
@NoArgsConstructor
public class LogVO {
    private int log_num;         // 로그 번호 (기본 키)
    private Date log_in;         // 로그인 시간 (Date 타입)
    private Date log_out;        // 로그아웃 시간 (Date 타입)
    private String log_ip;       // IP 주소 (String 타입)
    private String log_country;  // 국가 (String 타입)
    private int log_user_num;    // 사용자 번호 (int 타입)

    public int getLog_num() {
        return log_num;
    }

    public void setLog_num(int log_num) {
        this.log_num = log_num;
    }

    public Date getLog_in() {
        return log_in;
    }

    public void setLog_in(Date log_in) {
        this.log_in = log_in;
    }

    public Date getLog_out() {
        return log_out;
    }

    public void setLog_out(Date log_out) {
        this.log_out = log_out;
    }

    public String getLog_ip() {
        return log_ip;
    }

    public void setLog_ip(String log_ip) {
        this.log_ip = log_ip;
    }

    public String getLog_country() {
        return log_country;
    }

    public void setLog_country(String log_country) {
        this.log_country = log_country;
    }

    public int getLog_user_num() {
        return log_user_num;
    }

    public void setLog_user_num(int log_user_num) {
        this.log_user_num = log_user_num;
    }
}
