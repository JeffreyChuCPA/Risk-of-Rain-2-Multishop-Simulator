import { DBItems } from "./StackCalculationDisplay"


const TopSelectedItems: React.FC<{
  dbItems: DBItems
}> = ({dbItems}) => {
  return (<>
      <div className="ranked-item-rarity"><span>Common</span>{dbItems.Common.map((item, index) =>
        <div className="ranked-item">
          <img
            className="ranked-item-image"
            src={`public/assets/${item.rarity}/${item._id}.webp`}
            alt={item._id}
          />
          <li key={index}>Total Selected: {item.count} </li>
        </div>
      )}</div>
      <div className="ranked-item-rarity"><span>Uncommon</span>{dbItems.Uncommon.map((item, index) =>
        <div className="ranked-item">
          <img
            className="ranked-item-image"
            src={`public/assets/${item.rarity}/${item._id}.webp`}
            alt={item._id}
          />
          <li key={index}>Total Selected: {item.count} </li>
        </div>
      )}</div>
      <div className="ranked-item-rarity"><span>Legendary</span>{dbItems.Legendary.map((item, index) =>
        <div className="ranked-item">
          <img
            className="ranked-item-image"
            src={`public/assets/${item.rarity}/${item._id}.webp`}
            alt={item._id}
          />
          <li key={index}>Total Selected: {item.count} </li>
        </div>
      )}</div>
    </>
  )
}

export default TopSelectedItems