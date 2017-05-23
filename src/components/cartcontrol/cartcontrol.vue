<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" @click.stop.prevent="decreaseCart($event)" v-show="food.count > 0">
                <span class="icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>
<style lang="scss">
    .cartcontrol{
        font-size: 0;
        .cart-decrease{
            display: inline-block;
            padding: 6px;
            transition: all .4s linear;
            span{
                display: inline-block;
                font-size: 24px;
                line-height: 24px;
                color: rgb(0,160,220);
                transition: all .3s linear;
            }
        }
        .move-enter-active,.move-leave-active{
            opacity: 1;
            transform: translate3d(0,0,0);
            span{transform: rotate(0)}
        }
        .move-leave-active,.move-enter{
            opacity: 0;
            transform: translate3d(24px,0,0);
            span{transform: rotate(180deg)}
        }
        .cart-count{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147,153,159);
        }
        .cart-add{
            display: inline-block;
            padding: 6px;
            font-size: 24px;
            line-height: 24px;
            color: rgb(0,160,220);
        }
    }
</style>
<script>
    import Vue from 'vue'
    export default{
        props: {
            food: {
                type: Object
            }
        },
        created(){
//            console.log(this.food)
        },
        methods: {
            addCart(event){
                if(!event._constructed){
                    return
                }
                if (!this.food.count){
//                    this.food.count = 1;
                    Vue.set(this.food,'count',1)
                }else {
                    this.food.count++
                }
                this.$root.eventHub.$emit('cart.add', event.target)
            },
            decreaseCart(){
                if(!event._constructed){
                    return
                }
                if(this.food.count){
                    this.food.count--
                }
            }
        }
    }
</script>
