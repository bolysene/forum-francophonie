// NOTE: Don't use this token, replace it with your own client access token.

//Ceate a application tocke from https://dribbble.com/account/applications

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*********************
 *  Helpers Code
 ********************/
/**
 *  @function   DOMReady
 *
 *  @param callback
 *  @param element
 *  @param listener
 *  @returns {*}
 *  @constructor
 */
var DOMReady = function DOMReady() {
  var callback = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
  var element = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
  var listener = arguments.length <= 2 || arguments[2] === undefined ? 'addEventListener' : arguments[2];

  return element[listener] ? element[listener]('DOMContentLoaded', callback) : window.attachEvent('onload', callback);
};

/*********************
 *  Application Code
 ********************/
/**
 *  @class  SimpleSlider
 */

var SimpleSlider = function () {
  /**
   *  @constructor
   *
   *  @param element
   *  @param options
   */

  function SimpleSlider(element) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, SimpleSlider);

    this.el = document.querySelector(element);
    this.options = Object.assign({
      'slides': '.slider__slide',
      'controls': '.slider__control',
      'sliding-time-seconds': '1.3',
      'js-slide': '.js-slide',
      'js-control': '.js-control'
    }, options);

    this.init();
  }
  /**
   *  @function init
   *
   *  @public
   */

  SimpleSlider.prototype.init = function init() {
    var _this = this;

    this.slides = this.el.querySelectorAll(this.options.slides);
    this.controls = this.el.querySelectorAll(this.options.controls);
    this.countOfSlides = this.slides.length;
    this.slidingTime = this.options['sliding-time-seconds'] * 1000;
    this.slidingLock = false;

    [].slice.call(this.slides).forEach(function (el, index) {
      var i = index + 1;

      el.classList.add(_this.options['js-slide'].substring(1) + '--' + i);
      el.dataset.slide = i;

      if (i === 1) {
        el.classList.add(_this.options['js-slide'].substring(1) + '--active');
      }
    });

    [].slice.call(this.controls).forEach(function (el, index) {
      var elData = el.dataset,
          i = index + 1;

      i === 1 ? elData.control = 'left' : elData.control = 'right';

      el.addEventListener('click', _this._controlAction.bind(_this, el), false);
    });
  };
  /**
   *  @function _controlAction
   *
   *  @param el
   *  @private
   */

  SimpleSlider.prototype._controlAction = function _controlAction(el) {
    var _this2 = this;

    if (this.slidingLock) {
      return;
    }
    this.slidingLock = true;

    var currentControl = el,
        currentActive = this.el.querySelector(this.options['js-slide'] + '--active'),
        isLeftControl = currentControl.getAttribute('data-control') === 'left',
        indexOfCurrentSlide = +currentActive.getAttribute('data-slide'),
        newActive = undefined,
        jsSlideActive = this.options['js-slide'].substring(1) + '--active',
        jsSlideActivePrev = this.options['js-slide'].substring(1) + '--active-prev',
        jsControlActive = this.options['js-control'].substring(1) + '--active';

    isLeftControl ? --indexOfCurrentSlide : ++indexOfCurrentSlide;

    if (indexOfCurrentSlide < 1) {
      indexOfCurrentSlide = this.countOfSlides;
    }
    if (indexOfCurrentSlide > this.countOfSlides) {
      indexOfCurrentSlide = 1;
    }

    newActive = this.el.querySelector(this.options['js-slide'] + '--' + indexOfCurrentSlide);

    isLeftControl ? newActive.classList.add(jsSlideActive, jsSlideActivePrev) : newActive.classList.add(jsSlideActive);

    currentControl.classList.add(jsControlActive);
    currentActive.classList.remove(jsSlideActive, jsSlideActivePrev);

    setTimeout(function () {
      currentControl.classList.remove(jsControlActive);

      _this2.slidingLock = false;
    }, this.slidingTime);
  };

  return SimpleSlider;
}();

/**
 *  @function   readyFunction
 *
 *  @type {Function}
 */

var readyFunction = function readyFunction() {
  return new SimpleSlider('.slider');
};

/**
 *  Launcher
 */
DOMReady(readyFunction);

//end



$.jribbble.setToken('YOUR-TOKEN_GOES_HERE');


//Replace srizon with your dribbble username
$.jribbble.users('srizon').shots({
    per_page: 12
}).then(function (shots) {
    var html = [];

    shots.forEach(function (shot) {
        html.push('<li class="col-md-3 col-sm-4 shots--shot">');
        html.push('<a href="' + shot.html_url + '" target="_blank">');
        html.push('<img src="' + shot.images.normal + '">');
        html.push('</a></li>');
    });

    $('.shots').html(html.join(''));
});


//========================
//Follow button
//========================

$(function () {


    // SOME VARIABLES
    var button = '.dribbble-follow-button',
        label = $(button).text(),
        username = $('a' + button).attr('href').toLowerCase().replace('http://dribbble.com/', ''),
        disableCount = $(button).attr('class');

    // DISPLAYED WHEN THE API IS NOT RESPONDING
    $(button).wrap('<div class="dribbble-follow-button" />').removeClass().addClass('label').html('<i></i> ' + label);

    // REQUESTS USER'S DATA FROM DRIBBBLE'S API AND APPENDS IT
    $.getJSON('http://api.dribbble.com/players/' + username + '?callback=?', function (data) {
        $(button).wrap('<div class="dribbble-follow-button ' + disableCount + '" />')
            .parent().html('<a class="label" href="http://dribbble.com/' + username + '" target="_blank"><i></i>' + label + '</a><a class="count" href="http://dribbble.com/' + username + '/followers" target="_blank"><i></i><u></u>' + data.followers_count + ' followers</a>');
        $(button + '.disableCount').find('.count').remove();
    });

});


//========================
//PRELOADER
//========================
$(window).load(function () { // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow');
    // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})
//========================
//CUSTOM SCROLLBAR
//========================
$("html").niceScroll({
    mousescrollstep: 70,
    cursorcolor: "#ea9312",
    cursorwidth: "5px",
    cursorborderradius: "10px",
    cursorborder: "none",
});


//========================
//SMOOTHSCROLL
//========================
$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});


//========================
//NAVBAR
//========================
(function ($) {
    $(document).ready(function () {

        // hide .navbar first
        $(".navbar").hide();

        // fade in .navbar
        $(function () {
            $(window).scroll(function () {

                // set distance user needs to scroll before we start fadeIn
                if ($(this).scrollTop() > 40) {
                    $('.navbar')
                        .removeClass('animated fadeOutUp')
                        .addClass('animated fadeInDown')
                        .fadeIn();

                } else {
                    $('.navbar')
                        .removeClass('animated fadeInDown')
                        .addClass('animated fadeOutUp')
                        .fadeOut();
                }
            });
        });

    });
}(jQuery));


//========================
//icon hover effect
//========================
$('#services img').hover(
    function () {
        $(this).addClass('animated pulse')
    },
    function () {
        $(this).removeClass('animated pulse')
    })