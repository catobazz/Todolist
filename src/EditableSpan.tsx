import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    classes:string
    changeTitle: (title:string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const onEditMode = () => {
        setIsEditMode(true)
        setTitle(props.title)
    }
    const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    return (
        isEditMode
            ? <TextField
            size={'small'}
            variant={'standard'}
                value={title}
                autoFocus
                onChange={changeItemTitle}
                onBlur={offEditMode}/>
            : <span
                onDoubleClick={onEditMode}
                className={props.classes}
            > {props.title} </span>

    );
};

