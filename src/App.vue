<template>
    <div>
        <hend :seller="seller"></hend>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <router-view :seller="seller" :goods="goods" :ratings="ratings"></router-view>
    </div>
</template>

<script>
    import head from '@/components/header/header'
    export default {
        data(){
            return {
                seller: {},
                goods: [],
                ratings: []
            }
        },
        created(){
            this.$http.get('../static/data.json?id="111111"').then((res) => {
                this.seller = res.body.seller;
                this.goods = res.body.goods;
                this.ratings = res.body.ratings;
                console.log(res.body.seller)
            })
        },
        components: {
            'hend': head
        }
    }
</script>

<style lang="scss">
    @import "./common/scss/mixin.scss";
    .tab{
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .tab-item{
            flex: 1;
            text-align: center;
            a{
                display: block;
                font-size: 14px;
                color: rgb(77,85,93);
            }
            .active{
                color: rgb(240,20,20);
            }
        }
    }
</style>
