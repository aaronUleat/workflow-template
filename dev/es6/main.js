(function(){
	var APP = {
		// initialize general website
		init:function(){
			this.initializeMenu();
		},
		// initialize home page
		home:function(){
			this.initializeSliders('home');
		},
		// initialize page2
		page2:function(){
			this.initializeSliders('page2');
		},
		// initialize page3
		page3:function(){
			//
		},
		// initialize page4
		page4:function(){
			//
		},
		// initialize page5
		page5:function(){
			//
		},
		// initialize page6
		page6:function(){
			//
		},
		// initialize page7
		page7:function(){
			//
		},
		// create sidr menu Mobile for the general web site
		initializeMenu:function(){
			// Load the nav bar menu
			$('#simple-menu').sidr({displace: false});
			// Close the Nav Bar menu
			$('#left-close').on('click', function(){$.sidr('close','sidr');});
			// open/close sub menu 
			$('.menu-title').click(function(){
				$(this).children('.sub-menu').slideToggle();
			});			
		},
		// create tabulation
		initializeTab: function(section){
			if(section === 'home'){
				//
			}else if(section === 'page2'){
				//
			}else if(section === 'page3'){
				
			}else if(section === 'page4'){
				//Default Action
				$(".tab_content").hide(); //Hide all content
				$("ul.tabs li:first").addClass("active").show(); //Activate first tab
				$(".tab_content:first").show(); //Show first tab content
				
				//On Click Event
				$("ul.tabs li").click(function() {
					$("ul.tabs li").removeClass("active"); //Remove any "active" class
					$(this).addClass("active"); //Add "active" class to selected tab
					$(".tab_content").hide(); //Hide all tab content
					var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
					$(activeTab).fadeIn(); //Fade in the active content
					return false;
				});
			}
		},
		// create vertical slider
		initializeVerticaSlider: function(section){
			if(section === 'home'){
				//
			}else if(section === 'page2'){
				//
			}else if(section === 'page3'){
				
			}else if(section === 'page4'){
				//
			}else if(section === 'page5'){
				var VerticalCarousel = function(element){
				  this.slideUp = function(){
				    window.setInterval(function(){
				      $(element+' .remove-next').remove();
				      $(element+' .post-active').clone().insertAfter("ul li:last").toggleClass('post-active');
				      $(element+' .post-active').toggleClass('post-active remove-next');
				      $(element+' .active').toggleClass('active post-active').next().addClass('active');
				    }, 3000);
				  }
				};
				var c = new VerticalCarousel('#carousel');
				c.slideUp();
			}
		},
		// create vertical accordion
		initializeAccordion1: function(section){
			if(section === 'home'){
				//
			}else if(section === 'page2'){
				//
			}else if(section === 'page3'){
				$('.acordeon').on('click','h2',function(){
					var t = $(this);
					var tp = t.next();
					var p = t.parent().siblings().find('p');
					tp.slideToggle();
					p.slideUp();
				});
			}else if(section === 'page4'){
				//
			}
		},
		// general function to create slick sliders according the section asigned
		initializeSliders: function(section){
			if(section === 'home'){
				$('.main-slider').slick({
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows : true,
					dots : true,
					autoplay : false,
					fade: true,
					speed: 700,
					pauseOnHover : false,
					// vertical: true,
				});				 
			}
			else if(section === 'page2'){
				$('.slider-for').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					asNavFor: '.slider-nav'
				});
				$('.slider-nav').slick({
					infinite: true,
					// initialSlide: 0,
					slidesToShow: 5,
					slidesToScroll: 1,
					arrows : true,
					asNavFor: '.slider-for',
					dots: false,
					// centerMode: true,
					// centerPadding: '60px',
					focusOnSelect: true,
					responsive: [
					{
						breakpoint: 960,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
							centerMode: true,
							centerPadding: '55px',
						}
					},
					{
						breakpoint: 768,
				           settings: {
								slidesToShow:2,
								slidesToScroll: 1,
								centerMode: true,
								centerPadding: '55px',
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: false,
							centerMode: true,
							centerPadding: '55px',
						}
					}
				]
				});
			}else if(section === 'page3'){
				//
			}
		}
	}
	// initialize the web site app
	APP.init();
	// load the app according the body section asigned
	if($('body').hasClass('home')){
		APP.home();
	}else if($('body').hasClass('page2')){
		APP.page2();
	}else if($('body').hasClass('page3')){
		APP.page3();
	}else if($('body').hasClass('page4')){
		APP.page4();
	}else if($('body').hasClass('page5')){
		APP.page5();
	}else if($('body').hasClass('page6')){
		APP.page6();
	}else if($('body').hasClass('page7')){
		APP.page7();
	}	
}())