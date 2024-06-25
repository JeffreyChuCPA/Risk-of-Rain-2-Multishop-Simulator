import { specialCalcItems } from "../utilities/itemsToRemove";
import { Items } from "./types";

//*to define the update description for the special case items
export const updatedSpecialCaseItemDescription = (
  item: Items,
  stack: number,
  description: string
): string => {
  switch (item.itemName) {
    case specialCalcItems[0]:
      return `${description} ${stack} use(s)`;
    case specialCalcItems[1]:
      return `${description} ${stack} use(s)`;
    case specialCalcItems[2]:
      return `Increases attack speed by ${15 * stack}% (+15% per stack).`;
    case specialCalcItems[3]: {
      const chance: number = Math.round((0.05 * stack) / (0.05 * stack + 1)*100);
      return `${chance}% (+5% on stack) chance on hit to stun enemies for 2 seconds.`;
    }
    case specialCalcItems[4]: {
      const chance = Math.round((1 - 1 / (1 + stack) ** 0.33)*100);
      return `${stack > 1 ? chance : `18`}% (+10% per stack) chance on kill to drop an ammo pack that resets all skill cooldowns.`;
    }
    case specialCalcItems[5]: {
      const cooldownChance = Math.round((1 - (1 - 0.15) ** stack)*100);
      return `Hold an additional equipment charge (+1 per stack) for a total of ${stack} charge(s). Reduce equipment cooldown by ${cooldownChance}% (+15% per stack).`;
    }
    case specialCalcItems[6]: {
      const cooldown = Math.round(30 * 0.5 ** stack);
      return `Falling below 25% health causes you to gain 40% movement speed and invisibility for 5s. Recharges every ${cooldown} seconds (-50% per stack).`;
    }
    case specialCalcItems[7]: {
      const chance = Math.round((0.13 * stack) / (0.13 * stack + 1)*100);
      return `Instantly kill Elite monsters below ${stack > 1 ? chance : `13%`}% (+13% per stack) health.`;
    }
    case specialCalcItems[8]: {
      const legendaryChance = Math.round((0.01 * stack ** 2)*100);
      const unCommonChance = Math.round((0.2 * stack)*100);
      const commonChance = Math.round((100 - unCommonChance - legendaryChance));
      return `A delivery containing 2 items (${commonChance}%/${unCommonChance}%/${legendaryChance}%) will appear in a random location on each stage. (Increases rarity chances of the items per stack).`;
    }
    case specialCalcItems[9]: {
      const cooldown = Math.round(100 - (0.75 ** stack)*100);
      return `Reduce skill cooldowns by ${cooldown}% (+25% per stack).`;
    }
    case specialCalcItems[10]:
      return `Upon death, this item will be consumed and you will return to life with 3 seconds of invulnerability. ${stack} use(s)`;
    case specialCalcItems[11]: {
      const cooldown = Math.round(10 / stack);
      return `Increase jump height. Creates a 5m-100m radius kinetic explosion on hitting the ground, dealing 1000%-10000% base damage that scales up with fall distance. Recharges in ${cooldown} (-50% per stack) seconds.`;
    }
    case specialCalcItems[12]: {
      const chance = Math.round((0.15 * stack) / (0.15 * stack + 1)*100);
      return `${stack > 1 ? chance: `15%`} (+15% per stack) chance to block incoming damage. Unaffected by luck.`;
    }
    default:
      return description;
  }
};
