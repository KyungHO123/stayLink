package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

//별점 VO
@Data
@NoArgsConstructor
public class RatingVO {
    private int rating_num;        // 평점 번호 (기본 키)
    private BigDecimal rating_count; // 평점 (소수점 포함)
    private int rating_review_num; // 리뷰 번호

    public int getRating_num() {
        return rating_num;
    }

    public void setRating_num(int rating_num) {
        this.rating_num = rating_num;
    }

    public BigDecimal getRating_count() {
        return rating_count;
    }

    public void setRating_count(BigDecimal rating_count) {
        this.rating_count = rating_count;
    }

    public int getRating_review_num() {
        return rating_review_num;
    }

    public void setRating_review_num(int rating_review_num) {
        this.rating_review_num = rating_review_num;
    }
}
