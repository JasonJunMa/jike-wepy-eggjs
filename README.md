# ijike 小程序一站式解决方案
eggjs server端功能:
    1.小程序登录
    2.jwt验证
    3.restful api接口设计
    4.图片上传接口 (基于腾讯云的对象存储方案)
    5.小程序二维码生成
    6. 腾讯视频vid解析

wepy 小程序端功能
    1. 完善的小程序注册登录流程 --进入程序静默注册 在需要时的时候调用小程序认证
    2. 组件化认证功能 只需要在需要使用认证的页面调用该组件即可
    3. 组件化多图上传功能 
    4. 组件化 “自定义标题栏” 功能 ,完美兼容ios android 刘海屏 异形屏等。
    5. 组件化 “多媒体编辑” 功能， 使用户可以正常使用手机端上传大段文字 与 多图
    6. 组件化 “视频悬浮播放” 功能， 附带腾讯视频 vid 解析 


## 项目结构

    clien wepy 框架的小程序项目
    server egg.js 的node后端 里面使用了mongodb保存数据 腾讯云作为cos存储文件



##  如何使用 如何安装

### server

    
    git clone https://github.com/moyuanhua/jike-wepy-eggjs.git
    cd server
    npm i 
    npm run dev
    
    如果需要体验图片上传， 需要依照配置腾讯云的 cos配置， 配置文档在server/config下
    

### client    


    cd client
    npm i
    npm run dev
    



    

## 多图预警
<img src="./img/cover.png" width="250" height="" alt="封面"></img>
<img src="./img/auth.png" width="250" height="" alt="认证"></img>
<img src="./img/title.png" width="250" height="" alt="标题"></img>
<img src="./img/medie.png" width="250" height="" alt="多媒体"></img>
<img src="./img/upload.png" width="250" height="" alt="上传"></img>
<img src="./img/video.png" width="250" height="" alt="视频"></img>

    