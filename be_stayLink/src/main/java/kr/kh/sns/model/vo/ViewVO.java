package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

//최근 본 숙소 VO
@Data
@NoArgsConstructor
public class ViewVO {
    private int view_num;             // 보기 번호 (기본 키)
    private Date view_date;           // 보기 날짜
    private int view_user_num;        // 사용자 번호
    private int view_lod_num;         // 숙소 번호

    public int getView_num() {
        return view_num;
    }

    public void setView_num(int view_num) {
        this.view_num = view_num;
    }

    public Date getView_date() {
        return view_date;
    }

    public void setView_date(Date view_date) {
        this.view_date = view_date;
    }

    public int getView_user_num() {
        return view_user_num;
    }

    public void setView_user_num(int view_user_num) {
        this.view_user_num = view_user_num;
    }

    public int getView_lod_num() {
        return view_lod_num;
    }

    public void setView_lod_num(int view_lod_num) {
        this.view_lod_num = view_lod_num;
    }
}
