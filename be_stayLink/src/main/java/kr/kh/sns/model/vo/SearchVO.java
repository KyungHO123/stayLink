package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

//최근 검색 VO
@Data
@NoArgsConstructor
public class SearchVO {
    private int search_num;           // 검색 번호 (기본 키)
    private String search_content;    // 검색 내용
    private Date search_date;         // 검색 일시
    private int search_user_num;      // 사용자 번호

    public int getSearch_num() {
        return search_num;
    }

    public void setSearch_num(int search_num) {
        this.search_num = search_num;
    }

    public String getSearch_content() {
        return search_content;
    }

    public void setSearch_content(String search_content) {
        this.search_content = search_content;
    }

    public Date getSearch_date() {
        return search_date;
    }

    public void setSearch_date(Date search_date) {
        this.search_date = search_date;
    }

    public int getSearch_user_num() {
        return search_user_num;
    }

    public void setSearch_user_num(int search_user_num) {
        this.search_user_num = search_user_num;
    }
}
