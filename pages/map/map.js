// map.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: null,
    latitude: null,
    markers: [],
    controls: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // app.getLocationInfo(function(locationInfo){
    //   console.log('[onload] locationInfo = %o', locationInfo);
    //   that.setData({
    //     latitude: locationInfo.latitude,
    //     longitude: locationInfo.longitude,
    //     markers: [{
    //         id: 0,
    //         iconPath: "../../resources/images/icon-pos.png",
    //         longitude: locationInfo.longitude,
    //         latitude: locationInfo.latitude,
    //         width: 30,
    //         height: 30
    //     }]
    //   })
    // });

    // 动态设置map的宽和高
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log('getSystemInfo');
    //     console.log(res.windowWidth);
    //     that.setData({
    //       map_width: res.windowWidth,
    //       map_height: res.screenHeight,
    //       controls: [{
    //         id: 1,
    //         position: {
    //           left: res.windowWidth / 2 - 8,
    //           top: res.screenHeight / 2 - 16,
    //           width: 30,
    //           height: 30
    //         },
    //         clickable: true
    //       }]
    //     })
    //   }
    // })

    // new code
    this.mapCtx = wx.createMapContext('locationMap');
    this.mapCtx.moveToLocation();

    app.getLocationInfo(function (res) {
        that.updateLocation(res.latitude, res.longitude);
        that.updateRadomMarkers(res.latitude, res.longitude);
    })

    wx.getSystemInfo({
      success: function (res) {
        that.updateControls(res.windowWidth, res.windowHeight);
      }
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
  onPullDownRefresh: function () {
  
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
  
  },

  controltap(e) {
    console.log('e = ',e);
    const that = this;
    let controlId = e.controlId;
    console.log(controlId);
  },

  //获取中间点的经纬度，并mark出来
  getLngLat: function () {
    var that = this;
    this.mapCtx = wx.createMapContext("homeMap");
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          longitude: res.longitude
          , latitude: res.latitude
          , markers: [
            {
              id: 0
              , iconPath: "../../resources/images/icon-pos.png"
              , longitude: res.longitude
              , latitude: res.latitude
              , width: 30
              , height: 30
            }
          ]
        })
      }
    })
  },

  regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    // if (e.type == 'end') {
    //   this.getLngLat()
    // }
  },
  
  // begin 自定义函数

  // 
  markertap(e) {
    console.log(e)
  },

  // 更新地图center坐标
  updateLocation(latitude, longitude) {
    this.setData({
      latitude: latitude,
      longitude: longitude
    })
  },

  // 随机增加充电机柜坐标
  updateRadomMarkers(latitude, longitude) {
    let markers = [];
    for (let i = 1; i < 10; i++) {
      let marker = {
        iconPath: "../../resources/images/icon-pos-green-32.png",
        id: i,
        latitude: latitude - Math.random().toFixed(1) / 500,
        longitude: longitude + Math.random().toFixed(1) / 1000,
        width: 32,
        height: 32
      };
      markers.push(marker);
    }

    this.setData({
      markers: markers
    })
  },

  // 增加几个操作按钮
  updateControls(windowWidth, windowHeight) {
    const that = this;
    let left = (+windowWidth) / 2 - 50;
    let top = (+windowHeight) - 100;

    let resetControl = {
      id: 'controlReset',
      iconPath: '../../resources/images/icon-reset-location-48.png',
      position: {
        left: 15,
        top: top + 10,
        width: 48,
        height: 48
      },
      clickable: true
    };

    this.setData({
      controls: [ resetControl ]
    })
  }

  // end 自定义函数
})