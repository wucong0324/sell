<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight': totalCount > 0}">
                            <i class="icon-shopping_cart"></i>
                        </div>
                        <div v-show="totalCount != 0" class="num">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}元</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}</div>
                </div>
                <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay" :class="payClass">{{payDesc}}</div>
                </div>
            </div>
            <div class="ball-container">
                <transition name="drop" v-for="(ball,index) in balls" :key="index" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
                    <div class="ball" v-show="ball.show">
                        <span></span>
                    </div>
                </transition>

            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header border-1px">
                        <h1>购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food border-1px" v-for="(food,index) in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price * food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>

        </div>
        <transition name="mask">
            <div class="list-mask" @click="hideList" v-show="listShow"></div>
        </transition>
    </div>
</template>
<style lang="scss">
    @import "../../common/scss/mixin.scss";
    .list-mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        backdrop-filter: blur(10px);   // 只是针对ios有用
        /*transform: translate3d(0,0,0);*/
        background: rgba(7,17,27,.6);
        transition: all .5s linear;
    }
    .mask-enter,.mask-leave-active{
        /*transform: translate3d(0,-100%,0);*/
        opacity: 0;
    }
    .shopcart{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 20;
        width: 100%;
        height: 48px;
        background: #000;
        .content{
            display: flex;
            background: #141d27;
            font-size: 0;
            .content-left{
                flex: 1;
                .logo-wrapper{
                    display: inline-block;
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    z-index: 30;
                    vertical-align: top;
                    border-radius: 50%;
                    background: #141d27;
                    .logo{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: #2b343c;
                        text-align: center;
                        &.highlight{
                            background: rgb(0,160,220);
                            i{color: #fff}
                         }
                        i{
                            font-size: 24px;
                            color: #80858a;
                            line-height: 44px;
                        }
                    }
                    .num{
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 24px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        border-radius: 16px;
                        font-size: 9px;
                        font-weight: 700;
                        color: #fff;
                        background: rgb(240,20,20);
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
                    }
                }
                .price{
                    display: inline-block;
                    vertical-align: top;
                    line-height: 24px;
                    margin-top: 12px;
                    box-sizing: border-box;
                    padding-right: 12px;
                    border-right: 1px solid rgba(255,255,255,.1);
                    font-size: 16px;
                    font-weight: 700;
                    color: #80858a;
                    &.highlight{
                         color: #fff;
                    }
                }
                .desc{
                    display: inline-block;
                    line-height: 24px;
                    margin: 12px 0 0 12px;
                    font-size: 12px;
                    color: rgba(255,255,255,.4);
                }
            }
            .content-right{
                flex: 0 0 105px;
                width: 105px;
                .pay{
                    font-size: 12px;
                    line-height: 48px;
                    height: 48px;
                    text-align: center;
                    color: rgba(255,255,255,.4);
                    font-weight: 700;
                    background: #2b333b;
                    &.not-enough{
                        background: #2b333b;
                     }
                    &.enough{
                        background: #00b43c;
                        color: #fff;
                     }
                }
            }
        }
        .ball-container{
            .ball{
                position: fixed;
                left: 32px;
                bottom: 22px;
                z-index: 200;
                span{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: rgb(0,160,220);
                    transition: all .4s linear;
                }
            }
            .drop-enter,.drop-enter-active{
                transition: all .4s cubic-bezier(.47,-0.53,.83,.67);
                /*transition: all .4s cubic-bezier(.21,.38,.54,1.52) ;*/
            }
        }
        .shopcart-list{
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            transform: translate3d(0,-100%,0);
            transition: all .5s;
            .list-header{
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: #f3f5f7;
                @include border-1px(rgba(7,17,27,.1));
                h1{
                    float: left;
                    font-size: 14px;
                    color: rgb(7,17,27);
                }
                .empty{
                    float: right;
                    font-size: 12px;
                    color: rgb(0,160,220);
                }
            }
            .list-content{
                padding: 0 18px;
                max-height: 217px;
                background: #fff;
                overflow: hidden;
                .food{
                    position: relative;
                    padding: 12px 0;
                    box-sizing: border-box;
                    @include border-1px(rgba(7,17,27,.1));
                    .name{
                        line-height: 24px;
                        font-size: 14px;
                        color: rgb(7,17,27);
                    }
                    .price{
                        position: absolute;
                        right: 90px;
                        bottom: 12px;
                        font-size: 14px;
                        font-weight: 700;
                        line-height: 24px;
                        color: rgb(240,20,20);
                    }
                    .cartcontrol-wrapper{
                        position: absolute;
                        right: 0;
                        bottom: 6px;
                    }
                }
            }
        }
        .fold-enter-active,.fold-leave-active{
            /*transition: all .5s;*/
        }
        .fold-enter,.fold-leave-active{
            transform: translate3d(0,0,0);
        }
    }
</style>
<script>
    import BScroll from 'better-scroll'
    import cartcontrol from '@/components/cartcontrol/cartcontrol'
    export default{
        props: {
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
            selectFoods: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        computed: {
            totalPrice(){
                var total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count
                });
                return total
            },
            totalCount(){
                var count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count
                });
                return count
            },
            payDesc(){
                if(this.totalPrice === 0){
                    return `￥${this.minPrice}元起送`;
                }else if(this.totalPrice < this.minPrice){
                    var diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`
                }else {
                    return '去结算'
                }
            },
            payClass(){
                if(this.totalPrice < this.minPrice){
                    return 'not-enough'
                }else{
                    return 'enough'
                }
            },
            listShow(){
                if(!this.totalCount){
                    this.fold = true;
                    return false
                }
                var show = !this.fold;
                if(show){
                    this.$nextTick(() => {
                        if(!this.scroll){
                            this.scroll = new BScroll(this.$refs.listContent,{click: true})
                        }else {
                            this.scroll.refresh();
                        }

                    })
                }
                return show
            }
        },
        created(){
            this.$root.eventHub.$on('cart.add', this.drop)
        },
        data(){
            return{
                balls: [
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false}
                ],
                dropBalls: [],
                fold: true
            }
        },
        methods: {
            drop(el){
//                console.log(el);
                for (var i=0;i<this.balls.length;i++){
                    var ball = this.balls[i];
                    if(!ball.show){
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return
                    }
                }
            },
            beforeEnter(el){
                var count = this.balls.length;
                while (count--){
                    var ball = this.balls[count];
                    if(ball.show){
                        var rect = ball.el.getBoundingClientRect();
//                        console.log(rect);
                        var x = rect.left-32;
                        var y = -(window.innerHeight - rect.top -22);
//                        console.log(x + ':' + y);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        var span = el.getElementsByTagName('span')[0];
                        span.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        span.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            enter(el){
                var rf = el.offsetHeight;   //  重绘，必须要写
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.transform = 'translate3d(0,0,0)';
                    var span = el.getElementsByTagName('span')[0];
                    span.style.webkitTransform = 'translate3d(0,0,0)';
                    span.style.transform = 'translate3d(0,0,0)';
                })
            },
            afterEnter(el){
                var ball = this.dropBalls.shift();
                if(ball){
                    ball.show = false;
                    el.style.display = 'none';
                }
//                console.log(this.balls)
            },
            toggleList(){
                if(!this.totalCount){
                    return
                }
                this.fold = !this.fold
            },
            empty(){
                this.selectFoods.forEach((food) => {
                    food.count = 0
                })
            },
            hideList(){
                this.fold = true
            },
            pay(){
                if(this.totalPrice < this.minPrice){
                    return
                }
                window.alert(`需要支付￥${this.totalPrice}元`)
            }
        },
        components:{
            cartcontrol
        }
    }
</script>
