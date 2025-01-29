package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

//리뷰 VO
@Data
@NoArgsConstructor
public class ReviewVO {
    private int review_num;            // 리뷰 번호 (기본 키)
    private String review_content;     // 리뷰 내용
    private int review_reserve_num;    // 예약 번호

    public int getReview_num() {
        return review_num;
    }

    public void setReview_num(int review_num) {
        this.review_num = review_num;
    }

    public String getReview_content() {
        return review_content;
    }

    public void setReview_content(String review_content) {
        this.review_content = review_content;
    }

    public int getReview_reserve_num() {
        return review_reserve_num;
    }

    public void setReview_reserve_num(int review_reserve_num) {
        this.review_reserve_num = review_reserve_num;
    }
}
