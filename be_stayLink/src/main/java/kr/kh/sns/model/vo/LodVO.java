package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

//숙소 VO
@Data
@NoArgsConstructor
public class LodVO {
    private int lod_num;            // 숙소 번호 (기본 키)
    private String lod_name;        // 숙소 이름
    private String lod_license;     // 숙소 라이센스 번호
    private String lod_post;        // 우편번호
    private String lod_address;     // 주소
    private String lod_detail;      // 상세 주소
    private String lod_introduce;   // 소개
    private Date lod_create;        // 생성일 (Date 타입)
    private String lod_language;    // 언어
    private String lod_amenities;   // 편의 시설
    private String lod_entering;    // 입장 안내
    private String lod_instruction; // 이용 안내
    private String lod_parkingInfo; // 주차 정보
    private String lod_notice;      // 공지 사항
    private String lod_smoke;       // 흡연 여부
//    private String lod_state;       // 상태
//    private int lod_user_num;       // 사용자 번호
    private String lod_parking;     // 주차 가능 여부
    private String lod_type;        // 숙소 유형
    private String lod_sido;        // 시도
    private String lod_sigungu;     // 시군구
    private String lod_bname;       // 동

    public int getLod_num() {
        return lod_num;
    }

    public void setLod_num(int lod_num) {
        this.lod_num = lod_num;
    }

    public String getLod_name() {
        return lod_name;
    }

    public void setLod_name(String lod_name) {
        this.lod_name = lod_name;
    }

    public String getLod_license() {
        return lod_license;
    }

    public void setLod_license(String lod_license) {
        this.lod_license = lod_license;
    }

    public String getLod_post() {
        return lod_post;
    }

    public void setLod_post(String lod_post) {
        this.lod_post = lod_post;
    }

    public String getLod_address() {
        return lod_address;
    }

    public void setLod_address(String lod_address) {
        this.lod_address = lod_address;
    }

    public String getLod_detail() {
        return lod_detail;
    }

    public void setLod_detail(String lod_detail) {
        this.lod_detail = lod_detail;
    }

    public String getLod_introduce() {
        return lod_introduce;
    }

    public void setLod_introduce(String lod_introduce) {
        this.lod_introduce = lod_introduce;
    }

    public Date getLod_create() {
        return lod_create;
    }

    public void setLod_create(Date lod_create) {
        this.lod_create = lod_create;
    }

    public String getLod_language() {
        return lod_language;
    }

    public void setLod_language(String lod_language) {
        this.lod_language = lod_language;
    }

    public String getLod_amenities() {
        return lod_amenities;
    }

    public void setLod_amenities(String lod_amenities) {
        this.lod_amenities = lod_amenities;
    }

    public String getLod_entering() {
        return lod_entering;
    }

    public void setLod_entering(String lod_entering) {
        this.lod_entering = lod_entering;
    }

    public String getLod_instruction() {
        return lod_instruction;
    }

    public void setLod_instruction(String lod_instruction) {
        this.lod_instruction = lod_instruction;
    }

    public String getLod_parkingInfo() {
        return lod_parkingInfo;
    }

    public void setLod_parkingInfo(String lod_parkingInfo) {
        this.lod_parkingInfo = lod_parkingInfo;
    }

    public String getLod_notice() {
        return lod_notice;
    }

    public void setLod_notice(String lod_notice) {
        this.lod_notice = lod_notice;
    }

    public String getLod_smoke() {
        return lod_smoke;
    }

    public void setLod_smoke(String lod_smoke) {
        this.lod_smoke = lod_smoke;
    }

    public String getLod_state() {
        return lod_state;
    }

    public void setLod_state(String lod_state) {
        this.lod_state = lod_state;
    }

    public int getLod_user_num() {
        return lod_user_num;
    }

    public void setLod_user_num(int lod_user_num) {
        this.lod_user_num = lod_user_num;
    }

    public String getLod_parking() {
        return lod_parking;
    }

    public void setLod_parking(String lod_parking) {
        this.lod_parking = lod_parking;
    }

    public String getLod_type() {
        return lod_type;
    }

    public void setLod_type(String lod_type) {
        this.lod_type = lod_type;
    }

    public String getLod_sido() {
        return lod_sido;
    }

    public void setLod_sido(String lod_sido) {
        this.lod_sido = lod_sido;
    }

    public String getLod_sigungu() {
        return lod_sigungu;
    }

    public void setLod_sigungu(String lod_sigungu) {
        this.lod_sigungu = lod_sigungu;
    }

    public String getLod_bname() {
        return lod_bname;
    }

    public void setLod_bname(String lod_bname) {
        this.lod_bname = lod_bname;
    }
}


