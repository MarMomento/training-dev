export enum Gender {
  /** 男性 */
  Male = "Male",
  /** 女性 */
  Female = "Female",
}

export const GENDER_OPTIONS = [
  { value: Gender.Male, label: "男" },
  { value: Gender.Female, label: "女" },
];

export enum BodyType {
  /** 外胚型 */
  Ectomorph = "Ectomorph",
  /** 中胚型 */
  Mesomorph = "Mesomorph",
  /** 内胚型 */
  Endomorph = "Endomorph",
}

export const BODY_TYPE_OPTIONS = [
  { value: BodyType.Ectomorph, label: "外胚型" },
  { value: BodyType.Mesomorph, label: "中胚型" },
  { value: BodyType.Endomorph, label: "内胚型" },
];

export const NUTRITION_BASE = {
  [BodyType.Ectomorph]: {
    CARBOHYDRATE: 3,
    FAT: 1,
    PROTEIN: 1.2,
  },
  [BodyType.Endomorph]: {
    CARBOHYDRATE: 2,
    FAT: 0.8,
    PROTEIN: 1.2,
  },
};

export enum CarbohydrateCycleClass {
  low = "low",
  middle = "middle",
  high = "high",
}

export const NUTRITION_RATIO = {
  [CarbohydrateCycleClass.low]: {
    CARBOHYDRATE: 15,
    FAT: 50,
    DAY: 2,
  },
  [CarbohydrateCycleClass.middle]: {
    CARBOHYDRATE: 35,
    FAT: 35,
    DAY: 3,
  },
  [CarbohydrateCycleClass.high]: {
    CARBOHYDRATE: 50,
    FAT: 15,
    DAY: 2,
  },
};

export const CARBOHYDRATE_CYCLE_CLASS_OPTIONS = [
  { label: "低碳日", value: CarbohydrateCycleClass.low },
  { label: "中碳日", value: CarbohydrateCycleClass.middle },
  { label: "高碳日", value: CarbohydrateCycleClass.high },
];

export enum StatMeta {
  /** 碳水化合物 */
  carbohydrates = "carbohydrates",
  /** 脂肪 */
  fat = "fat",
  /** 蛋白质 */
  protein = "protein",
  /** 热量 */
  calories = "calories",
}

export const STAT_OPTIONS = [
  {
    label: "碳水(g)",
    value: StatMeta.carbohydrates,
  },
  {
    label: "脂肪(g)",
    value: StatMeta.fat,
  },
  {
    label: "蛋白质(g)",
    value: StatMeta.protein,
  },
  {
    label: "热量(kcal)",
    value: StatMeta.calories,
  },
];

export enum Day {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export const NUTRITION_ENERGY = {
  carbohydrates: 4,
  fat: 9,
  protein: 4,
};
