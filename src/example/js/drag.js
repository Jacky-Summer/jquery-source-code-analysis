$(function(){
    let $dragMark = $('.dragMark'),
        $dragDialog = $('.dragDialog'),
        $dragTitle = $dragDialog.find('.title'),
        $closeBtn = $dragTitle.find('i');

    let winW = document.documentElement.clientWidth,
        winH = document.documentElement.clientHeight,
        dialogW = $dragDialog[0].offsetWidth,
        dialogH = $dragDialog[0].offsetHeight;

    $dragDialog.css({
        top: ( winH - dialogH ) /2 ,
        left: (winW - dialogW ) / 2  
    })

    let dragStart = function dragStart(ev){
        this.startX = ev.clientX;
        this.startY = ev.clientY;
        this.dialogL = parseFloat($dragDialog.css('left'));
        this.dialogT = parseFloat($dragDialog.css('top'));

        $dragTitle.on('mousemove',dragMove);
    };
    
    //=>鼠标移动处理的事情:让盒子跟随鼠标一起移动(边界判断)
    let dragMove = function dragMove(ev){
         //=>随时根据鼠标的当前位置，减去起始的鼠标位置，计算出鼠标的偏移值，用偏移值加上盒子的起始位置，算出盒子的当前位置
        let { startX, startY, dialogL, dialogT } = this;
        let curL = ev.clientX - startX + dialogL,
            curT = ev.clientY - startY + dialogT;
        $dragDialog.css({
            left: curL,
            top: curT
        });
    };
    //=>鼠标离开处理的事情
    let dragEnd = function dragEnd(ev){
        $dragTitle.off('mousemove',dragMove);
    };

    $dragTitle.on('mousedown',dragStart);
    $dragTitle.on('mouseup',dragEnd);
});