package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

//숙소 타입 VO
@Data
@NoArgsConstructor
public class LodType {
    private String lod_type;//숙소 타입 모텔,호텔..등

    public String getLod_type() {
        return lod_type;
    }

    public void setLod_type(String lod_type) {
        this.lod_type = lod_type;
    }
}
