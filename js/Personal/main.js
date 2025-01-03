jQuery(document).ready(function($) {
    "use strict";
    /* ---------------------------------------------------------------------- */
    /* ------------------ SHUFFLE JS / PUBLICATION  -------------------------- */
    /* ---------------------------------------------------------------------- */
    var $mygrid = $('#mygrid');
    $mygrid.shuffle({
        itemSelector: '.publication_item',
        speed: 500
    });
    /* reshuffle when user clicks a filter item */
    $('#filter a').on('click', function(e) {
        e.preventDefault();
        // get group name from clicked item
        var groupName = $(this).attr('data-group');
        // reshuffle grid
        $mygrid.shuffle('shuffle', groupName);
    });
    $mygrid.shuffle('shuffle', 'all');
    //sorting fonction
    $('.desc').on('click', function() {
        var sort = "date-publication",
            opts = {
                reverse: true,
                by: function($el) {
                    return $el.data('date-publication');
                }
            }

        // Filter elements
        $mygrid.shuffle('sort', opts);
    });
    $('.asc').on('click', function() {
        var sort = "date-publication",
            opts = {
                reverse: false,
                by: function($el) {
                    return $el.data('date-publication');
                }
            }

        // Filter elements
        $mygrid.shuffle('sort', opts);
    });
    /* ---------------------------------------------------------------------- */
    /* ------------------ SHUFFLE JS / PORTFOLIO  -------------------------- */
    /* ---------------------------------------------------------------------- */
    var $mygridportfolio = $('#mygridportfolio');
    $mygridportfolio.shuffle({
        itemSelector: '.portfol_item',
        speed: 500
    });
    /* reshuffle when user clicks a filter item */
    $('#portfoliofilter a').on('click', function(e) {
        e.preventDefault();
        // get group name from clicked item
        var groupName = $(this).attr('data-group');
        // reshuffle grid
        $mygridportfolio.shuffle('shuffle', groupName);
    });
    $mygridportfolio.shuffle('shuffle', 'all');
    /* ---------------------------------------------------------------------- */
    /* -------------------------- STIKCY POST  ------------------------------ */
    /* ---------------------------------------------------------------------- */

    $( ".sticky .content-wrapper" ).append( "<div class='featured'><i class='fa fa-star'></i></div>" );

    /* ---------------------------------------------------------------------- */
    /* --------------------------NEWS / RECENT ACTIVITY  -------------------- */
    /* ---------------------------------------------------------------------- */
    $("#marquee").marquee();
    /* ---------------------------------------------------------------------- */
    /* ------------------------------ MAGNIFIC POPUP ------------------------ */
    /* ---------------------------------------------------------------------- */
    $('.open_popup').magnificPopup({
        type: 'inline',
        midClick: true,
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        }
    });
    /* ---------------------------------------------------------------------- */
    /* ------------------------------ SKILLS -------------------------------- */
    /* ---------------------------------------------------------------------- */
    $('.bar-percentage[data-percentage]').each(function() {
        var progress = $(this);
        var percentage = Math.ceil($(this).attr('data-percentage'));
        progress.text(percentage + '%');
        progress.siblings().children().css('width', percentage + '%');
    });
    /* ---------------------------------------------------------------------- */
    /* --------------------- SCROLL REINITIALISATION ------------------------ */
    /* ---------------------------------------------------------------------- */

    jQuery('.jspPane').bind('resize', function (e) {
        var pane = $('div.hs-content-wrapper > article');
        if (pane.length) {
            pane.jScrollPane({
                verticalGutter: 0,
                hideFocus: false,
                contentWidth: '0px'
            });
            var api = pane.data('jsp');
            api.reinitialise();
        }


    });
    /* ---------------------------------------------------------------------- */
    /* --------------------- ABOUT SECTION TOGGLE CARD ---------------------- */
    /* ---------------------------------------------------------------------- */
    var menu_trigger = $("[data-card-front]");
    var back_trigger = $("[data-card-back]");

    menu_trigger.on('click', function() {
        $(".about-card").toggleClass("show-menu");
    });

    back_trigger.on('click', function() {
        $(".about-card").toggleClass("show-menu");
    });

    /* ---------------------------------------------------------------------- */
    /* ------------------------------- CONTACT ------------------------------ */
    /* ---------------------------------------------------------------------- */
    $("#contact-form").submit(function() {
      //get input field values
      var user_name = $('input[name=name]').val();
      var user_email = $('input[name=email]').val();
      var user_subject = $('input[name=subject]').val();
      var user_message = $('textarea[name=message]').val();

      var proceed = true;
      if (user_name == "") {
          $('input[name=name]').css('border-color', 'red');
          proceed = false;
      }
      if (user_email == "") {
          $('input[name=email]').css('border-color', 'red');
          proceed = false;
      }
      if (user_subject == "") {
          $('input[name=subject]').css('border-color', 'red');
          proceed = false;
      }
      if (user_message == "") {
          $('textarea[name=message]').css('border-color', 'red');
          proceed = false;
      }

      if (proceed) {
          const serviceID = 'service_io2j8sb';
          const templateID = 'template_wckx97k';

          emailjs.sendForm(serviceID, templateID, this).then(function(response) {
            $('.email-receipt').text('Your email has been successfully delivered!').css({visibility: "visible"}).animate({opacity: 1.0, "margin-bottom": "26px", "background-color": "#0cc0c1"}, 900);

            // Clean text inputs to avoid new submissions
            $('input[name=name]').val("");
            $('input[name=email]').val("");
            $('input[name=subject]').val("");
            $('textarea[name=message]').val("");
          }, function(error) {
            $('.email-receipt').text('There was an error and your email has not been delivered! Please try again later.').css({visibility: "visible", "background-color": "#F23860"}).animate({opacity: 1.0, "margin-bottom": "26px"}, 900);
          });
      }

      return false;
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact-form input, #contact_form textarea").on('keyup', function() {
        $("#contact-form input, #contact-form textarea").css('border-color', '');
        $("#result").slideUp();
    });
    /* ---------------------------------------------------------------------- */
    /* --------------------------- PLACEHOLDER ------------------------------ */
    /* ---------------------------------------------------------------------- */
    $('input, textarea').placeholder();
    /* ---------------------------------------------------------------------- */
    /* --------------------------- RESPONSIVE SIDEBAR ----------------------- */
    /* ---------------------------------------------------------------------- */
    var content = $('.hs-menu nav').contents();
    $('#my-panel').jScrollPane();
    $(window).bind("load resize", function() {
        if ($(window).width() <= 900) {
            $('#my-link').panelslider({
                side: 'left',
                clickClose: false,
                duration: 200
            });
            content.appendTo('#my-panel');
        } else {
            $.panelslider.close();
            content.appendTo('.hs-menu nav');
        }
        jQuery('.jspPane').bind('resize', function(e) {
            var pane = $('div.hs-content-wrapper > article');
            if (pane.length ) {
                pane.jScrollPane({
                verticalGutter: 0,
                hideFocus: false,
                contentWidth: '0px'
            });
            var api = pane.data('jsp');
            api.reinitialise();
            }

        });
    });
    /* ---------------------------------------------------------------------- */
    /* ---------------------- NAVIGUATION ARROW KEYBOARD -------------------- */
    /* ---------------------------------------------------------------------- */
    $("body").on('keydown', function(e) {
        if (e.keyCode == 37) { // left
            $(".previous-page").click();
        } else if (e.keyCode == 39) { // right
            $(".next-page").click();;
        }
    });

        /* ---------------------------------------------------------------------- */
    /* ----------------------------- PROCESS  ------------------------------- */
    /* ---------------------------------------------------------------------- */

    var current_fs, next_fs, previous_fs;
    var left, opacity, scale;
    var animating;

    $(".next").click(function() {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        $("#progressbar li").eq($(".proceess").index(next_fs)).addClass("active");

        next_fs.show();

        current_fs.animate({
            opacity: 0
        }, {
            step: function(now, mx) {
                scale = 1 - (1 - now) * 0.2;
                left = (now * 50) + "%";
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')'
                });
                next_fs.css({
                    'left': left,
                    'opacity': opacity
                });
            },
            duration: 0,
            complete: function() {
                current_fs.hide();
                animating = false;
            },
            easing: 'easeInOutBack'
        });
    });

    $(".previous").click(function() {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        $("#progressbar li").eq($(".proceess").index(current_fs)).removeClass("active");

        previous_fs.show();
        current_fs.animate({
            opacity: 0
        }, {
            step: function(now, mx) {
                scale = 0.8 + (1 - now) * 0.2;
                left = ((1 - now) * 50) + "%";
                opacity = 1 - now;
                current_fs.css({
                    'left': left
                });
                previous_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'opacity': opacity
                });
            },
            duration: 0,
            complete: function() {
                current_fs.hide();
                animating = false;
            },
            easing: 'easeInOutBack'
        });
    });
    /* ---------------------------------------------------------------------- */
    /* -------------------- ADD SUB MENU PARENT CLASS ----------------------- */
    /* ---------------------------------------------------------------------- */

     $( ".hs-menu nav .sub-menu" ).prev().addClass( "menu-has-sub" );
     $(".menu-has-sub .fa").after("<span class='fa fa-angle-down'></span>");
    /* ---------------------------------------------------------------------- */
    /* ---------------------- FIX OLD SAFARI BUGS  -------------------------- */
    /* ---------------------------------------------------------------------- */
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        var oldsldrwidth = $('.research-section .slider-details').width();
        $('.research-section .slider-details').width(oldsldrwidth - 100);
        $(window).bind("load resize", function() {
            if ($(window).width() > 900) {

                var heightdoc = $(document).height();
                $('.hs-content-wrapper').height(heightdoc - 47);
                var heightwrp = $('.hs-content-wrapper').height();
                $('.hs-content').height(heightwrp - 22);
                var pane = $('div.hs-content-wrapper > article')
                pane.jScrollPane({
                    verticalGutter: 0,
                    hideFocus: false,
                    contentWidth: '0px'
                });
                var api = pane.data('jsp');
                api.reinitialise();
            } else {
                $('.hs-content-wrapper').css('height', 'auto');

            }
        });

    }

});
