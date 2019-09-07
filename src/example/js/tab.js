$(function(){
    $('.tabBox>.header>li').on('click',function(){
        var index = $(this).index();
        $(this).addClass('active')
        .siblings().removeClass('active')
        .parent().nextAll('div')
        .eq(index).addClass('active').siblings().removeClass('active');
    });
});
