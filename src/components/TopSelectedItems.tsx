import { DBItems } from "./StackCalculationDisplay";
import ItemDisplay from "./ItemDisplay";

const TopSelectedItems: React.FC<{
  dbItems: DBItems;
}> = ({ dbItems }) => {

  return (
    <>
      <div className="ranked-item-rarity">
        <span>Common</span>
        {dbItems.Common.map((item, index) => (
          <div className="ranked-item">
            <ItemDisplay item={item} className={"ranked-item-image"} hoverStyle="item-hover"/>
            <li key={index}>Total Selected: {item.count} </li>
          </div>
        ))}
      </div>

      <div className="ranked-item-rarity">
        <span>Uncommon</span>
        {dbItems.Uncommon.map((item, index) => (
          <div className="ranked-item">
            <ItemDisplay item={item} className={"ranked-item-image"} hoverStyle="item-hover"/>
            <li key={index}>Total Selected: {item.count} </li>
          </div>
        ))}
      </div>

      <div className="ranked-item-rarity">
        <span>Legendary</span>
        {dbItems.Legendary.map((item, index) => (
          <div className="ranked-item">
            <ItemDisplay item={item} className={"ranked-item-image"} hoverStyle="item-hover"/>
            <li key={index}>Total Selected: {item.count} </li>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopSelectedItems;
