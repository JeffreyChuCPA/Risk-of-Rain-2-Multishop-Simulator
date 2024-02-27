import { useEffect, useState } from "react";
import { Items, UserSelection, itemRarities } from "../utilities/types";
import { removedItems } from "../utilities/itemsToRemove";
import urls from "../utilities/urls";
import MultiShopSelection from "./MultiShopSelection";
import { isEmpty } from "lodash";

export type AllItems = {
  [itemRarity in itemRarities]: {
    items: Items[];
  };
};

const ItemSelection: React.FC<{
  handleItemSelection: (item: Items) => void;
  userSelection: UserSelection;
}> = ({ handleItemSelection, userSelection }) => {
  const [allItems, setAllItems] = useState<AllItems>({
    Common: { items: [] },
    Uncommon: { items: [] },
    Legendary: { items: [] }
  });

  const [itemStack, setItemStack] = useState<Record<string, number>>({});

  const userItemStack = Object.entries(itemStack).map(([item, count]) => {
    const itemStackRarity: Items[] = userSelection.userItems.filter(
      (userItem) => userItem.itemName === item
    );

    return { item, count, itemStackRarity };
  });

  console.log(userItemStack);

  useEffect(() => {
    const fetchItems = async () => {
      const itemURLS: string[] = [
        urls.commonItemsURL,
        urls.unCommonItemsURL,
        urls.legendaryItemsURL
      ];

      try {
        // Use Promise.all to fetch all URLs simultaneously
        const fetchPromises = itemURLS.map(async (url: string) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Failed to retrieve items");

          const data = await response.json();
          return {
            items: data
              .map((item: Items) => ({
                id: item._id,
                itemName: item.itemName,
                rarity: item.rarity,
                description: item.description,
                stackType: item.stackType,
                itemImage: item.itemImage
              }))
              .filter((item: Items) => !removedItems.includes(item.itemName))
          };
        });

        // Await all promises and then combine results into the allItems state
        const results = await Promise.all(fetchPromises);

        setAllItems({
          Common: { items: results[0].items },
          Uncommon: { items: results[1].items },
          Legendary: { items: results[2].items }
        });
      } catch (error) {
        console.error("Error retrieving items", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      {/* <div className="items-selected">{userSelection.userItems.map(item => itemStack[item.itemName] < 2 ? <img className="item-image selected" src={`public/assets/${item.rarity}/${item.itemName}.webp`} alt={item.itemName} /> : <><img className="item-image selected" src={`public/assets/${item.rarity}/${item.itemName}.webp`} alt={item.itemName} />  <span>x{itemStack[item.itemName]}</span></>)}</div> */}
      <div className="items-selected">
        {userItemStack.map((item) =>
          item.count < 2 ? (
            <img
              className="item-image selected"
              src={`public/assets/${item.itemStackRarity[0].rarity}/${item.item}.webp`}
              alt={item.item}
            />
          ) : (
            <>
              <img
                className="item-image selected"
                src={`public/assets/${item.itemStackRarity[0].rarity}/${item.item}.webp`}
                alt={item.item}
              />{" "}
              <span>x{itemStack[item.item]}</span>
            </>
          )
        )}
      </div>
      {!isEmpty(allItems.Common.items) ? (
        <MultiShopSelection
          setItemStack={setItemStack}
          allItems={allItems}
          handleItemSelection={handleItemSelection}
          userSelection={userSelection}
        />
      ) : null}
      {console.log(allItems)}
      {console.log(itemStack)}
    </>
  );
};

export default ItemSelection;
