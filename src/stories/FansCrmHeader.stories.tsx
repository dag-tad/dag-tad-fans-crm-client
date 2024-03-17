import type { Meta, StoryObj } from '@storybook/react';
import {
    MemoryRouter,
} from "react-router-dom";
import FansCrmHeader from '../components/FansCrmHeader';


const meta = {
    title: 'Fans-CRM/Header',
    component: FansCrmHeader,
    parameters: {
        layout: 'centered',
    },
    decorators : [(Story) => (<MemoryRouter><Story/></MemoryRouter>)],
    tags: ['autodocs'],
    argTypes: {
    },
    args: {},
} satisfies Meta<typeof FansCrmHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        name: "Dagmawi Tadesse",
        backgroundColor: '#fff',
        textColor: '#000',
        signout: () => console.log('')
    },
};