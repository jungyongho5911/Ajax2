package com.bitcamp.web.util;

import org.springframework.stereotype.Component;

import com.bitcamp.web.domain.Command;
import com.bitcamp.web.domain.Page;

@Component
public class PageAdapter {
    
	public Object attr(Page page) {
		//page.setTotalCount(0);
        System.out.println("전체 게시글 수 : " +page.getTotalCount());
        page.setTotalPage(0);
        System.out.println("전체 페이지 수 : " +page.getTotalPage());
        page.setPageStart(0);
        System.out.println("시작 페이지 : " +page.getPageStart());
        page.setPageEnd(0);
        System.out.println("마지막 페이지 : " +page.getPageEnd());
        page.setPrevBlock(false);
        System.out.println("이전 블록 : "+page.isPrevBlock());
        page.setNextBlock(false);
        System.out.println("다음 블록 : "+page.isNextBlock());
        page.setStartRow(0);
        System.out.println("로우 스타트 : "+page.getStartRow());
        page.setEndRow(0);
        System.out.println("로우 엔드 : "+page.getEndRow());
        System.out.println("=============페이징 종료==============");
        page.setPrev(0);
        page.setNext(0);
        return page;
    }

}
