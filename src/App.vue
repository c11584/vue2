<template>
	<div>
		<v-header :seller="seller"></v-header>
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
		<router-view @orderAdd="orderAdd" @payDeatail="payDeatail" :seller="seller"></router-view>
		<orderDetail :seller="seller" :selectFoods="selectFoods" ref="orderDetail"></orderDetail>
	</div>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';
	import header from 'components/header/header.vue';
	import {urlParse} from 'common/js/util';
	import orderDetail from 'components/comfrimOrder/orderDetail.vue';
	const ERR_OK = 0;

	export default {
	    data() {
	        return {
				seller: {
					id: (() => {
						let queryParam = urlParse();
						return queryParam.id;
					})()
				},
				selectFoods: []
			};
		},
	    created() {
//			window.localStorage.clear();
			this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.seller = Object.assign({}, this.seller, response.data);
				}
			});
		},
		methods: {
			payDeatail(goods) {
				this.$refs.orderDetail.scroll.refresh();
				document.getElementsByClassName('order_wrapper')[0].style.left = '0px';
			},
			orderAdd(foods) {
				this.selectFoods = foods;
			}
		},
	    components: {
			'v-header': header,
			orderDetail
		}
	};
	Vue.component('v-header', header);

</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "common/stylus/mixin.styl"
	.tab
		display:flex
		width:100%
		height: 40px
		line-height:40px
		border_1px(rgba(7,17,27,0.1))
		.tab-item
			flex:1
			text-align:center
			&>a
				display:block
				font-size:14px
				color: rgb(77,85,93)
				&.router-link-active
					color: red
</style>
