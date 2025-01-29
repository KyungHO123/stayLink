package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

//스케쥴 VO
@Data
@NoArgsConstructor
public class ScheduleVO {
    private int schedule_num;       // 일정 번호 (기본 키)
    private int schedule_typeNum;   // 일정 유형 번호
    private String schedule_type;   // 일정 유형
    private Date schedule_date;     // 일정 날짜

    public int getSchedule_num() {
        return schedule_num;
    }

    public void setSchedule_num(int schedule_num) {
        this.schedule_num = schedule_num;
    }

    public int getSchedule_typeNum() {
        return schedule_typeNum;
    }

    public void setSchedule_typeNum(int schedule_typeNum) {
        this.schedule_typeNum = schedule_typeNum;
    }

    public String getSchedule_type() {
        return schedule_type;
    }

    public void setSchedule_type(String schedule_type) {
        this.schedule_type = schedule_type;
    }

    public Date getSchedule_date() {
        return schedule_date;
    }

    public void setSchedule_date(Date schedule_date) {
        this.schedule_date = schedule_date;
    }
}
