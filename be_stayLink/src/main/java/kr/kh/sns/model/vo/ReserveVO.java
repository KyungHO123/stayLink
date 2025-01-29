package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

//예약 VO
@Data
@NoArgsConstructor
public class ReserveVO {
    private int reserve_num;          // 예약 번호 (기본 키)
    private Date reserve_date;        // 예약 일시
    private int reserve_user_num;     // 사용자 번호
    private String reserve_state;     // 예약 상태
    private int reserve_schedule_num; // 예약 일정 번호   reserve_schedule_num int

    public int getReserve_num() {
        return reserve_num;
    }

    public void setReserve_num(int reserve_num) {
        this.reserve_num = reserve_num;
    }

    public Date getReserve_date() {
        return reserve_date;
    }

    public void setReserve_date(Date reserve_date) {
        this.reserve_date = reserve_date;
    }

    public int getReserve_user_num() {
        return reserve_user_num;
    }

    public void setReserve_user_num(int reserve_user_num) {
        this.reserve_user_num = reserve_user_num;
    }

    public String getReserve_state() {
        return reserve_state;
    }

    public void setReserve_state(String reserve_state) {
        this.reserve_state = reserve_state;
    }

    public int getReserve_schedule_num() {
        return reserve_schedule_num;
    }

    public void setReserve_schedule_num(int reserve_schedule_num) {
        this.reserve_schedule_num = reserve_schedule_num;
    }
}
