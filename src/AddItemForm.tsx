import React, {ChangeEvent, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faDeleteLeft, faTrash} from "@fortawesome/free-solid-svg-icons";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {IconButton, TextField} from "@mui/material";
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
        <div className={'form-wrapper'} >
            <TextField
                size={'small'}
                placeholder={'Please, text enter'}
                value={title}
                onChange={changeItemTitle}
                className={error ? "user-error" : undefined}
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        addTask()
                    }
                }}
            />
            {/*<button*/}
            {/*    disabled={isAddItemBtnDisabled}*/}
            {/*    onClick={addTask}>*/}
            {/*    <FontAwesomeIcon icon={faCirclePlus} />*/}
            {/*</button>*/}

            <IconButton
                size={"small"}
                disabled={isAddItemBtnDisabled}
                onClick={addTask}>
                <FontAwesomeIcon icon={faCirclePlus} />
            </IconButton>

            <IconButton
                size={"small"}
                disabled={!title}
                onClick={()=>setTitle(title.slice(0, -1))}>
                <FontAwesomeIcon icon={faDeleteLeft} />
            </IconButton>

            <IconButton
                size={"small"}
                disabled={!title}
                onClick={()=>setTitle("")}>
                <FontAwesomeIcon icon={faTrash} />
            </IconButton>

            {isItemTitleLengthTooLong && <div>You title is too long</div>}
            {error && <div style={{"color": "red", "fontWeight": "bold"}}>Please, enter correct title</div>}
        </div>
    );
};

