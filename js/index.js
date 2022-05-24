// 代码雨背景代码块-By WeiyiGeek
var draw = null;
var timer = null;
var bg = document.getElementById("bg-canvas");
function codeRain() {
  var s = window.screen;
  var width  = bg.width = s.width;
  var height = bg.height = s.height;
  var letters = Array(256).join(1).split('');
  clearInterval(timer);
  timer = setInterval(function(){
    bg.getContext('2d').fillStyle="rgba(0,0,0,.05)";
    bg.getContext('2d').fillRect(0,0,width,height);
    bg.getContext('2d').fillStyle="#0F0";
    letters.map(function(y_pos, index){
      //text = String.fromCharCode(34+Math.random()*33);
      text = String.fromCharCode(3e4+Math.random()*64); // 显示中文
      x_pos = index * 10;
      bg.getContext('2d').fillText(text, x_pos, y_pos);
      letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
      bg.getContext('2d').fillStyle='#'+letters[index];
    });
  },33)
}

// 网站小小Buff-By WeiyiGeek
var i = 0;
var strList = [
  "开头很简单，最难的是坚持。",
  "为了能到远方，脚下的每一步都不能少。",
  "Always keep a beginner's mind, don't forget the beginner's mind.",
  "花开堪折直须折，莫待无花空折枝。",
  "一件事情不付诸实践，即使在心里想一万遍也是徒然。",
  "一沙一世界，一花一天堂。君掌盛无边，刹那成永恒。",
  "💡 有理想，但不妄想， 💭 有希望，但不奢望， 🐬 有作为，但不妄为。",
  "我们登上的并非我们所选择的舞台，演出并非我们所选择的剧本。-- 爱比克泰德 (古罗马哲学家) 。",
  "不闻不若闻之，闻之不若见之，见之不若知之，知之不若行之，学至于行之而止矣 -- 荀子",
  "闻见知行。",
  "拥有知识的错觉，比没有知识更可怕！",
  "如果你只做能力范围之内的事，你就永远不会有进步！",
  "没有落魄的行业，只有落魄的人！",
  "业精于勤荒于嬉，行成于思毁于随! ",
  "路漫漫其修远兮，吾将上下而求索。"
];
var strLen = strList.length;
var rand = Math.round(Math.random() * strLen)
var str = strList[rand];
function typing() {
  var text = document.getElementById("text");
  document.getElementById("bar").style.cssText = "display:none";
  text.innerText = str.substring(0, i++) + (i > str.length ? "" : "|");
  var typingTimer = setTimeout(typing, 150);
  if (i > str.length) {
    clearTimeout(typingTimer);
    // 竖杠闪烁效果
    var twinkleTimer = setInterval(twinkle, 100);
    setTimeout(function () {
      clearInterval(twinkleTimer);
      document.getElementById("bar").style.cssText = "display:none";
      //自动删除文字效果
      deleteText();
    }, 100);
  }
}

//自动删除文字效果
function deleteText() {
  var text = document.getElementById("text");
  text.innerText = str.substring(0, i--) + "|";
  var deleteTextTimer = setTimeout(deleteText, 50);
  if (i < 0) {
    clearTimeout(deleteTextTimer);
    //删除完后，自动打字，达到循环, 防止重复。
    randtemp = Math.round(Math.random() * strLen)
    while (randtemp == rand || randtemp >= strLen ) {
      randtemp = Math.round(Math.random() * strLen)
    }
    rand = randtemp;
    str = strList[rand];
    console.log(rand,str)
    typing();
  }
}

// 竖杠闪烁效果
var flag = 0;
function twinkle() {
  if (flag) {
    document.getElementById("bar").style.cssText = "color:#fff;";
    flag = 0;
  } else {
    document.getElementById("bar").style.cssText = "color:#ffffff47;";
    flag = 1;
  }
}

// 自执行函数 
(function () {
  // 末尾网站年份设置
  var startYear = 2018;
  var currentYear = new Date().getFullYear();
  if (startYear > currentYear) {
    document.getElementById("years").innerHTML=startYear;
  }else{
    document.getElementById("years").innerHTML=startYear+" - "+currentYear;
  }

  // 判断访问客户端
  var os = (function () {
    var ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
    return {
      isTablet: isTablet,
      isPhone: isPhone,
      isAndroid: isAndroid,
      isPc: isPc,
      isChrome: isChrome
    };
  })();

  // pc图片数组
  var pcImgList = [
    "https://wx1.sinaimg.cn/large/008iJh1nly1h2fvo6y96uj31hc0u0ag7.jpg"
  ]
  // 手机图片数组
  var mobileImgList = [
    "https://wx1.sinaimg.cn/large/008iJh1nly1h2fvo6y96uj31hc0u0ag7.jpg"
  ]
  //var bgObj = document.getElementsByClassName("bg-img");
  // 判断 ua
  if (os.isAndroid || os.isPhone) {
    console.log("手机");
    var rand = Math.round(Math.random() * mobileImgList.length);
    var url = "url('" + mobileImgList[rand] + "')";
    // bgObj[0].style.backgroundImage = url;
  } else if (os.isTablet) {
    console.log("平板");
  } else if (os.isPc) {
    console.log("电脑");
    var rand = Math.round(Math.random() * pcImgList.length);
    var url = "url('" + pcImgList[rand] + "')";
    // bgObj[0].style.backgroundImage = url;
  }

  // BUFFER 语句
  typing();

  // 代码雨调用
  codeRain();
})();;