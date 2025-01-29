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
    static final String [] imgExtensions = {".jpg", ".png", ".bmp", ".gif",".avif"};

    public FileVO(int file_fk_num,String file_name,String fi_ori_name){
        this.file_fk_num = file_fk_num;
        this.file_name = file_name;
        this.file_ori_name = fi_ori_name;
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
}
