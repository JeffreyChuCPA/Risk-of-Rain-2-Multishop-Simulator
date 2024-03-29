import React, { useEffect, useState } from "react";
import { Items, UserSelection, itemRarities } from "../utilities/types";
import "../styles/itemStackDisplay.css";
import { specialCalcItems } from "../utilities/itemsToRemove";
import { updatedSpecialCaseItemDescription } from "../utilities/specialItemCalc";
import TopSelectedItems from "./TopSelectedItems";
import { playClickSound, playHoverSound } from "../utilities/fxFunctions";
import LoadingDisplay from "./LoadingDisplay";

export type DBItem = {
  _id: string;
  count: number;
  rarity: string;
  description: string;
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

  //*to track if in loading state from the API fetch
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiURL =
      process.env.NODE_ENV === "production"
        ? `${import.meta.env.VITE_SERVER_URL}`
        : "http://localhost:5000";

    const postItems = async (userSelection: UserSelection) => {
      try {
        const response = await fetch(`${apiURL}/api/results`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userSelection)
        });

        const result = await response.json();
        console.log("Success", result);
        getItems(userSelection.userSurvivor.name);
      } catch (error) {
        console.error("Error in posting items", error);
      }
    };

    const getItems = async (survivor: string) => {
      try {
        const response = await fetch(`${apiURL}/api/results/${survivor}`);
        const results = await response.json();
        setIsLoading(false);

        setTopItems({
          Common: results.commonItems,
          Uncommon: results.uncommonItems,
          Legendary: results.legendaryItems
        });

        setTopSurvivorItems({
          Common: results.commonSurvivorItems,
          Uncommon: results.uncommonSurvivorItems,
          Legendary: results.legendarySurvivorItems
        });
      } catch (error) {
        console.error("Error in getting items", error);
      }
    };

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

    const itemStatValues: number[] = getItemStatValue(item.description);

    const updatedStatValue: number[] = [];

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

    const regex = /(\b\d+\.?\d*)([a-zA-Z%\/]*)(?=\s*\()/g;
    let currentIndex = 0;

    const replaceFunction = (match: string, _p1: string, unitPart: string) => {
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
      <div className="results-title">
        Items Collected{" "}
        <a
          className="results-github-link"
          href="https://github.com/JeffreyChuCPA/Risk-of-Rain-2-Multishop-Simulator"
          target="_blank"
        >
          <img
            className="results-github-icon"
            src="/assets/github-icon.png"
            title="GitHub"
            alt="github"
          />
          <span className="results-github-text">GitHub</span>
        </a>
      </div>
      <div className="results-container">
        {userItemStack.map((item) => {
          return (
            <div className="results-itemContainer">
              <div className="results-itemIcon">
                <img
                  className="results-item"
                  src={`/assets/${item.userSelectedItems[0].rarity}/${item.item}.webp`}
                  alt={item.item}
                  onMouseOver={playHoverSound}
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
      <div className="new-results-container">
        <div className="sub-container">
          <div className="title">Top 5 Overall Selected Items</div>
          {isLoading ? (
            <LoadingDisplay />
          ) : (
            <div className="top-results-container">
              <TopSelectedItems dbItems={topItems} />
            </div>
          )}
        </div>
        <div className="sub-container">
          <div className="title">Top 5 Selected Items for
            <img
              className="results-survivor-image"
              src={userSelection.userSurvivor.imageLink}
              alt={`image of ${userSelection.userSurvivor.name}`}
              onMouseOver={playHoverSound}
            />
          </div>
          {isLoading ? (
            <LoadingDisplay />
          ) : (
            <div className="top-results-container">
              <TopSelectedItems dbItems={topSurvivorItems} />
            </div>
          )}
        </div>
      </div>
      <div className="refresh">
        <button
          className="instructions-btn"
          onMouseOver={() => playHoverSound()}
          onClick={() => {playClickSound(); window.location.reload()}}
        >
          Redeploy
        </button>
      </div>
    </>
  );
};

export default StackCalculationDisplay;
