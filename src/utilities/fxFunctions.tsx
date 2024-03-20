import hover from "/assets/audio/hover.wav"
import click from "/assets/audio/menuClick.wav"
import ItemClickCommon from "/assets/audio/itemspawn-Common.wav"
import ItemClickUncommon from "/assets/audio/itemspawn-Uncommon.wav"
import ItemClickLegendary from "/assets/audio/itemspawn-Legendary.wav"

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
