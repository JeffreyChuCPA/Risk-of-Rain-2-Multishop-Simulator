import React, { useEffect, useState } from "react";
import "../styles/survivor.css";
import { Survivor } from "../utilities/types";
import urls from "../utilities/urls";
import { playClickSound, playHoverSound } from "../utilities/fxFunctions";


const SurvivorSelection: React.FC<{
  handleSurvivorSelection: (survivor: Survivor) => void;
}> = ({
  handleSurvivorSelection
}) => {
  //*to store list of survivors from API pull
  const [survivorList, setSurvivorList] = useState<Survivor[]>([]); 

  useEffect(() => {
    //*API fetching survivors
    const fetchSurvivors = async () => {
      try {
        const response = await fetch(urls.survivorsURL);
        if (response.ok) {
          const data = await response.json();
          const survivorData: Survivor[] = data.map( (survivor: {'_id': string, survivorName: string, survivorImage: string}) => ({
            id: survivor._id,
            name: survivor.survivorName,
            imageLink: survivor.survivorImage
          }))
          setSurvivorList(survivorData)
        } else {
          throw new Error("Failed to retrieve survivors")
        }
      } catch (error) {
        console.error("Error retrieving survivors", error)
      }
    };
    fetchSurvivors()
    ;
    
  }, [])



  return (
      <div className="survivor-selection">
        {survivorList.map((survivor: Survivor) => (
          <div className="survivor" key={survivor.id}>
            <img className="survivor-image"
              src={survivor.imageLink}
              alt={`image of ${survivor.name}`}
              onClick={() => {
                handleSurvivorSelection(survivor);
                playClickSound()
              }}
              onMouseOver={playHoverSound}
            />{" "}
          </div>
        ))}
      </div>
  );
};

export default SurvivorSelection;
