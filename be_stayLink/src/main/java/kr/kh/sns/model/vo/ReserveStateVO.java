package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

//예약 VO
@Data
@NoArgsConstructor
public class ReserveStateVO {
    private String reserve_state;

    public String getReserve_state() {
        return reserve_state;
    }

    public void setReserve_state(String reserve_state) {
        this.reserve_state = reserve_state;
    }
}
