<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="menuSelect(index,$event)">
                    <span class="text border-1px">
                        <i v-show="item.type > 0" class="icon" :class="classMap[item.type]"></i>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class='foods-wrapper' ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1>{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px" @click="goDetail(food)">
                           <div class="icon">
                               <img width="57px" height="57px" :src="food.icon" alt="">
                           </div>
                           <div class="content">
                               <h2>{{food.name}}</h2>
                               <p>{{food.description}}</p>
                               <div class="extra">
                                   <span>月售{{food.sellCount}}份</span>
                                   <span>好评率{{food.rating}}%</span>
                               </div>
                               <div class="price">
                                   <span class="current">￥{{food.price}}</span>
                                   <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                               </div>
                               <div class="cartcontrol-wrapper">
                                   <cartcontrol :food="food"></cartcontrol>
                               </div>
                           </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
        <foodDetail :food="selectedFood" ref="myFood"></foodDetail>
    </div>
</template>
<style lang="scss">
    @import "../../common/scss/mixin.scss";
    .goods{
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
        .menu-wrapper{
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            .menu-item{
                display: table;
                height: 54px;
                width: 56px;
                line-height: 14px;
                padding: 0 12px;
                &.current{
                    position: relative;
                    background: #fff;
                    margin-top: -1px;
                    font-weight: 700;
                    .text{
                        @include border-none();
                    }
                 }
                .icon{
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 2px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    &.decrease{
                     @include bg-image('./img/decrease_1');
                     }
                    &.discount{
                     @include bg-image('./img/discount_1');
                     }
                    &.guarantee{
                     @include bg-image('./img/guarantee_1');
                     }
                    &.invoice{
                     @include bg-image('./img/invoice_1');
                     }
                    &.special{
                     @include bg-image('./img/special_1');
                     }
                }
                .text{
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                    font-size: 12px;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                }
            }
        }
        .foods-wrapper{
            flex: 1;
            .food-list{
                h1{
                    padding-left: 14px;
                    height: 26px;
                    line-height: 26px;
                    border-left: 2px solid #d9dde1;
                    font-size: 12px;
                    color: rgb(147,153,159);
                    background: #f3f5f7;
                }
                .food-item{
                    display: flex;
                    margin: 18px;
                    padding-bottom: 18px;
                    @include border-1px(rgba(7, 17, 27, 0.1));
                    &:last-child{
                        margin-bottom: 0;
                        @include border-none()
                     }
                    .icon{
                        flex: 0 0 57px;
                        margin-right: 10px;
                    }
                    .content{
                        flex: 1;
                        h2{
                            font-size: 14px;
                            color: rgb(7,17,27);
                            line-height: 14px;
                            margin: 2px 0 8px 0;
                        }
                        p{  margin: 8px 0;  }
                        .extra span:first-child{margin-right: 8px}
                        p,.extra{
                            font-size: 10px;
                            color: rgb(147,153,159);
                            line-height: 10px;
                        }
                        .price{
                            font-weight: 700;
                            line-height: 24px;
                            .current{
                                color: rgb(240,20,20);
                                font-size: 14px;
                            }
                            .old{
                                font-size: 10px;
                                color: rgb(147,153,159);
                                text-decoration: line-through;
                            }
                        }
                        .cartcontrol-wrapper{
                            position: absolute;
                            right: 0;
                            bottom: 12px;
                        }
                    }
                }
            }
        }
    }
</style>
<script>
    import Vue from 'Vue'
    import BScroll from 'better-scroll'
    import shopcart from '@/components/shopcart/shopcart'
    import cartcontrol from '@/components/cartcontrol/cartcontrol'
    import foodDetail from '@/components/foodDetail/foodDetail'

    const eventHub = new Vue();

    export default{
        props: {
            seller: {
                type: Object
            },
            goods: {
                type: Array
            }
        },
        created(){
            /*this.$http.get('../../../static/data.json').then((res) => {
                this.goods = res.body.goods;
                this.$nextTick(() => {
                    console.log(this.$refs);
                    this.initScroll();      // 初始化scroll
                    this.calcHeight();     // 初始化高度列表
                })
            });*/
            this.classMap = ['decrease','discount','guarantee','invoice','special'];

            this.$nextTick(() => {
                setTimeout(() => {
                    this.initScroll();      // 初始化scroll
                    this.calcHeight();     // 初始化高度列表
//                    console.log(this.$refs.foodsWrapper.getElementsByTagName('ul')[0].clientHeight);
                },100)

            })
        },
        data(){
            return{
//                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            }
        },
        methods: {
            initScroll(){
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3
                });
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
//                    console.log(this.scrollY);
                });
            },
            calcHeight(){
                var foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                var height = 0;
                this.listHeight.push(height);
                for(var i=0;i<foodList.length;i++){
                    var item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height)
                }
//                console.log(this.listHeight)
            },
            menuSelect(index,event){
                if(!event._constructed){
                    return
                }
                var foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                var el = foodList[index];
                this.foodsScroll.scrollToElement(el,300)
            },
            goDetail(food){
                this.selectedFood = food;
                this.$refs.myFood.showToggle();
            }
        },
        computed: {
            currentIndex(){
                for (var i=0;i<this.listHeight.length;i++){
                    var topHeight = this.listHeight[i];
                    var bottomHeight = this.listHeight[i+1];
//                    console.log(topHeight + ':' + bottomHeight);
                    if(!bottomHeight || (this.scrollY >= topHeight && this.scrollY < bottomHeight)){
                        return i
                    }
                }
                return 0
            },
            selectFoods(){
                var foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if(food.count){
                            foods.push(food)
                        }
                    })
                });
                return foods;
            }
        },
        components: {
            shopcart,
            cartcontrol,
            foodDetail
        }
    }
</script>
