var $j = jQuery.noConflict();
$j(function() {
    function setCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else
            var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1)
                    c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }
    function getUrlParameter(url, sParam) {
        var sPageURL = url;
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }
    function getReferrerDomain(referrer_url) {
        var url = document.createElement('a');
        url.href = referrer_url;
        return url.hostname;
    }
    var newURL = window.location.search.substring(1);
    var og_referrer = document.referrer;
    if (og_referrer) {
        var referrer = getReferrerDomain(document.referrer);
    } else {
        var referrer = og_referrer;
    }
    function setUTMCookie() {
        var hasUTMs = newURL.indexOf('utm_');
        var utm_tracking = getUTMValues();
        if (hasUTMs != -1) {
            $j.cookie('utm_tracking', utm_tracking);
        } else if ($j.cookie('utm_tracking') == null) {
            $j.cookie('utm_tracking', utm_tracking);
        }
    }
    function getUTMValues() {
        var utm_medium, utm_source, utm_campaign, utm_content;
        var gclid = getUrlParameter(newURL, 'gclid');
        var all_utms = {};
        var hasUTMs = newURL.indexOf('utm_');
        if (hasUTMs != -1) {
            utm_medium = getUrlParameter(newURL, 'utm_medium');
            utm_source = getUrlParameter(newURL, 'utm_source');
            utm_campaign = getUrlParameter(newURL, 'utm_campaign');
            utm_content = getUrlParameter(newURL, 'utm_content');
        } else {
            if (gclid != undefined) {
                utm_medium = 'cpc';
                utm_source = 'google.com';
            } else {
                if (referrer) {
                    var referrer_clean = referrer.replace('www.', '');
                    switch (referrer_clean) {
                    case 'google.com':
                    case 'google.ca':
                    case 'google.co.uk':
                        utm_source = 'google';
                        utm_medium = 'organic';
                        break;
                    case 'bing.com':
                        utm_source = 'bing';
                        utm_medium = 'organic';
                        break;
                    case 'yahoo.com':
                        utm_source = 'yahoo';
                        utm_medium = 'organic';
                        break;
                    case 'ask.com':
                        utm_source = 'ask';
                        utm_medium = 'organic';
                        break;
                    case 'yandex.com':
                        utm_source = 'yandex';
                        utm_medium = 'organic';
                        break;
                    case 'aol.com':
                        utm_source = 'aol';
                        utm_medium = 'organic';
                        break;
                    case 'ynab':
                        utm_medium = '(none)';
                        utm_source = 'direct';
                    case 'youneedabudget.com':
                        utm_medium = '(none)';
                        utm_source = 'direct';
                    default:
                        utm_medium = 'referral';
                        utm_source = referrer_clean;
                    }
                } else {
                    utm_medium = '(none)';
                    utm_source = 'direct';
                }
            }
        }
        if (utm_medium != undefined) {
            all_utms.utm_medium = utm_medium;
        }
        if (utm_source != undefined) {
            all_utms.utm_source = utm_source;
        }
        if (utm_campaign != undefined) {
            all_utms.utm_campaign = utm_campaign;
        }
        if (utm_content != undefined) {
            all_utms.utm_content = utm_content;
        }
        return JSON.stringify(all_utms);
    }
    function setUTMValues() {
        if ($j.cookie('utm_tracking') == null) {} else {
            var tracking_vals = JSON.parse($j.cookie('utm_tracking'));
            if (tracking_vals.medium !== '') {
                $j('#tracking_utm_medium').val(tracking_vals.utm_medium);
            }
            if (tracking_vals.campaign !== '') {
                $j('#tracking_utm_campaign').val(tracking_vals.utm_campaign);
            }
            if (tracking_vals.source !== '') {
                $j('#tracking_utm_source').val(tracking_vals.utm_source);
            }
            if (tracking_vals.content !== '') {
                $j('#tracking_utm_content').val(tracking_vals.utm_content);
            }
        }
    }
    function appendUTMsOnLink() {
        var tracking_vals = JSON.parse($j.cookie('utm_tracking'));
        if (tracking_vals.utm_content != undefined) {
            utm_content = '&utm_content=' + tracking_vals.utm_content;
        } else {
            utm_content = '';
        }
        if (tracking_vals.utm_campaign != undefined) {
            utm_campaign = '&utm_campaign=' + tracking_vals.utm_campaign;
        } else {
            utm_campaign = '';
        }
        var url_string = '?utm_medium=' + tracking_vals.utm_medium + '&utm_source=' + tracking_vals.utm_source + utm_campaign + utm_content;
        var url = $j('.externalLink').attr('href');
        $j('.externalLink').attr('href', url + url_string);
    }
    setTimeout(function() {
        setUTMCookie();
        setUTMValues();
        appendUTMsOnLink();
    }, 1500);
    function trialConversionTrackingEvents() {
        var ga_sent;
        ga('send', {
            hitType: 'event',
            eventCategory: 'Trial Registration',
            eventAction: 'Registered',
            eventValue: 22,
            hitCallback: function() {
                ga_sent = true;
            }
        });
        fbq('trackCustom', 'Trial Registration');
        var google_conversion_id = 1070740767;
        var google_conversion_label = 'v4X9CIWfygIQn-rI_gM';
        var image = new Image(1,1);
        image.src = "//www.googleadservices.com/pagead/conversion/" + google_conversion_id + "/?label=" + google_conversion_label + "&script=0&language=en&format=3&color=ffffff&value=22&currency=USD&remarketing_only=false";
        try {
            __adroll.record_user({
                "adroll_segments": "161e1787"
            })
        } catch (err) {}
        var tracking_vals = JSON.parse($j.cookie('utm_tracking'));
        if (tracking_vals.utm_source == 'investorjunkie.com') {
            var ijImage = "<img height='1' width='1' border='0' src='//www.clickmeter.com/conversion.aspx?id=6B36E74C33EC4BA4918DA728AEDF9B2B&val=0.00&param=empty&com=0.00&comperc=0.00' />";
            $j('.footerOuterWrap').prepend(ijImage);
        }
    }
    $j('.signup-form').on('submit', function() {
        var form = $j(this)
          , url = form.data('app-url');
        $j('#loader').addClass('loader');
        $j.ajax({
            method: 'post',
            url: url + '/users.json',
            data: {
                user: {
                    email: form.find('.signup-email').val(),
                    password: form.find('.signup-password').val(),
                    coupon_code: form.find('.signup-code').val(),
                    tracking_attributes: {
                        utm_medium: form.find('#tracking_utm_medium').val(),
                        utm_source: form.find('#tracking_utm_source').val(),
                        utm_campaign: form.find('#tracking_utm_campaign').val(),
                        utm_content: form.find('#tracking_utm_content').val()
                    }
                }
            },
            dataType: 'json'
        }).then(function(response) {
            var ota = response.user.ota;
            trialConversionTrackingEvents();
            $j('#user_email').css('border-color', '#acbdca');
            $j('#user_password').css('border-color', '#acbdca');
            $j('.email-errors').html('');
            $j('.password-errors').html('');
            setTimeout(function() {
                window.location.href = url + '/welcome?ota=' + encodeURIComponent(ota);
            }, 1000);
        }).fail(function(response) {
            $j('#loader').removeClass('loader');
            form.find('.signup-errors').text(response.responseText);
            var errors = jQuery.parseJSON(response.responseText);
            if (errors.errors['email'] != null) {
                var email_error = errors.errors['email'];
                $j('#user_email').css('border-color', '#c52622');
                $j('.email-errors').html('');
                $j('.email-errors').css('height', 'auto');
                $j('.email-errors').html('<span>' + email_error + '</span>');
            } else {
                $j('#user_email').css('border-color', '#acbdca');
                $j('.email-errors').html('');
            }
            if (errors.errors['password'] != null) {
                var password_error = errors.errors['password'];
                $j('#user_password').css('border-color', '#c52622');
                $j('.password-errors').html('');
                $j('.password-errors').css('height', 'auto');
                $j('.password-errors').html('<span>' + password_error + '</span>');
            } else {
                $j('#user_password').css('border-color', '#acbdca');
                $j('.password-errors').html('');
            }
        });
        return false;
    });
});
