import { BodyType, CarbohydrateCycleClass, Gender } from "./constant";

export interface BodyMeta {
  /** 体重 */
  weight: number;
  /** 身高 */
  height: number;
  /** 年龄 */
  age: number;
  /** 性别 */
  gender: Gender;
  /** 身体胚型 */
  bodyType: BodyType;
}

export interface NutritionMeta {
  /** 碳水化合物 */
  carbohydrates: number;
  /** 脂肪 */
  fat: number;
  /** 蛋白质 */
  protein: number;
}

interface NutritionBase {
  /** 碳水基数 */
  carbohydrateBase: number;
  /** 脂肪基数 */
  fatBase: number;
  /** 蛋白质基数 */
  proteinBase: number;
}

interface NutritionRatio {
  /** 碳水比例 */
  carbohydrateRatio: number;
  /** 脂肪比例 */
  fatRatio: number;
  /** 蛋白质比例 */
  proteinRatio: number;
}

export interface CarbohydrateCycleNutritionRatio {
  /** 低碳 */
  [CarbohydrateCycleClass.low]: Omit<NutritionRatio, "proteinRatio"> & {
    days: number;
  };
  /** 中碳 */
  [CarbohydrateCycleClass.middle]: Omit<NutritionRatio, "proteinRatio"> & {
    days: number;
  };
  /** 高碳 */
  [CarbohydrateCycleClass.high]: Omit<NutritionRatio, "proteinRatio"> & {
    days: number;
  };
}

export type TrainVariables = {
  basicInfo: BodyMeta & {
    /** 目标体重 */
    targetWeight: number;
  };
  nutritionBase: NutritionBase;
  nutritionRatio: CarbohydrateCycleNutritionRatio;
};

export interface NutritionStat {
  /** 日 - 碳水 */
  dayCarbohydrate: number;
  /** 日 - 脂肪 */
  dayFat: number;
  /** 日 - 蛋白质 */
  dayProtein: number;
  /** 周 - 碳水 */
  weekCarbohydrate: number;
  /** 周 - 脂肪 */
  weekFat: number;
  /** 周 - 蛋白质 */
  weekProtein: number;
}
