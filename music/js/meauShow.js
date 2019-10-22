(function () {
  let onOff = true,
    meau = document.querySelector(".meau"),
    meauC = document.querySelector(".meau span"),
    nav = document.querySelector(".nav")
  meau.addEventListener("touchstart", (e) => {
    e.stopPropagation()
    if (onOff) {
      nav.style.display = "block"
      meauC.className = "meauHide"
    } else {
      nav.style.display = "none"
      meauC.className = "meauShow"
    }
    onOff = !onOff
  }, { passive: false })
  nav.addEventListener("touchstart", (e) => {
    e.stopPropagation()
  }, { passive: false })

  document.addEventListener("touchstart", (e) => {
    nav.style.display = "none"
    meauC.className = "meauShow"
    onOff = true;
  })

})()