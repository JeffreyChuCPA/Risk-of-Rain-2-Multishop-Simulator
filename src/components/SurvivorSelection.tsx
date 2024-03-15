import React, { useEffect, useState } from "react";
import "../styles/survivor.css";
import { Survivor } from "../utilities/types";
import urls from "../utilities/urls";
import SurvivorDisplay from "./SurvivorDisplay";


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
          const survivorData: Survivor[] = data.map( (survivor: {'_id': string, survivorName: string, survivorImage: string, health: { value: string}, healthRegen: { value: string}, damage: { value: string}, speed: { value: string}, armor: { value: string}, type: string}) => ({
            id: survivor._id,
            name: survivor.survivorName,
            imageLink: survivor.survivorImage,
            health: survivor.health.$numberDecimal,
            healthRegen: survivor.healthRegen.$numberDecimal,
            damage: survivor.damage.$numberDecimal,
            speed: survivor.speed.$numberDecimal,
            armor: survivor.armor.$numberDecimal,
            type: survivor.type
          }))
          setSurvivorList(survivorData)
          console.log(survivorData);
          
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
            <SurvivorDisplay survivor={survivor} handleSurvivorSelection={() => handleSurvivorSelection(survivor)} hoverStyle="survivor-hover" />
            {/* <img className="survivor-image"
              src={survivor.imageLink}
              alt={`image of ${survivor.name}`}
              onClick={() => {
                handleSurvivorSelection(survivor);
                playClickSound()
              }}
              onMouseOver={playHoverSound}
            />{" "} */}
          </div>
        ))}
      </div>
  );
};

export default SurvivorSelection;
