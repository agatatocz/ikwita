import * as React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Expense } from "interfaces/expense";
import { Income } from "interfaces/income";
import { groupBy } from "lodash";

export interface PieChartProps {
  data: Array<Expense> | Array<Income>;
}

const mapDataForPieChart = (data: Array<Expense> | Array<Income>) => {
  const grouped = groupBy(data, "category.name");
  return Object.keys(grouped).map((category: string) => {
    const value =
      grouped[category].length === 1
        ? grouped[category][0].value
        : grouped[category]
            .map((item: Expense | Income) => item.value)
            .reduce((prev: number, current: number) => prev + current);
    return { id: category, label: category, value };
  });
};

export const PieChart: React.SFC<PieChartProps> = ({ data }) => {
  return (
    <ResponsivePie
      data={mapDataForPieChart(data)}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "yellow_green_blue" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#333",
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};
