export function launchObserver ({
  parentNode,
  selector,
  failCallback = null,
  successCallback = null,
  stopWhenSuccess = true,
  config = {
    childList: true,
    subtree: true
  }
}) {
  // if parent node does not exist, return
  if (!parentNode) { return }
  const observeFunc = mutationList => {
    if (!document.querySelector(selector)) {
      if (failCallback) { failCallback() }
      return
    }
    if (stopWhenSuccess) { observer.disconnect() }
    if (successCallback) { successCallback() }
  }
  const observer = new MutationObserver(observeFunc)
  observer.observe(parentNode, config)
}
