package kr.kh.sns.pagination;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PageMaker {
    private int totalCount; // 전체 컨텐츠 개수 => 마지막 페이지네이션의 마지막 페이지를 계산하기 위해
    private int startPage; // 페이지네이션 시작 페이지번호
    private int endPage; // 페이지네이션 마지막 페이지번호
    private boolean prev; // 이전버튼 활성화
    private boolean next; // 다음버튼 활성화
    private int displayPageNum; // 한 페이지네이션에서 보여준 페이지의 최대 숫자 개수
    private Criteria cri;

    // totalCount, displayPageNum, perPageNum(cri)를 이용하여
    // endPage, startPage, prev, next를 계산하는 메서드
    public void calculate() {
        // 현재 페이지에 대한 최대 페이지번호
        endPage = (int)(Math.ceil(cri.getPage() / (double)displayPageNum) * displayPageNum);

        startPage = endPage - displayPageNum + 1;

        // 컨텐츠 개수를 이용하여 계산한 최대 페이지 번호
        int tmpEndPage = (int)(Math.ceil(totalCount / (double)cri.getPerPageNum()));

        // endPage와 tmpEndPage 중 작은 값을 endPage로 설정
        if (endPage > tmpEndPage) {
            endPage = tmpEndPage;
        }

        // 첫 번째 페이지네이션이면 false 아니면 true
        prev = startPage == 1 ? false : true;

        // 마지막 페이지네이션이면 false 아니면 true
        next = endPage == tmpEndPage ? false : true;
    }

    public PageMaker(int displayPageNum, Criteria cri, int totalCount) {
        this.displayPageNum = displayPageNum;
        this.cri = cri;
        this.totalCount = totalCount;
        calculate();
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getStartPage() {
        return startPage;
    }

    public void setStartPage(int startPage) {
        this.startPage = startPage;
    }

    public int getEndPage() {
        return endPage;
    }

    public void setEndPage(int endPage) {
        this.endPage = endPage;
    }

    public boolean isPrev() {
        return prev;
    }

    public void setPrev(boolean prev) {
        this.prev = prev;
    }

    public boolean isNext() {
        return next;
    }

    public void setNext(boolean next) {
        this.next = next;
    }

    public int getDisplayPageNum() {
        return displayPageNum;
    }

    public void setDisplayPageNum(int displayPageNum) {
        this.displayPageNum = displayPageNum;
    }

    public Criteria getCri() {
        return cri;
    }

    public void setCri(Criteria cri) {
        this.cri = cri;
    }
}
