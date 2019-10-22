(function () {
  let scrollNavList = document.querySelector(".scroll_nav_list")

  let scrollNav = document.querySelector(".scroll_nav")
  let startPoint = 0
  let startTrans = 0
  let step = 1;//这个是用来计算小数的
  let minL = scrollNav.clientWidth - scrollNavList.offsetWidth  //是一个负值
  let point = 0 ; //全局的原因，是为了避免点击的时候导致不能划动
  
  let startX = 0, //设置始的参数
    startTime = 0,
    disPoint = 0,
    disTime = 0
  scrollNavList.addEventListener("touchstart", (e) => {
    startPoint = e.changedTouches[0].pageX
    startTrans = resetTrans(scrollNavList, "translateX")
    step = 1
    startTime = new Date().getTime()
    startX = startTrans
    disPoint = 0
    disTime = 0
    time = 300
    
  }, { passive: false })
  scrollNavList.addEventListener("touchmove", (e) => {
    let curPoint = e.changedTouches[0].pageX
     point = curPoint - startPoint + startTrans
    let time = new Date().getTime()
    disPoint = point - startX
    disTime = time - startTime
    startTime = time
    startX = point
    if (point > 0) {
      //point 肯定是越来越大的，等两个商等于1的时候就是不动的时候
      step = 1 - point / (scrollNavList.clientWidth)
      point = parseFloat(point * step) //为了方便取个整数
    }

    if (point < minL) {
      let over = minL - point;//我们划动正好处在边缘的距离， point 是个负值，over就是个正数
      step = 1 - over / scrollNavList.clientWidth  //over是越来越大，我们用1取对值 step会越来越小
      over = parseInt(over * step);//over 肯定会越来越小的
      point = minL - over   //增加的会越来越小
    }
    resetTrans(scrollNavList, "translateX", point)
  }, { passive: false })
  scrollNavList.addEventListener("touchend", (e) => {
    //target的时候会有一个效果，就是我们结束划动的越快，那么他划动的就会远一些，如果划动的慢，那么松手的时候就是比较慢的。所以我们这个地方要求出一下移动的速度
    let speed = (disPoint / disTime) * 200
    let target = resetTrans(scrollNavList, "translateX") + speed //用来做缓冲的
    let time = speed > 1000 ? 1000 : Math.abs(speed * 1.2)
    if (target > 0) {
      target = 0;
    }
    if (target < minL) {
      target = minL
    }

    scrollNavList.style.transition = time + "ms cubic-bezier(0.24, 0.17, 0.25, 1)" + 
    resetTrans(scrollNavList, "translateX", target)

  }, { passive: false })
})()
