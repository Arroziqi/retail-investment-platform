import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TechStack } from "./TechStack";

const meta: Meta<typeof TechStack> = {
  title: "Marketing/Sections/TechStack",
  component: TechStack,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof TechStack>;

export const Default: Story = {};
