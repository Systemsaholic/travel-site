import throttle from "lodash/throttle"
import debounce from "lodash/debounce"

class RevealOnScroll {
  constructor(els, thresholdPercent) {
    this.itemsToReveal = els
    this.thresholdPercent = thresholdPercent
    this.browserHeight = window.innerHeight
    this.hideInitially()
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
    this.events()
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle)
    window.addEventListener(
      "resize",
      debounce(() => {
        console.log("resize ran")
        this.browserHeight = window.innerHeight
      }, 333)
    )
  }

  calcCaller() {
    // console.log("Scroll Ran")
    this.itemsToReveal.forEach(el => {
      const isRevealed = el.dataset.revealed === "true"
      if (!isRevealed) {
        this.calculateIfScrolledTo(el)
      }
    })
  }

  calculateIfScrolledTo(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      // console.log("Element was Calculated")
      const scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100
      if (scrollPercent < this.thresholdPercent) {
        el.classList.add("reveal-item--is-visible")
        el.dataset.revealed = "true"
        if (el.isLastItem) {
          window.removeEventListener("scroll", this.scrollThrottle)
        }
      }
    }
  }

  hideInitially() {
    this.itemsToReveal.forEach(el => {
      el.classList.add("reveal-item")
      el.dataset.revealed = "false"
    })
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
  }
}

export default RevealOnScroll
