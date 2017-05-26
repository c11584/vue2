<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<div class="favorite" v-on:click="toggleFavorite">
					<span class="icon-favorite" :class="{'active':favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<ul class="remark">
				<li class="block">
					<h2>起送价</h2>
					<div class="content">
						<span class="stress">{{seller.minPrice}}</span>元
					</div>
				</li>
				<li class="block">
					<h2>商家配送</h2>
					<div class="content">
						<span class="stress">{{seller.deliveryPrice}}</span>元
					</div>
				</li>
				<li class="block">
					<h2>平均配送时间</h2>
					<div class="content">
						<span class="stress">{{seller.deliveryTime}}</span>元
					</div>
				</li>
			</ul>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper border-1px">
					<p class="content">
						{{seller.bulletin}}
					</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item border-1px" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90" alt="">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import {savaToLocal, loadFromLocal} from 'common/js/store';
	import star from 'components/star/star';
	import split from 'components/split/split';
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				favorite: (() => {
					return loadFromLocal(this.seller.id, 'favorite', false);
				})()
			};
		},
		computed: {
			favoriteText() {
				return this.favorite ? '已收藏' : '收藏';
			}
		},
		created() {
			this.classMap = ['descrease', 'discount', 'guarantee', 'invoice', 'special'];
		},
		mounted() {
			this._initBScroll();
			if (this.seller.pics) {
				let picWidth = 120;
				let margin = 6;
				let width = (picWidth + margin) * this.seller.pics.length - margin;
				this.$refs.picList.style.width = width + 'px';
				this.$nextTick(() => {
					this.picScroll = new BScroll(this.$refs.picWrapper, {
						scrollX: true,
						eventPassthrough: 'vertical'
					});
				});
			}
		},
		watch: {
			seller() {
				this._initBScroll();
			}
		},
		methods: {
			toggleFavorite(event) {
				if (!event._constructed) {
					return;
				}
				this.favorite = !this.favorite;
				savaToLocal(this.seller.id, 'favorite', this.favorite);
			},
			_initBScroll() {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.seller, {click: true});
				} else {
					this.scroll.refresh();
				}
			}
		},
		components: {
			star,
			split
		}
	};
</script>

<style lang="stylus" rel="stylesheet-stylus">
	@import "../../common/stylus/mixin.styl"
	.seller
		position: absolute
		top: 174px
		bottom: 0px
		left: 0
		width: 100%
		overflow: hidden
		.overview
			padding: 18px
			border_1px(rgba(7, 17, 27, .1))
			.title
				margin-bottom: 8px
				line-height: 14px
				font-size: 14px
				color: rgb(7, 17, 27)
			.desc
				font-size: 0
				.star
					display: inline-block
					vertical-align: top
				.text
					display: inline-block
					margin-right: 12px
					font-size: 10px
					line-height: 15px
					color: rgb(77, 85, 93)
					vertical-align: top
			.favorite
				position: absolute
				right: 18px
				top: 18px
				width: 36px
				text-align: center
				.icon-favorite
					display: block
					margin-bottom: 4px
					font-size: 24px
					line-height: 24px
					color: #d4d6d9
					&.active
						color: rgb(240, 20, 20)
				.text
					display: block;
					line-height: 10px
					font-size: 10px
					color: rgb(77, 85, 93)
		.remark
			display: flex
			padding: 18px 0
			.block
				flex: 1
				text-align: center
				border-right: 1px solid rgba(7, 17, 27, .1)
				&:last-child
					border-right: none;
				h2
					font-size: 10px
					color: rgb(147, 153, 159)
					line-height: 20px
				.content
					line-height: 24px
					font-size: 10px
					font-weight: 200
					color: rgb(7, 17, 27)
					.stress
						font-size: 24px
		.bulletin
			padding: 18px 12px 0 12px
			.title
				margin-bottom: 8px
				line-height: 14px
				font-size: 14px
				color: rgb(7, 17, 27)
			.content-wrapper
				padding: 0 12px 6px 16px 12px
				border_1px(rgba(7, 17, 27, .1))
				.content
					line-height: 24px
					font-size: 12px
					padding-bottom: 16px
					color: rgb(240, 20, 20)
			.supports
				.support-item
					padding: 16px 12px
					font-size: 0
					border_1px(rgba(7, 17, 27, .1))
					&:last-child
						&:after
							border-top: none
					.icon
						width: 16px
						height: 16px
						margin-right: 4px
						float: left
						background-size: 16px 16px
						background-repeat: no-repeat
						&.descrease
							bg_image('decrease_1')
						&.discount
							bg_image('discount_1')
						&.guarantee
							bg_image('guarantee_1')
						&.invoice
							bg_image('invoice_1')
						&.special
							bg_image('special_1')
					.text
						line-height: 16px
						font-size: 12px
						color: rgb(7, 17, 27)

		.pics
			padding: 18px
			.title
				margin-bottom: 12px
				line-height: 14px
				font-size: 14px
				color: rgb(7, 17, 27)
			.pic-wrapper
				width: 100%
				overflow: hidden
				white-space: nowrap
				.pic-list
					font-size: 0
					.pic-item
						display: inline-block
						margin-right: 6px
						width: 120px
						height: 90px
		.info
			padding: 18px 18px 0 18px
			.title
				padding-bottom: 8px
				line-height: 14px
				font-size: 14px
				color: rgb(7, 17, 27)
				border_1px(rgba(7, 17, 27, .1))
			ul
				.info-item
					padding: 16px 12px
					line-height: 16px
					font-size: 12px
					color: rgb(7, 17, 27)
					border_1px(rgba(7, 17, 27, .1))
					&:last-child
						border_none()

</style>
