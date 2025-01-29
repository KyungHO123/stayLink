package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

//숙박객실 VO
@Data
@NoArgsConstructor
public class StayRoomVO {
    private int stay_num;            // 숙박 번호 (기본 키)
    private int stay_in;             // 체크인 시간
    private int stay_out;            // 체크아웃 시간
    private BigDecimal stay_discount; // 할인 금액
    private int stay_price;          // 가격
    private int stay_disc;           // 할인액
    private int stay_count;          // 숙박 수
    private int stay_room_num;       // 방 번호

    public int getStay_num() {
        return stay_num;
    }

    public void setStay_num(int stay_num) {
        this.stay_num = stay_num;
    }

    public int getStay_in() {
        return stay_in;
    }

    public void setStay_in(int stay_in) {
        this.stay_in = stay_in;
    }

    public int getStay_out() {
        return stay_out;
    }

    public void setStay_out(int stay_out) {
        this.stay_out = stay_out;
    }

    public BigDecimal getStay_discount() {
        return stay_discount;
    }

    public void setStay_discount(BigDecimal stay_discount) {
        this.stay_discount = stay_discount;
    }

    public int getStay_price() {
        return stay_price;
    }

    public void setStay_price(int stay_price) {
        this.stay_price = stay_price;
    }

    public int getStay_disc() {
        return stay_disc;
    }

    public void setStay_disc(int stay_disc) {
        this.stay_disc = stay_disc;
    }

    public int getStay_count() {
        return stay_count;
    }

    public void setStay_count(int stay_count) {
        this.stay_count = stay_count;
    }

    public int getStay_room_num() {
        return stay_room_num;
    }

    public void setStay_room_num(int stay_room_num) {
        this.stay_room_num = stay_room_num;
    }
}
