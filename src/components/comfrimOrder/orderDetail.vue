<template>
	<transition name="slide">
		<div class="order_wrapper" ref="orderWrapper">
			<div class="header_bar">
				<div class="header">
					<span v-on:click="getBack" class="icon-arrow_lift"></span>
					<h2 class="title">确认订单</h2>
				</div>
			</div>
			<div class="content-wrapper" ref="contentWrapper">
				<div class="content">
					<div class="addAddress">
						<span class="icon"></span>
						<b>请添加一个收货地址</b>
						<span class="icon-arrow_right"></span>
						<p class="lineBg"></p>
					</div>
					<div class="delivery-time">
						<b class="time">送达时间</b>
						<ul class="delivery-select">
							<li>
								<span class="icon-arrow_right"></span>
							</li>
							<li>
								<span class="icon-arrow_right"></span>
								<b class="tab-item">锋鸟专送</b>
							</li>
						</ul>
					</div>
					<div class="pay-way-wrapper">
						<ul class="pay-way twoLineCenter">
							<li class="pay-item" v-on:click="showPayWay">
								<b>支付方式</b>
								<span class="text">
								{{payWayName}}
								<span class="icon-arrow_right"></span>
							</span>
							</li>
							<li class="pay-item disabled">
								<b>红包</b>
								<span class="text">暂时只在饿了么 APP 中支持<span class="icon-arrow_right"></span></span>
							</li>
						</ul>
					</div>
					<div class="order_info_wrapper">
						<div class="title">
							<img :src="seller.avatar" width="20" height="20" alt="">{{seller.name}}
						</div>
						<ul class="selectFoods">
							<li v-for="item in selectFoods" class="item">
								<span class="cellname">{{item.name}}</span>
								<span class="cellquantity">x&nbsp;{{item.count}}</span>
								<span class="celltotal">￥{{item.price}}</span>
							</li>
							<li class="food-other-price">
								<span class="foodTitle">配送费</span>
								<span class="content">￥ {{seller.deliveryPrice}}</span>
							</li>
							<li class="food-other-price">
								<span class="foodTitle">订单 ￥{{orderPrice}}</span>
								<span class="content">待支付 ￥{{orderPrice}}</span>
							</li>
						</ul>
					</div>
					<div class="ticket-wrapper">
						<ul class="pay-way twoLineCenter">
							<li class="pay-item">
								<b>订单备注</b>
								<span class="text">
								口味、偏好等
								<span class="icon-arrow_right"></span>
							</span>
							</li>
							<li class="pay-item disabled">
								<b>发票抬头</b>
								<span class="text">
								商家不支持开发票
								<span class="icon-arrow_right"></span>
							</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="will-pay">
				<p>待支付 ¥ {{orderPrice}}元</p>
				<b v-on:click="goPay">确认下单</b>
			</div>
			<transition name="slideTop">
				<div class="pay-way-choose" ref="payWayChoose" v-on:click="hidePayWay">
					<div class="pay-way-wrapper">
						<h2 class="title">支付方式</h2>
						<div class="pay-way-list" ref="payWayList">
							<ul>
								<li class="item" v-for="(select, index) in selectWayList" v-on:click.stop.preventDefault="selectWay(index, $event)">
									<span class="title">{{select.name}}</span>
									<span class="icon-right" :class="{'active' : select.selected}"></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [];
				}
			},
			seller: {
				type: Object
			}
		},
		data() {
			return {
				payWayShow: false,
				selectWayList: [
					{
						name: '在线支付',
						selected: true
					},
					{
						name: '微信支付',
						selected: false
					},
					{
						name: '支付宝',
						selected: false
					}
				],
				payWayName: '在线支付'
			};
		},
		mounted() {
			this.$nextTick(() => {
				this._initScroll();
			});
		},
		computed: {
			orderPrice() {
				var totalCount = 0;
				if (this.selectFoods.length) {
					this.selectFoods.forEach((food) => {
						totalCount += food.count * food.price;
					});
				}
				return totalCount;
			}
		},
		methods: {
			goPay() {
				alert('共需支付：' + this.orderPrice + '元');
			},
			selectWay(index) {
				this.selectWayList.forEach((way) => {
					way.selected = false;
				});
				this.selectWayList[index].selected = true;
				this.payWayName = this.selectWayList[index].name;
				this.hidePayWay();
			},
			getBack() {
				this.hidePayWay();
				this.$refs.orderWrapper.style.left = '100%';
			},
			showPayWay() {
				this.$refs.payWayChoose.style.top = '0px';
			},
			hidePayWay() {
				this.$refs.payWayChoose.style.top = '100%';
			},
			_initScroll() {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.contentWrapper, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
				if (!this.wayScroll) {
					this.wayScroll = new BScroll(this.$refs.payWayList, {
						click: true
					});
				} else {
					this.wayScroll.refresh();
				}
			}
		}
	};
