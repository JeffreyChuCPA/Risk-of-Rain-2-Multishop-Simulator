import { useState } from "react";
import "./styles/App.css";
import SurvivorSelection from "./components/SurvivorSelection";
import { Items, Survivor, UserSelection } from "./utilities/types";
import Instructions from "./components/Instructions";
import ItemSelection from "./components/ItemSelection";

//app level: rendering the individual steps of the flow and nothing else
function App() {
  const [userSelection, setUserSelection] = useState<UserSelection>(
    {userID: 0,
    userSurvivor: {} as Survivor,
    userItems: []
  }
  ); //*to store survivor selected by user, user id, and items selected by user

  const [numberOfItemsSelected, setNumberOfItemsSelected] = useState<number>(0)

  console.log(userSelection);

  const handleSurvivorSelection = (survivor: Survivor) => {
    setUserSelection((prevUserSelection) => ({
      ...prevUserSelection,
      userID: Date.now(),
      userSurvivor: survivor
    }));
  };

  const handleItemSelection = (item: Items) => {
    setUserSelection((prevUserSelection) => ({
      ...prevUserSelection,
      userItems: [...prevUserSelection.userItems, item]
    }))
    setNumberOfItemsSelected(prev => prev + 1)
  };

  return (
    <>
      {userSelection.userID === 0 ? (
        <>
          {" "}
          <Instructions />{" "}
          <SurvivorSelection
            handleSurvivorSelection={handleSurvivorSelection}
          />
        </>
      ) : <ItemSelection handleItemSelection={handleItemSelection} numberOfItemsSelected={numberOfItemsSelected}/>}
    </>
  );
}

export default App;
