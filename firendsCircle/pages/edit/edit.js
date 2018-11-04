// pages/edit/edit.js
const app = getApp();
Page({
    /*** 页面的初始数据*/
    data: {
        textareaTxt:null,
        imgArr:null,
        location:null
    },
    saveEditOrNot(){
        wx.showModal({
            title: '将此次编辑保留',
            content: '',
            cancelText: '不保留',
            confirmText: '保留',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    wx.navigateBack({
                        delta:1
                    })
                }
            }
        })
    },
    getInputValue(e){
        this.setData({
            textareaTxt: e.detail.value    
        })
    },
    chooseImage(){
        let self = this;
        wx.chooseImage({
            count: 9,
            sizeType: 'compressed',
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                self.setData({
                    imgArr: res.tempFilePaths
                })           
            }
        })
    },
    chooseLocation(){
        let self = this
        wx.chooseLocation({
            success(res) {
                self.setData({
                    location: res.name
                })

             }
        })
    },
    postData(){
        wx.navigateBack({
            delta:1
        })
        wx.request({
            url: app.globalData.baseUrl+"api",
            method: "POST",
            data: {
                avatarUrl: app.globalData.userInfo.avatarUrl,
                nickName: app.globalData.userInfo.nickName,
                textareaTxt:this.data.textareaTxt,
                imgArr: this.data.imgArr,
                location: this.data.location
            },
             header: {
                'content-type':'application/x-www-form-urlencoded'
            }
        })
    }
})