</script>

<style lang="less">
	@import './../../common/stylus/mixin';
	.order_wrapper {
		position: fixed;
		top: 0;
		left: 100%;
		z-index: 100;
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		color: #fff;
		transition: left .3s linear;
		.header_bar {
			position: relative;
			@header_bar_height: .8rem;
			height: @header_bar_height;
			.header {
				position: absolute;
				left: 0;
				top: 0;
				z-index: 200;
				width: 100%;
				height: 100%;
			}
			.icon-arrow_lift {
				position: absolute;
				left: 0px;
				top: (@header_bar_height - .24rem - .32rem) / 2;
				font-size: 14px;
				padding: 8px;
			}
			h2 {
				display: block;
				height: @header_bar_height;
				line-height: @header_bar_height;
				background: rgb(0, 151, 255);
				color: #fff;
				text-align: center;
				font-size: 14px;
			}
		}
		.content-wrapper {
			display: block;
			width: 100%;
			height: calc(~"100% - 1.6rem");
			position: relative;
			>.content {
				width: 100%;
				.addAddress {
					position: relative;
					height: 75px;
					font-size: 0;
					box-sizing: border-box;
					padding: 0px 15px;
					margin-bottom: 10px;
					background:#fff;
					.lineBg {
						position: absolute;
						width: 100%;
						left: 0px;
						bottom: 0px;
						height: 2px;
						background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAGCAYAAACMyr1NAAAAAXNSR0IArs4c6QAAANxJREFUOBFjZICCpoUPWhn+M7rD+OTQjP8ZztQmymfg0/tr95JlDAz/I/GpISTHyMiwj9Ul1hmbOiaQYNfSx6qUegZkDisD01QQjQv837NMD+iYCFzyxIr/Z2asxqWWBSTx49e/LAZGXEqIFP/PcLgiUfYyPtV/GP62/P9PmU3AANnM6hhzApc9TB3zH+sCrbDFpYBYcQ42pmn41P7av8QC6BlffGoIyTEyMv5nYWCuwaeO6TfDv2x8CoiSY/y/syxa9jY+tYx//7fikydGDhggKxhdoi4Ro3bYqAEAknE5DXYMR0IAAAAASUVORK5CYII=) 0 bottom repeat-x;
						background-size:26px  2px;
					}
					.icon {
						display: inline-block;
						width: 20px;
						height: 20px;
						margin-top: 25px;
						background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNSA0MiI+PHBhdGggZmlsbD0iIzMxOTBFOCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQuNTQ4IDQwLjU5MmMuMTQ3LjEzNCAxLjE1My45NTcgMi40NTIuOTY0IDEuMy4wMDYgMi4zMjItLjg1NSAyLjQ1OC0uOTc5QzI0LjE2OCAzNi4zMDMgMzQgMjYuMjggMzQgMTcuMDc5IDM0IDcuNjQ3IDI2LjM4OSAwIDE3IDBTMCA3LjY0NyAwIDE3LjA4Yy0uMDY2IDkuMjEgOS44MjUgMTkuMjQ4IDE0LjU0OCAyMy41MTJ6TTE3IDI0LjI4NmE3LjI4NiA3LjI4NiAwIDEgMCAwLTE0LjU3MiA3LjI4NiA3LjI4NiAwIDAgMCAwIDE0LjU3MnoiLz48L3N2Zz4=) no-repeat;
					}
					b {
						display: inline-block;
						font-size: 16px;
						color: #333;
						vertical-align: top;
						margin-top: 29px;
						margin-left: 13px;
					}
					.icon-arrow_right {
						font-size: 15px;
						float: right;
						color: #AAAAAA;
						margin-top: 30px;
					}
				}
				.delivery-time {
					background:#fff;
					border-left: 5px solid rgb(49, 144, 232);
					height: 75px;
					position: relative;
					margin-bottom: 15px;
					.time {
						position: absolute;
						left: 0;
						top: 0;
						z-index: 5;
						box-sizing: border-box;
						padding-left: 20px;
						width: 120px;
						height: 100%;
						line-height: 75px;
						background-color: #fff;
						color: #000;
						.size(.32rem);
						font-weight: bold;
					}
					.delivery-select {
						box-sizing: border-box;
						padding-right: 15px;
						margin-bottom: 10px;
						li {
							height: 38px;
							.border_1px(#F7F7F7);
							.icon-arrow_right {
								margin-top: 13px;
								display: inline-block;
								font-size: 12px;
								color: #aaa;
								float: right;
							}
							.tab-item {
								float: right;
								background-color: #57a9ff;
								border: 1px solid #57a9ff;
								color: #fff;
								height: 16px;
								line-height: 16px;
								padding: 0 2px;
								border-radius: 2px;
								font-size: 12px;
								margin: 8px 5px 0px 0px;
							}
						}
					}
				}
				.pay-way-wrapper {
					.bgColor(#fff);
					margin-bottom: 15px;
				}
				.order_info_wrapper {
					.bgColor(#fff);
					margin-bottom: 15px;
					.title {
						box-sizing: border-box;
						padding: 15px 15px;
						font-size: 20px;
						line-height: 20px;
						color: #333;
						vertical-align: top;
						.border_1px(rgb(238, 238, 238));
						img {
							vertical-align: top;
							margin-right: 10px;
						}
					}
					.selectFoods {
						box-sizing: border-box;
						padding: 0 .3rem;
						.border_1px(#F7F7F7);
						.item {
							display: flex;
							color: #000;
							padding: .3rem 0;
							font-size: 0;
							.cellname {
								flex: 1;
								.size(.28rem);
								color: rgb(102, 102, 102);
							}
							.cellquantity, .celltotal{
								.size(.28rem);
								text-align: right;
							}
							.cellquantity {
								flex: 0 0 57px;
								color: rgb(153, 153, 153);
							}
							.celltotal {
								flex: 0 0 117px;
								color: rgb(102, 102, 102);
							}
						}
						.food-other-price {
							display: flex;
							padding: .3rem 0;
							font-size: 0;
							.border_1px(#F7F7F7);
							&:last-child{
								.border_none();
							}
							span {
								flex: 1;
								.size(.26rem);
								line-height: .31rem;
								color: rgb(102, 102, 102);
								&.content {
									text-align: right;
								}
							}
						}
					}
				}
				.ticket-wrapper {
					.bgColor(#fff);
				}
			}
		}
		.will-pay {
			position: relative;
			height: .9rem;
			.bgColor(rgb(60, 60, 60));
			p {
				.size(.36rem);
				line-height: .9rem;
				text-indent: .4rem;
			}
			b {
				position: absolute;
				right: 0;
				top: 0;
				width: 100px;
				height: 100%;
				line-height: .9rem;
				text-align: center;
				.bgColor(rgb(86, 209, 118));
				.size(.34rem);
			}
		}
		.pay-way-choose {
			position: fixed;
			left: 0;
			top: 100%;
			width: 100%;
			height: 100%;
			z-index: 100;
			.bgRGBA(178,178,178, .8);
			transition: all .3s ease-out;
			.pay-way-wrapper {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 5.27rem;
				>.title {
					background-color: #fafafa;
					text-align: center;
					height: .88rem;
					line-height: .88rem;
					color: #333;
					.size(.32rem);
				}
				.pay-way-list {
					height: 4.39rem;
					.bgColor(#fff);
					overflow: hidden;
					ul {
						.item {
							font-size: 0;
							box-sizing: border-box;
							padding: 15px;
							/*height: .3rem;*/
							color: #333;
							.border_1px(#eee);
							.title {
								display: inline-block;
								.size(.3rem);
								height: .3rem;
							}
							.icon-right {
								display: inline-block;
								color: #eee;
								float: right;
								.size(.3rem);
								&.active {
									color: #4cd964;
								}
							}
						}
					}
				}
			}
		}
	}
	.twoLineCenter {
		box-sizing: border-box;
		padding-left: 20px;
		.pay-item {
			padding: 12px 0;
			.border_1px(#eee);
			font-size: 0;
			&:last-child {
				.border_none();
			}
			&.disabled {
				b,.text {
					color: rgb(187, 187, 187);
				}
			}
			b {
				display: inline-block;
				color: #333;
				height: 18px;
				line-height: 18px;
				font-size: 16px;
			}
			.text {
				float: right;
				text-align: right;
				margin-right: 15px;
				line-height: 18px;
				.size(13px);
				color: rgb(153, 153, 153);
				.icon-arrow_right{
					.size(12px);
				}
			}
		}
	}
</style>
