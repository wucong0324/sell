<template>
    <div class="split double-1px"></div>
</template>
<style lang="scss">
    @import "../../common/scss/mixin.scss";
    .split{
        width: 100%;
        height: 16px;
        background: #f3f5f7;
        @include double-1px(rgba(7,17,27,.1))
    }
</style>
<script>
    export default{
        data(){
            return{

            }
        },
        components:{

        }
    }
</script>
