import { useState } from "react";
import "./styles/App.css";
import SurvivorSelection from "./components/SurvivorSelection";
import { Survivor, UserSelection } from "./utilities/types";
import Instructions from "./components/Instructions";

//app level: rendering the individual steps of the flow and nothing else
function App() {
    const [userSelection, setUserSelection] = useState<UserSelection>({} as UserSelection) //*to store survivor selected by user, user id, and items selected by user

    
    
    console.log(userSelection)

    const handleSurvivorSelection = (survivor: Survivor) => {
      setUserSelection((prevUserSelection) => ({
        ...prevUserSelection,
        id: Date.now(),
        userSurvivor: survivor
      }));
    };

    return <>
      <Instructions />
      <SurvivorSelection handleSurvivorSelection={handleSurvivorSelection} />
    </>;
}

export default App;
