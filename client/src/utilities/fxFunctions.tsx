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
    case "Uncommon": {
      const unCommonAudio = new Audio(ItemClickUncommon)
      unCommonAudio.volume = 0.9
      return unCommonAudio.play()}
    case "Legendary": {
      const legendaryAudio = new Audio(ItemClickLegendary)
      legendaryAudio.volume = 0.85
      return legendaryAudio.play()}
  }
}
