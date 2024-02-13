import { useEffect, useState } from "react";
import "./styles/App.css";
import SurvivorSelection from "./components/SurvivorSelection";
import urls from "./utilities/urls"

export interface Items {
    id: string;
    itemName: string;
    rarity: string;
    description: string;
    stackType: string;
}

export interface Survivor {
    id: string;
    name: string;
    imageLink: string;
}

function App() {
    const [survivorList, setsurvivorList] = useState<Survivor[]>([]);
    const [selectedSurvivor, setSelectedSurvivor] = useState<Survivor>({} as Survivor);

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
    }, [])

    return <>
      <SurvivorSelection selectedSurvivor={selectedSurvivor} survivorList={survivorList} setSelectedSurvivor={setSelectedSurvivor}/>
    </>;
}

export default App;
