package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

//회원 권한 VO
@Data
@NoArgsConstructor
public class AuthorityVO {
    private String user_auth;

    public String getUser_auth() {
        return user_auth;
    }

    public void setUser_auth(String user_auth) {
        this.user_auth = user_auth;
    }
}
