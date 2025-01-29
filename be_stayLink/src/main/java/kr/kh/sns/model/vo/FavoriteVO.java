package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

//찜 VO
@Data
@NoArgsConstructor
public class FavoriteVO {
    private int favorite_num;      // 기본 키
    private LocalDateTime favorite_date; // 날짜와 시간
    private int favorite_user_num; // 사용자 번호
    private int favorite_lod_num;  // 숙소 번호

    public int getFavorite_num() {
        return favorite_num;
    }

    public void setFavorite_num(int favorite_num) {
        this.favorite_num = favorite_num;
    }

    public LocalDateTime getFavorite_date() {
        return favorite_date;
    }

    public void setFavorite_date(LocalDateTime favorite_date) {
        this.favorite_date = favorite_date;
    }

    public int getFavorite_user_num() {
        return favorite_user_num;
    }

    public void setFavorite_user_num(int favorite_user_num) {
        this.favorite_user_num = favorite_user_num;
    }

    public int getFavorite_lod_num() {
        return favorite_lod_num;
    }

    public void setFavorite_lod_num(int favorite_lod_num) {
        this.favorite_lod_num = favorite_lod_num;
    }
}
