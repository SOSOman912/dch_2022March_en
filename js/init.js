var backToTopButton = document.getElementById('back-to-top');

backToTopButton.addEventListener('click',function() {
    window.scrollTo(0,0);
})

$('.nav-list-mobile li').each(function() {
    $(this).click(function() {
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('.dropdown').slideUp();
        } else {
            $(this).addClass('active');
            $(this).find('.dropdown').slideDown();
        }
    })
})

$('.mobile-trigger').click(function() {
    $('.mobile-nav').css('right',0);
    $('.mobile-nav').addClass('active');
    $('body').addClass('overflow-hidden');
})

$('.close-btn').click(function() {
    $('.mobile-nav').css('right','-100%');
    $('.mobile-nav').removeClass('active');
    $('body').removeClass('overflow-hidden');
})

$('.swiper-container').each(function() {
    var swiper = new Swiper($(this), {
        speed:1000,
        autoHeight: true,
        allowTouchMove: false,
        effect: "fade",
        fadeEffect: {
            crossFade: true
          },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        }
    })    

    $(this).mouseenter(function() {
        swiper.autoplay.stop();
    })

    $(this).mouseleave(function() {
        swiper.autoplay.start();
    })
})

$("body").on('click', '[data-image]', function(e){
    e.preventDefault();

    $.fancybox.open(
        {
            src: `${$(this).attr('src')}`,
            type: 'image'
        }
    );
})

var lastScrollTop = 0;
$(window).scroll(function(e){
    var st = $(this).scrollTop();
    if (st < lastScrollTop) {
        $('#back-to-top').addClass('active');
    } else {
        $('#back-to-top').removeClass('active');
    }
    lastScrollTop = st;
})

$(function() {
    $('.nav-list').children('li').each(function() {
        if ($('body').hasClass($(this).attr('class'))) {
            $(this).addClass('active');
        }
    })
    $('.dropdown').find('li').each(function() {
        if ($('body').hasClass($(this).attr('class'))) {
            $(this).addClass('active');
        }
    })
})

$(window).on('resize',function() {
    if($(window).width() > 992) { 
        $('body').removeClass('overflow-hidden'); 
        $('.mobile-nav').hide();
    } else {
        if($('.mobile-nav').hasClass('active')) {
            $('body').addClass('overflow-hidden'); 
            $('.mobile-nav').show();
        }
    }
})