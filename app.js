//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  // 获取用户当前地理位置信息
  getLocationInfo: function(cb) {
    const that = this;
    if (this.globalData.locationInfo) {
      typeof cb == 'function' && cb(this.globalData.locationInfo)
    } else {
      wx.getLocation({
        type: 'gcj02',
        success: function(res) {
          console.log('[getLocationInfo]success.res = ', res);
          that.globalData.locationInfo = res;
          typeof cb == 'function' && cb(that.globalData.locationInfo)
        },
        fail: function() {},
        complete: function() {
          console.info('done');
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    locationInfo: null
  }
})