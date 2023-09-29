jQuery(document).ready(function($) {
    // Variables
    var currentSlide = 1,
        currentDate = $('.slide_wrapperwidget-0-0-3 .active').data("date"),
        slideName = $('.slide_wrapperwidget-0-0-3 div.slide'),
        totalSlides = slideName.length,
        slideCounter = $('.slide_wrapperwidget-0-0-3 .slide-counter'),
        sliderDate = $('.slide_wrapperwidget-0-0-3 .slide-date'),
        btnNext = $('.slide_wrapperwidget-0-0-3 a#btn-next'),
        btnPrev = $('.slide_wrapperwidget-0-0-3 a#btn-prev'),
        addSlide = $('.slide_wrapperwidget-0-0-3 a#add-slide');

    slideCounter.text(currentSlide + ' / ' + totalSlides);
    sliderDate.html('<span class="research-date-label"><i class="fa fa-calendar"></i></span>' + currentDate);
    // Slide Transitions
    function btnTransition(button, direction) {
        $(button).on('click', function() {

            if (button === btnNext && currentSlide >= totalSlides) {
                currentSlide = 1;
            } else if (button === btnPrev && currentSlide === 1) {
                currentSlide = totalSlides;
            } else {
                direction();
            };
            currentDate = $(slideName).eq(currentSlide - 1).data("date");
            slideName.filter('.active').animate({
                opacity: 0,
                left: -40
            }, 400, function() {
                $(this)
                    .removeClass('active')
                    .css('left', 0);
                $(slideName)
                    .eq(currentSlide - 1)
                    .css({
                        'opacity': 0,
                        'left': 40
                    })
                    .addClass('active')
                    .animate({
                        opacity: 1,
                        left: 0
                    }, 400);
            });

            slideCounter.text(currentSlide + ' / ' + totalSlides);
            sliderDate.html('<span class="research-date-label"><i class="fa fa-calendar"></i></span>' + currentDate);
        });
    };
    // Slide forward
    btnTransition(btnNext, function() {
        currentSlide++;
    });
    // Slide Backwards
    btnTransition(btnPrev, function() {
        currentSlide--;
    });
});
