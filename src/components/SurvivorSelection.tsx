import "../styles/survivor.css";
import { Survivor, UserSelection } from "../utilities/types";

export interface Props {
  selectedSurvivor: Survivor;
  survivorList: Survivor[];
  setSelectedSurvivor: React.Dispatch<React.SetStateAction<Survivor>>;
  setUserSelection: React.Dispatch<React.SetStateAction<UserSelection>>;
}

const SurvivorSelection = ({
  selectedSurvivor,
  survivorList,
  setSelectedSurvivor,
  setUserSelection
}: Props) => {

  console.log(selectedSurvivor);
  
  const handleSelection = (survivor: Survivor) => {
    setSelectedSurvivor(survivor)
    setUserSelection((prevUserSelection) => ({...prevUserSelection, id:Date.now(), userSurvivor: survivor}))
  }
  

  return (
    <>
      <div className="survivor-selection">
        {survivorList.map((survivor) => (
          <div className="survivor" key={survivor.id}>
            <img src={survivor.imageLink} alt={`image of ${survivor.name}`} onClick={() => handleSelection(survivor)} />{" "}
          </div>
        ))}
      </div>
    </>
    
  );
};

export default SurvivorSelection;
