import { useRef, useState } from "react";
import { Items } from "../utilities/types";
import { DBItem } from "./StackCalculationDisplay";
import { playHoverSound } from "../utilities/fxFunctions";
import HoverInfo from "./OnHoverDisplay";
import "../styles/itemSelection.css";

interface Circle {
  x: number;
  y: number;
  key: number;
  completed: boolean;
  rarity: string;
}

const ItemDisplay: React.FC<{
  item: Items | DBItem;
  className: string;
  handleItemSelection?: ((item: Items) => void) | undefined;
  playItemClickSound?:
    | ((rarity: string) => Promise<void> | undefined)
    | undefined;
  hoverStyle: string;
  toSetAnimation: boolean;
}> = ({
  item,
  className,
  handleItemSelection,
  playItemClickSound,
  hoverStyle,
  toSetAnimation
}) => {
  //*to track if item img is hovered on
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const itemRarityAnimationColor = {
    Common: "white",
    Uncommon: "#7ABF49",
    Legendary: "#F36453"
  };

  const itemRarityAnimationSizeCircle = {
    Common: "30px",
    Uncommon: "40px",
    Legendary: "50px"
  };


  const itemRarityAnimationSizeLinePosition = {
    Common: 9.5,
    Uncommon: 15,
    Legendary: 19
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const animationRef = useRef<Circle[]>([]);

  const handleAnimationClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newCircle = {
      x,
      y,
      key: animationRef.current.length + 1,
      completed: false,
      rarity: item.rarity
    };
    animationRef.current.push(newCircle);

    setTimeout(() => {
      newCircle.completed = true;
    }, 1000); // Disappear after 1 second
  };

  return (
    <>
      <img
        className={`${className} animation-container`}
        src={`/assets/${item.rarity}/${
          (item as DBItem)._id || (item as Items).itemName
        }.webp`}
        alt={`${(item as DBItem)._id || (item as Items).itemName}`}
        onMouseOver={() => {
          playHoverSound();
          handleMouseOver();
        }}
        onMouseOut={handleMouseOut}
        onClick={(event) => {
          handleItemSelection?.(item as Items);
          playItemClickSound?.(item.rarity);
          {
            toSetAnimation ? handleAnimationClick(event) : null;
          }
        }}
      />
      {animationRef.current.map(
        (circle, index) =>
          !circle.completed && (
            <>
              <div
                key={`circle-${circle.key + index}`}
                id={`circle-${circle.key + index}`}
                className="circle "
                style={{
                  top: `${circle.y + 180}px`,
                  left: `${circle.x}px`,
                  backgroundColor:
                    itemRarityAnimationColor[
                      circle.rarity as keyof typeof itemRarityAnimationColor
                    ],
                  width:
                    itemRarityAnimationSizeCircle[
                      circle.rarity as keyof typeof itemRarityAnimationSizeCircle
                    ],
                  height:
                    itemRarityAnimationSizeCircle[
                      circle.rarity as keyof typeof itemRarityAnimationSizeCircle
                    ]
                }}
              >
                {" "}
              </div>
              <div
                className="line"
                key={`line-${circle.key + index}`}
                id={`line-${circle.key + index}`}
                style={{
                  top: `${circle.y + 180}px`,
                  left: `${
                    circle.x +
                    itemRarityAnimationSizeLinePosition[
                      circle.rarity as keyof typeof itemRarityAnimationSizeLinePosition
                    ]
                  }px`,
                  backgroundColor:
                    itemRarityAnimationColor[
                      circle.rarity as keyof typeof itemRarityAnimationColor
                    ]
                  // height: itemRarityAnimationSizeLine[circle.rarity as keyof typeof itemRarityAnimationSizeLine]
                }}
              ></div>
            </>
          )
      )}
      {isHovering && <HoverInfo item={item} hoverStyle={hoverStyle} />}
    </>
  );
};

export default ItemDisplay;
