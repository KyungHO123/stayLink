package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

//객실 VO
@Data
@NoArgsConstructor
public class RoomVO {
    private int room_num;             // 방 번호 (기본 키)
    private String room_name;         // 방 이름
    private int room_count;           // 방 개수
    private int room_max;             // 최대 인원
    private int room_min;             // 최소 인원
    private String room_bed;          // 침대 유형
    private String room_size;         // 방 크기
    private String room_smoke;        // 흡연 가능 여부
    private String room_detail;       // 방 상세 설명
    private int room_lod_num;         // 숙소 번호

    public int getRoom_num() {
        return room_num;
    }

    public void setRoom_num(int room_num) {
        this.room_num = room_num;
    }

    public String getRoom_name() {
        return room_name;
    }

    public void setRoom_name(String room_name) {
        this.room_name = room_name;
    }

    public int getRoom_count() {
        return room_count;
    }

    public void setRoom_count(int room_count) {
        this.room_count = room_count;
    }

    public int getRoom_max() {
        return room_max;
    }

    public void setRoom_max(int room_max) {
        this.room_max = room_max;
    }

    public int getRoom_min() {
        return room_min;
    }

    public void setRoom_min(int room_min) {
        this.room_min = room_min;
    }

    public String getRoom_bed() {
        return room_bed;
    }

    public void setRoom_bed(String room_bed) {
        this.room_bed = room_bed;
    }

    public String getRoom_size() {
        return room_size;
    }

    public void setRoom_size(String room_size) {
        this.room_size = room_size;
    }

    public String getRoom_smoke() {
        return room_smoke;
    }

    public void setRoom_smoke(String room_smoke) {
        this.room_smoke = room_smoke;
    }

    public String getRoom_detail() {
        return room_detail;
    }

    public void setRoom_detail(String room_detail) {
        this.room_detail = room_detail;
    }

    public int getRoom_lod_num() {
        return room_lod_num;
    }

    public void setRoom_lod_num(int room_lod_num) {
        this.room_lod_num = room_lod_num;
    }
}
