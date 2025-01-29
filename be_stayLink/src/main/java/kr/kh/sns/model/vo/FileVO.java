package kr.kh.sns.model.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FileVO {
    private int file_num;
    private String file_name;//파일명
    private String file_ori_name;//파일 원본명
    private int file_fk_num;//파일 외래키 번호
    private String file_type;
    private String file_path = "D:/study/staylink/img/";
    static final String [] imgExtensions = {".jpg", ".png", ".bmp", ".gif",".avif"};


    public FileVO(int file_fk_num,String file_name,String fi_ori_name){
        this.file_fk_num = file_fk_num;
        this.file_name = file_name;
        this.file_ori_name = fi_ori_name;
    }

    public String getFilePath() {
        // 실제 경로를 지정
        return file_path + file_name;  // 파일 경로 반환
    }

    public boolean isImg(){
        if(file_ori_name == null){
            return false;
        }
        for(String imgExtensions : imgExtensions){
            if(file_ori_name.endsWith(imgExtensions)){
                return true;
            }
        }
        return false;
    }

    public int getFile_num() {
        return file_num;
    }

    public void setFile_num(int file_num) {
        this.file_num = file_num;
    }

    public String getFile_name() {
        return file_name;
    }

    public void setFile_name(String file_name) {
        this.file_name = file_name;
    }

    public String getFile_ori_name() {
        return file_ori_name;
    }

    public void setFile_ori_name(String file_ori_name) {
        this.file_ori_name = file_ori_name;
    }

    public int getFile_fk_num() {
        return file_fk_num;
    }

    public void setFile_fk_num(int file_fk_num) {
        this.file_fk_num = file_fk_num;
    }

    public String getFile_type() {
        return file_type;
    }

    public void setFile_type(String file_type) {
        this.file_type = file_type;
    }
}
