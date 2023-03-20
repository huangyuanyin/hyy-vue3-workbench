export default function dispatchEventStroage() {
  const signSetItem = localStorage.setItem
  localStorage.setItem = function (key, val) {
    let setEvent: any = new Event('setItemEvent')
    setEvent.key = key
    setEvent.newValue = val
    window.dispatchEvent(setEvent)
    signSetItem.apply(this, arguments)
  }
}
