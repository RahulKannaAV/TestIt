"use client"
import CustomTextField from "@/components/form_field";
import styles from "./page.module.css";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import Dropdown from "@/components/dropdown"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


const QuizForm = () => {
    const [chosenType, setChosenType] = useState(""); 
    const [formData, setFormData] = useState({
        quizName: "",
        quizURL: "",
        contentID: "",
        identifierText: ""
    });


    const router = useRouter();   
    console.log(chosenType);
    console.log(formData);

    // Sends input to the server
    const sendContent = async() => {
        try {
            const response = await axios.post("http://localhost:5000/scrape-quiz-text", formData);
            console.log(response.data);
        } catch(e) {
            console.error(`Error in sending form content: ${e}`)
        }
    }

    const handleCreation = async() => {
        console.log("Redirecting to content website");

        // Sending form content to the server
        await sendContent();

        /*router.push({
            pathname: "/scraped-result",
            query: {content: "Hello World"}
        })*/
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

                <CustomTextField fieldText={"Quiz Name"} property={"quizName"} setter={setFormData}/>

                <CustomTextField fieldText={"Quiz URL"} property={"quizURL"} setter={setFormData}/>

                <Dropdown 
                    changeFn={setChosenType}
                    currentSelected={chosenType}
                    elements={['CLASS', 'ID', 'TAG_NAME', 'XPATH']} 
                    about={"Choose Content ID"}
                />

                <CustomTextField fieldText={"Identifier Text"} property={"identifierText"} setter={setFormData}/>
                
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