import { Button } from "@base";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
    title: "base/Button",
    component: Button,
    parameters: {
        controls: {
            exclude: ["onBlur", "type"],
        },
    },
    tags: ["autodocs"],
    argTypes: {
        children: { type: "string" },
        color: {
            control: { type: "radio" },
        },
        disabled: { control: { type: "boolean" } },
        size: {
            options: ["small", "large"],
            control: { type: "radio" },
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        active: false,
        children: "Button",
        onClick: () => console.log("clicked"),
    },
};

export const Small: Story = {
    args: {
        active: false,
        children: "Button",
        size: "small",
        onClick: () => console.log("clicked"),
    },
};