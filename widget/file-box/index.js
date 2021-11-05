 //获取应用实例
 const app = getApp();

 Component({
   /**
    * 组件的属性列表
    */
   properties: {
     fileInfo: {
       type: Object,
       value: {}
     },
     top: {
       type: Number,
       value: 0
     },
   },

   /**
    * 组件的初始数据
    */
   data: {
     databankPageIndex: 1,
     databankPageIndex_add: 0, //二维数组下标
     databankTopNum: 0, //资料库列表距顶
     databankTextContent: "", //资料库文本资料内容
     databankAudioHidden: true, //资料库音频资料隐藏显示
     databankAudioPlaying: false, //资料库音频资料是否播放
     databankAudio: "", //资料库音频
     databankMapHidden: false, //资料库地图资料隐藏显示
     displayDataBankDetail: false,
     mapData: {
       latitude: 0,
       longitude: 0,
     },
   },
   created: function () {
     this.openFile();
   },

   /**
    * 监听KeyWord
    */
   observers: {

     'fileInfo'(data) { //单个监听
       this.openFile();
     },
   },

   /**
    * 组件的方法列表
    */
   methods: {
     /** 资料库隐藏显示 */
     databankHidden: function () {
       //周边数据回调
       this.triggerEvent('hidden', false);
     },

     //**打开文档资料 */
     openDocument() {
       if (this.data.fileInfo.type == "document") {
         let that = this;
         wx.downloadFile({
           url: that.data.fileInfo.url,
           success: (result) => {
             let filePath = result.tempFilePath
             wx.openDocument({
               filePath: filePath,
               fileType: that.data.fileInfo.fileType,
               success: (res) => {
                 wx.hideLoading()
               },
               fail: (res) => {
                 wx.showToast({
                   title: '文件打开失败！',
                   icon: "none",
                   mask: true,
                 })
                 wx.hideLoading()
               },
             })
           },
           fail: (result) => {
             wx.showToast({
               title: '文件加载失败！',
               icon: "none",
               mask: true,
             })
             wx.hideLoading()
           },
         })
       }
       if (this.data.fileInfo.type == 'other' && this.data.fileInfo.url) {
         wx.redirectTo({
           url: '/pages/web_view_html/web_view_html?webUrl=' + this.data.fileInfo.url,
         })
       }
     },

     /** 打开资料库文件 */
     openFile: function (e) {
       let fileInfo = this.data.fileInfo
       wx.hideLoading();
       console.log('打开=====', this.data.fileInfo);
       if (fileInfo.type == 'map' || (fileInfo.suffix == 'of' && !fileInfo.url && fileInfo.address)) {
         this.openMap()
       } else {
         this.setData({
           isShowFile: true
         });
       }
       if (fileInfo.type == "document" || fileInfo.type == "audio") {
         let that = this;
         console.log('document')
         wx.downloadFile({
           url: fileInfo.url,
           success: (result) => {
             let filePath = result.tempFilePath
             if (fileInfo.suffix == "txt") {
               let fs = wx.getFileSystemManager()
               fs.readFile({
                 filePath: filePath,
                 encoding: 'utf8',
                 success: (res) => {
                  console.log('documentres',res)
                   wx.hideLoading()
                   that.setData({
                     databankTextContent: res.data
                   })
                 },
                 fail: (res) => {
                   wx.showToast({
                     title: '文件打开失败！',
                     icon: "none",
                     mask: true,
                   })
                   wx.hideLoading()
                 },
               })
             } else if (fileInfo.type == "audio") {
               wx.hideLoading()
               that.setData({
                 databankAudioHidden: false,
                 displayDataBankDetail: true,
               })
               this.data.databankAudio = wx.createInnerAudioContext()
               this.data.databankAudio.autoplay = false;
               this.data.databankAudio.loop = true;
               this.data.databankAudio.src = filePath;
               this.data.databankAudio.onPlay(() => {})
             }
           },
           fail: (result) => {
             wx.showToast({
               title: '文件加载失败！',
               icon: "none",
               mask: true,
             })
             wx.hideLoading()
           },
         })
       }
     },

     openImage() {
       console.log('this.data.fileInfo.url',this.data.fileInfo.url)
       wx.previewImage({
         current: this.data.fileInfo.url, // 当前显示图片的http链接
         urls: [this.data.fileInfo.url] // 需要预览的图片http链接列表
       })
     },


     /**
      * 播放或者暂停资料库音频
      */
     playOrPauseDatabankAudio: function () {
       if (this.data.databankAudio.paused) {
         this.data.databankAudio.play(() => {})
         console.log("播放音频");
       } else {
         this.data.databankAudio.pause();
         console.log("暂停音频");
       }
       this.setData({
         databankAudioPlaying: this.data.databankAudio.paused,
       })
     },

     /** 打开地图 */
     openMap: function (e) {

       this.setData({
         databankMapHidden: true,
         'mapData.latitude': this.data.fileInfo.lat,
         'mapData.longitude': this.data.fileInfo.lng,
       });


     },

   }
 })