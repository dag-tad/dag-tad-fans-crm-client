import type { Meta, StoryObj } from '@storybook/react';
import {
    MemoryRouter,
} from "react-router-dom";
import UserDetailCard from '../components/users/UserDetail';


const meta = {
    title: 'Fans-CRM/UserDetailCard',
    component: UserDetailCard,
    parameters: {
        layout: 'centered',
    },
    decorators : [(Story) => (<MemoryRouter><Story/></MemoryRouter>)],
    tags: ['autodocs'],
    argTypes: {
    },
    args: {},
} satisfies Meta<typeof UserDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        name: "Dagmawi Tadesse",
        email: 'dagtade@gmail.com',
        phoneNumber: '+251-911-687-411',
    },
};