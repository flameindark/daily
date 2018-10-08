### 原生js中使用cssText修改样式
- 使用理由  
  可以使用一个字符串设置一个元素的多个样式而且是一次插入(所以效率很高，有点像js中的DocumentFragment)
- 用法  
  ``` JavaScript
  var oDiv = document.getElementById("div1");
  // 会丢掉前面的background属性
  oDiv.style.cssText = "font-weight:bold;color:#332200;"
  ```
- 注意点  
  1. 会覆盖内联样式(单独写在style标签样式中的样式不会)，所以需要在之前的的样式字符串上新增，如下
  ``` JavaScript
    var oDiv = document.getElementById("div");
    oDiv.style.cssText += "font-weight:bold;color:#332200;";
  ```
  2. IE9以下的兼容性问题  
  ie9之下需要在添加的属性前多加一个分号，因为他们的style.cssText字符串后会少一个分号，所以字符串相加的时候会出现问题 如下
  ``` javascript
    oDiv.style.cssText += ";font-weight:bold;color:#332200;";
  ```

### 使用svg icon的方法
- 使用理由  
  相对于普通的fontIcon，svg图标支持多种颜色，而且相较于fontIcon表现要好(貌似没有png图片的表现好，具体没测试过)
- 用法  
  1. 使用svg sprite(我这里仅使用阿里iconfont) ,参照[这里](http://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code)的symbol部分
    + 原理：  
      引入svg到html中
    ``` html
    <svg>
      <symbol id="iconfont-1">
          <!-- 第1个图标路径形状之类代码 -->
      </symbol>
      <symbol id="iconfont-2">
          <!-- 第2个图标路径形状之类代码 -->
      </symbol>
      <symbol id="iconfont-3">
          <!-- 第3个图标路径形状之类代码 -->
      </symbol>
    </svg>
    ```
    在需要的地方use
    ``` html
      <svg><use xlink:href="#iconfont-1" /></svg>
    ```
    嘛，很方便的呢？但是需要引入的symbol和use在同一文档中，所以对于内联symbol来说会增加点体积。这个时候类似阿里iconfont的js引入的方式就只要一个项目引入一个文件利用缓存就行，相对于都内联可以减少一点体积(但是不是究极的，方法2相对来说体积可能更小)  
  2. 按需加载svg icon
    + 使用  
      我们使用的是ionicicon这个项目提供的，用法如下
    ``` html
    <ion-icon name="heart"></ion-icon>
    <script src="https://unpkg.com/ionicons@4.2.2/dist/ionicons.js"></script>
    ```
    哇，简洁。这个时候你运行这个html会发现只请求了一个svg icon。但是本身这个js相关引入的除svg相关的js的大小大约为80多k(未gzip),而且应该不支持自定义图标上传的。
- 总结：  
  方法1经测试80多个图标大约110k（未gzip），方法2中除图标外的js大约为80k，然后根据图标使用再请求相关的svg。这样一比感觉方法1比较好，而且方法1支持上传自定义图标(强大的iconfont)