import { useEffect, useState } from "react"
import {AllItems} from "./ItemSelection"
import { Items, itemRarities } from "../utilities/types"

const MultiShopSelection: React.FC<{allItems: AllItems, handleItemSelection: (item: Items) => void , numberOfItemsSelected: number}> = ({allItems, handleItemSelection, numberOfItemsSelected}) => {

  const [multiShop, setMultiShop] = useState<Items[]>([])

  const getRandomRarity = () => {
    const randomNumber: number = Math.floor(Math.random() * 100)
    if (randomNumber < 70) {
      return itemRarities.common
    } else if (randomNumber < 95) {
      return itemRarities.uncommon
    } else {
      return itemRarities.legendary
    }
  }

  const getRandomItem = (itemRarityArray: Items[]) => {
    return Math.floor(Math.random() * itemRarityArray.length)
  }

  const populateMultiShop = (allItems: AllItems) => {
    const multiShopRarity = getRandomRarity()
    const rolledItems = []

    for (let i = 0; i < 3; i++) {
      const randomItem = getRandomItem(allItems[multiShopRarity].items)
      rolledItems.push(allItems[multiShopRarity].items[randomItem])
    }
    return rolledItems;
    
  }

  useEffect(() => {
    numberOfItemsSelected < 5 ? setMultiShop(populateMultiShop(allItems)) : setMultiShop([])
  },[allItems, numberOfItemsSelected])

  useEffect(() => {
    console.log(multiShop)
  }, [multiShop])


  return (
    <div>
      {multiShop.length > 0 ? (<div>{multiShop.map((item, index) => <img key={`${item.id}+${index}`} src={item.itemImage} alt={item.itemName} onClick={() => handleItemSelection(item)}/>)}</div>) : null}
    </div>
    
  )
}

export default MultiShopSelection