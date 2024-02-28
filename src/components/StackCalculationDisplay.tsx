import React from "react"
import { Items } from "../utilities/types";
import "../styles/itemStackDisplay.css";


const StackCalculationDisplay: React.FC<{
  userItemStack: {item: string;
  count: number;
  userSelectedItems: Items[];
}[]}> = ({userItemStack}) => {

  //obtain the per stack values for the item  
  const getStackValue = (description: string):number[] => {
    const stackStringIndex: number[] = [];
    const perStackValues: number[] = [];
    let startIndex = 0;
    while (description.indexOf('(', startIndex) != -1) {
        stackStringIndex.push(description.indexOf('(', startIndex))
        startIndex = stackStringIndex[stackStringIndex.length - 1] + 1
        stackStringIndex.push(description.indexOf(')', startIndex))
    }
    for (let i = 0; i < stackStringIndex.length; i+=2) {
      // stackString.push((description.slice(stackIndex[i],stackIndex[i+1]+1).match(/(\d*\.\d+|\d+)/g)))
      const stackValue: RegExpMatchArray | null = (description.slice(stackStringIndex[i],stackStringIndex[i+1]+1).match(/(\d*\.\d+|\d+)/g))
      if (stackValue !== null) {
        stackValue.forEach(value => {
          perStackValues.push(parseFloat(value))
        })
      }
    }
    return perStackValues.flat();
  }

  //obtain the item stat value that the stack value is to affect
  const getItemStatValue= (description: string): number[] => {
    // This regex captures the numbers that are followed by any characters (excluding digits to avoid capturing part of another number) and eventually a "("
    const regex = /(\d+)\D+?\(/g;
    const itemStatValues: number[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(description)) !== null) {
        // We push the first capturing group, which is the number we're interested in
        itemStatValues.push(parseFloat(match[1]));
    }

    return itemStatValues;
}
  
  //to calculate the new item stat value based on the stack value and stack count of the item for non-special case items
  const getUpdatedItemStat = (item: Items, stack: number): number[] => {
    const itemStackValues: number[] = getStackValue(item.description);
    const itemStatValues: number[] = getItemStatValue(item.description);
    
    for (let i = 1; i <= stack; i++) {
      for (let j = 0; j < itemStatValues.length; i++) {
        itemStatValues[j] = itemStatValues[j] + itemStackValues[j]
      }
    }
    return itemStatValues
  }

  const updatedItemDescription = (item: Items, stack: number, description: string): string => {
    const updatedItemStats: number[] = getUpdatedItemStat(item, stack);
    console.log(updatedItemStats);
    
    const regex: RegExp = /(\d+)(\D+?\()/g;
    let currentIndex: number = 0;

    const replaceFunction = (match, p1, p2): string => {
      const newValue: number = updatedItemStats[currentIndex]
      currentIndex++;
      return `${newValue}${p2}`
    }
    console.log(description.replace(regex, replaceFunction));
    
    return description.replace(regex, replaceFunction)
  };

  return (
    <div className="results-container">
      {userItemStack.map((item) =>
      <div className="results-itemContainer">
        <img
          className="results-item"
          src={`public/assets/${item.userSelectedItems[0].rarity}/${item.item}.webp`}
          alt={item.item}
        />
        <span className="item-description">{updatedItemDescription(item.userSelectedItems[0], item.count, item.userSelectedItems[0].description)}</span>
        </div>
      )}
    </div>
  )
}

export default StackCalculationDisplay