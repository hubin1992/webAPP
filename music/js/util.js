function resetTrans(ele, attr, value) {
  let str = ""
  if (!ele.obj) {
    ele.obj = {}
  }
  if (arguments.length >= 3) {//设置
    ele.obj[attr] = value
    for (var i in ele.obj) {
      switch (i) {
        case "scale":
          str += i + "(" + ele.obj[i] + ") "
          break;
        case "translateX":
        case "translateY":
          str += i + "(" + ele.obj[i] + "px) "
          break
        case "skewX":
        case "skewY":
        case "rotate":
          str += i + "(" + ele.obj[i] + "deg )"
      }
      ele.style.transform = str
      ele.style.WebkitTransform = str
    }

  } else {//否则我们就当作是获取
    if (typeof ele.obj[attr] == "undefined") {
      if (attr == "scale") {
        val = 1
      } else {
        val = 0
      }
    } else {
      val = ele.obj[attr]
    }
    return val
  }
}
