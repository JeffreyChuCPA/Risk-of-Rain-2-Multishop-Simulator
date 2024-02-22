import { useEffect, useState } from "react";
import "./styles/App.css";
import SurvivorSelection from "./components/SurvivorSelection";
import urls from "./utilities/urls"
import { Survivor, UserSelection } from "./utilities/types";



function App() {
    const [survivorList, setsurvivorList] = useState<Survivor[]>([]); //*to store list of survivors from API pull
    const [selectedSurvivor, setSelectedSurvivor] = useState<Survivor>({} as Survivor); //*to store survivor selected by user
    const [userSelection, setUserSelection] = useState<UserSelection>({} as UserSelection)

    useEffect(() => {
      const fetchSurvivors = async () => {
        try {
          const response = await fetch(urls.survivorsURL);
          if (response.ok) {
            const data = await response.json();
            setsurvivorList(data)
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

    console.log(survivorList)

    return <>
      <SurvivorSelection selectedSurvivor={selectedSurvivor} survivorList={survivorList} setSelectedSurvivor={setSelectedSurvivor}/>
    </>;
}

export default App;
