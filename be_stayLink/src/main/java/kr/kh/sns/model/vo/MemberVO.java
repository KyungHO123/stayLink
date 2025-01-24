package kr.kh.sns.model.vo;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class MemberVO {

    private String meID;
    private String meName;
    private String mePw;
    private int mMaNum;
    private int meMsNum;

    public String getMeID() {
        return meID;
    }

    public void setMeID(String meID) {
        this.meID = meID;
    }

    public String getMeName() {
        return meName;
    }

    public void setMeName(String meName) {
        this.meName = meName;
    }

    public String getMePw() {
        return mePw;
    }

    public void setMePw(String mePw) {
        this.mePw = mePw;
    }

    public int getmMaNum() {
        return mMaNum;
    }

    public void setmMaNum(int mMaNum) {
        this.mMaNum = mMaNum;
    }

    public int getMeMsNum() {
        return meMsNum;
    }

    public void setMeMsNum(int meMsNum) {
        this.meMsNum = meMsNum;
    }
}
