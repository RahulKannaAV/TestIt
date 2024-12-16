"use client"
import CustomTextField from "@/components/form_field";
import styles from "./page.module.css";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import Dropdown from "@/components/dropdown"
import { useState } from "react";
import { useRouter } from "next/navigation";


const QuizForm = () => {
    const [chosenType, setChosenType] = useState(""); 
    const router = useRouter();   
    console.log(chosenType);

    const handleCreation = () => {
        console.log("Redirecting to content website");
        router.push({
            pathname: "/scraped-result",
            query: {content: "Hello World"}
        })
    }

    return (
        <div className={styles.body_container}>
            <div className={styles.center_card}>
                <Typography variant="h3" sx={{
                    textAlign: "center",
                    marginBottom: "25px"
                }}>
                    CREATE <b>QUIZ</b>
                </Typography>

                <CustomTextField fieldText={"Quiz Name"}/>

                <CustomTextField fieldText={"Quiz URL"} />

                <Dropdown 
                    changeFn={setChosenType}
                    currentSelected={chosenType}
                    elements={['CLASS', 'ID', 'TAG_NAME', 'XPATH']} 
                    about={"Choose Content ID"}
                />

                <CustomTextField fieldText={"Identifier Text"} />
                
                <div style={{
                    marginTop: "30px"
                }}>
                    <Button variant="contained"
                        onClick={handleCreation}
                        >
                        CREATE
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default QuizForm;