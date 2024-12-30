"use client"
import { Button, Typography } from "@mui/material";
import {useState, useEffect} from "react";
import axios from "axios";
import styles from "../app/quiz/[course_id]/page.module.css";
import { useRouter } from "next/navigation";


const QuizStats = (props) => {

    const router = useRouter();
    const goToHomePage = () => {
        router.push("/");
    }

    return (
            <div className={styles.quiz_card}>
                <div className={styles.quiz_header}>
                    <Typography
                        variant="h4">
                        {props.quizTitle}
                    </Typography>
                </div>
                <hr id={styles.partition}/>
                <Typography
                            variant="h4"
                            style={{
                                textAlign: "center",
                                marginTop: "15px",
                                marginBottom: "15px"
                                }}>
                            Correct : {props.correct} questions
                    </Typography>
                    <Typography
                        variant="h4"
                        style={{
                            textAlign: "center",
                             marginTop: "15px",
                            marginBottom: "15px"
                        }}>
                            Incorrect: {props.wrong} questions
                    </Typography>
                <div className={styles.quiz_stats}>
                    <Button
                        variant="contained"
                        onClick={goToHomePage}>
                        Go to Home
                    </Button>
                </div>
            </div>
    )
}

export default QuizStats;