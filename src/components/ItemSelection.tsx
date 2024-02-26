import { useEffect, useState } from "react"
import { Items, UserSelection, itemRarities } from "../utilities/types"
import {removedItems} from "../utilities/itemsToRemove"
import urls from "../utilities/urls"
import MultiShopSelection from "./MultiShopSelection"


export type AllItems = {
  [itemRarity in itemRarities]: {
    items: Items[]
  }
}

const ItemSelection: React.FC<{
  handleItemSelection: (item: Items) => void;
  userSelection: UserSelection
}> = ({
  handleItemSelection, userSelection
}) => {
  const [allItems, setAllItems] = useState<AllItems>({
    Common: {items: []},
    Uncommon: {items: []},
    Legendary: {items: []},
  })

  useEffect(() => {

    const fetchItems = async () => {

    const itemURLS: {url: string}[] = [{url: urls.commonItemsURL}, {url: urls.unCommonItemsURL}, {url: urls.legendaryItemsURL}];

      try {
        // Use Promise.all to fetch all URLs simultaneously
        const fetchPromises = itemURLS.map(async ({url}) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Failed to retrieve items");

          const data = await response.json();
          return {
    
          items: data.map((item: Items) => ({
            id: item._id,
            itemName: item.itemName,
            rarity: item.rarity,
            description: item.description,
            stackType: item.stackType,
            itemImage: item.itemImage,
          })).filter((item: Items) => !removedItems.includes(item.itemName)),
        };
        });

        // Await all promises and then combine results into the allItems state
        const results = await Promise.all(fetchPromises);
        
        setAllItems({
          Common: {items: results[0].items},
          Uncommon: {items: results[1].items},
          Legendary: {items: results[2].items},
        });
        
        
      } catch (error) {
        console.error("Error retrieving items", error);
      }
    };

    fetchItems();
  }, [])

  return (
    <>
      <div className="items-selected">{userSelection.userItems.map(item => <img className="item-image selected" src={`public/assets/${item.rarity}/${item.itemName}.webp`} alt={item.itemName} />)}</div>
      {allItems.Common.items.length > 0 ? <MultiShopSelection allItems={allItems} handleItemSelection={handleItemSelection} userSelection={userSelection} /> : null}
      {console.log(allItems)}
    </>

  )
}

export default ItemSelection
