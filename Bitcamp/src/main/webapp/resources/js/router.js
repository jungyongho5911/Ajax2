function Router(x){
	sessionStorage.setItem('context',x);
	sessionStorage.setItem('javascript',x+'/resources/js');
	sessionStorage.setItem('style',x+'/resources/css');
	sessionStorage.setItem('image',x+'/resources/img');
	return{
		context:()=>{return sessionStorage.getItem('context');},
		javascript:()=>{return sessionStorage.getItem('javascript');},
		style:()=>{return sessionStorage.getItem('style');},
		image:()=>{return sessionStorage.getItem('image');}
	};
}
