package com.bitcamp.web.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.web.domain.Board;
import com.bitcamp.web.domain.Command;
import com.bitcamp.web.domain.Member;
import com.bitcamp.web.domain.Page;
import com.bitcamp.web.enums.ImageRepo;
import com.bitcamp.web.mapper.Mapper;
import com.bitcamp.web.service.ICountSerive;
import com.bitcamp.web.service.IGetService;
import com.bitcamp.web.util.FileProxy;
import com.bitcamp.web.util.PageAdapter;


@RestController
public class Controller {
    private static final Logger logger = LoggerFactory.getLogger(Controller.class);
    @Autowired Mapper mapper;
    @Autowired Command cmd;
    @Autowired Member user;
    @Autowired PageAdapter adapter;
    @Autowired Page page;
    @Autowired Board board;
	private Map<?, ?> map;
    @RequestMapping(value="/members/{userid}/login",
            method=RequestMethod.POST,
            consumes="application/json")
    public  Map<?,?> getUserid(
            @PathVariable String userid,
            @RequestBody Member m) {
        Map<String,Object> map = new HashMap<>();
        logger.info("welcome {}","member!");
        logger.info("전달된ID {}",userid);
        logger.info("전달된PASS {}",m.getPassword());
        cmd = new Command();
        cmd.setData1(userid);
        cmd.setData2(m.getPassword());
        int count = new ICountSerive() {
            
            @Override
            public int execute(Command cmd) {
                return mapper.exist(cmd);
            }
        }.execute(cmd);
        if(count == 1) {
            Object o = new IGetService() {
                
                @Override
                public Object execute(Command cmd) {
                    return mapper.selectMemberById(cmd);
                }
            }.execute(cmd);
            map.put("user", o);
            System.out.println("Member : "+o);
        }
        map.put("success", count+"");
        return map;
    }
    @RequestMapping(value="/articles/{pageNum}")
    public Map<?,?> getArticles(
    		@PathVariable String pageNum){
    	logger.info("welcome {}","getArticles()");
    	Map<String,Object>  map = new HashMap<>();
    	int count = new ICountSerive() {
			
			@Override
			public int execute(Command cmd) {
				return mapper.existArticles(cmd);
			}
		}.execute(cmd);
		page.setTotalCount(count);
		page.setPageNum(Integer.parseInt(pageNum));
		page.setBlockSize(5);
		page.setPageSize(5);
		page = (Page) adapter.attr(page);
		cmd.setData1(page.getStartRow()+"");
		cmd.setData2(page.getEndRow()+"");
		map.put("list",(List<?>) new IGetService() {
			@Override
			public Object execute(Command cmd) {
				
				return mapper.articles(cmd);
			}
		}.execute(cmd));
		map.put("page", page);
		return map;
		
    }
    @RequestMapping(value="/boards/{seq}",
            method=RequestMethod.GET,
            consumes="application/json")
    public Map<?,?> getArticle(@PathVariable String seq){
        Map<String,Object> map = new HashMap<>();
        
        return map;
    }
    @RequestMapping(value="/boards/{seq}",
            method=RequestMethod.PUT,
            consumes="application/json")
    public Map<?,?> putArticle(@PathVariable String seq){
        Map<String,Object> map = new HashMap<>();
        
        return map;
    }
    @RequestMapping(value="/board/post/articles",
            method=RequestMethod.POST,
            consumes="application/json")
    public Map<?,?> postArticle(@RequestBody Board b ){
        Map<String,Object> map = new HashMap<>();
        System.out.println("넘어온 ID"+b.getTitle());
        System.out.println("넘어온 ID"+b.getUserid());
        System.out.println("넘어온 ID"+b.getContent());

        return map;
    }
    @RequestMapping(value="/board/file/upload", 
    		method=RequestMethod.POST)
    public Map<?,?> fileupload(FileProxy pxy) throws IllegalStateException, IOException {
    	//List<MultipartFile> files = pxy.getFiles();
    	String fileName = 
    			pxy.getFile()
    			.getOriginalFilename();
    	System.out.println("업로드된 파일 : " + fileName);
    	String path = ImageRepo.UPLOAD_PATH.toString() + fileName;
    	File file = new File(path);
    	pxy.getFile().transferTo(file);
        return map;
    }
}