"use client";

import {
  Card,
  Col,
  Form,
  InputNumber,
  List,
  Radio,
  Row,
  Select,
  Space,
  Statistic,
  Table,
} from "antd";

import { useEffect } from "react";
import {
  BODY_TYPE_OPTIONS,
  BodyType,
  CARBOHYDRATE_CYCLE_CLASS_OPTIONS,
  CarbohydrateCycleClass,
  Day,
  GENDER_OPTIONS,
  NUTRITION_BASE,
  NUTRITION_ENERGY,
  NUTRITION_RATIO,
  STAT_OPTIONS,
  StatMeta,
  Gender,
  ACTIVITY_COEFFICIENT_OPTIONS,
} from "./lib/constant";
import { NutritionStat, TrainVariables } from "./lib/type";
import { getLocalStorage, setLocalStorage } from "./lib/storage";

export default function Home() {
  const [form] = Form.useForm<TrainVariables>();

  const bodyType = Form.useWatch(["basicInfo", "bodyType"], form);
  const weight = Form.useWatch(["basicInfo", "weight"], form);
  const age = Form.useWatch(["basicInfo", "age"], form);
  const gender = Form.useWatch(["basicInfo", "gender"], form);
  const activityCoefficient = Form.useWatch(
    ["basicInfo", "activityCoefficient"],
    form
  );
  const height = Form.useWatch(["basicInfo", "height"], form);
  const targetWeight = Form.useWatch(["basicInfo", "targetWeight"], form);
  const carbohydrateBase = Form.useWatch(
    ["nutritionBase", "carbohydrateBase"],
    form
  );
  const fatBase = Form.useWatch(["nutritionBase", "fatBase"], form);
  const proteinBase = Form.useWatch(["nutritionBase", "proteinBase"], form);
  const lowCarbohydrateRatio = Form.useWatch(
    ["nutritionRatio", CarbohydrateCycleClass.low, "carbohydrateRatio"],
    form
  );
  const lowFatRatio = Form.useWatch(
    ["nutritionRatio", CarbohydrateCycleClass.low, "fatRatio"],
    form
  );
  const lowDays = Form.useWatch(
    ["nutritionRatio", CarbohydrateCycleClass.low, "days"],
    form
  );
  const middleCarbohydrateRatio = Form.useWatch(
    ["nutritionRatio", CarbohydrateCycleClass.middle, "carbohydrateRatio"],
    form
  );
  const middleFatRatio = Form.useWatch(
    ["nutritionRatio", CarbohydrateCycleClass.middle, "fatRatio"],
    form
  );
  const middleDays = Form.useWatch(
    ["nutritionRatio", CarbohydrateCycleClass.middle, "days"],
    form
  );
  const highCarbohydrateRatio = Form.useWatch(
    ["nutritionRatio", CarbohydrateCycleClass.high, "carbohydrateRatio"],
    form
  );
  const highFatRatio = Form.useWatch(
    ["nutritionRatio", CarbohydrateCycleClass.high, "fatRatio"],
    form
  );
  const highDays = Form.useWatch(
    ["nutritionRatio", CarbohydrateCycleClass.high, "days"],
    form
  );

  useEffect(() => {
    const value = JSON.parse(getLocalStorage("bodyData") || "{}");
    form.setFieldsValue(value);
  }, [form]);

  useEffect(() => {
    switch (bodyType) {
      case BodyType.Ectomorph:
      case BodyType.Endomorph:
        form.setFieldValue(
          ["nutritionBase", "carbohydrateBase"],
          NUTRITION_BASE[bodyType].CARBOHYDRATE
        );
        form.setFieldValue(
          ["nutritionBase", "fatBase"],
          NUTRITION_BASE[bodyType].FAT
        );
        form.setFieldValue(
          ["nutritionBase", "proteinBase"],
          NUTRITION_BASE[bodyType].PROTEIN
        );

        [
          CarbohydrateCycleClass.low,
          CarbohydrateCycleClass.middle,
          CarbohydrateCycleClass.high,
        ].forEach((key) => {
          form.setFieldValue(
            ["nutritionRatio", key, "carbohydrateRatio"],
            NUTRITION_RATIO[key].CARBOHYDRATE
          );
          form.setFieldValue(
            ["nutritionRatio", key, "fatRatio"],
            NUTRITION_RATIO[key].FAT
          );
          form.setFieldValue(
            ["nutritionRatio", key, "days"],
            NUTRITION_RATIO[key].DAY
          );
        });

        break;
      default:
        break;
    }
  }, [bodyType, form]);

  const nutritionStat: NutritionStat = {
    dayCarbohydrate: Math.round(targetWeight * carbohydrateBase),
    dayFat: Math.round(targetWeight * fatBase),
    dayProtein: Math.round(weight * proteinBase),
    get weekCarbohydrate() {
      return this.dayCarbohydrate * 7;
    },
    get weekFat() {
      return this.dayFat * 7;
    },
    get weekProtein() {
      return this.dayProtein * 7;
    },
  };

  const bodyStat = {
    bmi: Number((weight / Math.pow(height / 100, 2)).toFixed(1)),
    bmr:
      weight && height && age && gender
        ? Math.round(
            9.99 * weight +
              6.25 * height -
              4.92 * age +
              (166 * (gender === Gender.Male ? 1 : 0) - 161)
          )
        : 0,
    get tdee() {
      return Math.round(this.bmr * activityCoefficient);
    },
  };

  const columns = [
    {
      title: "项目",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "周一",
      children: [
        {
          title: "中",
          dataIndex: "monday",
          key: "monday",
        },
      ],
    },
    {
      title: "周二",
      children: [
        {
          title: "中",
          dataIndex: "tuesday",
          key: "tuesday",
        },
      ],
    },
    {
      title: "周三",
      children: [
        {
          title: "中",
          dataIndex: "wednesday",
          key: "wednesday",
        },
      ],
    },
    {
      title: "周四",
      children: [
        {
          title: "中",
          dataIndex: "thursday",
          key: "thursday",
        },
      ],
    },
    {
      title: "周五",
      children: [
        {
          title: "中",
          dataIndex: "friday",
          key: "friday",
        },
      ],
    },
    {
      title: "周六",
      children: [
        {
          title: "中",
          dataIndex: "saturday",
          key: "saturday",
        },
      ],
    },
    {
      title: "周日",
      children: [
        {
          title: "中",
          dataIndex: "sunday",
          key: "sunday",
        },
      ],
    },
  ];

  const data = [
    {
      type: CarbohydrateCycleClass.low,
      days: lowDays,
      carbohydrateRatio: lowCarbohydrateRatio,
      fatRatio: lowFatRatio,
    },
    {
      type: CarbohydrateCycleClass.middle,
      days: middleDays,
      carbohydrateRatio: middleCarbohydrateRatio,
      fatRatio: middleFatRatio,
    },
    {
      type: CarbohydrateCycleClass.high,
      days: highDays,
      carbohydrateRatio: highCarbohydrateRatio,
      fatRatio: highFatRatio,
    },
  ]
    .map((item) =>
      Array.from({ length: item.days }, () => {
        return {
          ...item,
          carbohydrate: Math.round(
            (nutritionStat.weekCarbohydrate * item.carbohydrateRatio) /
              100 /
              item.days
          ),
          fat: Math.round(
            (nutritionStat.weekFat * item.fatRatio) / 100 / item.days
          ),
          protein: Math.round(weight * proteinBase),
        };
      })
    )
    .flat()
    .reduce<({ title: string } & { [key in Day]: number })[]>(
      (res, cur, curIndex) => {
        for (let i = 0; i < STAT_OPTIONS.length; i++) {
          if (!res[i]) {
            res[i] = { title: STAT_OPTIONS[i].label } as { title: string } & {
              [key in Day]: number;
            };
          }
          const val = res[i];
          const days = Object.values(Day);
          const metaValMap = {
            [StatMeta.carbohydrates]: cur.carbohydrate,
            [StatMeta.fat]: cur.fat,
            [StatMeta.protein]: cur.protein,
            [StatMeta.calories]:
              cur.carbohydrate * NUTRITION_ENERGY.carbohydrates +
              cur.fat * NUTRITION_ENERGY.fat +
              cur.protein * NUTRITION_ENERGY.protein,
          };

          val[days[curIndex]] = metaValMap[STAT_OPTIONS[i].value];
        }
        return res;
      },
      []
    );

  return (
    <div id="app">
      <div className="flex">
        <aside className="w-md">
          <Form
            form={form}
            onFieldsChange={() => {
              const values = form.getFieldsValue();
              setLocalStorage("bodyData", values);
            }}
          >
            <Space direction="vertical" size="small">
              <div className="px-4 pt-4">
                <div className="font-mono text-lg mb-2 border-b-1 ">
                  基础信息
                </div>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      layout="vertical"
                      label="当前体重"
                      name={["basicInfo", "weight"]}
                    >
                      <InputNumber style={{ width: "100%" }} suffix="kg" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      layout="vertical"
                      label="目标体重"
                      name={["basicInfo", "targetWeight"]}
                      extra="与当前体重差距不同超过5kg"
                    >
                      <InputNumber style={{ width: "100%" }} suffix="kg" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      layout="vertical"
                      label="身高"
                      name={["basicInfo", "height"]}
                    >
                      <InputNumber style={{ width: "100%" }} suffix="cm" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      layout="vertical"
                      label="年龄"
                      name={["basicInfo", "age"]}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      layout="vertical"
                      label="运动系数"
                      name={["basicInfo", "activityCoefficient"]}
                    >
                      <Select options={ACTIVITY_COEFFICIENT_OPTIONS} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      layout="vertical"
                      label="性别"
                      name={["basicInfo", "gender"]}
                    >
                      <Radio.Group buttonStyle="solid">
                        {GENDER_OPTIONS.map((item) => (
                          <Radio.Button key={item.value} value={item.value}>
                            {item.label}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      layout="vertical"
                      label="胚型"
                      name={["basicInfo", "bodyType"]}
                    >
                      <Radio.Group buttonStyle="solid">
                        {BODY_TYPE_OPTIONS.map((item) => (
                          <Radio.Button key={item.value} value={item.value}>
                            {item.label}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <div className="px-4">
                <div className="font-mono text-lg mb-2 border-b-1 ">
                  三大宏观营养素
                </div>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      layout="vertical"
                      label="碳水基数"
                      name={["nutritionBase", "carbohydrateBase"]}
                      extra="内胚型建议2，外胚型建议3"
                    >
                      <InputNumber style={{ width: "100%" }} suffix="g/kg" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      layout="vertical"
                      label="脂肪基数"
                      name={["nutritionBase", "fatBase"]}
                      extra="内胚型建议0.8g，外胚型建议1-2g"
                    >
                      <InputNumber style={{ width: "100%" }} suffix="g/kg" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      layout="vertical"
                      label="蛋白质基数"
                      name={["nutritionBase", "proteinBase"]}
                      extra="建议0.8-1.5"
                    >
                      <InputNumber style={{ width: "100%" }} suffix="g/kg" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <div className="px-4">
                <div className="font-mono text-lg mb-2 border-b-1 ">
                  营养素比例
                </div>
                {CARBOHYDRATE_CYCLE_CLASS_OPTIONS.map((item) => (
                  <div key={item.value}>
                    <div>{item.label}</div>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          layout="vertical"
                          label="天数"
                          name={["nutritionRatio", item.value, "days"]}
                        >
                          <InputNumber style={{ width: "100%" }} suffix="天" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          layout="vertical"
                          label="碳水比例"
                          name={[
                            "nutritionRatio",
                            item.value,
                            "carbohydrateRatio",
                          ]}
                        >
                          <InputNumber style={{ width: "100%" }} suffix="%" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          layout="vertical"
                          label="脂肪比例"
                          name={["nutritionRatio", item.value, "fatRatio"]}
                        >
                          <InputNumber style={{ width: "100%" }} suffix="%" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </Space>
          </Form>
        </aside>
        <main className="flex-1 p-8">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              {
                title: "BMI",
                value: bodyStat.bmi,
                precision: 1,
              },
              {
                title: "BMR",
                value: bodyStat.bmr,
              },
              {
                title: "TDEE(每日总热量消耗)",
                value: bodyStat.tdee,
              },
              {
                title: "日总碳水(g)",
                value: nutritionStat.dayCarbohydrate,
              },
              {
                title: "日总脂肪(g)",
                value: nutritionStat.dayFat,
              },
              {
                title: "日总蛋白质(g)",
                value: nutritionStat.dayProtein,
              },
              {
                title: "周总碳水(g)",
                value: nutritionStat.weekCarbohydrate,
              },
              {
                title: "周总脂肪(g)",
                value: nutritionStat.weekFat,
              },
              {
                title: "周总蛋白质(g)",
                value: nutritionStat.weekProtein,
              },
            ].map((item) => (
              <Statistic
                key={item.title}
                title={item.title}
                value={item.value || 0}
                precision={item.precision || 0}
                style={{ textAlign: "center" }}
              />
            ))}
          </div>
          <div>
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={[
                {
                  title: "低碳日",
                  carbohydrateRatio: lowCarbohydrateRatio,
                  fatRatio: lowFatRatio,
                  days: lowDays,
                },
                {
                  title: "高碳日",
                  carbohydrateRatio: middleCarbohydrateRatio,
                  fatRatio: middleFatRatio,
                  days: middleDays,
                },
                {
                  title: "中碳日",
                  carbohydrateRatio: highCarbohydrateRatio,
                  fatRatio: highFatRatio,
                  days: highDays,
                },
              ]}
              renderItem={(item) => {
                const carbohydrate =
                  Math.round(
                    (nutritionStat.weekCarbohydrate * item.carbohydrateRatio) /
                      100 /
                      item.days
                  ) || 0;
                const fat =
                  Math.round(
                    (nutritionStat.weekFat * item.fatRatio) / 100 / item.days
                  ) || 0;
                const protein = weight * proteinBase || 0;
                return (
                  <List.Item>
                    <Card
                      title={`${item.title}(${item.days || 0}天)`}
                      actions={[
                        <div key={item.title}>
                          热量:{carbohydrate * 4 + fat * 9 + protein * 4}
                        </div>,
                      ]}
                    >
                      <div className="flex flex-col gap-2">
                        <div>
                          碳水: 周总碳水✖️{item.carbohydrateRatio}%/
                          {item.days}={carbohydrate}
                        </div>
                        <div>
                          脂肪: 周总脂肪✖️{item.fatRatio}%/{item.days}={fat}
                        </div>
                        <div>
                          蛋白质: 当前体重✖️蛋白质=
                          {protein}
                        </div>
                      </div>
                    </Card>
                  </List.Item>
                );
              }}
            />
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={data}
              bordered
              pagination={false}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
