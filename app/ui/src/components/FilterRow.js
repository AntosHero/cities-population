import React from 'react';
import { PropTypes } from "prop-types";
import TextField from '@mui/material/TextField';

export const FilterRow = ({filter, setFilter}) => {

    const onChange = (e) => {
        console.log(e?.target?.value, filter)
        setFilter(e.target.value);
    }

    return (
        <>
            <TextField aria-label='Search by city name' placeholder='City name contains...' value={filter || ''} onChange={(e) => onChange(e)}/>
        </>
    )
}

FilterRow.propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func
}