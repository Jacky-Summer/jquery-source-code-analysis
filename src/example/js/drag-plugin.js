~function($){
    if(typeof $ === 'undefined'){
        throw new ReferenceError('The current plugin needs to rely on jquery！');
    }
    class Drag{
        constructor(ele, options = {}){
            if (typeof ele === 'undefined' || ele.nodeType !== 1) {
                throw new ReferenceError('ele is a must pass parameter and must be an element object！');
            }

            this.ele = ele;
            let { selector = ele } = options;
            this.ele = ele;
            this.dragTarget = selector;
            if (typeof selector === 'string') {
                //=>传递一个选择器进来了:我们是想通过操作ELE中某个元素让ELE实现移动
                this.dragTarget = $(ele).find(selector)[0];
            }

             //=>给当前实例挂载三个属性:三个属性就是三个计划表
            this.dragstartPlan = $.Callbacks();
            this.dragingPlan = $.Callbacks();
            this.dragendPlan = $.Callbacks();


            //=>DRAG-START:保证执行原型上的方法,方法中的THIS都是当前类的实例
            this.dragTarget.addEventListener('mousedown', this.down.bind(this));
        }

        down(ev){
            this.startX = ev.clientX,
            this.startY = ev.clientY;

            this.MOVE = this.move.bind(this);
            this.UP = this.up.bind(this);

            let $ele = $(this.ele);
            this.dialogL = parseFloat($ele.css('left'));
            this.dialogT = parseFloat($ele.css('top'));

            document.addEventListener('mousemove',this.MOVE);
            document.addEventListener('mouseup',this.UP);

            this.dragstartPlan.fire(this, ev);//=>通知某一个计划表中的方法执行,把当前类的实例传递给计划表中每一个方法(可以传递更多的值)
        }

        move(ev){
            let { startX, startY, dialogL, dialogT } = this;
            let curL = ev.clientX - startX + dialogL,
                curT = ev.clientY - startY + dialogT;
            this.curL = curL;
            this.curT = curT;
            $(this.ele).css({
                left : curL,
                top  : curT
            });

            this.dragingPlan.fire(this,ev);
        }

        up(ev){
            document.removeEventListener('mousemove',this.MOVE);
            document.removeEventListener('mouseup',this.UP);

            this.dragendPlan.fire(this,ev);
        }
    }

    window.Drag = Drag;
}(jQuery);