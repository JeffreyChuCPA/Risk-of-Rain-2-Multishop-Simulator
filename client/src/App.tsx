import { useState } from "react";
import SurvivorSelection from "./components/SurvivorSelection";
import { Items, Survivor, UserSelection } from "./utilities/types";
import Instructions from "./components/Instructions";
import ItemSelection from "./components/ItemSelection";
import map1 from '/assets/background/map-1.jpg'
import map2 from '/assets/background/map-2.jpg'
import map3 from '/assets/background/map-3.jpg'
import map4 from '/assets/background/map-4.jpg'
import map5 from '/assets/background/map-5.jpg'
import map6 from '/assets/background/map-6.jpg'
import map7 from '/assets/background/map-7.jpg'

//app level: rendering the individual steps of the flow and nothing else
function App() {
  //*to store survivor selected by user, user id, and items selected by user
  const [userSelection, setUserSelection] = useState<UserSelection>(
    {userID: 0,
    userSurvivor: {} as Survivor,
    userItems: []
  }
  ); 

  //*to store when the user has started the app
  const [start, setStart] = useState<boolean>(false)

  //*to store state of the background image
  const backgroundArray: string[] = [map1, map2, map3, map4, map5, map7]
  const initialBackground: string = map6
  const [backgroundImage, setBackgroundImage] = useState<string>(initialBackground)
  

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    overflow: 'hidden'
  }

  const randomIndex: number = Math.floor(Math.random() * backgroundArray.length)
  const selectedBackground: string = backgroundArray[randomIndex]



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
    setBackgroundImage(selectedBackground)
  };

  
  return (
    <>
      <div style={userSelection.userItems.length < 15 ? backgroundStyle : undefined}>
      {(userSelection.userSurvivor.id === undefined) ? (
        <>
          {" "}
          <div className="intro-container">
            <Instructions start={start} setStart={setStart}/>{" "}
            {start && <SurvivorSelection
              handleSurvivorSelection={handleSurvivorSelection}
            />}
          </div>
          
        </>
      ) : <ItemSelection handleItemSelection={handleItemSelection} userSelection={userSelection}/>}
      </div>
    </>
  );
}

export default App;
