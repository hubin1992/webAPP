(function () {
  let advSwiper = document.querySelector(".adv_swiper");
  let advList = document.querySelector(".adv_list");
  advList.innerHTML += advList.innerHTML
  let lis = document.querySelectorAll(".adv_list li");
  let advNavList = document.querySelectorAll(".adv_scoll_nav span")
  let advSwiperWid = advSwiper.offsetWidth
  let liHei = lis[0].clientHeight
  let point = 0
  let index = 0
  let timer = null
  let startX = 0
  //初始化
  init()
  function init() {
    advSwiper.style.height = liHei + "px"
    advList.style.width = lis.length + "00%"
    for (var i = 0; i < lis.length; i++) {
      lis[i].style.width = 1 / lis.length * 100 + "%"
    }
  }
  advList.addEventListener("touchstart", function (e) {
    //我们拖拽的时候不要动画，因为会很慢
    clearInterval(timer)
    advList.style.transition = "none"
    advList.style.WebkitTransition = "none"
    let tranX = resetTrans(advList, 'translateX')
    // console.log(tranX)
    // 这里我们需要实现无缝的拖动
    index = Math.round(tranX / advSwiperWid);
    if (index >= 0) {
      index = -advNavList.length//我们就是让index始终保持一个负值
      resetTrans(advList, 'translateX', index * advSwiperWid)
    }
    if (index == -(lis.length - 1)) {//因为是左边所以index肯定是负值
      index = -(advNavList.length - 1)
      resetTrans(advList, 'translateX', index * advSwiperWid)
    }
    //startX放在后面的原因，是因为我们始终要获取最新的开始的距离，才好计算move的值
    startX = resetTrans(advList, 'translateX')
    point = e.changedTouches[0].pageX

  })
  advList.addEventListener("touchmove", function (e) {
    let curPoint = e.changedTouches[0].pageX
    let left = curPoint - point + startX
    resetTrans(advList, "translateX", left)
  })
  advList.addEventListener("touchend", function (e) {
    //当我们松手的时候需要判断是往前还是往后
    auto()
    startX = resetTrans(advList, 'translateX') //先获取到距离原点的距离
    index = Math.round(startX / advSwiperWid) //index 本身就是一个负值
    tab()
  })

  function auto() {
    clearInterval(timer)
    timer = setInterval(() => {
      if (index == -(lis.length - 1)) {//无缝滚动的同样思路
        index = -(advNavList.length - 1)
        advList.style.transition = "none"
        advList.style.WebkitTransition = "none"
        resetTrans(advList, 'translateX', index * advSwiperWid)
      }
      setTimeout(function () {//因为我们去掉动画，然后加上动画的间隔事件太短了，无效
        index--
        tab()
      })
    }, 1000);
  }
  function tab() {
    resetTrans(advList, 'translateX', index * advSwiperWid)
    advList.style.transition = ".5s"
    advList.style.WebkitTransition = ".5s"
    advNavList.forEach((item) => {
      item.className = ""
    })
    advNavList[Math.abs(index % advNavList.length)].className = "active"
  }
  auto()
})()