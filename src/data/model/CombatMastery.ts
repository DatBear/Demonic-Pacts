import CombatStyle from "./CombatStyle";

type CombatMastery = {
  name: string;
  image: string;
  style: CombatStyle;
  level: number;
  description: string;
};

export default CombatMastery;