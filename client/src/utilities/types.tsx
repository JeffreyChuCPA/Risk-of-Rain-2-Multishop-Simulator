export enum itemRarities {
  common = "Common",
  uncommon = "Uncommon",
  legendary = "Legendary"
}

export enum stackTypes {
  linear = "Linear",
  hyperbolic = "Hyperbolic",
  none = "None",
  special = "Special"
}

export interface Items {
  id: string;
  itemName: string;
  rarity: keyof typeof itemRarities;
  description: string;
  stackType: keyof typeof stackTypes;
  itemImage: string;
}

export interface Survivor {
  id: string;
  name: string;
  imageLink: string;
  health: string;
  healthRegen: string;
  damage: string;
  speed: string;
  armor: string;
  type: string
}

export interface UserSelection {
  userID: number;
  userSurvivor: Survivor;
  userItems: Items[];
}