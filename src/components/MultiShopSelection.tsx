import { useEffect, useState } from "react"
import {AllItems} from "./ItemSelection"
import { Items, UserSelection, itemRarities } from "../utilities/types"

const MultiShopSelection: React.FC<{allItems: AllItems, handleItemSelection: (item: Items) => void , userSelection: UserSelection}> = ({allItems, handleItemSelection, userSelection}) => {

  const [multiShop, setMultiShop] = useState<Items[]>([])

  useEffect(() => {
    const getRandomRarity = (): itemRarities => {
      const randomNumber: number = Math.floor(Math.random() * 100)
      if (randomNumber < 70) {
        return itemRarities.common
      } else if (randomNumber < 95) {
        return itemRarities.uncommon
      } else {
        return itemRarities.legendary
      }
    }
  
    const getRandomItemIndex = (itemRarityArray: Items[]): number => {
      return Math.floor(Math.random() * itemRarityArray.length)
    }
  
    const populateMultiShop = (allItems: AllItems):Items[] => {
      const multiShopRarity = getRandomRarity()
      const rolledItems: Items[] = []
  
      for (let i = 0; i < 3; i++) {
        const randomItemIndex = getRandomItemIndex(allItems[multiShopRarity].items)
        rolledItems.push(allItems[multiShopRarity].items[randomItemIndex])
      }
      return rolledItems;
      
    }

    userSelection.userItems.length < 15 ? setMultiShop(populateMultiShop(allItems)) : setMultiShop([])
  },[allItems, userSelection])

  useEffect(() => {
    console.log(multiShop)
  }, [multiShop])
  




  return (
    <div>
      {multiShop.length > 0 ? (<div>{multiShop.map((item, index) => <img key={`${item.id}+${index}`} src={`public/assets/${item.rarity}/${item.itemName}.webp`} alt={item.itemName} onClick={() => handleItemSelection(item)}/>)}</div>) : null}
    </div>
    
  )
}

export default MultiShopSelection