import { Survivor } from "../App";

export interface Props {
    selectedSurvivor: Survivor;
    survivorList: Survivor[];
    setSelectedSurvivor: React.Dispatch<React.SetStateAction<Survivor>>
}

const SurvivorSelection = ({ selectedSurvivor, survivorList, setSelectedSurvivor }: Props) => {
    return <div className="survivor-selection">{
      survivorList.map( (survivor) => <div className="survivor">{survivor.name}</div>)
    }</div>;
};

export default SurvivorSelection;
