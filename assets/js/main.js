/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main')

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Fix: Flexbox min-height bug on IE.
	if (browser.name == 'ie') {

		var flexboxFixTimeoutId;

		$window.on('resize.flexbox-fix', function () {

			clearTimeout(flexboxFixTimeoutId);

			flexboxFixTimeoutId = setTimeout(function () {

				if ($wrapper.prop('scrollHeight') > $window.height())
					$wrapper.css('height', 'auto');
				else
					$wrapper.css('height', '100vh');

			}, 250);

		}).triggerHandler('resize.flexbox-fix');

	}

	// Nav.
	var $nav = $header.children('nav'),
		$nav_li = $nav.find('li');

	// Add "middle" alignment classes if we're dealing with an even number of items.
	if ($nav_li.length % 2 == 0) {

		$nav.addClass('use-middle');
		$nav_li.eq(($nav_li.length / 2)).addClass('is-middle');

	}

	// Scroll restoration.
	// This prevents the page from scrolling back to the top on a hashchange.
	if ('scrollRestoration' in history)
		history.scrollRestoration = 'manual';
	else {

		var oldScrollPos = 0,
			scrollPos = 0,
			$htmlbody = $('html,body');

		$window
			.on('scroll', function () {

				oldScrollPos = scrollPos;
				scrollPos = $htmlbody.scrollTop();

			})
			.on('hashchange', function () {
				$window.scrollTop(oldScrollPos);
			});

	}
// Detect request animation frame
var scroll = window.requestAnimationFrame ||
             // IE Fallback
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.show-on-scroll');

function loop() {
    Array.prototype.forEach.call(elementsToShow, function(element){
      if (isElementInViewport(element)) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
		});

    scroll(loop);
}

// Call the loop for the first time
loop();

// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

})(jQuery);