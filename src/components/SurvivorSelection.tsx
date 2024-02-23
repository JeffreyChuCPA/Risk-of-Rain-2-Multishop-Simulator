import React from "react";
import "../styles/survivor.css";
import { Survivor } from "../utilities/types";

const SurvivorSelection: React.FC<{
  survivorList: Survivor[];
  handleSurvivorSelection: (survivor: Survivor) => void;
}> = ({
  survivorList,
  handleSurvivorSelection
  // setUserSelection,
}) => {


  return (
      <div className="survivor-selection">
        {survivorList.map((survivor: Survivor) => (
          <div className="survivor" key={survivor.id}>
            <img
              src={survivor.imageLink}
              alt={`image of ${survivor.name}`}
              onClick={() => handleSurvivorSelection(survivor)}
            />{" "}
          </div>
        ))}
      </div>
  );
};

export default SurvivorSelection;
