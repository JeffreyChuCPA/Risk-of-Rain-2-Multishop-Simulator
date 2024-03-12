import React, { useEffect, useState } from "react";
import { Items, UserSelection, itemRarities } from "../utilities/types";
import "../styles/itemStackDisplay.css";
import { specialCalcItems } from "../utilities/itemsToRemove";
import { updatedSpecialCaseItemDescription } from "../utilities/specialItemCalc";
import TopSelectedItems from "./TopSelectedItems";

export type DBItem = {
  _id: string;
  count: number;
};

export type DBItems = {
  [itemRarity in itemRarities]: DBItem[];
};

const StackCalculationDisplay: React.FC<{
  userItemStack: { item: string; count: number; userSelectedItems: Items[] }[];
  userSelection: UserSelection;
}> = ({ userItemStack, userSelection }) => {
  const [topItems, setTopItems] = useState<DBItems>({
    Common: [],
    Uncommon: [],
    Legendary: []
  });

  const [topSurvivorItems, setTopSurvivorItems] = useState<DBItems>({
    Common: [],
    Uncommon: [],
    Legendary: []
  });

  useEffect(() => {
    const postItems = async (userSelection: UserSelection) => {
      try {
        const response = await fetch("http://localhost:5000/api/results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userSelection)
        });

        const result = await response.json();
        console.log("Success", result);
        getItems(userSelection.userSurvivor.name)
      } catch (error) {
        console.error("Error in posting items", error);
      }
    };

    const getItems = async (survivor: string) => {
      try {
        const response = await fetch(`http://localhost:5000/api/results/${survivor}`)
        const results = await response.json();
        console.log(results);
        

        setTopItems({
          Common: results.commonItems,
          Uncommon: results.uncommonItems,
          Legendary: results.legendaryItems
        })

        setTopSurvivorItems({
          Common: results.commonSurvivorItems,
          Uncommon: results.uncommonSurvivorItems,
          Legendary: results.legendarySurvivorItems
        })

      } catch (error) {
        console.error("Error in getting items", error);
        
      }
    }

    postItems(userSelection);
  }, []);

  //*obtain the per stack values for the item from within the "( )" in the item description
  const getStackValue = (description: string): number[] => {
    const stackStringIndex: number[] = [];
    const perStackValues: number[] = [];
    let startIndex = 0;
    while (description.indexOf("(", startIndex) != -1) {
      stackStringIndex.push(description.indexOf("(", startIndex));
      startIndex = stackStringIndex[stackStringIndex.length - 1] + 1;
      stackStringIndex.push(description.indexOf(")", startIndex));
    }
    for (let i = 0; i < stackStringIndex.length; i += 2) {
      // stackString.push((description.slice(stackIndex[i],stackIndex[i+1]+1).match(/(\d*\.\d+|\d+)/g)))
      const stackValue: RegExpMatchArray | null = description
        .slice(stackStringIndex[i], stackStringIndex[i + 1] + 1)
        .match(/(\d*\.\d+|\d+)/g);
      if (stackValue !== null) {
        stackValue.forEach((value) => {
          perStackValues.push(parseFloat(value));
        });
      }
    }
    return perStackValues.flat();
  };

  //*obtain the item stat value that the stack value is to affect, from the closest number that is to the left of each "("
  const getItemStatValue = (description: string): number[] => {
    // This regex captures the numbers that are followed by any characters (excluding digits to avoid capturing part of another number) and eventually a "("
    const regex = /(\d+(?:\.\d+)?)\D*?\(/g;
    const itemStatValues: number[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(description)) !== null) {
      // Push the first capturing group, which is the number we're interested in
      itemStatValues.push(parseFloat(match[1]));
    }

    return itemStatValues;
  };

  //*to calculate the new item stat value based on the stack value and stack count of the item for non-special case items
  const getUpdatedItemStat = (item: Items, stack: number): number[] => {
    const itemStackValues: number[] = getStackValue(item.description);
    // console.log(itemStackValues);

    const itemStatValues: number[] = getItemStatValue(item.description);
    // console.log(itemStatValues);

    const updatedStatValue: number[] = [];
    // console.log(stack, itemStackValues.length);

    if (stack > 1) {
      for (let i = 0; i <= itemStatValues.length; i++) {
        updatedStatValue.push(
          itemStatValues[i] + itemStackValues[i] * (stack - 1)
        );
      }
    } else {
      itemStatValues.forEach((value) => updatedStatValue.push(value));
    }

    return updatedStatValue;
  };

  //*to update the item description based on the item stack/count based on using regex to find the specific item stat value to replace with the new value
  const updatedItemDescription = (
    item: Items,
    stack: number,
    description: string
  ): string => {
    const updatedItemStats: number[] = getUpdatedItemStat(item, stack);
    console.log(updatedItemStats);

    const regex = /(\b\d+\.?\d*)([a-zA-Z%\/]*)(?=\s*\()/g;
    let currentIndex = 0;

    const replaceFunction = (match: string, p1: string, unitPart: string) => {
      if (currentIndex < updatedItemStats.length) {
        const newValue: number = updatedItemStats[currentIndex];
        currentIndex++;
        return `${newValue}${unitPart}`;
      }
      return match;
    };

    return description.replace(regex, replaceFunction);
  };

  return (
    <>
      <div className="results-container">
        {userItemStack.map((item) => {
          return (
            <div className="results-itemContainer">
              <div className="results-itemIcon">
                <img
                  className="results-item"
                  src={`public/assets/${item.userSelectedItems[0].rarity}/${item.item}.webp`}
                  alt={item.item}
                />
                <span className="stack-count">
                  {item.count > 1 ? `x${item.count}` : null}
                </span>
              </div>
              <span className="item-description">
                {!specialCalcItems.includes(item.item)
                  ? updatedItemDescription(
                      item.userSelectedItems[0],
                      item.count,
                      item.userSelectedItems[0].description
                    )
                  : updatedSpecialCaseItemDescription(
                      item.userSelectedItems[0],
                      item.count,
                      item.userSelectedItems[0].description
                    )}
              </span>
            </div>
          );
        })}
      </div>
      <TopSelectedItems dbItems={topItems}/>
      <TopSelectedItems dbItems={topSurvivorItems} />
    </>
  );
};

export default StackCalculationDisplay;
