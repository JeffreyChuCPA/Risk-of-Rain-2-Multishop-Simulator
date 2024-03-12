import { DBItems } from "./StackCalculationDisplay"


const TopSelectedItems: React.FC<{
  dbItems: DBItems
}> = ({dbItems}) => {
  return (<>
      <div>{dbItems.Common.map((item, index) => 
        <li key={index}>Common: {item._id} Total Selected {item.count} </li>
      )}</div>
      <div>{dbItems.Uncommon.map((item, index) => 
        <li key={index}>Uncommon: {item._id} Total Selected {item.count} </li>
      )}</div>
      <div>{dbItems.Legendary.map((item, index) => 
        <li key={index}>Legendary: {item._id} Total Selected {item.count} </li>
      )}</div>
    </>
  )
}

export default TopSelectedItems