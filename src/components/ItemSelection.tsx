import { useEffect, useState } from "react"
import { Items } from "../utilities/types"
import urls from "../utilities/urls"

const ItemSelection = () => {
  // const [commonItems, setCommonItems] =useState<Items[]>([]) //*to store list of common items from API pull
  // const [unCommonItems, setUnCommonItems] =useState<Items[]>([]) //*to store list of uncommon items from API pull
  // const [legendaryItems, setLegendaryItems] =useState<Items[]>([]) //*to store list of legendary items from API pull
  const [allItems, setAllItems] = useState<Items[]>([])

  useEffect(() => {
    const fetchItems = async () => {

      const itemURLS: string[] = [urls.commonItemsURL, urls.unCommonItemsURL, urls.legendaryItemsURL];

      try {
        // Use Promise.all to fetch all URLs simultaneously
        const fetchPromises = itemURLS.map(async (url: string) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Failed to retrieve items");

          const data = await response.json();
          return data.map((item: Items) => ({
            id: item._id,
            itemName: item.itemName,
            rarity: item.rarity,
            description: item.description,
            stackType: item.stackType,
            itemImage: item.itemImage,
          }));
        });

        // Await all promises and then combine results into the allItems state
        const results = await Promise.all(fetchPromises);
        setAllItems(results);
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

 // const {data, loading, error} = useFetchItems([urls.commonItemsURL, urls.UnCommonItemsURL, urls.legendaryItemsURL])
  // const [allItems, setAllItems] = useState<Items[]>([])

  // useEffect(() => {
  //   if (data.length > 0) {
  //     setAllItems(data)
  //   }

  // }, [data])

  // if (loading) return <div>Loading items...</div>
  // if (error) return <div>Error fetching items</div>
  // console.log(allItems);