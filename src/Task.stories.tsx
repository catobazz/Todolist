import React from "react";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";

export default {
    title: 'Task component',
    component: Task
}

const changeTaskStatusCallback = action('TaskStatus changed')
const changeTaskTitleCallback = action('TaskTitle changed')
const removeTaskCallback = action('Task removed')

export const TaskBaseExample = (props: any) => {
  return <>
      <Task
          task={{ id: "1", title: "CSS", isDone: false }}
          changeTaskStatus={changeTaskStatusCallback}
          changeTaskTitle={changeTaskTitleCallback}
          removeTask={removeTaskCallback}
          todolistId={"todolistId1"}
      />
      <Task
          task={{ id: "2", title: "JS", isDone: true }}
          changeTaskStatus={changeTaskStatusCallback}
          changeTaskTitle={changeTaskTitleCallback}
          removeTask={removeTaskCallback}
          todolistId={"todolistId2"}
      />
  </>
}