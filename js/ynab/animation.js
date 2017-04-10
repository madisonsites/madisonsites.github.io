var $j = jQuery.noConflict();
$j(function() {
    var controller = new ScrollMagic.Controller();
    controller.scrollTo(function(target) {
        TweenMax.to(window, 0.5, {
            scrollTo: {
                y: target,
                autoKill: true
            },
            ease: Cubic.easeInOut
        });
    });
    $j(document).on('click', 'a[href^=#]', function(e) {
        var id = $j(this).attr('href');
        if ($j(id).length > 0) {
            e.preventDefault();
            controller.scrollTo(id);
            if (window.history && window.history.pushState) {
                history.pushState('', document.title, id);
            }
        }
    });
    $j.fn.exists = function(callback) {
        var args = [].slice.call(arguments, 1);
        if (this.length) {
            callback.call(this, args);
        }
        return this;
    }
    ;
    $j('#topNotificationWrap').exists(function() {
        var theCurrentCookieVal = $j('#notificationCookieName').val();
        if ($j.cookie('ynab_notification') === null || $j.cookie('ynab_notification') === undefined) {
            var the_height;
            var the_width = this.width();
            if (the_width > 860) {
                the_height = 62;
            } else if (the_width > 600) {
                the_height = 120;
            } else if (the_width > 380) {
                the_height = 100;
            } else {
                the_height = 150;
            }
            $j('#topNotificationWrap p').show();
            TweenMax.to(this, 0.6, {
                height: the_height,
                delay: 0.4
            });
        } else if ($j.cookie('ynab_notification') != theCurrentCookieVal) {
            var the_height;
            var the_width = this.width();
            if (the_width > 860) {
                the_height = 62;
            } else if (the_width > 600) {
                the_height = 120;
            } else if (the_width > 380) {
                the_height = 100;
            } else {
                the_height = 150;
            }
            $j('#topNotificationWrap p').show();
            TweenMax.to(this, 0.6, {
                height: the_height,
                delay: 0.4
            });
        }
    });
    $j('#topNotificationClose').on('click', function() {
        TweenMax.to('#topNotificationWrap', 0.5, {
            height: 0
        });
        createNotificationCookie();
        return false;
    });
    $j('#topNotificationWrap a').on('click', function() {
        createNotificationCookie();
        return true;
    });
    function createNotificationCookie() {
        var date = new Date();
        var timeLengthDays = $j('#notificationCookieDays').val();
        var newDate = new Date(date.setTime(date.getTime() + timeLengthDays * 86400000));
        var cookieVal = $j('#notificationCookieName').val();
        $j.cookie('ynab_notification', cookieVal, {
            expires: date,
            path: '/'
        });
    }
    $j('.topLearnLink a').on('click', function() {
        var learn_is_clicked = $j(this).attr('clicked');
        if (learn_is_clicked == 'not_clicked') {
            $j(this).css('color', '#85c3e9');
            $j(this).css('background-image', 'url("https://marketing-youneedabudgetco.netdna-ssl.com/wp-content/uploads/2017/01/24232609/learnNavArrowClick.png")');
            $j('.topLearnLink span').css('height', 6);
            $j('.topLearnLink span').css('background-color', '#85c3e9');
            TweenMax.to('.learnMegaMenuOuterWrap', 0.3, {
                top: 64,
                opacity: 1
            });
            $j(this).attr('clicked', 'clicked');
        } else {
            $j(this).css('color', '#ababab');
            $j(this).css('background-image', 'url("https://marketing-youneedabudgetco.netdna-ssl.com/wp-content/uploads/2017/01/24232759/learnNavArrow.png")');
            $j('.topLearnLink span').css('height', 0);
            $j('.topLearnLink span').css('background-color', 'transparent');
            TweenMax.to('.learnMegaMenuOuterWrap', 0.3, {
                top: -400,
                opacity: 0
            });
            $j(this).attr('clicked', 'not_clicked');
        }
        return false;
    });
    $j('#mobileLearnLink').on('click', function() {
        var learn_is_clicked = $j(this).attr('clicked');
        if (learn_is_clicked == 'not_clicked') {
            TweenMax.to('#mobileMenuWrap', 0.3, {
                left: '-160%'
            });
            TweenMax.to('.learnMegaMenuInnerWrap .mobileMenuLink', 0.1, {
                display: 'block'
            });
            TweenMax.to('.learnMegaMenuOuterWrap', 0.3, {
                right: 0,
                left: 0,
                opacity: 1
            });
            $j(this).attr('clicked', 'clicked');
        } else {
            TweenMax.to('.learnMegaMenuOuterWrap', 0.3, {
                right: '-100%',
                left: 'auto',
                opacity: 0
            });
            $j(this).attr('clicked', 'not_clicked');
        }
        return false;
    });
    $j('.learnMenuMobileBackBtn').on('click', function() {
        TweenMax.to('.learnMegaMenuOuterWrap', 0.3, {
            right: '-100%',
            left: 'auto',
            opacity: 0
        });
        TweenMax.to('#mobileMenuWrap', 0.3, {
            left: 0
        });
        $j('#mobileLearnLink').attr('clicked', 'not_clicked');
        return false;
    });
    $j('#blogHomeMobileNavBtn').on('click', function() {
        var mobile_is_clicked = $j(this).attr('clicked');
        if (mobile_is_clicked == 'not_clicked') {
            TweenMax.to('.blogHomeNavMobile', 0.3, {
                height: '100%',
                opacity: 1
            });
            $j(this).attr('clicked', 'clicked');
        } else {
            TweenMax.to('.blogHomeNavMobile', 0.3, {
                height: 0,
                opacity: 0
            });
            $j(this).attr('clicked', 'not_clicked');
        }
        return false;
    });
    $j('.playlistCD4UPWrap .col-1-4').hover(function() {
        $j('span', this).animate({
            bottom: 0
        }, 300);
    }, function() {
        $j('span', this).animate({
            bottom: -140
        }, 300);
    });
    $j('.pressIndWrap').hover(function() {
        $j('h3', this).animate({
            zIndex: 9,
            opacity: 0
        }, 300);
    }, function() {
        $j('h3', this).animate({
            zIndex: 14
        }, 100, function() {
            $j(this).animate({
                opacity: 1
            }, 300);
        });
    });
    $j('.topSignUpLink').on('click', openSignupModal);
    $j('.signUpModalBtn a').on('click', openSignupModal);
    $j('#pricingSignupModalBG').on('click', closeSignupModal);
    $j('.signupModalCloseWrap').on('click', closeSignupModal);
    function openSignupModal() {
        $j('#pricingSignupModal').css('display', 'block');
        TweenMax.to('#pricingSignupModalBG', 0.1, {
            height: '100%',
            opacity: 1
        });
        TweenMax.to('#pricingSignupModal', 0.2, {
            scale: 1,
            right: 'auto',
            top: '50%',
            left: '50%',
            opacity: 1,
            x: '-50%',
            y: '-50%'
        });
        $j('.pricingEmailField').focus();
        return false;
    }
    function closeSignupModal() {
        TweenMax.to('#pricingSignupModalBG', 0.1, {
            height: 0,
            opacity: 0
        });
        TweenMax.to('#pricingSignupModal', 0.2, {
            right: 0,
            scale: 1.8,
            top: '50%',
            left: '50%',
            opacity: 0,
            display: 'none'
        });
        return false;
    }
    var mobileNavTween = new TimelineMax();
    mobileNavTween.to('.mobileMenuLink', 0.05, {
        top: 8
    });
    var mobileNavScene = new ScrollMagic.Scene({
        triggerElement: '.topNavOuterWrap',
        triggerHook: 'onLeave'
    }).setTween(mobileNavTween).addTo(controller);
    $j('.mobileMenuLink').on('click', function(e) {
        e.preventDefault();
        var mobile_is_clicked = $j(this).attr('clicked');
        if (mobile_is_clicked == 'not_clicked') {
            TweenMax.to('.mobileMenuMiddleHamb', 0.4, {
                opacity: 0,
                rotation: 90,
                backgroundColor: '#ffffff'
            });
            TweenMax.to('.mobileMenuBottomHamb', 0.4, {
                rotation: 45,
                top: 26,
                backgroundColor: '#ffffff'
            });
            TweenMax.to('.mobileMenuTopHamb', 0.4, {
                rotation: 135,
                top: 26,
                backgroundColor: '#ffffff'
            });
            TweenMax.to('#mobileMenuWrap', 0.6, {
                height: '100%'
            });
            var learnMenuRight = $j('.learnMegaMenuOuterWrap').css('right');
            if (learnMenuRight == '0px') {
                TweenMax.to('.learnMegaMenuOuterWrap', 0.3, {
                    right: '-100%',
                    left: 'auto',
                    opacity: 0
                });
                TweenMax.to('#mobileMenuWrap', 0.3, {
                    left: 0
                });
                $j('#mobileLearnLink').attr('clicked', 'not_clicked');
            }
            TweenMax.to('.mobileMenuLink', 0.4, {
                backgroundColor: 'rgba(255,255,255,0)'
            });
            TweenMax.to('#mobileMenuWrap li', 0.4, {
                opacity: 1
            });
            $j('.mobileMenuLink').attr('clicked', 'clicked');
        } else {
            TweenMax.to('.mobileMenuMiddleHamb', 0.4, {
                opacity: 1,
                rotation: 0,
                backgroundColor: '#12323d'
            });
            TweenMax.to('.mobileMenuBottomHamb', 0.4, {
                rotation: 0,
                top: 34,
                backgroundColor: '#12323d'
            });
            TweenMax.to('.mobileMenuTopHamb', 0.4, {
                rotation: 0,
                top: 18,
                backgroundColor: '#12323d'
            });
            TweenMax.to('#mobileMenuWrap', 0.6, {
                height: 0,
            });
            var learnMenuRight = $j('.learnMegaMenuOuterWrap').css('right');
            if (learnMenuRight == '0px') {
                TweenMax.to('.learnMegaMenuOuterWrap', 0.3, {
                    right: '-100%',
                    left: 'auto',
                    opacity: 0
                });
                TweenMax.to('#mobileMenuWrap', 0.3, {
                    left: 0
                });
                $j('#mobileLearnLink').attr('clicked', 'not_clicked');
            }
            TweenMax.to('.mobileMenuLink', 0.4, {
                backgroundColor: 'rgba(255,255,255,1)'
            });
            TweenMax.to('#mobileMenuWrap li', 0.4, {
                opacity: 0
            });
            $j('.mobileMenuLink').attr('clicked', 'not_clicked');
        }
    });
});
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this
          , args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    }
    ;
}
