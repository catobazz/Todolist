import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "./TodoList.module.css";

type AddItemFormPropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        let newTitle = title.trim()
        if (newTitle !== "") {
            props.callBack(newTitle)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTaskHandler()
        setError(null)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        <div>
            <input className={error ? styles.error : ''}
                   onKeyPress={onKeyPressHandler}
                   value={title}
                   onChange={onChangeHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

