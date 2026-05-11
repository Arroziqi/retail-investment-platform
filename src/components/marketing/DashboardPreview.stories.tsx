import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardPreview } from "./DashboardPreview";

const meta: Meta<typeof DashboardPreview> = {
  title: "Marketing/Sections/DashboardPreview",
  component: DashboardPreview,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof DashboardPreview>;

export const Default: Story = {};
