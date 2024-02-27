import { useEffect, useState } from "react";
import { AllItems } from "./ItemSelection";
import { Items, UserSelection, itemRarities } from "../utilities/types";
import "../styles/items.css";
import { isEmpty } from "lodash";

const MultiShopSelection: React.FC<{
  allItems: AllItems;
  handleItemSelection: (item: Items) => void;
  userSelection: UserSelection;
  setItemStack: React.Dispatch<React.SetStateAction<Record<string, number>>>
}> = ({ allItems, handleItemSelection, userSelection, setItemStack }) => {
  const [multiShop, setMultiShop] = useState<Items[]>([]);

  useEffect(() => {
    const getRandomRarity = (): itemRarities => {
      const randomNumber: number = Math.floor(Math.random() * 100);
      if (randomNumber < 70) {
        return itemRarities.common;
      } else if (randomNumber < 95) {
        return itemRarities.uncommon;
      } else {
        return itemRarities.legendary;
      }
    };

    const getRandomItemIndex = (itemRarityArray: Items[]): number => {
      return Math.floor(Math.random() * itemRarityArray.length);
    };

    const populateMultiShop = (allItems: AllItems): Items[] => {
      const multiShopRarity = getRandomRarity();
      const rolledItems: Items[] = [];

      for (let i = 0; i < 3; i++) {
        const randomItemIndex = getRandomItemIndex(
          allItems[multiShopRarity].items
        );
        rolledItems.push(allItems[multiShopRarity].items[randomItemIndex]);
      }
      return rolledItems;
    };

    userSelection.userItems.length < 15
      ? setMultiShop(populateMultiShop(allItems))
      : setMultiShop([]);

    const updateUserItemStack = (userSelection: UserSelection): Record<string, number> => {
      const newItemStack: Record<string, number> = {};

      userSelection.userItems.forEach(item => {
        newItemStack[item.itemName] = (newItemStack[item.itemName] || 0) + 1;
      })

      return newItemStack
    }

    setItemStack(updateUserItemStack(userSelection))
    
  }, [allItems, userSelection]);

  useEffect(() => {
    console.log(multiShop);
    
  }, [multiShop]);

  return (
    <div className="container">
      {!isEmpty(multiShop) && (
        <div className="multishop-container">
          {multiShop.map((item, index) => (
            <div className="multishop">
              {" "}
              <div className="multishop-top"></div>
              <div className="multishop-cap"></div>
              <img
                className="item-image"
                key={`${item.id}+${index}`}
                src={`public/assets/${item.rarity}/${item.itemName}.webp`}
                alt={item.itemName}
                onClick={() => handleItemSelection(item)}
              />
              <div className="multishop-bottom"></div>
              <div className="multishop-bar"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiShopSelection;
