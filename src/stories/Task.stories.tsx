import type {Meta, StoryObj} from '@storybook/react';
import React, {useState} from "react";
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', isDone: false},
        todolistId: 'fgdosrg8rgjuh'
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', isDone: true},
    },
};

 const TaskPresentation = () => {
    const [task, setTask] = useState({id: '12wsdewfijdei2343', title: 'CSS', isDone: false})
    return <Task
        changeTaskStatus={()=>{
        setTask({...task, isDone: !task.isDone})}
        }
        changeTaskTitle={(taskId, title)=>{
        setTask({...task, title: title})}
        }
        removeTask={action('removeTask')}
        task={task}
        todolistId={'12wsdewfijdei2343'}
    />
}
export const TaskPresentationStory: Story = {
    render: () => <TaskPresentation />
}