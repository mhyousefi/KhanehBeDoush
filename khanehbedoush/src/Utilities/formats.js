const dict = {
  '0': '۰',
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹',
}

export const toPersian = function (str = '') {
  return `${str}`.replace(/[0-9]/g, (v) => {
    return dict[v] || v
  })
}
export const toEnglish = function (str = '') {
  return `${str}`.replace(/[۰-۹]/g, (v) => {
    return dict[v] || v
  })
}