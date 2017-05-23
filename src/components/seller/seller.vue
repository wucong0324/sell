<template>
    <div class="seller" ref="sellerWrapper">
        <div class="seller-wrapper">
            <div class="overview">
                <h1>{{seller.name}}</h1>
                <div class="starBox border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="ratingCount">({{seller.ratingCount}})</span>
                    <span class="sellCount" v-if="seller.sellCount">月售{{seller.sellCount}}单</span>
                </div>
                <ul>
                    <li class="borderRight-1px">
                        <h2>起送价</h2>
                        <div class="content">
                            <span>{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="borderRight-1px">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span>{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li>
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span>{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite">
                    <i class="icon-favorite" :class="{'active':favorite}" @click="toggleFavorite"></i>
                    <span>{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1>公告与活动</h1>
                <p class="border-1px">{{seller.bulletin}}</p>
                <ul class="supports">
                    <li class="support-list border-1px" v-for="(support,index) in seller.supports">
                        <i class="icon" :class="classMap[index]"></i>
                        <span class="text">{{support.description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="picsBox">
                <h1>商家实景</h1>
                <div class="pics" ref="picWrapper">
                    <ul ref="picList">
                        <li class="pic-list" v-for="(pic,index) in seller.pics" >
                            <img :src="pic" width="120" height="90" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="infoBox">
                <h1 class="border-1px">商家信息</h1>
                <ul class="infos">
                    <li class="border-1px" v-for="(info,index) in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../../common/scss/mixin.scss";
    .seller{
        position: absolute;
        top: 174px;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
    }
    .seller-wrapper{
        h1{
            font-size: 14px;
            line-height: 14px;
            color: rgb(7,17,27);
        }
        .overview{
            position: relative;
            padding: 18px;
            .starBox{
                font-size: 0;
                padding: 8px 0 18px 0;
                @include border-1px(rgba(7,17,27,.1))
                .star{
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 8px;
                }
                .ratingCount,.sellCount{
                    font-size: 10px;
                    line-height: 18px;
                    color: rgb(77,85,93);
                }
                .sellCount{
                    margin-left: 12px;
                }
            }
            ul{
                margin-top: 18px;
                display: flex;
                li{
                    flex: 1;
                    text-align: center;
                    @include borderRight-1px(rgba(7,17,27,.2))
                    &:last-child{
                        @include border-none();
                    }
                    h2{
                        font-size: 10px;
                        line-height: 10px;
                        color: rgb(147,153,159);
                    }
                    .content{
                        margin-top: 4px;
                        font-size: 10px;
                        line-height: 24px;
                        font-weight: 200;
                        color: rgb(7,17,27);
                        span{
                            font-size: 24px;
                        }
                    }
                }
            }
            .favorite{
                position: absolute;
                width: 38px;
                top: 18px;
                right: 18px;
                text-align: center;
                i{
                    font-size: 24px;
                    color: #d4d6d9;
                    &.active{
                         color: rgb(240,20,20);
                     }
                }
                span{
                    display: block;
                    font-size: 10px;
                    line-height: 10px;
                    color: rgb(77,85,93);
                    margin-top: 2px;
                }
            }
        }
        .bulletin{
            padding: 18px 18px 0;
            p{
                color: rgb(240,20,20);
                font-size: 12px;
                line-height: 24px;
                font-weight: 200;
                padding: 8px 12px 18px;
                @include border-1px(rgba(7,17,27,.1))
            }
            .support-list{
                font-size: 0;
                padding: 16px 12px;
                @include border-1px(rgba(7,17,27,.1));
                &:last-child{
                    @include border-none()
                 }
                .icon{
                    display: inline-block;
                    vertical-align: top;
                    width: 16px;
                    height: 16px;
                    margin-right: 6px;
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                    &.decrease{  @include bg-image('./img/decrease_4'); }
                    &.discount{  @include bg-image('./img/discount_4'); }
                    &.guarantee{  @include bg-image('./img/guarantee_4'); }
                    &.invoice{  @include bg-image('./img/invoice_4'); }
                    &.special{  @include bg-image('./img/special_4'); }
                }
                .text{
                    display: inline-block;
                    vertical-align: top;
                    font-size: 12px;
                    line-height: 16px;
                    font-weight: 200;
                    color: rgb(7,17,27);
                }
            }
        }
        .picsBox{
            padding: 18px;
            .pics{
                margin-top: 12px;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                .pic-list{
                    font-size: 0;
                    display: inline-block;
                    margin-right: 6px;
                    width: 120px;
                    height: 90px;
                    &:last-child{  margin-right:0; }
                }
            }
        }
        .infoBox{
            padding: 18px 18px 0;
            h1{
                padding-bottom: 12px;
                @include border-1px(rgba(7,17,27,.1))
            }
            .infos{
                font-size: 12px;
                line-height: 16px;
                font-weight: 200;
                color: rgb(7,17,27);
                li{
                    padding: 16px 12px;
                    @include border-1px(rgba(7,17,27,.1))
                }
                li:last-child{
                    @include border-none()
                }
            }
        }
    }
</style>
<script>
    import star from '@/components/star/star'
    import split from '@/components/split/split'
    import BScroll from 'better-scroll'
    export default{
        props: {
            seller: {
                type: Object
            }
        },
        data(){
            return{
                favorite: false
            }
        },
        computed: {
            favoriteText(){
                return this.favorite ? '已收藏' : '收藏'
            }
        },
        created(){
            this.classMap = ['decrease','discount','guarantee','invoice','special'];
            this.$nextTick(() => {
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.sellerWrapper,{
                        click: true
                    })
                }else{
                    this.scroll.refresh();
                }
                this.picsScroll();
            })
        },
        methods: {
            picsScroll(){
                const PICWIDTH = 120;
                const MARGIN = 6;
                var picLen = this.seller.pics.length;
                this.$refs.picList.style.width = PICWIDTH * picLen + MARGIN * (picLen - 1) + 'px';
                this.picScroll = new BScroll(this.$refs.picWrapper,{
                    scrollX: true
                })
            },
            toggleFavorite(){
                this.favorite = !this.favorite
            }
        },
        components:{
            star,
            split
        }
    }
</script>
