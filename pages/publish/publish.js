// pages/publish/publish.js
import {timestampToTime} from "../../utils/comment.js"
let  id

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    fileList: [],
    tempFilePaths1:"",
    tempFilePaths2:"",
    tempFilePaths3:"",
    i:0,
    value:0,
    show: false,
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 10, 1).getTime(),
    currentDate: "",//new Date().getTime(),
    require_data:{
      userid:1,
      requireid:0,
      title:"",
      description:"",
      createtime:"",
      endtime:"",
      reward:0,
      status:"Available",
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //id=optinos
    //console.log(this.require_data);
  },
  publish(){
    wx.request({
      url: 'http://localhost/require',
      method:"POST",
      data:this.data.require_data,
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:res=>{
        console.log(res);
        this.data.require_data.requireid=res.data;
        this.upLoad();
      },
      fail(err){
        console.error(err);
      }
    });
  },
  upLoad(){
    if(this.data.i>=0){
      wx.uploadFile({
        url: 'https://localhost/img', 
        method:"POST",
        filePath: this.data.tempFilePaths1,
        name: 'file',
        formData: { requireid:this.data.require_data.requireid },
        success:res=>{
          // 上传完成需要更新 fileList
          console.log(res)
          //const { fileList = [] } = this.data;
          //fileList.push({ ...file, url: res.data });
          //this.setData({ fileList });
        },
        fail:err=>{
          console.error(err);
          console.log(this.data.require_data.requireid);
        }
      });
      this.data.i--;
    }
  },
  afterRead(event) {
    const { file } = event.detail;
    if(this.data.i==0)this.data.tempFilePaths1=String(file.url);
    this.data.i++;
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  onInput(event) {
    //console.log(this.require_data)
    this.setData({
      currentDate: event.detail,
    });
    this.data.require_data.endtime=timestampToTime(event.detail,1);
    this.data.require_data.createtime=timestampToTime(this.data.minDate,1);
  },

  onChangetitle(event) {
    //console.log(this.require_data.title);
    this.data.require_data.title=event.detail;
  },
  onChangereward(event) {
    //console.log(this.require_data.reward);
    this.data.require_data.reward=Number(event.detail);
  },
  ondetailbox(event) {
    //console.log(this.require_data.description);
    this.data.require_data.description=event.detail;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})