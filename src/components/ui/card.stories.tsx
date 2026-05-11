import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardAction 
} from "./card";
import { Button } from "./button";
import { MoreHorizontal } from "lucide-react";

const meta: Meta<typeof Card> = {
  title: "UI/Atoms/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Portfolio Summary</CardTitle>
        <CardDescription>View your current investment distribution.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Assets</span>
            <span className="font-bold">Rp 12,500,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Profit</span>
            <span className="font-bold text-green-600">+Rp 450,000</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  ),
};

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-[300px]">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">Access your most used tools instantly.</p>
      </CardContent>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardAction>
          <Button variant="ghost" size="icon-sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardAction>
        <CardTitle>Market Watch</CardTitle>
        <CardDescription>Top performing mutual funds today.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">BNI-AM Dana Lancar</div>
            <div className="text-green-600">+0.45%</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-medium">Sucorinvest Sharia Equity</div>
            <div className="text-red-600">-0.12%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};
