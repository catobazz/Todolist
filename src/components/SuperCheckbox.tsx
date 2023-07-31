import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';

type SuperCheckboxPropsType = {
    isDone: boolean
    callBack: (changeEvent: boolean) => void
}
export const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({isDone,callBack}) => {

const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.checked)
}

    return (
        <Checkbox
            size={'small'}
            checked={isDone}
            onChange={onChangeHandler}
            defaultChecked color="secondary"
        />
    );
};

