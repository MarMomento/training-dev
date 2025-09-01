"use client";

import { Form, Input, Radio, Space, Statistic, Table } from "antd";

import "./global.css";
import { useEffect } from "react";

enum Gender {
  /** 男性 */
  Male = "Male",
  /** 女性 */
  Female = "Female",
}

enum BodyType {
  /** 外胚型 */
  Ectomorph = "Ectomorph",
  /** 中胚型 */
  Mesomorph = "Mesomorph",
  /** 内胚型 */
  Endomorph = "Endomorph",
}

export default function Home() {
  const [form] = Form.useForm();

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
          dataIndex: "Tuesday",
          key: "Tuesday",
        },
      ],
    },
    {
      title: "周三",
      children: [
        {
          title: "中",
          dataIndex: "Wednesday",
          key: "Wednesday",
        },
      ],
    },
    {
      title: "周四",
      children: [
        {
          title: "中",
          dataIndex: "Thursday",
          key: "Thursday",
        },
      ],
    },
    {
      title: "周五",
      children: [
        {
          title: "中",
          dataIndex: "Friday",
          key: "Friday",
        },
      ],
    },
    {
      title: "周六",
      children: [
        {
          title: "中",
          dataIndex: "Saturday",
          key: "Saturday",
        },
      ],
    },
    {
      title: "周日",
      children: [
        {
          title: "中",
          dataIndex: "Sunday",
          key: "Sunday",
        },
      ],
    },
  ];

  const data = [
    {
      title: "碳水(g)",
      monday: 184,
    },
  ];

  const bodyType = Form.useWatch("bodyType", form);
  const weight = Form.useWatch("weight", form);
  const carbohydrates = Form.useWatch("carbohydrates", form);
  const fat = Form.useWatch("fat", form);
  const protein = Form.useWatch("protein", form);

  useEffect(() => {
    switch (bodyType) {
      case BodyType.Ectomorph:
        form.setFieldValue("carbohydrates", 3);
        form.setFieldValue("fat", 1);
        form.setFieldValue("protein", 1.2);
        break;
      case BodyType.Mesomorph:
        break;
      case BodyType.Endomorph:
        form.setFieldValue("carbohydrates", 2);
        form.setFieldValue("fat", 0.8);
        form.setFieldValue("protein", 1.2);
        break;
      default:
        break;
    }
  }, [bodyType, weight, form]);

  return (
    <div id="app">
      <div className="flex columns-2">
        <aside>
          <Form
            form={form}
            initialValues={JSON.parse(
              typeof window !== "undefined"
                ? localStorage.getItem("bodyData") || "{}"
                : "{}"
            )}
            onFieldsChange={() => {
              const values = form.getFieldsValue();
              if (typeof window !== "undefined") {
                localStorage.setItem("bodyData", JSON.stringify(values));
              }
            }}
          >
            <Space direction="vertical" size="small">
              <div className="px-4 pt-4">
                <div className="font-mono text-lg mb-2 border-b-1 ">
                  基础信息
                </div>
                <Form.Item colon label="体重(kg)" name="weight">
                  <Input type="number" />
                </Form.Item>
                <Form.Item colon label="身高(cm)" name="height">
                  <Input type="number" />
                </Form.Item>
                <Form.Item colon label="年龄" name="age">
                  <Input type="number" />
                </Form.Item>
                <Form.Item colon label="性别" name="gender">
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={Gender.Male}>男性</Radio.Button>
                    <Radio.Button value={Gender.Female}>女性</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item colon label="胚型" name="bodyType">
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={BodyType.Ectomorph}>
                      外胚型
                    </Radio.Button>
                    <Radio.Button value={BodyType.Mesomorph}>
                      中胚型
                    </Radio.Button>
                    <Radio.Button value={BodyType.Endomorph}>
                      内胚型
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className="px-4">
                <div className="font-mono text-lg mb-2 border-b-1 ">
                  三大宏观营养素
                </div>
                <Form.Item colon label="碳水化合物(g/kg)" name="carbohydrates">
                  <Input type="number" />
                </Form.Item>
                <Form.Item colon label="蛋白质(g/kg)" name="protein">
                  <Input type="number" />
                </Form.Item>
                <Form.Item colon label="脂肪(g/kg)" name="fat">
                  <Input type="number" />
                </Form.Item>
              </div>
              <div className="px-4">
                <div className="font-mono text-lg mb-2 border-b-1 ">
                  训练计划
                </div>
                <Form.Item colon label="碳水化合物(g/kg)" name="carbohydrates">
                  <Input type="number" />
                </Form.Item>
                <Form.Item colon label="蛋白质(g/kg)" name="protein">
                  <Input type="number" />
                </Form.Item>
                <Form.Item colon label="脂肪(g/kg)" name="fat">
                  <Input type="number" />
                </Form.Item>
              </div>
            </Space>
          </Form>
        </aside>
        <main className="flex-1 p-8">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              {
                title: "基础代谢",
                value: 1,
              },
              {
                title: "每日总消耗",
                value: 1,
              },
              {
                title: "日总碳水(g)",
                value: carbohydrates * weight || 0,
              },
              {
                title: "周总碳水(g)",
                value: carbohydrates * weight * 7 || 0,
              },
              {
                title: "日总蛋白质(g)",
                value: protein * weight || 0,
              },
              {
                title: "周总蛋白质(g)",
                value: protein * weight * 7 || 0,
              },
              {
                title: "日总脂肪(g)",
                value: fat * weight || 0,
              },
              {
                title: "周总脂肪(g)",
                value: fat * weight * 7 || 0,
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={0}
                  style={{ textAlign: "center" }}
                />
              </div>
            ))}
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
