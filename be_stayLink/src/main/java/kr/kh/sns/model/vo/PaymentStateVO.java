package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

//결제상태 VO
@Data
@NoArgsConstructor
public class PaymentStateVO {
    private String paymentState;//결제상태

    public String getPaymentState() {
        return paymentState;
    }

    public void setPaymentState(String paymentState) {
        this.paymentState = paymentState;
    }
}
