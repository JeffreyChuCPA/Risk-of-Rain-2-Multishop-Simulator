import { useState } from "react";
import { Items} from "../utilities/types";
import { DBItem } from "./StackCalculationDisplay";
import { playHoverSound } from "../utilities/fxFunctions";
import HoverInfo from "./OnHoverDisplay";

const ItemDisplay: React.FC<{
  item: Items | DBItem;
  className: string;
  handleItemSelection?: ((item: Items) => void) | undefined;
  playItemClickSound?: ((rarity: string) => Promise<void> | undefined) | undefined;
  hoverStyle: string
}> = ({ item, className, handleItemSelection, playItemClickSound, hoverStyle }) => {
  //*to track if item img is hovered on
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      <img
        className={className}
        src={`public/assets/${item.rarity}/${
          (item as DBItem)._id || (item as Items).itemName
        }.webp`}
        alt={`${(item as DBItem)._id || (item as Items).itemName}`}
        onMouseOver={() => {
          playHoverSound();
          handleMouseOver();
        }}
        onMouseOut={handleMouseOut}
        onClick={() => {
            handleItemSelection?.((item as Items));
            playItemClickSound?.(item.rarity);
          }}
      />
      {isHovering && <HoverInfo item={item} hoverStyle={hoverStyle} />}
    </>
  );
};

export default ItemDisplay;
