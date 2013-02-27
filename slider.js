(function($){

	$.fn.slider = function(options) {

		var base = this;
		var next = $(".slider-nav-next");
		var prev = $(".slider-nav-prev");
		var x;

		base.options = options;

		base.init = function(){

			base.options = $.extend({},$.fn.slider.defaults,options);
			console.log("init");
			$.getJSON('gallery.json', function(data) {
			  	
			  	$.each(data, function(key, val) {
				  	var elem = $('<div></div>');
				  	elem.addClass('slide').addClass('slide-'+(key + 1));

				  	elem.append( $('<img src="' + data[key].image + '" />') );

				  	elem.append($('<div></div>').addClass('textBox'));
				  	elem.find('.textBox').append('<p>' + data[key].title + '</p>');
				  	elem.find('.textBox').append('<p>' + data[key].description + '</p>');

				  	base.find(".innerSlider").append(elem);
			  	});
			 
			});

			base.autoPlayFn = function(){

				x = setTimeout(function(){
					base.triggerAutoPlay();
				}, base.options.slideTime);
			};

			if(base.options.autoPlay){
				base.autoPlayFn();
			}

			base.triggerAutoPlay = function(){

				next.trigger('click');
				base.autoPlayFn();

			};
			
			next.on("click",function(){

				var tempSlide = $('.innerSlider').children(':first').clone();
				//console.log(tempSlide);
				$('.innerSlider').children(':first').next().stop(1,1).animate({"margin-left": "-600px" }, base.options.speed, function(){
					$(this).css({"margin-left":"0px"});
					$('.innerSlider').children(':first').remove();
				});
				$('.innerSlider').append(tempSlide);


			});

			prev.on("click",function(){
				clearInterval(x);
				// base.autoPlayFn();
				
				$('.innerSlider').children(':last').css({"margin-left":"-600px"});
				var tempSlide = $('.innerSlider').children(':last').clone();
				$('.innerSlider').prepend(tempSlide);
				$('.innerSlider').children(':last').remove();
				$('.innerSlider').children(':first').stop(1,1).animate({"margin-left": "0px" }, base.options.speed);

			});

			next.add(prev).add('.innerSlider').mouseenter(function(){
				clearInterval(x);
			}).mouseleave(function(){
				base.autoPlayFn();
			});

		};//end init method


		base.init();
	};

	$.fn.slider.defaults = {
		speed: 500,
		slideTime: 3000,
		autoPlay: true
	};

})(jQuery);