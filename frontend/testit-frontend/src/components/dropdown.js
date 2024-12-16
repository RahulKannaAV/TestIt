import * as React from 'react';
import {useState} from "react";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const Dropdown = (props) => {
  const theme = useTheme();
  const [personName, setPersonName] = useState("");
  const [elements, setElements] = useState(props.elements);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    props.changeFn(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 450, mt: 3 }}>
        <Select
          displayEmpty
          value={props.currentSelected}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected === "") {
              return <em>{props.about}</em>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>{props.about}</em>
          </MenuItem>
          {elements.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, props.currentSelected, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropdown;