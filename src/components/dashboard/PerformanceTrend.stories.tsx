import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PerformanceTrend } from "./PerformanceTrend";

const meta: Meta<typeof PerformanceTrend> = {
  title: "Dashboard/Widgets/PerformanceTrend",
  component: PerformanceTrend,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PerformanceTrend>;

const mockData = [
  { date: '2026-05-01', totalValue: 10000000, investedValue: 10000000 },
  { date: '2026-05-02', totalValue: 10200000, investedValue: 10000000 },
  { date: '2026-05-03', totalValue: 10150000, investedValue: 10000000 },
  { date: '2026-05-04', totalValue: 10500000, investedValue: 10000000 },
  { date: '2026-05-05', totalValue: 10800000, investedValue: 10000000 },
  { date: '2026-05-06', totalValue: 11000000, investedValue: 10500000 },
  { date: '2026-05-07', totalValue: 11200000, investedValue: 10500000 },
];

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};
