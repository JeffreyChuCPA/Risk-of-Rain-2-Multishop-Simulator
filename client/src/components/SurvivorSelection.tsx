import React, { useEffect, useState } from "react";
import "../styles/survivor.css";
import { Survivor } from "../utilities/types";
import urls from "../utilities/urls";
import SurvivorDisplay from "./SurvivorDisplay";
import LoadingDisplay from "./LoadingDisplay";


const SurvivorSelection: React.FC<{
  handleSurvivorSelection: (survivor: Survivor) => void;
}> = ({
  handleSurvivorSelection
}) => {
  //*to store list of survivors from API pull
  const [survivorList, setSurvivorList] = useState<Survivor[]>([]); 
  //*to track if in loading state from the API fetch
  const [isLoading, setIsLoading] = useState<boolean>(true)
  

  useEffect(() => {
    //*API fetching survivors
    const fetchSurvivors = async () => {
      try {
        const response = await fetch(urls.survivorsURL);
        if (response.ok) {
          const data = await response.json();
          const survivorData: Survivor[] = data.map( (survivor: {'_id': string, survivorName: string, survivorImage: string,   health: { $numberDecimal: string };
          healthRegen: { $numberDecimal: string };
          damage: { $numberDecimal: string };
          speed: { $numberDecimal: string };
          armor: { $numberDecimal: string }, type: string}) => ({
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
          setIsLoading(false)          
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
        {isLoading ? <LoadingDisplay/> : (
          survivorList.map((survivor: Survivor) => (
            <div className="survivor" key={survivor.id}>
              <SurvivorDisplay survivor={survivor} handleSurvivorSelection={() => handleSurvivorSelection(survivor)} hoverStyle="survivor-hover" />
            </div>
          ))
        )}
      </div>
  );
};

export default SurvivorSelection;
