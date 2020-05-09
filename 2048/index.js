let game = new Vue({
	el:'#app',
	data:function() {
		return {
			colorMap: {
				"0": "#cdc1b4" ,
			  "2": "#eee4da" ,
			  "4": "#ede0c8" ,
			  "8": "#f2b179" ,
				"16": "#f59563" ,
				"32": "#f67c5f" ,
				"64": "#f65e3b" ,
				"128": "#edcf72" ,
			  "256": "#edcc61" ,
				"512": "#edc850" ,
				"1024": "#edc53f" ,
				"2048": "#edc22e"
			},
			rNum: 4,//行
			cNum: 4,//列
			data: [],
			point: [],//当前选中的点坐标 0 :r ,1:c
			score:0,//分数
			statue: false //是否结束
		}
	},
	watch:{

	},
	methods: {
		initData: function (){
			//fill 二维数组引用的是同一个数组
			this.data = [...Array(this.cNum)].map(() => Array(this.rNum).fill(0))
			//随机生成一个2或一个4
			this.randomNum()
			this.randomNum()
		},
		randomNum: function(){
			//循环
			while(true){
				//随机行和列
				let r = Math.floor(Math.random()*this.rNum)
				let c = Math.floor(Math.random()*this.cNum)
				//随机行列为空
				if(this.data[r][c] == 0){
					//随机赋值为2或4
					this.data[r][c] = Math.random()>0.5?2:4
					//退出循环
					break
				}
			}
		},
		clickNum:function(r,c){//点击选中更新焦点坐标
			this.$set(this.point,0,r)
			this.$set(this.point,1,c)
		},
		moveUp: function(){
			let r = this.point[0]
			let c = this.point[1]
			//当前移动点不为0 且向上未出界
			if(this.data[r][c] && r-1 >= 0){
				if(this.data[r-1][c]){
					if(this.data[r][c] == this.data[r-1][c]){//上个元素不为零且相等的时候
						//分数相加
						this.score += this.data[r][c]*2
						//上加操作
						this.$set(this.data[r-1],c,this.data[r-1][c]*2)
						this.$set(this.data[r],c,0)
						//更新焦点
						this.$set(this.point,0,r-1)

						// 更新
						this.updata()
					}
				}else{//上个元素为零，上移
					this.score += this.data[r][c]
					this.$set(this.data[r-1],c,this.data[r][c])
					this.$set(this.data[r],c,0)
					//更新焦点
					this.$set(this.point,0,r-1)

					// 更新
					this.updata()
				}
			}
		},
		moveDown: function(){
			let r = this.point[0]
			let c = this.point[1]
			//当前移动点不为0 且向上未出界
			if(this.data[r][c] && r+1 < this.rNum){
				if(this.data[r+1][c]){
					if(this.data[r][c] == this.data[r+1][c]){//上个元素不为零且相等的时候
						//分数相加
						this.score += this.data[r][c]*2
						//上加操作
						this.$set(this.data[r+1],c,this.data[r+1][c]*2)
						this.$set(this.data[r],c,0)
						this.$set(this.point,0,r+1)
						// 更新
						this.updata()
					}
				}else{//上个元素为零，上移
					this.score += this.data[r][c]
					this.$set(this.data[r+1],c,this.data[r][c])
					this.$set(this.data[r],c,0)
					this.$set(this.point,0,r+1)

					// 更新
					this.updata()
				}
			}
		},
		moveLeft: function(){
			let r = this.point[0]
			let c = this.point[1]
			//当前移动点不为0 且向上未出界
			if(this.data[r][c] && c-1 >= 0){
				if(this.data[r][c-1]){
					if(this.data[r][c] == this.data[r][c-1]){//上个元素不为零且相等的时候
						//分数相加
						this.score += this.data[r][c]*2
						//上加操作
						this.$set(this.data[r],c-1,this.data[r][c-1]*2)
						this.$set(this.data[r],c,0)
						// 更新焦点
						this.$set(this.point,1,c-1)

						// 更新
						this.updata()
					}
				}else{//上个元素为零，上移
					this.score += this.data[r][c]
					this.$set(this.data[r],c-1,this.data[r][c])
					this.$set(this.data[r],c,0)

					this.$set(this.point,1,c-1)
					// 更新
					this.updata()
				}
			}
		},
		moveRight: function(){
			let r = this.point[0]
			let c = this.point[1]
			//当前移动点不为0 且向上未出界
			if(this.data[r][c] && c+1 < this.cNum){
				if(this.data[r][c+1]){
					if(this.data[r][c] == this.data[r][c+1]){//上个元素不为零且相等的时候
						//分数相加
						this.score += this.data[r][c]*2
						//上加操作
						this.$set(this.data[r],c+1,this.data[r][c+1]*2)
						this.$set(this.data[r],c,0)

						this.$set(this.point,1,c+1)
						// 更新
						this.updata()
					}
				}else{//上个元素为零，上移
					this.score += this.data[r][c]
					this.$set(this.data[r],c+1,this.data[r][c])
					this.$set(this.data[r],c,0)

					this.$set(this.point,1,c+1)
					// 更新
					this.updata()
				}
			}

		},
		updata: function(){
			//上移操作成功需要随机生成2或四
			this.randomNum()
			//判断游戏是否结束
			this.statue = this.isOver()
		},
		isOver: function(){
			for(let i=0;i<this.rNum;i++){
				for(let j=0;j<this.cNum;j++){
					if(this.data[i][j]){//不为零，判断下与左方元素是否相等
						if(i+1<this.rNum && this.data[i][j] == this.data[i+1][j] || j+1<this.cNum && this.data[i][j] == this.data[i][j+1] ){
							return false
						}
					}else{
						return false
					}
				}
			}
			return true
		},
		restart: function(){
			this.statue = false
			this.point = []
			this.data = []
			this.score = 0
			this.initData()
		}
	},
	created: function(){
		 var _self = this;
		//需要页面监听键盘事件，直接绑定没用
		document.onkeydown = function(e){
			switch(e.keyCode){
				case 37://左移
					_self.moveLeft()
					break
				case 39://右移
					_self.moveRight()
					break
				case 38://上移
					_self.moveUp()
					break
				case 40://下移
					_self.moveDown()
					break
			}
		}
	},
	mounted: function(){
		this.initData()
	}

})
