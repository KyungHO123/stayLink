package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalTime;

//대실객실 VO
@Data
@NoArgsConstructor
public class DayRoomVO {
    private int day_num;         // 기본 키
    private int day_max;         // 최대 수
    private BigDecimal day_discount; // 할인율
    private int day_price;       // 가격
    private int day_disc;        // 할인 금액
    private int day_count;       // 수량
    private int day_room_num;    // 객실 번호
    private LocalTime day_start; // 시작 시간
    private LocalTime day_end;   // 종료 시간

    public int getDay_num() {
        return day_num;
    }

    public void setDay_num(int day_num) {
        this.day_num = day_num;
    }

    public int getDay_max() {
        return day_max;
    }

    public void setDay_max(int day_max) {
        this.day_max = day_max;
    }

    public BigDecimal getDay_discount() {
        return day_discount;
    }

    public void setDay_discount(BigDecimal day_discount) {
        this.day_discount = day_discount;
    }

    public int getDay_price() {
        return day_price;
    }

    public void setDay_price(int day_price) {
        this.day_price = day_price;
    }

    public int getDay_disc() {
        return day_disc;
    }

    public void setDay_disc(int day_disc) {
        this.day_disc = day_disc;
    }

    public int getDay_count() {
        return day_count;
    }

    public void setDay_count(int day_count) {
        this.day_count = day_count;
    }

    public int getDay_room_num() {
        return day_room_num;
    }

    public void setDay_room_num(int day_room_num) {
        this.day_room_num = day_room_num;
    }

    public LocalTime getDay_start() {
        return day_start;
    }

    public void setDay_start(LocalTime day_start) {
        this.day_start = day_start;
    }

    public LocalTime getDay_end() {
        return day_end;
    }

    public void setDay_end(LocalTime day_end) {
        this.day_end = day_end;
    }
}
