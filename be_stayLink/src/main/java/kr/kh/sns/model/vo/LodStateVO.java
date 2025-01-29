package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

//숙소 상태 VO
@Data
@NoArgsConstructor
public class LodStateVO {
    private String lod_state;//숙소 상태

    public String getLod_state() {
        return lod_state;
    }

    public void setLod_state(String lod_state) {
        this.lod_state = lod_state;
    }
}
