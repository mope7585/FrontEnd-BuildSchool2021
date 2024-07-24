/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /(android|ipad|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);


if (jQuery.browser.mobile) {
    $("body").addClass("is-mobile");
}
// if( /iPad|iPhone/i.test(navigator.userAgent) ) {
//   $('body').addClass('is-ios');
// }
// if (/android/i.test(navigator.userAgent) ) {
//   $('body').addClass('is-android');
// }

function menuToggle() {

    $('.main-menu a').click(function() {
        $(".site-menu").removeClass('is-view');
        $(".to-top").removeClass('is-hide');
    });

    $('#menu-toggle').click(function() {
        $(".site-menu").addClass('is-view');
    });

    $('#menu-close').click(function() {
        $(".site-menu").removeClass('is-view');
    });


}


function scroll() {

    $(window).scroll(function() {

        var scroll = $(window).scrollTop();

        if (scroll >= 80) {
            $("#header").addClass("sticky");
            $("#side-sticky").addClass("is-view");
        } else {
            $("#header").removeClass("sticky");
            $("#side-sticky").removeClass("is-view");
        }

    });

    $(window).height(function() {

        var scroll = $(window).scrollTop();

        if (scroll >= 80) {
            $("#header").addClass("sticky");
            $("#side-sticky").addClass("is-view");
        } else {
            $("#header").removeClass("sticky");
            $("#side-sticky").removeClass("is-view");
        }

    });

    ;
    (function($, win) {
        $.fn.inViewport = function(cb) {
            return this.each(function(i, el) {
                function visPx() {
                    var elH = $(el).outerHeight(),
                        H = $(win).height(),
                        r = el.getBoundingClientRect(),
                        t = r.top,
                        b = r.bottom;
                    return cb.call(el, Math.max(0, t > 0 ? Math.min(elH, H - t) : Math.min(b, H)));
                }
                visPx();
                $(win).on("resize scroll", visPx);
            });
        };

    }(jQuery, window));

    $('.site-footer').inViewport(function(px) {
        if (px > 0) {
            $('.side-sticky').addClass('change-bottom');
        } else {
            $('.side-sticky').removeClass('change-bottom');
        }
    });

}


(function($) {
    var _hash = location.hash || null,
        _validateLocHash = function(val) {
            try { var $val = $(val); } catch (error) { return false; } //avoid js errors on invalid selectors
            return $(val).length && $("a[href*='" + val + "']").length;
        };
    // $(document).ready(function() {
    //     if (_hash) {
    //         if (_validateLocHash(_hash)) {
    //             var href = window.location.href.replace(/#.*$/, "#");
    //             $(window).scrollTop(0); //stop jump to hash straight away
    //             if (window.history && window.history.replaceState) {
    //                 window.history.replaceState("", "", href);
    //             } else {
    //                 window.location.href = href;
    //             }
    //         }
    //     }
    // });
    $(window).on("load", function() {
        $(".main-menu a").mPageScroll2id({
            highlightSelector: ".main-menu a",
        });
    });
})(jQuery);

function inview() {

    $('.in-view').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
        $(this).delay(0).queue(function() { $(this).addClass("animated fadeInUp"); });
    });

}

function swiper() {

    var swiper = new Swiper('.l-swiper', {
        slidesPerView: "auto",
        slidesPerGroup: 4,
        // freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        autoHeight: false,
        navigation: {
            nextEl: '.landing-swiper-container .swiper-button-next',
            prevEl: '.landing-swiper-container .swiper-button-prev',
        },
        pagination: {
            el: ".landing-swiper-container .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerGroup: 1,
            },
            480: {
                slidesPerGroup: 1,
            },
            640: {
                slidesPerGroup: 1,
            },
            1080: {
                slidesPerGroup: 3,
            },
            1081: {
                slidesPerGroup: 4,
            }
        }
    });


}

(function ($) {
  $.fn.countup = function (params) {
    // make sure dependency is present
    if (typeof CountUp !== 'function') {
      console.error('countUp.js is a required dependency of countUp-jquery.js.');
      return;
    }

    var defaults = {
      startVal: 0,
      decimalPlaces: 0,
      duration: 2,
    };

    if (typeof params === 'number') {
      defaults.endVal = params;
    }
    else if (typeof params === 'object') {
      $.extend(defaults, params);
    }
    else {
      console.error('countUp-jquery requires its argument to be either an object or number');
      return;
    }

    this.each(function (i, elem) {
      var countUp = new CountUp(elem, defaults.endVal, defaults.options);
      countUp.start();
    });

    return this;
  };

}(jQuery));


function countUp() {
    
  // var options = {
  //   useEasing: true,
  //   useGrouping: true,
  //   separator: ',',
  //   decimal: '.',
  //   prefix: '',
  //   suffix: ''
  // };

  // var counts = [];

  // $('.statvalue').each(function() {
  //   var num = $(this).attr('numx'); //end count
  //   var nuen = $(this).text();
  //   if (nuen === "") {
  //   nuen = 0;
  //   }
  
  //   counts.push(new CountUp(this, nuen, num, 0, 1.5, options));
  // });

  // var waypoint1 = new Waypoint({
  //   element: document.getElementById("statistics"),
  //   handler: function(direction) {
  //     if (direction == "up") {
  //       for (var i = 0; i < counts.length; i++) {
  //         // counts[i].reset();
  //       }
  //     } else {
  //       for (var i = 0; i < counts.length; i++) {
  //         counts[i].start();
  //       }
  //     }
  //   },
  //   offset: "75%"
  // });

  // https://codepen.io/ErrorDactyl/pen/mrNNdX

  var counter1 = new CountUp("counter1", 0, 4000, 0, 1, {
    useEasing: true,
    useGrouping: true,
    // separator: ',',
    separator: '',
    decimal: '.',
    prefix: '',
  });

  var counter2 = new CountUp("counter2", 0, 1800, 0, 1, {
    useEasing: true,
    useGrouping: true,
    // separator: ',',
    separator: '',
    decimal: '.',
    prefix: '',
  });

  var counter3 = new CountUp("counter3", 0, 75, 0, 1, {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    // separator: '',
    decimal: '.',
    prefix: '',
  });

  var counter4 = new CountUp("counter4", 0, 50, 0, 1, {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    // separator: '',
    decimal: '.',
    prefix: '',
  });

  
  var waypoint1 = new Waypoint({
    element: document.getElementById('statistics-1'),
    handler: function(direction) {

      if (direction == "up") {
        // counter1.reset();
      } else {
        counter1.start();
        counter2.start();
        counter3.start();
        counter4.start();
      }

    },
    offset: '90%'
  });
  

}

$(document).ready(function() {

    menuToggle();
    scroll();
    inview();
    swiper();

    countUp();

    $(".kv").addClass("active");

    $(".btn-top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });

    $('.main-menu a, .anchor-link').click(function(){

        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
        }, 500);
        return false;

    });

    var $window = $(window),
        $html = $('html');

    function resize() {

        if ($window.width() > 768) {
            $(".site-menu").removeClass('is-view');
            $("body").removeClass('scroll--hidden');
        }

    }

    $window.resize(resize).trigger('resize');


});


// https://stackoverflow.com/questions/3664381/force-page-scroll-position-to-top-at-page-refresh-in-html
// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
// }
