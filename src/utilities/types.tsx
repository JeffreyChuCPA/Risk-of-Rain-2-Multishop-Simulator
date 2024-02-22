export interface Items {
  id: string;
  itemName: string;
  rarity: string;
  description: string;
  stackType: string;
}

export interface Survivor {
  id: string;
  name: string;
  imageLink: string;
}

export interface UserSelection {
  userID: number;
  userSurvivor: Survivor;
  userItems: Items[];
}