(function(){
    var version = "1.11.3",
	jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context );//=>创建了init这个类的实例，也相当于创建了jQuery这个类的实例（因为在后面的时候，让init.prototype=jQuery.prototype）
    };
    jQuery.fn = jQuery.prototype = {

    }
    //=>JQUERY是一个类，在它的原型上提供了很多的属性和方法，供JQ的实例调取使用
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,//=>当前类的原型重定向后,自己开辟的堆内存中是没有CONSTRUCTOR的，需要手动增加保证它的完整性
        //...
    };

    //=>给JQ原型上增加EXTEND方法，同时把JQ当做一个普通对象，给这个对象设置了一个私有的方法
    /*
     * JQ是一个类（也是一个普通对象）：函数的两种角色，JQ是一个类库提供了很多的方法，其中这些方法有两部分
     *   1.放到JQ原型上的(jQuery.fn/jQuery.prototype)，这里面的方法是供JQ实例调取使用的
     *   2.把JQ当做一个普通的对象，在对象上设置一些私有的属性和方法，这类方法以后用的时候直接的jQuery.xxx()执行即可
     */
    jQuery.extend = jQuery.fn.extend = function () {
        //=>EXTEND是把一个对象中的属性和方法扩展到指定的对象上
    };

})();