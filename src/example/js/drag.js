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
        /*$(document).on('mousemove', dragMove)
            .on('mouseup', dragEnd);

          此时dragMove/dragEnd中的THIS都是DOCUMENT，但是我们在DRAG-MOVE使用的THIS希望和DRAG-START中的THIS相同，都是H3即可
           A:bind
           B:箭头函数
        */

        //=>BIND是预先处理THIS
        // console.log(dragMove.bind(this) === dragMove);//=>FALSE:说明执行BIND把方法中的THIS预先进行改变处理，得到的结果和原有的函数是不一样的，也就是此时我们给DOCUMENT绑定的方法就不在是DRAG-MOVE了
        this.DRAG_MOVE = dragMove.bind(this);
        this.DRAG_END = dragEnd.bind(this);
        $(document).on('mousemove',this.DRAG_MOVE).on('mouseup',this.DRAG_END);
    };
    
    //=>鼠标移动处理的事情:让盒子跟随鼠标一起移动(边界判断)
    let dragMove = function dragMove(ev){
         //=>随时根据鼠标的当前位置，减去起始的鼠标位置，计算出鼠标的偏移值，用偏移值加上盒子的起始位置，算出盒子的当前位置
        let { startX, startY, dialogL, dialogT } = this;
        let curL = ev.clientX - startX + dialogL,
            curT = ev.clientY - startY + dialogT,
            minL = 0,
            minT = 0,
            maxL = winW - dialogW,
            maxT = winH - dialogH;
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
        $dragDialog.css({
            left: curL,
            top: curT
        });
    };
    //=>鼠标离开处理的事情
    let dragEnd = function dragEnd(ev){
        $(document).off('mousemove',this.DRAG_MOVE).off('mouseup',this.DRAG_END);
    };

    $dragTitle.on('mousedown',dragStart);
});