import React from 'react';
import { PropTypes } from "prop-types";
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { StyledRow } from './CitiesTable.styled';

export const FilterRow = ({filter, setFilter, newArea, setNewArea, newName, setNewName, newPopulation, setNewPopulation, setSendPost

}) => {

    const onChange = (e, setFunc, type) => {
        if(type === 'num'){
            setFunc(parseInt(e.target.value))
        } else {
            setFunc(e.target.value);
        }
    }

    return (
        <StyledRow>
            <TextField aria-label='Search by city name' placeholder='City name contains...' value={filter || ''} onChange={(e) => onChange(e, setFilter)}/>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="add new city"
                id="add-city-accordion"
                >
                <Typography>Add new city</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <StyledRow>
                    <TextField aria-label='new city name' placeholder='City name is...' value={newName || ''} onChange={(e) => onChange(e, setNewName)}/>
                    <TextField aria-label='new city area' placeholder='City area is...' value={newArea || ''} onChange={(e) => onChange(e, setNewArea, 'num')}/>
                    <TextField aria-label='new city population' placeholder='City population is...' value={newPopulation || ''} onChange={(e) => onChange(e, setNewPopulation, 'num')}/>
                    <Button variant="contained" disabled={!(newName && newArea && newPopulation)} onClick={() => setSendPost(true)}>Add City</Button>
                    </StyledRow>
                </AccordionDetails>
            </Accordion>
        </StyledRow>
    )
}

FilterRow.propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func
}