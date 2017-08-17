		$(function () {
/*		
			$(".form-control").on({
				focus: function() {
					$(this).animate({width: "50%"}, 1000);
					$(this).next().animate({width: "0"}, 1000, function() {
						$(this).siblings().eq(1).animate({opacity: "1"}, 500);
					});
					
				}, blur: function() {
					var $this = this;
					if (!$($this).val()) {
					
						$($this).siblings().eq(1).animate({opacity: "0"}, 500, function() {
							$($this).animate({width: "30%"}, 1000);
							$($this).next().animate({width: "65%"}, 1000);
						});
					
						
					};
				}
			});
			
		
			var clicks = 0;
			$(".lower-pic p, #logo").hover(function() {
				$("#logo").addClass("animated flash");
			}, function() {
				$("#logo").removeClass("animated flash");
			});
			
			$("#logo").click(function() {
				clicks += 1;
				if (clicks == 1) {
					$("body").addClass("animated shake");
					$(".right-item").removeClass("animated slideInRight").addClass("animated slideOutRight");
					$(".left-item").removeClass("animated slideInLeft").addClass("animated slideOutLeft");
					$(".back").css({"visibility": "visible"}).removeClass("animated fadeOut").addClass("animated fadeIn");
				} else {
					$("body").removeClass("animated shake");
					$(".right-item").removeClass("animated slideOutRight").addClass("animated slideInRight");
					$(".left-item").removeClass("animated slideOutLeft").addClass("animated slideInLeft");
					$(".back").removeClass("animated fadeIn").addClass("animated fadeOut");
				};
			});
*/			
			


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
	
		});
		
		
		