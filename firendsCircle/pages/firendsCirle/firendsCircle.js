// pages/firendsCirle/firendsCircle.js
const app = getApp()  //获取小程序实例
function getAllData(self){
    wx.request({
        url: app.globalData.baseUrl + "api",
        method: "GET",
        success(res) {
            self.setData({
                deliverData: res.data.result
            })
        }
    })
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        deliverData: {},
        showZanAndPinglunNum: null,
        isShowOrHideComtent: false,
        allOrPart: "全文"
    },
    // 点击头部相册图标,打开发朋友圈编辑页面
    showEditPage() {
        wx.navigateTo({
            url: '../edit/edit'
        })
    },
    //朋友圈正文内容显示或收起,逻辑是通过style动态设置max-height样式
    ShowOrHideComtent(){
        if (this.data.allOrPart === "全文"){
            this.setData({
                isShowOrHideComtent: true,
                allOrPart: "收起"
            })
        } else if (this.data.allOrPart === "收起"){
            this.setData({
                isShowOrHideComtent: false,
                allOrPart: "全文"
            })
        }
    },
    //点击朋友圈图片,弹出框预览大图
    showImg(e){
        let outidx = e.currentTarget.dataset.outidx;
        let imgidx = e.target.dataset.imgidx;
        let imgArr = this.data.deliverData[outidx].imgArr;
        wx.previewImage({
            current: imgArr[imgidx], // 当前显示图片的http链接
            urls: imgArr // 需要预览的图片http链接列表
        })
    },
    //点击评论图标,显示点赞和评论按钮
    showZanAndPinglun(e){
        this.setData({
            showZanAndPinglunNum: e.currentTarget.dataset.idx
        })
    },
    //点选和评论的隐藏通过事件委托到全页面(暂时只实现当条朋友所在区域,全页面和滚动时也隐藏在考虑实现)
    hideZanAndPinglun(){
        this.setData({
            showZanAndPinglunNum: null
        })
    },
    //点赞
    dianzan(e){
        this.setData({ showZanAndPinglunNum:null})
        let idx = e.currentTarget.dataset.idx;
        let nickName = app.globalData.userInfo.nickName;
        wx.request({
            url: app.globalData.baseUrl + "zan",
            method: "get",
            data: {
                idx,
                nickName
            }
        });
        getAllData(this);
    },
  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        if (app.globalData.userInfo) { //全局数据用户信息是否存在
            //全局已获取用户信息，则用获取全局数据（主要是用户昵称和头像）
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) { //否则判断是否可以命名使用用户信息
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理，在之前版本中是默认获取用户头像和昵称的，所以上面canIUse=false时自动获取。
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        };
        //如果朋友圈页面显示，则向服务器发送请求所有数据。
        // if (this.data.hasUserInfo && this.data.canIUse){
        //     console.log(1)
        //     getAllData(this);
        // }
    },
    //首次使用点击按钮获取用户头像和昵称授权
    tapBtnToGetUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        getAllData(this);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { //下拉刷新数据
        // getAllData();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})