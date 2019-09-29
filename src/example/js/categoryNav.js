$(function(){
    //=>基于事件委托给最外层的盒子的MOUSE-OVER绑定方法，这样不管操作后代元素中的谁的MOUSE-OVER，这个方法都会执行
    let $detailBox = $('.detailBox');
    $(document.body).on('mouseover',function(ev){
        let target = ev.target,
            tag = target.tagName,
            $target = $(target),
            $pars = $(target).parents();//=>获取当前事件源的祖先元素
        
        let flag = $pars.filter('.navBox').length > 0 ? true : false;

        //=>如果事件源是NAV-BOX中的A或者LI（让DETAIL-BOX显示）
        if((tag === 'A' || tag === 'LI') && flag){
            let val = $(target).text().match(/\d+/);
            $detailBox.css('display','block').html(`当前是导航${val}的内容`);
            return;
        }    
        $detailBox.css('display','none');
        
    });

    $('.detailBox').on('mouseover',function(ev){
        ev.stopPropagation();
    }); 
});