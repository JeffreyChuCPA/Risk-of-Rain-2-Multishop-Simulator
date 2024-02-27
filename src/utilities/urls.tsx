const baseURL = 'https://riskofrain2api.herokuapp.com/api'

const urls: {[key: string]: string} = {
  survivorsURL: `${baseURL}/survivor/everySurvivor`,
  commonItemsURL: `${baseURL}/commonItems`,
  unCommonItemsURL: `${baseURL}/uncommonItems`,
  legendaryItemsURL: `${baseURL}/legendaryItems`
}

export default urls