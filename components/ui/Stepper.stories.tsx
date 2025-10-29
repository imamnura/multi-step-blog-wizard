import type { Meta, StoryObj } from "@storybook/react-vite";
import Stepper from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "UI/Stepper",
  component: Stepper,
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const Step1: Story = { args: { step: 1 } };
export const Step3: Story = { args: { step: 3 } };
export const Step4: Story = { args: { step: 4 } };
