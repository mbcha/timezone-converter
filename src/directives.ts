type directive = {
  [key: string]: any
}

const directives: directive = {}

directives['click-outside'] = {
  mounted(el: any, binding: any, _vnode: any) {
    el.clickOutsideEvent = function(event: any) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}

export default directives
