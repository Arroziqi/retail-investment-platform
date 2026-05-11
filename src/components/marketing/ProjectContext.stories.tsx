import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectContext } from "./ProjectContext";

const meta: Meta<typeof ProjectContext> = {
  title: "Marketing/Sections/ProjectContext",
  component: ProjectContext,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ProjectContext>;

export const Default: Story = {};
