import "../styles/instructions.css";
import { playClickSound, playHoverSound } from "../utilities/fxFunctions";

const Instructions: React.FC<{
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ start, setStart }) => {
  return (
    <div className="instructions">
      <span className="instructions-title">Multishop Terminal Simulator</span>
      <div className="instructions-intro">
        Welcome to the Risk of Rain 2 Multishop Terminal Simulator! Here is how
        to start:
      </div>
      <br />
      <li className="instructions-list">1. Select your survivor</li>
      <li className="instructions-list">
        2. Select 15 items from the Multishop Terminal for your build
      </li>
      <li className="instructions-list">
        3. See how your collected items compare to other players
      </li>
      {!start && (
        <button className="instructions-btn" onMouseOver={() => playHoverSound()} onClick={() => {setStart(true); playClickSound()}}>
          Ready
        </button>
      )}
    </div>
  );
};

export default Instructions;
