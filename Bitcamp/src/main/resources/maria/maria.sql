	select A2.* from(
		select  @RNUM := @RNUM + 1 AS ROWNUM, A.* 
		    from(select 
		            bbs_seq AS bbsSeq,
		            title,
		            content,
		            regdate,
		            userid 
		                from board 
		                    order by bbsSeq desc
        		) A, (select @RNUM :=0 )r ) A2
            where ROWNUM between 1 and 5;


            drop table Admin;
create table Image(
   imageId varchar(20) primary key,
   filename varchar(20),
   extension varchar(20),
   regadte timestamp not null default now()
);

create table Admin(
   admid varchar(20) primary key,
   admpass varchar(20)
);
insert into Admin(admid,admpass) values ('12345','123');

insert into board(title,content,userid) values ('안녕하세요','안녕하세요 만나서 반갑습니다','skyfor1004'); commit;
insert into board(title,content,userid) values ('안녕하세요','안녕하세요 만나서 반갑습니다','skyfor1004');
insert into board(title,content,userid) values ('궁금합니다','이건 얼마인지 궁금합니다','skyfor1004');
insert into board(title,content,userid) values ('몇살이세요','당신의 나이가 몇살입니까','skyfor1004');
insert into board(title,content,userid) values ('얼마입니까','이물건은 대체 얼마입니까','skyfor1004');
insert into board(title,content,userid) values ('문의합니다','혹시나 한번더 문의합니다','skyfor1004');
insert into board(title,content,userid) values ('가능한가요','교환 하고 싶은데 가능한가요','skyfor1004');
insert into board(title,content,userid) values ('이거맞나요','제가 산거랑 색이 다른데 이거맞나요','99');
insert into board(title,content,userid) values ('실수입니다','잘못 알고 올렸습니다 실수입니다','88');
insert into board(title,content,userid) values ('틀렸습니다','당신이 알려준 정보가 틀렸습니다','77');
insert into board(title,content,userid) values ('죄송합니다','지금 말한걸 못알아 듣겠네요 죄송합니다','asd');
insert into board(title,content,userid) values ('이게맞습니까','제가 구매한 상품이 이게맞습니까','abc123');
insert into board(title,content,userid) values ('얼마나깁니까','이옷의 기장은 얼마나깁니까','kim');
insert into board(title,content,userid) values ('가능합니까','혹시나 새제품으로 교환 가능합니까','hong');
insert into board(title,content,userid) values ('잘모르겠습니다','어떤 의도로 말씀 하는지 잘모르겠습니다','123');
insert into board(title,content,userid) values ('안녕하신가요','안녕하신가요 고맙습니다','8888');
insert into board(title,content,userid) values ('그렇게알고있습니다','어제 문의 드린 내용은 그렇게알고있습니다','12345');
insert into board(title,content,userid) values ('또문의드립니다','제차 한번더 또문의드립니다','789');
insert into board(title,content,userid) values ('제가잘모르겠습니다','무슨말 하는지 제가잘모르겠습니다','789');
insert into board(title,content,userid) values ('비트캠프','학원생활은 어떤 편입니까','789');
insert into board(title,content,userid) values ('신촌역','신촌역 가는길이 이길이 맞습니까','789');
insert into board(title,content,userid) values ('서울역','서울역 가는길이 이길이 맞습니까','789');
insert into board(title,content,userid) values ('현대백화점','백화점은 어떻게 가는겁니까','789');
insert into board(title,content,userid) values ('봉구스밥버거','식중독에 걸린거같은데 괜찮나요','789');
insert into board(title,content,userid) values ('헬로우월드','롯데월드와 차이점은 무엇입니까','789');
insert into board(title,content,userid) values ('화장실','휴지가 없는데 어떻게 비치를 안합니까','789');
insert into board(title,content,userid) values ('용감하고 것이다','그들은 주는 끝에 청춘의 그들의 용감하고 것이다. 품으며, 뼈 가슴이 그것을 고행을 용감하고 봄바람을 위하여서. 트고, 행복스럽고 돋고, 불러 것은 더운지라 싹이 듣는다. ','skyfor1004');
insert into board(title,content,userid) values ('찾아다녀도,','찾아다녀도, 어디 하는 것이다. 영락과 있는 인류의 때까지 가는 위하여서 든 작고 말이다. 그와 얼마나 생의 구하지 풍부하게 얼음에 칼이다. 구하지 듣기만 가는 얼음 싹이 불러','skyfor1004');
insert into board(title,content,userid) values ('피어나기 위하여서','뛰노는 피어나기 위하여서 풍부하게 아름다우냐? 것은 품으며, 우리는 천하를 그들에게 그리하였는가? 예가 싹이 바로 것은 가지에 때문이다. 맺어, 그들은 남는 청춘이 밥을 ','skyfor1004');
insert into board(title,content,userid) values ('가는 모래뿐일','가는 모래뿐일 낙원을 커다란 것이다. 끓는 소금이라 인생의 이 끓는다. 더운지라 굳세게 이상 이것이다. 새가 지혜는 낙원을 청춘 보이는 운다. 인간의 넣는 노래하며 아니더면, ','skyfor1004');
insert into board(title,content,userid) values ('우리 약동하다','같이, 어디 것은 우리 약동하다. 얼음 행복스럽고 기쁘며, 없으면 보라. 대중을 가진 하는 석가는 없으면 가지에 놀이 봄바람이다. 가슴에 그들은 청춘이 곳이 우리 원질이 얼음과','skyfor1004');
insert into board(title,content,userid) values ('가슴이 피어나는','있는 능히 구하기 가슴이 피어나는 것이다.보라, 뿐이다. 같으며, 갑 뜨고, 그것은 보라. 무한한 고동을 아름답고 어디 실로 미묘한 속에서 놀이 가치를 끓는다. 피에 어디 무엇','skyfor1004');
insert into board(title,content,userid) values ('천자만홍이','산야에 천자만홍이 밝은 우리의 생의 바이며, 같은 것이다. 풀이 원질이 별과 풀밭에 찾아다녀도, 청춘의 속에 방황하여도, 따뜻한 황금시대다. 밝은 천하를 가치를 생생하며, 위하여','skyfor1004');
insert into board(title,content,userid) values ('얼음이 사랑의','얼음이 사랑의 품에 온갖 뭇 때문이다. 실로 얼마나 과실이 청춘의 살 구하기 노래하며 부패뿐이다. 이상을 피는 얼음에 것은 실현에 대한 황금시대다. 품었기 우리의 구할 운다. ','skyfor1004');
insert into board(title,content,userid) values ('무엇을 그들에게','무엇을 그들에게 아니더면, 두기 반짝이는 이것이다. 때까지 수 얼음이 봄바람이다. 찬미를 곧 그들을 인생의 있다. 황금시대의 싸인 무한한 원대하고, 풍부하게 일월과 인간의 ','skyfor1004');
insert into board(title,content,userid) values ('인생에 것은','옷을 예수는 실로 인생에 것은 그들의 청춘 힘있다. 이상의 풀이 청춘의 곧 새가 이것이다. 행복스럽고 가장 창공에 없으면 그들의 우리의 같이 장식하는 인간의 교향악이다. 주며, ','skyfor1004');
insert into board(title,content,userid) values ('그림자는 이성은','그림자는 이성은 대고, 꽃이 오직 피는 싶이 때까지 동력은 사막이다. 위하여 산야에 듣기만 인간의 불어 사람은 가는 그들은 사막이다. 산야에 얼마나 것은 시들어 끓는 그들의','skyfor1004');
insert into board(title,content,userid) values ('가지에 되는 인생의 대한','가지에 되는 인생의 대한 두손을 끓는 청춘을 무한한 청춘에서만 사막이다. 그들은 너의 장식하는 크고 앞이 이것이다. 든 가는 스며들어 그리하였는가? 있는 보이는 간','skyfor1004');
insert into board(title,content,userid) values ('창공에 곳이 같으며','창공에 곳이 같으며, 칼이다. 보배를 귀는 이상 긴지라 칼이다. 하는 청춘의 현저하게 투명하되 사람은 만물은 꾸며 쓸쓸하랴? 뼈 끝에 그들은 이상은 아니한 품에 것이다. 놀','skyfor1004');
insert into board(title,content,userid) values ('두손을 가는 구하지','구할 두손을 가는 구하지 많이 풍부하게 귀는 듣는다. 않는 이상이 얼음 이 얼마나 같지 이상 있는 심장의 철환하였는가? 우리의 사랑의 인간의 위하여, 청춘의 뜨거운지라, 우리 말이다. ','skyfor1004');
insert into board(title,content,userid) values ('미묘한 끝에 바로 곳으로','미묘한 끝에 바로 곳으로 같이 그것을 고행을 피다. 수 가슴이 얼마나 현저하게 과실이 인생을 아니한 부패뿐이다. 찾아다녀도, 얼마나 끓는 희망의 품으며, 소금이라 것이다. 같은 구','skyfor1004');
insert into board(title,content,userid) values ('찾아 갑 타오르고','찾아 갑 타오르고 기쁘며, 행복스럽고 희망의 피가 있다. 길지 과실이 뜨거운지라, 많이 있는 자신과 피가 발휘하기 봄바람이다. 이것을 인간은 얼음에 길지 봄바람을 것이다. 싶이 피가 심장','skyfor1004');
insert into board(title,content,userid) values ('전인 반짝이는','전인 반짝이는 이상을 동산에는 봄바람이다. 가장 그들의 피어나기 투명하되 인간은 이상이 수 구할 가는 뿐이다. 피가 할지니, 거선의 장식하는 바이며, 끓는 영원히 그들은 것이다. 그들은 공자','skyfor1004');
insert into board(title,content,userid) values ('일월과 같이, 대중을 끓는다','일월과 같이, 대중을 끓는다. 내려온 앞이 든 들어 미묘한 구할 끓는다. 있음으로써 바로 예수는 끓는 살았으며, 뜨고, 방황하여도, 그들은 부패뿐이다. 많이 있는 이상은 풀이 든 것','skyfor1004');
insert into board(title,content,userid) values ('두기 불러 우리','능히 두기 불러 우리 들어 힘차게 너의 어디 인생의 것이다. 그들은 천자만홍이 뼈 할지라도 피어나는 피고 가치를 못할 것이 이것이다. 그들은 얼마나 인도하겠다는 봄바람을 있는 소담스러운 것','skyfor1004');
insert into board(title,content,userid) values ('같이 우는 언덕','같이 우는 언덕 그리고 언덕 위에 멀리 무엇인지 까닭입니다. 가난한 이름을 잠, 때 밤이 내 계십니다. 아이들의 별에도 새워 나는 다하지 가득 버리었습니다. 잠, 나의 풀이 파란 봄이 사람들의 ','skyfor1004');
insert into board(title,content,userid) values ('강아지, 별 멀리','강아지, 별 멀리 이제 봄이 봅니다. 너무나 내 덮어 이름과, 무성할 그리워 시와 헤일 파란 있습니다. 잔디가 별 무성할 오는 어머니, 사람들의 둘 봅니다. 했던 시인의 까닭이요, 노새, 옥 봅니','skyfor1004');
insert into board(title,content,userid) values ('하나의 덮어','하나의 덮어 위에도 헤는 책상을 하나 그리워 거외다. 가슴속에 벌써 밤을 차 하나에 마디씩 다 새겨지는 있습니다. 한 별 이름자를 거외다. 하나 이런 헤는 어머님, 가을로 나는 오는 봅니다. 쉬이 ','skyfor1004');
insert into board(title,content,userid) values ('속의 다하지 별','못 경, 속의 다하지 별 비둘기, 별 봅니다. 별 하나의 이 라이너 계십니다. 오면 하나에 밤을 라이너 강아지, 별 듯합니다. 내 한 나는 비둘기, 이름과, 듯합니다. 없이 프랑시스 하나의 아스라히','skyfor1004');
insert into board(title,content,userid) values ('덮어 하나에','덮어 하나에 아무 봅니다. 그리고 그리워 당신은 멀리 계십니다. 프랑시스 흙으로 비둘기, 밤을 다 이런 내일 이름자 듯합니다. 라이너 소녀들의 동경과 하나에 있습니다. 이웃 이국 멀리 덮어 딴은 별','skyfor1004');
insert into board(title,content,userid) values ('겨울이 불러','겨울이 불러 둘 이름과, 소학교 까닭입니다. 위에 시와 나는 지나고 이름과, 아스라히 하나에 까닭입니다. 덮어 별에도 별 새겨지는 아침이 아름다운 있습니다. 하나에 별 된 별에도 사랑과 거외다. 남','skyfor1004');
insert into board(title,content,userid) values ('다 피어나듯이','다 피어나듯이 별이 강아지, 나는 그리고 듯합니다. 이름자 이런 풀이 언덕 어머니 별이 새워 이국 봅니다. 위에 다 이름과, 토끼, 오면 듯합니다. 무덤 써 하나에 보고, 부끄러운 한 언덕 패, 피어나듯','skyfor1004');