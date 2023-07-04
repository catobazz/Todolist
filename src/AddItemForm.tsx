import React, {ChangeEvent, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faDeleteLeft, faTrash} from "@fortawesome/free-solid-svg-icons";
type AddItemFormPropsType = {
    maxTaskTitleLength: number
    addItem: (title: string)=> void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const maxItemTitleLength = 15
    const isItemTitleLengthTooLong = title.length > maxItemTitleLength
    const isAddItemBtnDisabled = !title || isItemTitleLengthTooLong
    const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(error) {
            setError(false)
        }
        if(!isItemTitleLengthTooLong){
            setTitle(e.currentTarget.value)
        }
    }
    return (
        <div>
            <input
                value={title}
                onChange={changeItemTitle}
                className={error ? "user-error" : undefined}
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        addTask()
                    }
                }}
            />
            <button
                disabled={isAddItemBtnDisabled}
                onClick={addTask}>
                <FontAwesomeIcon icon={faCirclePlus} />
            </button>

            <button
                disabled={!title}
                onClick={()=>setTitle(title.slice(0, -1))}>
                <FontAwesomeIcon icon={faDeleteLeft} />
            </button>
            <button
                disabled={!title}
                onClick={()=>setTitle("")}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
            {isItemTitleLengthTooLong && <div>You title is too long</div>}
            {error && <div style={{"color": "red", "fontWeight": "bold"}}>Please, enter correct title</div>}
        </div>
    );
};

