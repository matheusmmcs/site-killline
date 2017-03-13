$(document).ready(function () {
	/* ----------------- */
	$(".disabled").click(function(event) {
	  event.preventDefault();
	});
	
	$(".disabled").mouseout(function(event){
		$(this).children('img').css('top', '0px');
	}).mouseover(function(event){
		$(this).children('img').css('top', '-60px');
	});
	
	$('[data-toggle=offcanvas]').click(function () {
	    $('.row-offcanvas').toggleClass('active')
	});


	/* NAVBAR */
	var $navHeader = $('.navbar-header');
	$('#navbar').on('show.bs.collapse', function () {
	  	$navHeader.css({background: '#f8f8f8'});
	}).on('hidden.bs.collapse', function () {
	  	$navHeader.css({background: 'transparent'});
	})

	/* SCROLL */

	var classScrollSpy = $('body').attr('data-target'), $navScrollSpy = $(classScrollSpy);

	$(classScrollSpy).on("click", "a", function (e) {
		e.preventDefault();
		scrollTo($(e.target).attr('href'));
	});
	$(document).on("click", ".circ-next", function(e){
		e.preventDefault();
		var $el = e.target.tagName.toUpperCase() == 'SPAN' ? $(e.target).parent().attr('href') : $(e.target).attr('href');
		scrollTo($el);
	});

	function scrollTo(elTo){
		var options = elTo == "#part-1" ? {} : {offset: {top: 22}};
		$('body').scrollTo(elTo, 800, options);
	}

	/* ANIMATE */
	var animateDelay = 0, animateEffect = 'fadeInUp', mapScrollSpy = {}, offset = 40;
	//x.position().top - scrollY - innerHeight

	$('.animate-area').each(function(){
		console.log(this.id, $(this).position().top, $(this).offset().top)
		if(this.id){
			mapScrollSpy["#"+this.id] = {y: $(this).position().top, running: false};
		}
	})

	animateCSS();
	$(window).scroll(function(){
		animateCSS();
	});

	function animateCSS(){
		var posy = scrollY + innerHeight;
		for(var i in mapScrollSpy){
			if(mapScrollSpy[i].y + offset - posy < 0 && !mapScrollSpy[i].running){
				mapScrollSpy[i].running = true;
					$(i).find(".animate").each(function(){
						var $that = $(this);
						var running = this.attributes['animate-running'] ? this.attributes['animate-running'].value : 'false';
						var unique = this.attributes['animate-unique'] ? this.attributes['animate-unique'].value : 'true';
						var effect = this.attributes['animate-effect'] ? this.attributes['animate-effect'].value : animateEffect;
						var delay = this.attributes['animate-delay'] ? parseInt(this.attributes['animate-delay'].value) : animateDelay;
						delay = delay ? delay : animateDelay;
						
						if(running === 'false'){
							this.setAttribute('animate-running', "true");
							setTimeout(function(){
								$that.addClass('animated '+effect);
								$that.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
									this.removeAttribute('animate-running');
									if(unique === 'false'){
										$that.removeClass("opacity-0 "+effect);
									}
								});
							}, delay);
						}
					});
			}
		}
	}
});