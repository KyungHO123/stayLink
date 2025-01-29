package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
//회원 상태 VO
@Data
@NoArgsConstructor
public class UserStateVO {
    private String user_state;//회원 상태

    public String getUser_state() {
        return user_state;
    }

    public void setUser_state(String user_state) {
        this.user_state = user_state;
    }
}
