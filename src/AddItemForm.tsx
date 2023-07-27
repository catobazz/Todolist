import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "./TodoList.module.css";
import Button from '@mui/material/Button';

type AddItemFormPropsType = {
    itemFormCallback: (newTitle: string) => void

}
export const AddItemForm = (props: AddItemFormPropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | false>(false)

    const addTaskHandler = () => {
        if (newTitle.trim() !== "") {
            props.itemFormCallback(newTitle.trim())
            setNewTitle('')
        } else {
            setError("Title is required")
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTaskHandler()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTitle(e.currentTarget.value)
    }

    const buttonStyles = {
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
    }

    return (
        <div>
            <input className={error ? styles.error : ''}
                   onKeyPress={onKeyPressHandler}
                   value={newTitle}
                   onChange={onChangeHandler}/>
            {/*<button onClick={addTaskHandler}>+</button>*/}
            <Button onClick={addTaskHandler} style={buttonStyles} variant="contained">+</Button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

