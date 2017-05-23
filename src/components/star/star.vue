<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';

    export default{
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType(){
                return 'star-' + this.size
            },
            itemClasses(){
                var result = [];
                var score = Math.floor(this.score*2)/2;
                var hasDecimal = score % 1 != 0;
                var integer = Math.floor(score);
                for(var i=0;i<integer;i++){
                    result.push(CLS_ON);
                }
                if(hasDecimal){
                    result.push(CLS_HALF);
                }
                while (result.length < LENGTH){
                    result.push(CLS_OFF);
                }
                return result
            }
        }
    }
</script>

<style lang="scss">
    @import "../../common/scss/mixin.scss";
    .star{
        font-size: 0;
        &.star-48{
             span{
                 width: 20px;
                 height: 20px;
                 margin-right: 22px;
                 background-size: 20px 20px;
             }
             span:last-child{margin-right: 0}
             .on{@include bg-image('./img/star48_on')}
             .half{@include bg-image('./img/star48_half')}
             .off{@include bg-image('./img/star48_off')}
        }
        &.star-36{
             span{
                 width: 15px;
                 height: 15px;
                 margin-right: 6px;
                 background-size: 15px 15px;
             }
             span:last-child{margin-right: 0}
             .on{@include bg-image('./img/star36_on')}
             .half{@include bg-image('./img/star36_half')}
             .off{@include bg-image('./img/star36_off')}
        }
        &.star-24{
             span{
                 width: 10px;
                 height: 10px;
                 margin-right: 3px;
                 background-size: 10px 10px;
             }
             span:last-child{margin-right: 0}
             .on{@include bg-image('./img/star24_on')}
             .half{@include bg-image('./img/star24_half')}
             .off{@include bg-image('./img/star24_off')}
        }
        .star-item{
            display: inline-block;
            background-repeat: no-repeat;
        }
    }
</style>