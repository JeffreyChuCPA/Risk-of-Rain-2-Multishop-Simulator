import { useEffect, useState } from "react"
import { Items, itemRarities } from "../utilities/types"
import urls from "../utilities/urls"

export type AllItems = {
  [itemRarity in itemRarities]: {
    items: Items[]
  }
}

const ItemSelection = () => {
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
          })),
        };
        });

        // Await all promises and then combine results into the allItems state
        const results = await Promise.all(fetchPromises);
        console.log(results);
        
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

  console.log(allItems);

  return (
    <div>ItemSelection</div>
  )
}

export default ItemSelection
