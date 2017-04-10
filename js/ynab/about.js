var $j = jQuery.noConflict();
$j(function() {
    $j('ul.aboutTabs li').click(function() {
        var tab_id = $j(this).attr('data-tab');
        $j('ul.aboutTabs li').removeClass('currentAboutTab');
        $j('.aboutTab-content').removeClass('currentAboutTab');
        $j(this).addClass('currentAboutTab');
        $j("#" + tab_id).addClass('currentAboutTab');
    });
});
