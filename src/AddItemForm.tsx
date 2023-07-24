import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "./TodoList.module.css";

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
    return (
        <div>
            <input className={error ? styles.error : ''}
                   onKeyPress={onKeyPressHandler}
                   value={newTitle}
                   onChange={onChangeHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

