<template>
    <div class="ratings" ref="ratingsWrapper">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left borderRight-1px">
                    <h1>{{seller.score}}</h1>
                    <div class="text">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="box">
                        <span class="text">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="num">{{seller.serviceScore}}</span>
                    </div>
                    <div class="box">
                        <span class="text">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="num">{{seller.foodScore}}</span>
                    </div>
                    <div class="box">
                        <span class="text">送达时间</span>
                        <span class="time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <div>
                <ratingSelect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent" @ratingtype-event="selected" @only-event="selectOnly"></ratingSelect>
                <div class="ratings-wrapper border-1px">
                    <ul>
                        <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" class="rating-item border-1px">
                            <div class="avatar">
                                <img :src="rating.avatar" alt="">
                            </div>
                            <div class="content">
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <div class="name">{{rating.username}}</div>
                                <div class="starBox">
                                    <star :size="24" :score="rating.score"></star>
                                    <span v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                                </div>
                                <p>{{rating.text}}</p>
                                <div class="recommend" v-if="rating.recommend.length">
                                    <i :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></i>
                                    <span class="borderAll-1px" v-for="(recommend,index) in rating.recommend">{{recommend}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../../common/scss/mixin.scss";
    .ratings{
        position: absolute;
        top: 174px;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .overview{
            display: flex;
            padding: 18px 0;
            .overview-left{
                flex: 0 0 137px;
                width: 137px;
                text-align: center;
                @include borderRight-1px(rgba(7,17,27,.2))
                h1{
                    font-size: 24px;
                    color: rgb(255,153,0);
                    line-height: 28px;
                }
                .text{
                    font-size: 12px;
                    line-height: 12px;
                    color: rgb(7,17,27);
                    margin: 6px 0 8px 0;
                }
                .rank{
                    font-size: 10px;
                    line-height: 10px;
                    color: rgba(7,17,27,.4);
                    padding-bottom: 6px;
                }
            }
            .overview-right{
                flex: 1;
                padding-left: 24px;
                .box{
                    font-size: 0;
                    .text{
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(7,17,27);
                    }
                    .star{
                        display: inline-block;
                        vertical-align: top;
                        margin: 0 12px;
                    }
                    .num{
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(255,153,0);
                    }
                    .time{
                        font-size: 12px;
                        line-height: 18px;
                        color: rgb(147,153,159);
                        margin: 0 12px;
                    }
                }
                .box:nth-child(2){
                    margin: 8px 0;
                }
            }
        }
        .ratings-wrapper{
            @include border-1px(rgba(7,17,27,.1));
            .rating-item{
                display: flex;
                padding: 18px 0;
                margin: 0 18px;
                @include border-1px(rgba(7,17,27,.1));
                .avatar{
                    flex: 0 0 28px;
                    width: 28px;
                    height: 28px;
                    overflow: hidden;
                    border-radius: 50%;
                    margin-right: 12px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .content{
                    flex: 1;
                    position: relative;
                    .time{
                        position: absolute;
                        top: 0;
                        right: 0;
                        color: rgb(147,153,159);
                        font-size: 10px;
                        font-weight: 200;
                        line-height: 12px;
                    }
                    .name{
                        font-size: 10px;
                        line-height: 12px;
                        color: rgb(7,17,27);
                    }
                    .starBox{
                        font-size: 0;
                        line-height: 12px;
                        margin: 4px 0 6px 0;
                        .star{
                            display: inline-block;
                            vertical-align: top;
                            margin-right: 6px;
                        }
                        span{
                            vertical-align: top;
                            color: rgb(147,153,159);
                            font-size: 10px;
                            font-weight: 200;
                        }
                    }
                    p{
                        color: rgb(7,17,27);
                        font-size: 12px;
                        line-height: 18px;
                    }
                    .recommend{
                        margin-top: 4px;
                        font-size: 0;
                        i{
                            display: inline-block;
                            font-size: 12px;
                            line-height: 16px;
                            margin: 4px 8px 0 0;
                            vertical-align: top;
                        }
                        .icon-thumb_up{
                            color: rgb(0,160,220);
                        }
                        .icon-thumb_down{
                            color: rgb(183,187,191);
                        }
                        span{
                            box-sizing: border-box;
                            display: inline-block;
                            vertical-align: top;
                            font-size: 10px;
                            color: rgb(147,153,159);
                            line-height: 16px;
                            margin: 4px 8px 0 0;
                            padding: 0 6px;
                            border-radius: 1px;
                            max-width: 25%;
                            white-space:nowrap;
                            text-overflow:ellipsis;
                            overflow: hidden;
                            @include borderAll-1px(rgba(147,153,159,.5))
                        }
                    }
                }
            }
            .rating-item:last-child{
                @include border-none()
            }
        }
    }
</style>
<script>
    import star from '@/components/star/star'
    import split from '@/components/split/split'
    import ratingSelect from '@/components/ratingSelect/ratingSelect'
    import BScroll from 'better-scroll'
    import {formatDate} from '@/common/js/date.js'

    const ALL = 2;      // 全部

    export default{
        props: {
            seller: {
                type: Object
            },
            ratings: {
                type: Array
            }
        },
        data(){
            return{
                showDetail: false,
                selectType: ALL,
                onlyContent: true
            }
        },
        created(){
            this.$nextTick(() => {
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.ratingsWrapper,{
                        click: true
                    })
                }else{
                    this.scroll.refresh();
                }
            })
        },
        methods: {
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
        filters: {
            formatDate(time){
                var date = new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm:ss')
            }
        },
        components:{
            star,
            split,
            ratingSelect
        }
    }
</script>
