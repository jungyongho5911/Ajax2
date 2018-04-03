/**
 * 공통 JavaScript 기능
 */
var app = app || {};

/*app = (()=>{
var init = x =>{
    $.getScript(x+'/resources/js/router.js',()=>{
        $.extend(new Router(x));
        app.algorithm.onCreate();
        app.member.onCreate();
    })
};
return {init:init};
})();*/

app = {init:x =>{
	
    $.getScript(x+'/resources/js/router.js',()=>{
        $.extend(new Router(x));
        app.algorithm.onCreate();
        app.member.onCreate();
    })
}};
app.rgx = {
		isNumber : x=>{
			return typeof x === 'number' && isFinite(x);
		},
		passwordChecker : x=>{
			var r = /^[0-9a-zA-z]{4,10}$/;
			return r.test(x)?"yes":"no";
			//숫자 , 영문 대ㅗ문자 4자리부터 10자리까지 제한
		},
		adminCheck : x=>{
			var r = /[0-9]{5}$/;
			return r.test(x)?"yes":"no";
		}
}
app.home = {
		move : x=>{	
		$.getScript(x,()=>{
			$('#li-home').empty();
				$(createATag({id:'nav-home',val:createSpan({id:'',clazz:'glyphicon glyphicon-home',val:'HOME'})}))
		         .appendTo($('#li-home'))
		         .on('click',()=>{
		        	 app.member.onCreate();
		      });
		});
	}
}
app.nav = (x=>{
	var $wrapper,context,algo,view,image;
		var onCreate=x=>{
			 $wrapper = $('#wrapper');
			 context = $.context();
			 image = $.image();
		     view = $.javascript()+'/view.js';
		     setContentView();
		     app.home.move(view);
		};
		var setContentView = x =>{
	         $(createATag({
	             id:'a-board',
	             val:createSpan({
	                 id:'span-board',
	                 clazz:'glyphicon-map-marker',
	                 val:'게시판'})}))
	        .appendTo($('#li-board'))
	        .on('click',e=>{
	            e.preventDefault();
	              app.board.onCreate();
	              $('#a-board').remove();
	             $(createATag({
	                 id:'a-board',
	                 val:createSpan({
	                     id:'span-board',
	                     clazz:'glyphicon-map-marker',
	                     val:'글쓰기'})}))
	           .appendTo($('#li-board'))
	           .on('click',e =>{
	                e.preventDefault();
	                  alert('글쓰기 누름');
	                  app.board.boardWriting();
	           });
	        });
         $(createButtonNav1st())
                 .appendTo($('#div-nav-1st'))
                 .click(()=>{
                 alert('Button click!!');
             });
         jason = {clazz : 'glyphicon-user',val:'로그인'};
         jason = {id:'a-login',val : createSpan(jason)};
         $(createATag(jason))
                .appendTo($('#li-login'))
                 .click(()=>{
                 alert('LOGIN BUTTON CLICK');
         });
         
	};
	return {onCreate:onCreate};
})();
app.board=(x=>{
	var onCreate=()=>{
	       $wrapper = $('#wrapper');
	       context = $.context();
	       algo = $.javascript()+'/algo.js';
	       view = $.javascript()+'/view.js';
	       image = $.image();
	       setContentView();
	   };
	   var setContentView =()=>{
		   articles(1);
	   };
	   var boardWriting=()=>{
           alert('글쓰기 누르고 페이지 이동?');
           $.getScript(view,()=>{
               $('#container').html($(createForm({
            	   id : 'form-write',
            	   clazz : '',
            	   action : ''
               })).html(boardW({
            	   id : 'board-wirte'
               })));  
               $(createButton({
            	   id : 'a-subbit',
            	   clazz: '',
            	   val : '전송'
               })).appendTo('#div-btn-group').on('click',e=>{
            	   e.preventDefault();
            	  /* $.post( context+'/board/post/articles', {
            		   		name : $('input-name').val(),
            		   		title : $('input-title').val(),
            		   		content : $('input-content').text()
            		   		
            	   }, x=>{
            		   $( ".result" ).html(data);
            		 });*/
            	   $.ajax({
            		   url : context + '/board/post/articles',
            		   data:JSON.stringify({
            			   userid : $('#input-name').val(),
            			   title : $('#input-title').val(),
           		   		   content : $('#input-content').val()
            		   }),
            		   dataType:'json',
            		   contentType:'application/json',
            		   method:'POST',
            		   success:d=>{
            			   alert('글 등록만 성공');
            		   },
            		   error:function(x,s,m){alert(m);}
            	   });
               });
               $(createButton({
            	   id : 'a-cancel',
            	   clazz: '',
            	   val : '취소'
               })).appendTo('#div-btn-group').on('click',e=>{
            	   e.preventDefault();
               });
               $(createButton({
            	   id : 'a-fileupload',
            	   clazz: '',
            	   val : '파일추가'
               })).appendTo('#div-btn-group').on('click',e=>{
            	   e.preventDefault();
            	   $.magnificPopup.open(
            			   {items:
            			   		{src : $(createForm({
            			   			id : 'form-fileupload',
            			   			clazz : 'form-fileupload',
            			   			action : context+'/board/file/upload',
            			   			enctype : 'multipart/form-data'
            			   		})).append(
            			   				'<div class="text-center popup">'
            			   				+'<h1>FILE UPLOAD</h1>'
            			   				+'<div class="row">'
            			   				+'<div class="col-sm-6 col-sm-offset-3">'
            			   				+'<div id="imaginary_container">'
            			   				+'<div id="div-fileupload" class="input-group">'
            			   				+'<span id="span-file-1"></span><span id="span-file-2"></span>'
            			   				+'</div>'
            			   				+'</div>'
            			   				+'</div>'
            			   				+'</div>'
            			   		)},
                     		   type : 'inline'},
                    		   0);
            	   $(createInput({id : '', clazz : 'form-control display-inline', type: 'file'}))
            	   .attr('style','width:50%; margin: 0auto')
            	   .attr('placeholder','file')
            	   .attr('name' , 'test')
            	   .attr('value','선택')
            	   .appendTo('#div-fileupload');
            	   $(createInput({id : '', clazz : 'form-control display-inline', type: 'submit'}))
            	   .attr('style','width:50%; margin: 0auto')
            	   .attr('placeholder','submit')
            	   .attr('value','전송')
            	   .appendTo('#span-file-1')
            	   .on('click',x=>{
        			   $('#form-fileupload').ajaxForm({
        				   url : context + '/board/file/upload',
        				   dataType : 'text',
        				   enctype : "multipart/form-data",
        				   beforeSubmit : function(){
        					   alert("로딩화면 !");
        				   },
        				   success : function(data) {
        					   alert("등록완료 !" + data.result);
        				   }
        			   }).submit();
            	   });
            	   $(createInput({id : '', clazz : 'form-control display-inline', type: 'reset'}))
            	   .attr('style','width:50%; margin: 0auto')
            	   .attr('placeholder','reset')
            	   .attr('value','취소')
            	   .appendTo('#span-file-2')
            	   .on('click',x=>{alert('취소클릭')});
            	   });
           });
       };
	   var articles=x=>{
		   $.getJSON(context+'/articles/'+x,d=>{
			   alert('2');
				$.getScript(context+'/resources/js/view.js',()=>{
				$('#content').empty();
				$('#container').empty();
				$(createTab({
                   id: 'articles', 
                   clazz:''
               }))
               .appendTo('#container');
               $(createTH({
                   list: ['글번호', '제목', '내용','작성일','수정/삭제'],
                   thClazz:'',
               })).appendTo('#articles');
               $(createTr({
                   trList: d.list,
                   page:d.page,
                   trClazz: '',
                   	jason:{
                   	tdList: '',
                       tdClazz: 'flag-'	
                   	}
               }))
               .appendTo('#articles');
               $('.flag-5')
               	.html('<a href ="#">수정</a>/<a href = "#">삭제</a>');
               $('#articles').attr('style','width:60%; margin:0 auto');
   
              $(createNav({id:'nav-page',clazz:''})).appendTo('#container');
              $(createUL({id:'ul-page',clazz:'pagination'})).appendTo('#nav-page');
             var t = '';
             if(d.page.prevBlock){
                 t += '<li>'
                       +'  <a href="#" aria-label="Previous" onclick="app.board.articles('+d.page.prev+');return false;">'
                       +'    <span aria-hidden="true">&laquo;</span>'
                       +'  </a>'
                       +'      </li>';
             }
             for(var i=d.page.pageStart;i<=d.page.pageEnd;i++){
              if(i == d.page.pageNum){
                  t += '<li><a style="color: red" href="#"><font>'+i+'</font></a></li>'
                  
              }else{
                 t += ' <li><a href="#" onclick="app.board.articles('
                     +i
                     +');return false;">'+i+'</a></li>'
              }
             }
             if(d.page.nextBlock){
               t +='<li>'
   +'        <a href="#" aria-label="Next" onclick="app.board.articles('+d.page.next+');return false;">'
   +'          <span aria-hidden="true">&raquo;</span>'
   +'        </a>'
   +'          </li>';
             }
           $('#ul-page').html(t);
           });
		});	
	   }
	   return{onCreate:onCreate,articles:articles,boardWriting:boardWriting};
})();
app.member=(()=>{
	var $wrapper,context,algo,view,image;
	var onCreate=()=>{
		 $wrapper = $('#wrapper');
		 context = $.context();
		 image = $.image();
	     view = $.javascript()+'/view.js';
	     setContentView();
	 };
     var setContentView = ()=>{
    	 $.getScript(view,()=>{
    		 var jason=null;
    		 $('#container').remove();
    		 $(createDiv({id:'container',clazz:'login-container'}))
    		 .appendTo($wrapper);
    		 $(createDiv({id:'content',clazz:'login-content'}))
    		 .appendTo('#container');
    		 $(loginInbox('loginInbox'))
    		 .appendTo('#content');
    		 $(createDiv({id:'loginOutbox',clazz:'loginOutbox'}))
    		 .appendTo('#content');
    		 $(createATag({id:'a-join',val:'회원가입'}))
    		 .appendTo('#loginOutbox').attr('style','margin-left:300px;')
    		 .on('click',e=>{
    			 join(e);
    		 });
    		 $(createATag({id:'a-admin',val:'관리자'}))
    		 .appendTo('#loginOutbox')
    		 .on('click',e=>{
    			 admin(e);
    		 });
    		 $(createButton({id:'login-btn',clazz:'default',val:'Login'}))
    		 .appendTo('#td-login-btn')
    		 .on('click',e=>{
    			login(e);
             });
         });
     };
     var admin=x=>{
    	 x.preventDefault();
			if(confirm('관리자 클릭')){
				var p = prompt('직원번호를 입력하세요');
				alert('입력된 직원번호 : '+p);
				var adminID= p;
				if(app.rgx.adminCheck(p)==='yes'){
					var pass = prompt('비번을 입력하세요');
					 $.ajax({
				            url : context+'/admin/admID/login',
				            method : 'POST',
				            data : JSON.stringify({
				            	userid:p,
				            	password:pass
				            }),
				            dataType : 'json',
				            contentType : 'application/json',
				            success : x=>{
				            	if(x.success==='1'){
				            		var admID = x.admin.admID
				            		var admPass = x.admin.admPass
				            		alert(admID);
				            		$.getScript(view,()=>{
				            		$('#container').html(adminTab({id:'admin-Tab'}));	
				            		});	            		
				            	}else{
				            		alert('없는 아이디');
				            	}
				            }
				            
					 });   
				}else{
					alert('잘못된 번호입니다');	
				}
				    
			}else{
				alert('직원만 접근 가능합니다.');

			}
     };
     var join=x=>{
    	 x.preventDefault();
    	 alert('회원 가입 클릭');
    	 $.getScript(view,()=>{
    		 $('#content').html('<table id="" style="margin: 0 auto;height: 400px;border: 2px">'
    					+'  <tr>'
    					+'  <td style="width: 150px">아이디</td>'
    					+'  <td>'
    					+'    <input id="join_id" name="join_id" style="margin-right: 88px" type="text" />'
    					+'    <button id="check_dupl_btn" name="check_dupl_btn">중복확인</button>'
    					+'  </td>'
    					+'  </tr>'
    					+'  '
    					+'  <tr>'
    					+'  <td>이름</td>'
    					+'  <td><input id="input-name" name="name"  style="margin-right: 150px"  type="text" /></td>'
    					+'  </tr>'
    					+'  '
    					+'  <tr>'
    					+'  <td>암호</td>'
    					+'  <td><input id="input-pass" name="pass"   style="margin-right: 150px" type="password" /></td>'
    					+'  </tr>'
    					+'  '
    					+'  <tr>'
    					+'  <td>암호확인</td>'
    					+'  <td><input name="confirm_pass"   style="margin-right: 150px" type="password" /></td>'
    					+'  </tr>'
    					+'  '
    					+'  <tr>'
    					+'  <td>이메일</td>'
    					+'  <td><input name="email" style="margin-right: 41px" type="email" />@<select>'
    					+'  <option>naver.com</option>'
    					+'  <option>daum.com</option>'
    					+'  <option>google.com</option>'
    					+'  </select>'
    					+'  </td>'
    					+'  </tr>'
    					+'  <tr>'
    					+'  <td>가입일</td>'
    					+'  <td><input name="join_date" type="date" /></td>'
    					+'  </tr>'
    					+'  <tr>'
    					+'  <td>주민번호</td>'
    					+'  <td><input name="ssn" type="text" />-<input type="number" placeholder="" min="1" max="9"/></td>'
    					+'  </tr>'
    					+'  '
    					+'  <tr>'
    					+'  <td>핸드폰번호</td>'
    					+'  <td>'
    					+'  <input type="radio" name="phone" checked="checked"/>SKT'
    					+'  <input type="radio" name="phone" />KT'
    					+'  <input type="radio" name="phone" />LG'
    					+'  <br />'
    					+'  <select>'
    					+'  <option>010</option>'
    					+'  </select>'
    					+'  <input pattern="[0-9]{4}" type="text" />'
    					+'  <input pattern="[0-9]{4}" type="text" />'
    					+'  </td>'
    					+'  </tr>'
    					+'  '
    					+'  <tr>'
    					+'  <td>주소</td>'
    					+'  <td>'
    					+'  <input name="addr" type="button" value="주소검색"/>'
    					+'  <input type="text" />'
    					+'  <input type="hidden" name="cmd" value="insert" />'
    					+'  <input type="hidden" name="dir" value="user" />'
    					+'  <input type="hidden" name="page" value="login" />'
    					+'  </td>'
    					+'  </tr>'
    					+'  <tr>'
    					+'    <td colspan="2" style="text-align: center;">'
    					+'      <button id="join_confirm_btn" style="width: 160px; height: 30px">확 인</button> '
    					+'      <button style="width: 160px; height: 30px">취 소</button>'
    					+'    </td>'
    					+'  </tr>'
    					+'  </table>')
             .attr('style','border:solid black 2px; width:55%;');
    		 if(app.rgx($('#input-pass').val())==='yes'){
    			 $.ajax({
    				 
    			 });
    		 }else{
    			 alert('다시 입력해주세요');
    			 $('#input-pass').val('').focus();
    		 }
    		
    	 });
     };
     var login=x=>{
    	 x.preventDefault();
         var jason={
        		 'userid' : $('#input-userid').val(),
                 'password' : $('#input-password').val()
         };
        alert('로그인 버튼 클릭');
        $.ajax({
            url : context+'/member/userid/login',
            method : 'POST',
            data : JSON.stringify(jason),
            dataType : 'json',
            contentType : 'application/json',
            success : x=>{
                alert('로그인성공여부'+x.success);
                if(x.success==='1'){
                	alert('로그인 성공한 ID : '+ x.user.userid);
                	var userid = x.user.userid;
                    var password = x.user.password; 
                    var jason = x.user;
                    	mypage(jason);
                }else{
                    alert('로그인 실패한 ID : '+x.user.userid);
                }
            },
            error : (x,h,m)=>{
                alert('로그인에서 에러 발생 m='+m+',h='+h+',x='+x);
                
            }
        }); 
	 };
	 var mypage=x=>{
         $.getScript(view,()=>{    
                 $('#content').html(createMyPageTab('table-mypage','table-mypage-class'))
                 .attr('style','border:solid black 2px; width:55%;');
                 $('#b1').remove();
                    $('#c1').remove();
                    $('#d1').remove();
                    $('#e1').remove();
                    $('#a1').attr('colspan',5);
                    $('#a3').remove();
                    $('#a1').html(createHTag({num:'1',val:'MY PAGE'}));
                    $('#a2').attr('rowspan',2);
                    $('#b2').html(createHTag({num:'2',val:'ID'}));
                    $('#b3').html(createHTag({num:'2',val:'PASS'}));
                    $('#b4').html(createHTag({num:'2',val:'주민번호'}));
                    $('#b5').html(createHTag({num:'2',val:'이름'}));
                    $('#c5').html(createHTag({num:'2',val:x.name}));
                    $('#c2').html(createHTag({num:'2',val:x.userid}));
                    $('#c3').html(createHTag({num:'2',val:x.password}));
                    $('#c4').html(createHTag({num:'2',val:x.ssn}));
                    $('#d2').html(createHTag({num:'2',val:'EMAIL'}));
                    $('#d3').html(createHTag({num:'2',val:'ADDRESS'}));
                    $('#d4').html(createHTag({num:'2',val:'PHONE'}));
                    $('#e2').html(createHTag({num:'2',val:x.email}));
                    $('#e3').html(createHTag({num:'2',val:x.addr}));
                    $('#e4').html(createHTag({num:'2',val:x.phone}));
                    
                });
		 
	 };
     return{onCreate:onCreate};
})();
app.algorithm = (()=>{
   var onCreate=()=>{
       $wrapper = $('#wrapper');
       $wrapper2 = $('#wrapper2');
       $wrapper3 = $('#wrapper3');
       context = $.context();
       algo = $.javascript()+'/algo.js';
       view = $.javascript()+'/view.js';
       image = $.image();
       setContentView();
   };
   var setContentView =()=>{
       $.getScript(view,()=>{
           $wrapper.html(navigation());
           
           app.nav.onCreate();
           $(createATag({id : '',val : '수열'}))
              .appendTo($('#li-sequence'))
               .click(()=>{
            	   var jason=null;
            	   $('#container').empty();
            	   $('#container').append($(createDiv({id:'content',clazz:'container'}))
            			   .attr('style', 'margin-top: 50px;')
                           .append(createHTag({id:'2', val:'수열 알고리즘'}))
                           .append(createAlgoTab({id:''})));
                   var $left=$('#tabLeft'),$right=$('#td-algo-arith-init');
                   $(createATag({id:'#a-algo-arith',val:'등차수열의합'}))
                   .appendTo('#li-algo-arith')
                   .click(()=>{
                	   alert('클릭 성공');
                	   $right.empty();
                       $(createInput({id:'input-algo-init',val:'초기값 입력',type : 'text'}))
                       .appendTo($right);
                       $(createInput({id:'input-algo-limit',val:'리밋값 입력',type : 'text'}))
                       .appendTo($right);
                       $(createInput({id:'input-algo-tol',val:'공차 입력',type : 'text'}))
                       .appendTo($right);
                       $(createButton({id:'btn-result',clazz:'btn-primary',val:'결과보기'}))
                       .appendTo($right)
                       .attr('style','margin-top:10px;margin-left:100px;width:100px')
                       .on('click',()=>{
                    	   var x = $('#input-algo-init').val();
                    	   var y = $('#input-algo-limit').val();
                    	   var z = $('#input-algo-tol').val();
                    	   
                    	   if(x !== '' && y !== '' && z !== '' && x>0 && y>0 && z>0){
                    		   $.getScript(algo,()=>{	
                        		   $(createText('span-algo')).appendTo($wrapper3);
                        		   $('#span-algo').text('답 : '+ arith(x,y,z));
                        	   });
                    	   }else{
                    		   alert('값을 넣어주세요');
                    	   }
                       });
                   });
                   $(createATag({id:'#a-algo-switch',val:'스위치수열의합'}))
                   .appendTo('#li-algo-switch')
                   .click(()=>{
                	   alert('클릭 성공');
                	   $right.empty();
                       $(createInput({id:'input-algo-init',val:'초기값 입력',type : 'text'}))
                       .appendTo($right);
                       $(createInput({id:'input-algo-limit',val:'리밋값 입력',type : 'text'}))
                       .appendTo($right);
                       $(createInput({id:'input-algo-tol',val:'공차 입력',type : 'text'}))
                       .appendTo($right);
                       $(createButton({id:'btn-result',clazz:'btn-primary',val:'결과보기'}))
                       .appendTo($right)
                       .attr('style','margin-top:10px;margin-left:100px;width:100px')
                       .on('click',()=>{
                    	   var x = $('#input-algo-init').val();
                    	   var y = $('#input-algo-limit').val();
                    	   var z = $('#input-algo-tol').val();
                    	   
                    	   if(x !== '' && y !== '' && z !== '' && x>0 && y>0 && z>0){
                    		   $.getScript(algo,()=>{	
                        		   $(createText('span-algo')).appendTo($wrapper3);
                        		   $('#span-algo').text('답 : '+ switchSeq(x,y,z));
                        	   });
                    	   }else{
                    		   alert('값을 넣어주세요');
                    	   }
                       });
                   });
                   $(createATag({id:'#a-algo-geo',val:'등비수열'}))
                   .appendTo('#li-algo-geo')
                   .click(()=>{
                	   alert('클릭 성공');
                	   $right.empty();
                       $(createInput({id:'input-algo-init',val:'초기값 입력',type : 'text'}))
                       .appendTo($right);
                       $(createInput({id:'input-algo-limit',val:'리밋값 입력',type : 'text'}))
                       .appendTo($right);
                       $(createInput({id:'input-algo-tol',val:'공차 입력',type : 'text'}))
                       .appendTo($right);
                       $(createButton({id:'btn-result',clazz:'btn-primary',val:'결과보기'}))
                       .appendTo($right)
                       .attr('style','margin-top:10px;margin-left:100px;width:100px')
                       .on('click',()=>{
                    	   var x = $('#input-algo-init').val();
                    	   var y = $('#input-algo-limit').val();
                    	   var z = $('#input-algo-tol').val();
                    	   
                    	   if(x !== '' && y !== '' && z !== '' && x>0 && y>0 && z>0){
                    		   $.getScript(algo,()=>{	
                        		   $(createText('span-algo')).appendTo($wrapper3);
                        		   $('#span-algo').text('답 : '+ geoSeq(x,y,z));
                        	   });
                    	   }else{
                    		   alert('값을 넣어주세요');
                    	   }
                       });
                   });
                   $(createATag({id:'#a-algo-fact',val:'피보나치수열의합'}))
                   .appendTo('#li-algo-fact')
                   .click(()=>{
                	   alert('클릭 성공');
                	   $right.empty();
                	   $(createInput({id:'input-algo-init',val:'초기값 입력',type : 'text'}))
                       .appendTo($right);
                       $(createInput({id:'input-algo-limit',val:'리밋값 입력',type : 'text'}))
                       .appendTo($right);
                       $(createInput({id:'input-algo-tol',val:'공차 입력',type : 'text'}))
                       .appendTo($right);
                       $(createButton({id:'btn-result',clazz:'btn-primary',val:'결과보기'}))
                       .appendTo($right)
                       .attr('style','margin-top:10px;margin-left:100px;width:100px')
                       .on('click',()=>{
                    	   var x = $('#input-algo-init').val();
                    	   var y = $('#input-algo-limit').val();
                    	   var z = $('#input-algo-tol').val();
                    	   
                    	   if(x !== '' && y !== '' && z !== '' && x>0 && y>0 && z>0){
                    		   $.getScript(algo,()=>{	
                        		   $(createText('span-algo')).appendTo($wrapper3);
                        		   $('#span-algo').text('답 : '+ arith(x,y,z));
                        	   });
                    	   }else{
                    		   alert('값을 넣어주세요');
                    	   }
                       });
                   });
                   $(createATag({id:'#a-algo-fibo',val:'팩토리얼수열의합'}))
                   .appendTo('#li-algo-fibo')
                   .click(()=>{
                	  
                   });
                   $(createInput({id:'input-algo-init',val:'초기값 입력',type : 'text'}))
                   .appendTo($right);
                   $(createInput({id:'input-algo-limit',val:'리밋값 입력',type : 'text'}))
                   .appendTo($right);
                   $(createInput({id:'input-algo-tol',val:'공차 입력',type : 'text'}))
                   .appendTo($right);
                   $(createButton({id:'btn-result',clazz:'btn-primary',val:'결과보기'}))
                   .appendTo($right)
                   .attr('style','margin-top:10px;margin-left:100px;width:100px')
                   .on('click',()=>{
                	   var x = $('#input-algo-init').val();
                	   var y = $('#input-algo-limit').val();
                	   var z = $('#input-algo-tol').val();
                	   
                	   if(x !== '' && y !== '' && z !== '' && x>0 && y>0 && z>0){
                		   $.getScript(algo,()=>{	
                    		   $(createText('span-algo')).appendTo($wrapper3);
                    		   $('#span-algo').text('답 : '+ arith(x,y,z));
                    	   });
                	   }else{
                		   alert('값을 넣어주세요');
                	   }
                   });
           });
           $(createATag({id:'',val:'수학'}))
           .appendTo($('#li-math'))
           .click(()=>{
               alert('수학 클릭');
               $.getScript(algo,()=>{
            	   
            	   $wrapper.append($(createDiv({id:'content-tab',clazz:'container'}))
            			   .attr('style', 'margin-top: 50px; padding:0px 200px;')
                           .append(createHTag({id:'2', val:'수학 알고리즘'}))
                           .append(createMathTab('tab-math','tab-math',math(),'수학 테이블','default')));
            	   $('#math1').remove();
            	   $('#math2').remove();
            	   $('#math3').remove();
            	   $('#math4').remove();
            	   $('#math5').remove();
            	   $('#math6').remove();
            	   $('#math0').attr('rowspan',math().length+1);
            	   var $right=$('#math0');
            	   $('#a-td0').on('click',()=>{
            		   $right.empty();
                       $(createInput({id:'input-algo-tol',val:'소수 판별 숫자 입력',type : 'text'}))
                       .appendTo($right);
                       $(createButton({id:'btn-result',clazz:'btn-primary',val:'결과보기'}))
                       .appendTo($right)
                       .attr('style','margin-top:10px;margin-left:100px;width:100px')
                       .on('click',()=>{
                    	   var x = $('#input-algo-tol').val();
                    	   if(x !== ''){
                    		   $.getScript(algo,()=>{	
                        		   $(createText('span-algo')).appendTo($wrapper3);
                        		   $('#span-algo').text('답 : '+ decimal(x));
                        	   });
                    	   }else{
                    		   alert('값을 넣어주세요');
                    	   }
                       });
            	   });
            	   $('#a-td1').on('click',()=>{
            		   alert('클릭');
            		   $right.empty();
                       $(createInput({id:'input-algo-tol',val:'소수 범위 입력',type : 'text'}))
                       .appendTo($right);
                       $(createButton({id:'btn-result',clazz:'btn-primary',val:'결과보기'}))
                       .appendTo($right)
                       .attr('style','margin-top:10px;margin-left:100px;width:100px')
                       .on('click',()=>{
                    	   var x = $('#input-algo-tol').val();
                    	   if(x !== ''){
                    		   $.getScript(algo,()=>{	
                        		   $(createText('span-algo')).appendTo($wrapper3);
                        		   $('#span-algo').text('답 : '+ primeSeq(x));
                        	   });
                    	   }else{
                    		   alert('값을 넣어주세요');
                    	   }
                       });
            	   });
            	   $('#a-td2').on('click',()=>{
            		   $right.empty();
            		   $(createInput({id:'input-algo-init',val:'초기값 입력',type : 'text'}))
                       .appendTo($right);
                       $(createInput({id:'input-algo-limit',val:'리밋값 입력',type : 'text'}))
                       .appendTo($right);
                       $(createButton({id:'btn-result',clazz:'btn-primary',val:'결과보기'}))
                       .appendTo($right)
                       .attr('style','margin-top:10px;margin-left:100px;width:100px')
                       .on('click',()=>{
                    	   var x = $('#input-algo-tol').val();
                    	   if(x !== ''){
                    		   $.getScript(algo,()=>{	
                        		   $(createText('span-algo')).appendTo($wrapper3);
                        		   $('#span-algo').text('답 : '+ primeSeq(x));
                        	   });
                    	   }else{
                    		   alert('값을 넣어주세요');
                    	   }
                       });
            	   });
            	   $('#a-td3').on('click',()=>{
            		   $right.empty();
            	   });
            	   $('#a-td4').on('click',()=>{
            		   $right.empty();
            	   });
            	   $('#a-td5').on('click',()=>{
            		   $right.empty();
            	 });
             });
               
          });
        	  
           $(createATag({id:'',val:'배열'}))
           .appendTo($('#li-matrix'))
           .click(()=>{
        	   $.getScript(algo,()=>{
        		   $wrapper2.html($(createDiv({id:'content-tab',clazz:'container'}))
            			   .attr('style', 'margin-top: 50px; padding:0px 200px;')
                           .append(createHTag({id:'2', val:'배열 알고리즘'}))
                           .append(createTab({id:'test',clazz:'table table-bordered',val:fiveByfive()},'배열 테이블','default')));
        	   });
           });
           $(createATag({id:'',val:'정렬'}))
           .appendTo($('#li-sort'))
           .click(()=>{
        	   $.getScript(algo,()=>{
        		   $wrapper2.html($(createDiv('content-tab','container'))
            			   .attr('style', 'margin-top: 50px; padding:0px 200px;')
                           .append(createHTag('2', '정렬 알고리즘'))
                           .append(createArrayTab('tab-array','tab-math',arrange(),'정렬 테이블','default')));
        		   $('#sort1').remove();
            	   $('#sort2').remove();
            	   $('#sort3').remove();
            	   $('#sort4').remove();
            	   $('#sort0').attr('rowspan',arrange().length+1);
            	   var $right=$('#sort0');
            	   $('#a-td0').on('click',()=>{
            		   $right.empty();
                       $(createInput('input-algo-tol','정렬 숫자 입력','text'))	
                       .appendTo($right);
                       $(createButton('btn-result','btn-primary','결과보기'))
                       .appendTo($right)
                       .attr('style','margin-top:10px;margin-left:100px;width:100px')
                       .on('click',()=>{
                    	   var x = $('#input-algo-tol').val();
                    	   if(x !== ''){
                    		   $.getScript(algo,()=>{	
                        		   $(createText('span-algo')).appendTo($wrapper3);
                        		   $('#span-algo').text('답 : '+ primeSeq(x));
                        	   });
                    	   }else{
                    		   alert('값을 넣어주세요');
                    	   }
                       });
            	   });
        	   });
           });
           $(createATag('','응용'))
           .appendTo($('#li-application'))
           .click(()=>{
        	   alert('응용 클릭');
        	   $.getScript(algo,()=>{
        		   var jason=null;
        		   $wrapper2.html($(createDiv('content-tab','container'))
        				   .attr('style','margin-top:50px; padding:0px 100px;')
        				   .append(createHTag('2','응용 알고리즘'))
        				   .append(createAppTab('tab-app','tab-math',application(),'응용 테이블','default')));
        		   $('#app1').remove();
            	   $('#app2').remove();
            	   $('#app3').remove();
            	   $('#app0').attr('rowspan',arrange().length+1);
            	   var $right=$('#app0');
            	   $(createInput({id:'input-algo-init',val:'초기값 입력',type : 'text'}))
                   .appendTo($right);
                   $(createInput({id:'input-algo-limit',val:'리밋값 입력',type : 'text'}))
                   .appendTo($right);
                   $(createInput({id:'input-algo-tol',val:'공차 입력',type : 'text'}))
                   .appendTo($right);
                   $(createButton({id:'btn-result',calzz:'btn-primary',val:'결과보기'}))
                   .appendTo($right)
                   .attr('style','margin-top:10px;margin-left:100px;width:100px')
                   .on('click',()=>{
                	   var x = $('#input-algo-init').val();
                	   var y = $('#input-algo-limit').val();
                	   var z = $('#input-algo-tol').val();
                	   
                	   if(x !== '' && y !== '' && z !== '' && x>0 && y>0 && z>0){
                		   $.getScript(algo,()=>{	
                    		   $(createText('span-algo')).appendTo($wrapper3);
                    		   $('#span-algo').text('답 : '+ arith(x,y,z));
                    	   });
                	   }else{
                		   alert('값을 넣어주세요');
                	   }
                   });
        	   });
        	
           });
       });
   };
   return{onCreate:onCreate};
})();

app.router = (()=>{
  var onCreate=x=>{
  $.getScript(x+'resources/js/router.js',()=>{
      $.extend(new Router(x));
      app.algorithm.onCreate()
      });        
  };
  return {onCreate:onCreate};
})();