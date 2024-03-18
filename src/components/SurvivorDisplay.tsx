import { useState } from "react";
import { Survivor } from "../utilities/types";
import { playClickSound, playHoverSound } from "../utilities/fxFunctions";
import HoverInfo from "./OnHoverDisplay";

const SurvivorDisplay: React.FC<{
  survivor: Survivor;
  handleSurvivorSelection?: ((survivor: Survivor) => void) | undefined;
  hoverStyle: string;
}> = ({ survivor, handleSurvivorSelection, hoverStyle }) => {
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
        className="survivor-image"
        src={survivor.imageLink}
        alt={`image of ${survivor.name}`}
        onMouseOver={() => {
          playHoverSound();
          handleMouseOver();
        }}
        onMouseOut={handleMouseOut}
        onClick={() => {
          handleSurvivorSelection?.(survivor);
          playClickSound()
        }}
      />
      {isHovering && <HoverInfo survivor={survivor} hoverStyle={hoverStyle} />}
    </>
  );
};

export default SurvivorDisplay;
