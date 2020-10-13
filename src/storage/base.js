export function defineStorage (name, defaultValue) {
  if (!(name in localStorage)) {
    localStorage.setItem(name, JSON.stringify(defaultValue))
  }

  function getter () {
    return JSON.parse(localStorage.getItem(name))
  }

  function setter (v) {
    localStorage.setItem(name, JSON.stringify(v))
  }
  return [getter, setter]
}
