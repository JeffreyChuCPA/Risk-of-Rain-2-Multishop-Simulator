import { Items, Survivor } from "../utilities/types"
import { DBItem } from "./StackCalculationDisplay"

const HoverInfo: React.FC<{item?: Items | DBItem, survivor?: Survivor, hoverStyle: string}> = ({item, survivor, hoverStyle}) => {

  return (
    <>
      {item ? <div className={hoverStyle}>
          <div className="title-hover">{(item as Items)?.itemName || (item as DBItem)?._id}</div>
          <div className="text-hover">{item?.description}</div>
        </div> : 
        <div className="survivor-hover">
        <div className="title-hover">{survivor?.name}</div>
        <div className="text-hover">Health: {survivor?.health}</div>
        <div className="text-hover">Health Regen: {survivor?.healthRegen}</div>
        <div className="text-hover">Damage: {survivor?.damage}</div>
        <div className="text-hover">Speed: {survivor?.speed}</div>
        <div className="text-hover">Armor: {survivor?.armor}</div>
        <div className="text-hover">Type: {survivor?.type}</div>
      </div>}
              </>
  )
}


export default HoverInfo