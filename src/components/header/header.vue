<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" v-on:click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" v-on:click="showDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" alt="">
		</div>
		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="datail-warpper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item,index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="contents">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<span class="detail-close icon-close" v-on:click="hideDetail"></span>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import star from 'components/star/star';
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				detailShow: false
			};
		},
		methods: {
			showDetail() {
				this.detailShow = true;
			},
			hideDetail() {
				this.detailShow = false;
			}
		},
		created() {
			this.classMap = ['descrease', 'discount', 'guarantee', 'invoice', 'special'];
		},
		components: {
			star
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.header
		position: relative
		overflow: hidden
		color: #fff
		background: rgba(7, 17, 27, 0.5)
		.content-wrapper
			position: relative
			padding: 24px 12px 18px 24px
			font-size: 0px
			.avatar
				display: inline-block
				vertical-align: top
				img
					border-radius: 2px
			.content
				display: inline-block
				font-size: 14px
				margin-left: 16px
				.title
					margin: 2px 0px 8px 0px
					.brand
						width: 30px
						height: 18px
						float: left
						bg_image('brand')
						background-size: 30px 18px
						background-repeat: no-repeat
						vertical-align: top
					.name
						margin-left: 6px
						font-size: 16px
						line-height: 18px
						font-weight: bold
				.description
					margi-bottom: 0px
					line-height: 12px
					font-size: 12px
				.supports
					margin-top: 10px
					.icon
						width: 12px
						height: 12px
						margin-right: 4px
						margin-top: 2px
						float: left
						background-size: 12px 12px
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
						font-size: 12px
						line-height: 12px
			.support-count
				position: absolute
				right: 12px
				bottom: 18px
				padding: 0px 8px
				height: 24px
				line-height: 24px
				border-radius: 14px
				background-color: rgba(0, 0, 0, 0.2)
				text-align: center
				.count
					font-size: 10px
				.icon-keyboard_arrow_right
					margin-top: 4px
					float: right
		.bulletin-wrapper
			position: relative
			height: 28px
			line-height: 28px
			font-size: 10px
			padding: 0px 22px 0px 12px
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
			background-color: rgba(7, 17, 27, 0.2)
			.bulletin-title
				display: inline-block
				vertical-align: top
				width: 22px
				height: 12px
				margin-top: 8px
				bg_image('bulletin')
				background-size: 22px 12px
				background-repeat: no-repeat
			.bulletin-text
				margin: 0px 4px
				font-size: 10px
				vertical-align: top
			.icon-keyboard_arrow_right
				position: absolute
				font-size: 10px
				right: 8px
				top: 8px

		.background
			position: absolute
			top: 0px
			left: 0px
			width: 100%
			height: 100%
			z-index: -1
			filter: blur(10px)
			img
				width: 100%
				height: 100%
		.detail
			position: fixed
			z-index: 100
			top: 0
			left: 0
			width: 100%
			height: 100%
			overflow: auto
			transition: all 0.5s
			background: rgba(7, 17, 27, .8)
			&.fade-entry-active, &.fade-leave-active
				opacity: 1
				background: rgba(7, 17, 27, .8)
			&.fade-enter, &.fade-leave-active
				opacity: 0
				background: rgba(7, 17, 27, .8)
			.datail-warpper
				width: 100%
				min-height: 100%
				.detail-main
					margin-top: 64px
					padding-bottom: 64px
					.name
						line-height: 16px
						text-align: center
						font-size: 16px
						font-weight: 700
					.star-wrapper
						margin-top: 18px
						padding: 2px 0px
						text-align: center
					.title
						display: flex
						width: 80%
						margin: 30px auto 24px auto
						.line
							flex: 1
							position: relative
							top: -6px
							border-bottom: 1px solid rgba(255, 255, 255, .2)
						.text
							padding: 0px 12px
							font-size: 14px
							font-weight: 700px
					.supports
						width: 80%
						margin: 0 auto
						.support-item
							padding: 0px 12px
							margin-bottom: 12px
							font-size: 0
							&:last-child
								margin-bottom: 0
							.icon
								display: inline-block
								width: 16px
								height: 16px
								vertical-align: top
								margin-right: 6px
								background-size: 16px 16px
								background-repeat: no-repeat
								&.descrease
									bg_image('decrease_2')
								&.discount
									bg_image('discount_2')
								&.guarantee
									bg_image('guarantee_2')
								&.invoice
									bg_image('invoice_2')
								&.special
									bg_image('special_2')
							.text
								display: inline-block
								font-size: 12px
								line-height: 12px
								margin-top: 2px
					.bulletin
						width: 80%
						margin: 0 auto
						.contents
							padding: 0 12px
							line-height: 24px
							font-size: 12px
		.detail-close
			position: fixed
			bottom: 20px
			left: 50%
			width: 32px
			height: 32px
			margin-left: -16px
			clear: both
			font-size: 32px
</style>
