<template>
    <div class="ratingSelect">
        <div class="rating-type border-1px">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}} <i>{{ratings.length}}</i></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType === 0}">{{desc.positive}} <i>{{positives.length}}</i></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType === 1}">{{desc.negative}} <i>{{negatives.length}}</i></span>
        </div>
        <div class="switch border-1px">
            <i class="icon-check_circle" :class="{'on':onlyContent}" @click="toggleContent($event)"></i>
            <span>只看内容的评价</span>
        </div>
    </div>
</template>
<style lang="scss">
    @import "../../common/scss/mixin.scss";
    .ratingSelect{
        .rating-type{
            padding: 18px 0;
            margin: 0 18px;
            @include border-1px(rgba(7,17,27,.1))
            font-size: 0;
            .block{
                display: inline-block;
                margin-right: 8px;
                font-size: 12px;
                line-height: 16px;
                padding: 8px 12px;
                border-radius: 1px;
                color: rgb(77,85,93);
                i{
                    font-size: 8px;
                    margin-left: 2px;
                }
            }
            .active{color: #fff}
            .positive{
                background: rgba(0,160,220,.2);
                &.active{
                     background: rgb(0,160,220);
                 }
            }
            .negative{
                background: rgba(77,85,93,.2);
                &.active{
                     background: rgb(77,85,93);
                 }
            }
        }
        .switch{
            padding: 12px 18px;
            font-size: 0;
            line-height: 24px;
            color: rgb(147,153,159);
            @include border-1px(rgba(7,17,27,.1))
            i{
                font-size: 24px;
                vertical-align: middle;
                margin-right: 4px;
            }
            .on{color: rgb(0,160,220)}
            span{
                font-size: 12px;
                vertical-align: middle;
            }
        }
    }
</style>
<script>
    const POSITIVE = 0;     // 推荐
    const NEGATIVE = 1;     // 吐槽
    const ALL = 2;      // 全部
    export default{
        props: {
            ratings: {
                type: Array,
                default(){
                    return []
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default(){
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    }
                }
            }
        },
        methods: {
            select(type,event){
                if(!event._constructed){
                    return
                }
//                this.selectType = type;
                this.$emit('ratingtype-event', type);   //  传值给父组件，修改props参数
            },
            toggleContent(){
                if(!event._constructed){
                    return
                }
//                this.onlyContent = !this.onlyContent
                this.$emit('only-event');
            }
        },
        computed: {
            positives(){
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE
                })
            },
            negatives(){
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE
                })
            }
        }
    }
</script>
