"use client"
import { InputLabel, TextField } from "@mui/material";

const CustomTextField = (props) => {
    return (
        <div>

            <TextField 
                placeholder={props.fieldText} 
                required={props.needed || false}
                label={<h3>{props.fieldText}</h3>}
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