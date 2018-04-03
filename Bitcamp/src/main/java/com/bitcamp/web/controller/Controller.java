package com.bitcamp.web.controller;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bitcamp.web.domain.Admin;
import com.bitcamp.web.domain.Board;
import com.bitcamp.web.domain.Command;
import com.bitcamp.web.domain.Image;
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
    @Autowired Image image;
    
    @RequestMapping(value="/{type}/{userid}/login",
            method=RequestMethod.POST,
            consumes="application/json")
    public  Map<?,?> login(
    		@PathVariable String type,
    		@PathVariable String userid,
            @RequestBody Member m) {
        Map<String,Object> map = new HashMap<>();
        logger.info("welcome {}","member!");
        logger.info("전달된ID {}",m.getUserid());
        logger.info("전달된PASS {}",m.getPassword());
        cmd = new Command();
        cmd.setType(type);
        switch (type) {
		case "member":
			  cmd.setId("userid");
		      cmd.setPass("password");
			break;
		case "admin":
			System.out.println("admin");
			  cmd.setId("admid");
		      cmd.setPass("admpass");   
			break;

		default:
			break;
		}
        cmd.setData1(m.getUserid());
	    cmd.setData2(m.getPassword());
        int count = new ICountSerive() {
            @Override
            public int execute(Command cmd) {
                return mapper.exist(cmd);
            }
        }.execute(cmd);
        if(type.equals("member") && count == 1) {
            Object o = new IGetService() {
                
                @Override
                public Object execute(Command cmd) {
                    return mapper.selectMemberById(cmd);
                }
            }.execute(cmd);
            map.put("user", o);
            System.out.println("Member : "+o);
        }else if(type.equals("admin") && count == 1){
        	Object o = new IGetService() {
                
                @Override
                public Object execute(Command cmd) {
                    return mapper.selectAdminById(cmd);
                }
            }.execute(cmd);
            map.put("admin", o);
            System.out.println("admin : "+o);
        }
        
        System.out.println("로그인 성공 여부"+count);
        map.put("success", count+"");
        return map;
    }
    @RequestMapping(value="/articles/{pageNum}",
            method=RequestMethod.GET)
    public Map<?,?> getArticles(
            @PathVariable String pageNum){
        Map<String,Object> map = new HashMap<>();
        page.setPageNum(Integer.parseInt(pageNum));
        page.setBlockSize(5);
        page.setPageSize(5);
        page.setTotalCount(new ICountSerive() {
            
            @Override
            public int execute(Command cmd) {
                return mapper.existArticles(cmd);
            }
        }.execute(cmd));
        page = (Page) adapter.attr(page);
        cmd.setId(page.getStartRow()+"");
        cmd.setPass(page.getEndRow()+"");
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
    @RequestMapping(value="board/post/articles",
            method=RequestMethod.POST,
            consumes="application/json")
    public Map<?,?> postArticle(
            @RequestBody Board b){
        Map<String,Object> map = new HashMap<>();
        System.out.println("넘어온 ID :"+ b.getUserid());
        System.out.println("넘어온 글제목 :"+ b.getTitle());
        System.out.println("넘어온 글내용 :"+ b.getContent());
        return map;
    }
     @RequestMapping(value="/board/file/upload", method=RequestMethod.POST)
        public Map<?,?> fileupload(MultipartHttpServletRequest request) throws IllegalStateException, IOException {
    	 // 
    	 	logger.debug("request  : {}" , request);
            Map<String,Object> map = new HashMap<>();
            FileProxy pxy = new FileProxy();
            Iterator<String> it = request.getFileNames();
            if(it.hasNext()) {
            	MultipartFile file = request.getFile(it.next());
            	String rootPath = request.getSession().getServletContext().getRealPath("");
            	String uploadPath = "resources/img/";
            	String filename = file.getOriginalFilename();
            	image.setImageId(
            			new SimpleDateFormat
            			("yyyyMMdd_hhmmss_")
            			.format(new Date())+filename);
            	image.setExtension(filename);
            }
            String fileName = pxy.getFile().getOriginalFilename();
            System.out.println("업로드된 파일 : " + fileName);
            String path = ImageRepo.UPLOAD_PATH.toString() + fileName;
            File file = new File(path);
            pxy.getFile().transferTo(file);
            return map;
        }
}