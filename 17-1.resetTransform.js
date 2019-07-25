/* 
//注意：我们必须用这个设置了，才可以用这个来获取
//思路: 我们存在元素的自定义属性中一份，这样我们获取到具体的了，而获取到的不是矩阵
//限制: 只能用这个设置了，才可以用这个方法获取到
*/
function resetTransform(ele, attr, val) {
  var str = ""
  if (!ele.obj) {
    ele.obj = {}
  }
  if (arguments.length >= 3) {
    ele.obj[attr] = val
    for (var v in ele.obj) {
      switch (v) {
        case "scale":
          str += v + "(" + ele.obj[v] + ") "
          break
        case "skew":
        case "rotate":
          str += v + "(" + ele.obj[v] + "deg) "
        case "translateX":
        case "translateY":
          str += v + "(" + ele.obj[v] + "px) "
      }
    }
    ele.style.transform = str
    ele.style.WebkitTransform = str
  } else {
    if (typeof ele.obj[attr] == "undefined") {
      if( attr == "scale"){
        val = 1
      }else{
        val = 0
      }
    }else{
      val = ele.obj[attr]
    }
    return val
  }
  
}

// export {
//   resetTransform
// }

