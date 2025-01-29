package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

//결제 VO
@Data
@NoArgsConstructor
public class PaymentVO {
    private int payment_num;       // 결제 번호 (기본 키)
    private int payment_price;     // 결제 금액
    private String payment_type;   // 결제 유형
    private Date payment_date;     // 결제 일시
    private int payment_reserve_num; // 예약 번호
    private String paymentState;   // 결제 상태

    public int getPayment_num() {
        return payment_num;
    }

    public void setPayment_num(int payment_num) {
        this.payment_num = payment_num;
    }

    public int getPayment_price() {
        return payment_price;
    }

    public void setPayment_price(int payment_price) {
        this.payment_price = payment_price;
    }

    public String getPayment_type() {
        return payment_type;
    }

    public void setPayment_type(String payment_type) {
        this.payment_type = payment_type;
    }

    public Date getPayment_date() {
        return payment_date;
    }

    public void setPayment_date(Date payment_date) {
        this.payment_date = payment_date;
    }

    public int getPayment_reserve_num() {
        return payment_reserve_num;
    }

    public void setPayment_reserve_num(int payment_reserve_num) {
        this.payment_reserve_num = payment_reserve_num;
    }

    public String getPaymentState() {
        return paymentState;
    }

    public void setPaymentState(String paymentState) {
        this.paymentState = paymentState;
    }
}
