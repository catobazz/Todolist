import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    editableSpanCallBack: (updateTitle: string)=>void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const editFoo = () => {
        setEdit(!edit)
        if(edit) {
            addTitleTaskHandler()
        }
    }
    const [updateTitle, updateSetTitle ] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        updateSetTitle(e.currentTarget.value)
    }
    const addTitleTaskHandler =()=> {
props.editableSpanCallBack(updateTitle)
    }
    return (

            edit
            ? <input onChange={onChangeHandler} value={updateTitle} onBlur={editFoo} autoFocus />
            : <span onDoubleClick={editFoo}>{props.title}</span>

    );
};

