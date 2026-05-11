import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AllocationChart } from "./AllocationChart";

const meta: Meta<typeof AllocationChart> = {
  title: "Dashboard/Widgets/AllocationChart",
  component: AllocationChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AllocationChart>;

const mockData = [
  { name: 'Mutual Funds', value: 4500000, color: '#2563eb' },
  { name: 'Stocks', value: 3200000, color: '#7c3aed' },
  { name: 'Bonds', value: 2100000, color: '#db2777' },
  { name: 'Cash', value: 800000, color: '#ea580c' },
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
