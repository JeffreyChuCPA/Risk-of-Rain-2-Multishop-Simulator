import hover from "../../public/assets/audio/hover.wav"
import click from "../../public/assets/audio/menuClick.wav"
import ItemClickCommon from "../../public/assets/audio/itemspawn-Common.wav"
import ItemClickUncommon from "../../public/assets/audio/itemspawn-Uncommon.wav"
import ItemClickLegendary from "../../public/assets/audio/itemspawn-Legendary.wav"

export const playHoverSound = () => {
  new Audio(hover).play()
}

export const playClickSound = () => {
  new Audio(click).play()
}

export const playItemClickSound = (rarity: string) => {
  switch (rarity) {
    case "Common": return new Audio(ItemClickCommon).play()
    case "Uncommon": return new Audio(ItemClickUncommon).play()
    case "Legendary": return new Audio(ItemClickLegendary).play()
  }
}
