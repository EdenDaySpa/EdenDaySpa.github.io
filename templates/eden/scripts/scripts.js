function googleMapInit()
{
	var mapOptions = {
		zoom: 17,
		center: new google.maps.LatLng(52.2440463,20.9628691),
		styles:[{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
	};
	var mapElement = document.getElementById('google_maps_footer');
	var map = new google.maps.Map(mapElement, mapOptions);

	var infowindow = new google.maps.InfoWindow({
		 content: '<div id="content" style="width:200px;"><div id="siteNotice"></div><b>Eden Day Spa<br>ul. Zawiszy 14 lok. 6,<br>01-167 Warszawa</b></div>'
	});

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(52.2440075,20.962863),
		map: map,
		title:"Varsovia Dental",
	animation: google.maps.Animation.DROP
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});

	infowindow.open(map,marker);
}

function parallax()
{
	var windowHeight = $(window).height();
	var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html'),
		viewportTop = $(scrollElem).scrollTop(),
		viewportBottom = (viewportTop + windowHeight);
	


	$('.parallax').each(function() {
		var $container = $(this);
		var start = parseInt($container.attr('data-parallax-start'));
		var end = parseInt($container.attr('data-parallax-end'));	
		var containerTop = $container.offset().top;
		var containerPercentTop = (containerTop - viewportTop) / windowHeight;
		var newY = start + (end - start) * containerPercentTop;
		/*
		console.log("windowHeight: " + windowHeight);
		console.log("viewportTop: " + viewportTop);
		console.log("containerTop) " + containerTop);
		console.log("containerPercentTop)" + containerPercentTop);
		console.log("newY)" + newY);
		console.log("-------------------------");	
		*/
		$container.css('background-position', '50% ' + newY + '%');
	});
}

function nextOpinion()
{
	var $list = $('.opinions-list');
	var $items = $list.children();
	var $active = parseInt($list.attr('data-active'));

	$($items.get($active)).fadeOut(300, function() {
		$active += 1;
		
		if($active == $items.length)
			$active = 0;

		$($items.get($active)).fadeIn(300);
		$list.attr('data-active', $active);
		
		setTimeout(nextOpinion, 3000);
	});
}

function scrollTo(target)
{
	var $target = $(target);

	var scrollElem = $((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
	var newScrollTop = $target.offset().top - 50;
	var duration = (newScrollTop - scrollElem.scrollTop()) / 5;
	if(duration < 500)
		duration = 500;

	scrollElem.stop().animate({'scrollTop': newScrollTop}, duration);
}

$(document).ready(function() {


	nextOpinion();
	
	wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100
      }
    );
    wow.init();
	
	$(window).load(function(){
		// Remove the # from the hash, as different browsers may or may not include it
		var hash = location.hash.replace('#','');

		if(hash != ''){
			// Clear the hash in the URL
			// location.hash = '';   // delete front "//" if you want to change the address bar
			scrollTo('.' + hash);
		}
	});

	$(document).on('scroll', function() {
		var windowHeight = $(window).height();
		var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html'),
			viewportTop = $(scrollElem).scrollTop(),
			viewportBottom = (viewportTop + windowHeight);
			//console.log(viewportTop+'/'+windowHeight/2);
		if(viewportTop > windowHeight / 2)
		{
			$('.top.animating').addClass('shown');
		}
		else
			$('.top.animating').removeClass('shown');
		
		// right-menu
		/*var $rightMenu = $('.right-menu');
		var rightMenuTop = $rightMenu.offset().top;
		var mode = 'white';
		var $switches = $('.right-switch');
		
		for(var i = 0; i < $switches.length; ++i)
		{
			if($($switches.get(i)).offset().top <= rightMenuTop)
				mode = $($switches.get(i)).hasClass('white') ? 'white' : 'black';
			else
				break;
		}
		
		if(mode == 'white')
			$rightMenu.removeClass('black');
		else
			$rightMenu.addClass('black');*/
			
		var container = $('.contact-form-container');
		if(container != undefined && container.offset() != undefined)
		{
			var containerTop = container.offset().top;
			var containerHeight = $('.contact-form-height').height();
			var formHeight = $('.contact-form-float').height();

			if(containerTop < viewportTop + 165)
			{
				var newTop = viewportTop - containerTop + 165;
				if(newTop + formHeight > containerHeight)
					newTop = containerHeight - formHeight;
			
				$('.contact-form-float').stop().animate({top: newTop});
			}
			else
				$('.contact-form-float').stop().animate({top: 0});
		}
			
		// parallax`s
		parallax();
	});
});
