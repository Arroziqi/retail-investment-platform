import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Features } from "./Features";

const meta: Meta<typeof Features> = {
  title: "Marketing/Sections/Features",
  component: Features,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Features>;

export const Default: Story = {};
