import { testHouses } from 'src/constants/FaTexts'

export const searchHouses = (maxPrice, minArea, propertyType, dealType) => {
  return testHouses
}

export const getHouseWithId = (houseId) => {
  return testHouses[parseInt(houseId, 10)]
}