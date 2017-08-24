$(function () {

	var lastId,
		topMenu = $("#top-menu"),
		topMenuHeight = topMenu.outerHeight(),
		menuItems = topMenu.find("a"),

		scrollItems = menuItems.map(function(){
			var temp = $(this).attr("href");
			console.log('temp', temp );
			var ID = temp.split('#').pop();
			console.log('ID', ID );
			if(!ID){
				console.log('ID undefined');
				var item = $('body');
			} else {
				var item = $('#'+ID);
			}
		  
			console.log('item', item );
			if (item.length) { return item; }
		});

	menuItems.click(function(e){
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 800);
		e.preventDefault();
	});

	$(window).scroll(function(){

		var fromTop = $(this).scrollTop()+topMenuHeight;
	   
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop)
			return this;
		});

		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";
	   
		if (lastId !== id) {
			lastId = id;
			menuItems
				.parent().removeClass("active")
				.end().filter("[href='#"+id+"']").parent().addClass("active");
		}                   
	});

	$("#work img").click(function(e){
		var img = $(this).clone();
		$(".content").html(img);
	});
	
	
});
		
		
		