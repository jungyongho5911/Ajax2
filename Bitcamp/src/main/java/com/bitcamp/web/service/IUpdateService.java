package com.bitcamp.web.service;

import org.springframework.stereotype.Service;

import com.bitcamp.web.domain.Command;

@Service
public interface IUpdateService {
	public void execute(Command cmd);
}
