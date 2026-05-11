import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Zap } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

export const Marketing: Story = {
  args: {
    children: "Get Started",
    variant: "default",
    className: "bg-marketing-brand hover:bg-marketing-brand/90",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete Account",
    variant: "destructive",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Zap className="mr-2 h-4 w-4" />
        Instant Buy
      </>
    ),
    variant: "default",
  },
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    children: <Zap className="h-4 w-4" />,
    "aria-label": "Zap",
  },
};
