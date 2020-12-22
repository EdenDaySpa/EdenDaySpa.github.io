/*!
 * jQuery Cookie Policy Plugin
 */
(function($) {
$.fn.cookiepolicy = function(options) {
    new jQuery.cookiepolicy($(this), options);
	return this;
};

$.cookiepolicy = function(options) {
	options = $.extend({
		cookie: 'cookiepolicyinfo',
		info: 'Używamy cookies i podobnych technologii m.in. w celu jak najlepszego dopasowania zawartości strony do potrzeb Użytkowników. Jeśli nie blokujesz tych plików, to zgadzasz się na ich użycie oraz zapisanie w pamięci urządzenia. Pamiętaj, że możesz samodzielnie zarządzać cookies, zmieniając ustawienia przeglądarki. <div style="float:right;margin: 20px;"><label>Nie pokazuj wiecej tego powiadomienia<input type="checkbox" class="acceptCookie" style="display:inline;margin-left: 15px;"></label></div>',
		close: 'Zamknij'
	}, options || {});
    if($.cookie(options.cookie) != 'true') {
        var wrapper = $('<div/>').addClass('cookiepolicy').appendTo('body');
		$('<div/>').addClass('cookiepolicyImg').appendTo(wrapper);
		//$(wrapper).append('');
		$('<a/>').addClass('button').html(options.close).appendTo(wrapper)
            .on('click', function(e) {
                e.preventDefault();
		if($('.acceptCookie:checked').length){
			$.cookie(options.cookie, true, {expires: 20*365});		
		} else {
                	$.cookie(options.cookie, true);
		}
                $(this).parents('.cookiepolicy').remove();
            });
        $('<span/>').html(options.info).appendTo(wrapper);
        
    }
};
})(jQuery);


