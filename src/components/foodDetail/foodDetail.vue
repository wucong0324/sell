<template>
    <transition name="move">
        <div class="foodWrapper" v-show="showDetail" ref="food">
            <div class="foodDetail">
                <div class="back" @click="showToggle">
                    <i class="icon-arrow_lift"></i>
                </div>
                <div class="imgBox">
                    <img :src="food.image" :alt="food.name">
                </div>
                <div class="sellWrapper">
                    <h1>{{food.name}}</h1>
                    <div class="sellInfo">
                        <span>月售{{food.sellCount}}份</span>
                        <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="current">￥</span>{{food.price}}
                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="shopCart">
                        <transition name="shopCart">
                            <p v-show="!food.count" @click.stop.prevent="addCart($event)">加入购物车</p>
                        </transition>
                    </div>
                    <cartcontrol :food="food"></cartcontrol>
                </div>
                <split v-if="food.info"></split>
                <div class="intro" v-if="food.info">
                    <h1>商品介绍</h1>
                    <p>{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1>商品评价</h1>
                    <ratingSelect :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" @ratingtype-event="selected" @only-event="selectOnly"></ratingSelect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" class="rating-item border-1px">
                                <div class="user">
                                    <span>{{rating.username}}</span>
                                    <img width="12px" height="12px" :src="rating.avatar">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <i :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></i>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>

</template>
<style lang="scss">
    @import "../../common/scss/mixin.scss";
    .foodWrapper{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 48px;
        width: 100%;
        background: #fff;
        transform: translate3d(0,0,0);
        transition: all .5s ease;
        .foodDetail{
            position: relative;
            .back{
                position: absolute;
                z-index: 10;
                top: 12px;
                left: 6px;
                color: #fff;
                font-size: 16px;
                padding: 8px;
                border-radius: 50%;
                background: rgba(7,17,27,.3);
            }
            .imgBox{
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 100%;
                img{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            .sellWrapper{
                padding: 18px;
                position: relative;
                h1{
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(7,17,27);
                    line-height: 14px;

                }
                .sellInfo{
                    color: rgb(147,153,159);
                    font-size: 10px;
                    line-height: 10px;
                    margin: 8px 0 18px 0;
                    span{
                        margin-right: 12px;
                    }
                }
                .price{
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240,20,20);
                    .current{font-size: 10px}
                    .old{
                        color: rgb(147,153,159);
                        text-decoration: line-through;
                        font-size: 10px;
                        margin-left: 8px;
                    }
                }
                .shopCart{
                    position: absolute;
                    right: 18px;
                    bottom: 18px;
                    z-index: 20;
                    p{
                        font-size: 12px;
                        color: #fff;
                        border-radius: 12px;
                        line-height: 12px;
                        padding: 6px 12px;
                        background: rgb(0,160,220);
                        transition: all .5s linear;
                    }
                    .shopCart-enter,.shopCart-leave-active{
                        opacity: 0;
                    }
                }
                .cartcontrol{
                    position: absolute;
                    right: 18px;
                    bottom: 12px;
                    z-index: 10;
                }
            }
            .intro{
                padding: 18px;
                h1{
                    color: rgb(7,17,27);
                    font-size: 14px;
                    line-height: 14px;
                    margin-bottom: 6px;
                }
                p{
                    font-size: 12px;
                    color: rgb(77,85,93);
                    font-weight: 200;
                    line-height: 24px;
                    padding: 0 8px;
                }
            }
            .rating{
                h1{
                    color: rgb(7,17,27);
                    font-size: 14px;
                    line-height: 14px;
                    padding: 18px 18px 0;
                }
                .rating-item{
                    padding: 16px 0;
                    margin: 0 18px;
                    position: relative;
                    @include border-1px(rgba(7,17,27,.1));
                    .user{
                        position: absolute;
                        top: 16px;
                        right: 0;
                        font-size: 10px;
                        color: rgb(147,153,159);
                        line-height: 12px;
                        img{
                            margin-left: 6px;
                            vertical-align: middle;
                            border-radius: 50%;
                        }
                    }
                    .time{
                        font-size: 10px;
                        color: rgb(147,153,159);
                        line-height: 12px;
                        margin-bottom: 6px;
                    }
                    .text{
                        font-size: 12px;
                        color: rgb(7,17,27);
                        line-height: 12px;
                        i{margin-right: 6px}
                        .icon-thumb_up{
                            color: rgb(0,160,220);
                        }
                        .icon-thumb_down{
                            color: rgb(147,153,159);
                        }
                    }
                }
                .rating-item:last-child{
                    @include border-none()
                }
                .no-rating{
                    padding: 16px 0;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                    text-align: center;
                }
            }
        }
    }
    .move-enter,.move-leave-active{
        transform: translate3d(100%,0,0);
    }
</style>
<script>
    import Vue from 'vue'
    import BScroll from 'better-scroll'
    import cartcontrol from '@/components/cartcontrol/cartcontrol'
    import split from '@/components/split/split'
    import ratingSelect from '@/components/ratingSelect/ratingSelect'
    import {formatDate} from '@/common/js/date.js'

    const POSITIVE = 0;     // 推荐
    const NEGATIVE = 1;     // 吐槽
    const ALL = 2;      // 全部

    export default{
        props: {
            food: {
                type: Object
            }
        },
        data(){
            return{
                showDetail: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        },
        methods: {
            showToggle(){
                this.showDetail = !this.showDetail;
                this.selectType = ALL;
                this.onlyContent = true;
                this.$nextTick(() => {
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs.food,{
                            click: true
                        })
                    }else{
                        this.scroll.refresh();
                    }
                })
            },
            addCart(event){
                if(!event._constructed){
                    return
                }
                Vue.set(this.food,'count',1);
                this.$root.eventHub.$emit('cart.add', event.target)
            },
            selected(type){
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            },
            selectOnly(){
                this.onlyContent = !this.onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            },
            needShow(type,text){
                if(this.onlyContent && !text){
                    return false
                }
                if(this.selectType === ALL){
                    return true
                }else{
                    return this.selectType == type
                }
            }
        },
        components:{
            cartcontrol,
            split,
            ratingSelect
        },
        filters: {
            formatDate(time){
                var date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm:ss')
            }
        }
    }
</script>
