import { Items, Survivor } from "../utilities/types"

const HoverInfo: React.FC<{item: Items, survivor?: Survivor}> = ({item, survivor}) => {
  return (
    <>
    <div className="item-hover">
      <div className="title-hover">{item.itemName || item._id}</div>
      <div className="text-hover">{item.description}</div>
    </div>
    <div className="survivor-hover">
      <div>{survivor?.imageLink}</div>
    </div>
  </>
  )
}


export default HoverInfo