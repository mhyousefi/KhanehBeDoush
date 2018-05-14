const dictFa = {
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

const dictEn = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
}

export const toPersian = function(str = '') {
  if (str === null) {
    return ''
  }
  return `${str}`.replace(/[0-9]/g, v => {
    return dictFa[v]
  })
}

export const toEnglish = function(str = '') {
  if (str === null) {
    return ''
  }
  return `${str}`.replace(/[۰-۹]/g, v => {
    return dictEn[v]
  })
}

export const isPositiveNum = (num) => {
  if (!isNaN(num) && parseInt(num) <= 0)
    return false

  if (!isNaN(toEnglish(num)) && parseInt(toEnglish(num)) <= 0)
    return false

  return true
}

export const isNumber = (num) => {
  let isEnglishNum = !isNaN(num)
  let isPersianNum = !isNaN(toEnglish(num))
  return isEnglishNum || isPersianNum;

}

export const searchParamsAreValid = (maxPrice, minArea, propertyType, dealType) => {
  if (!isNumber(maxPrice) || !isNumber(minArea)){
    return false
  }

  if (!isPositiveNum(maxPrice) || !isPositiveNum(minArea)){
    return false
  }

  return true
}

export const validateHouseParams = (house) => {
  const { dealType , buildingType, area, phoneNumber , address, basePrice, rentPrice, sellingPrice } = house

  if (dealType === '' || buildingType === '' === '' || area === '' || phoneNumber === '' ||
      address === '') {
    return false
  }

  if (!isNumber(area) || !isNumber(phoneNumber)) {
    return false
  }

  if (dealType === 'rental') {
    if (!isNumber(basePrice) || !isNumber(rentPrice)) {
      return false
    }
  } else if (dealType === 'sale' && !isNumber(sellingPrice)) {
      return false
  }

  return true
}