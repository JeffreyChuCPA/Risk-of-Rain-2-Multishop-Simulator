import { useState } from "react";
import { playHoverSound } from "../utilities/fxFunctions";
import { DBItems } from "./StackCalculationDisplay";
import HoverInfo from "./OnHoverDisplay";

const TopSelectedItems: React.FC<{
  dbItems: DBItems;
}> = ({ dbItems }) => {
  //*to track if item img is hovered on
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsHovering(true);
    console.log("hovering");
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    console.log("not hovering");
  };

  return (
    <>
      <div className="ranked-item-rarity">
        <span>Common</span>
        {dbItems.Common.map((item, index) => (
          // each ranked item should be a component
          <div className="ranked-item">
            <img
              className="ranked-item-image"
              src={`public/assets/${item.rarity}/${item._id}.webp`}
              alt={item._id}
              onMouseOver={() => {
                playHoverSound();
                handleMouseOver();
              }}
              onMouseOut={handleMouseOut}
            />
            {isHovering && <HoverInfo item={item} />}
            <li key={index}>Total Selected: {item.count} </li>
          </div>
        ))}
      </div>

      <div className="ranked-item-rarity">
        <span>Uncommon</span>
        {dbItems.Uncommon.map((item, index) => (
          <div className="ranked-item">
            <img
              className="ranked-item-image"
              src={`public/assets/${item.rarity}/${item._id}.webp`}
              alt={item._id}
              onMouseOver={() => {
                playHoverSound();
                handleMouseOver();
              }}
              onMouseOut={handleMouseOut}
            />
            {isHovering && <HoverInfo item={item} />}
            <li key={index}>Total Selected: {item.count} </li>
          </div>
        ))}
      </div>

      <div className="ranked-item-rarity">
        <span>Legendary</span>
        {dbItems.Legendary.map((item, index) => (
          <div className="ranked-item">
            <img
              className="ranked-item-image"
              src={`public/assets/${item.rarity}/${item._id}.webp`}
              alt={item._id}
              onMouseOver={() => {
                playHoverSound();
                handleMouseOver();
              }}
              onMouseOut={handleMouseOut}
            />
            {isHovering && <HoverInfo item={item} />}
            <li key={index}>Total Selected: {item.count} </li>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopSelectedItems;
