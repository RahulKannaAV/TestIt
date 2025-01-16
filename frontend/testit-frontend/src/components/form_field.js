"use client"
import { InputLabel, TextField } from "@mui/material";

const CustomTextField = (props) => {
    
    // Modifies the state of that particular property of the object present in the parent component
    const modifyField = (evt) => {
        props.setter((prevState) => ({...prevState,
                [props.property]: evt.target.value
        }));
    }
    return (
        <div>

            <TextField 
                placeholder={props.fieldText} 
                required={props.needed || false}
                label={<h3>{props.fieldText}</h3>}
                onChange={modifyField}
                sx={{
                    marginTop: "25px",
                    marginBottom: "0px",
                    width: "450px",
                    borderRadius: "30px"
                }}  />
            
        </div>
    )
}

export default CustomTextField;