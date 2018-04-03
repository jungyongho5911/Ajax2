package com.bitcamp.web.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.bitcamp.web.domain.Admin;
import com.bitcamp.web.domain.Board;
import com.bitcamp.web.domain.Command;
import com.bitcamp.web.domain.Image;
import com.bitcamp.web.domain.Member;
@Repository
public interface Mapper {
	public void insertMember(Command cmd);
	public void addImage(Image image);
	public Member selectMemberById(Command cmd);
	public Admin selectAdminById(Command cmd);
	public int existA(Command cmd);
	public int exist(Command cmd);
	public int existArticles(Command cmd);
	public void deleteMember(Command cmd);
	public void updateMember(Command cmd);
	public List<?> selectAll(Command cmd);
	public List<Board> articles(Command cmd);
	public List<Member> selectByName(Command cmd);
	public Member selectById(Command cmd);
	public int selectCount(Command cmd);
	
}
