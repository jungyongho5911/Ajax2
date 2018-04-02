package com.bitcamp.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;
@Data
@Component
@Lazy
public class Command{
	protected String data1,data2;
				int data3,data4;
	
	
}
