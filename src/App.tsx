import { useState } from "react";
import "./styles/App.css";
import SurvivorSelection from "./components/SurvivorSelection";
import { Items, Survivor, UserSelection } from "./utilities/types";
import Instructions from "./components/Instructions";
import ItemSelection from "./components/ItemSelection";

//app level: rendering the individual steps of the flow and nothing else
function App() {
  //*to store survivor selected by user, user id, and items selected by user
  const [userSelection, setUserSelection] = useState<UserSelection>(
    {userID: 0,
    userSurvivor: {} as Survivor,
    userItems: []
  }
  ); 

  console.log(userSelection);

  //*onClick handler for selecting survivor
  const handleSurvivorSelection = (survivor: Survivor) => {
    setUserSelection((prevUserSelection) => ({
      ...prevUserSelection,
      userID: Date.now(),
      userSurvivor: survivor
    }));
  };

  //*onClick handler for selecting items
  const handleItemSelection = (item: Items) => {
    setUserSelection((prevUserSelection) => ({
      ...prevUserSelection,
      userItems: [...prevUserSelection.userItems, item]
    }))
  };


  return (
    <>
      {(userSelection.userSurvivor.id === undefined) ? (
        <>
          {" "}
          <Instructions />{" "}
          <SurvivorSelection
            handleSurvivorSelection={handleSurvivorSelection}
          />
        </>
      ) : <ItemSelection handleItemSelection={handleItemSelection} userSelection={userSelection}/>}
    </>
  );
}

export default App;
