"use client"
import { Button, Typography } from "@mui/material";
import {useState, useEffect} from "react";
import axios from "axios";
import styles from "./page.module.css";
import QuizStats from "@/components/quiz_results";

const questionSet = [{options: ['Hyper Text ML', 'High Text Mark Low', 'Hyper Text Markup Language', 'How To Make Lasagna'],
                    question: "What does HTML stand for?",
                    correct_option: 2
                }, {
                    options: ["Server Side Events", "Super Server Embodiment", "SQL SEO Encryption", "Svelte Side Execution"],
                    question: "Full form of SSE",
                    correct_option:  0
                }]


const QuizPage = () => {
    const [timeLeft, setTimeLeft] = useState(5);
    const [summary, showSummary] = useState(false);
    const [stats, setStats] = useState({
        "correct": 0,
        "wrong": 0
    });
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [chosen, setChosen] = useState(null);
    const [isCorrect, setCorrectStatus] = useState();
    const [lockStatus, setLockStatus] = useState(false);
    console.log(currentQuestion);

    useEffect(() => {
        if(timeLeft > 0) {
        setTimeout(() => {
            setTimeLeft(timeLeft-1);
        }, 1000);
    }
        else {
            showSummary(true);
        }
    }, [timeLeft]);

    const handleChoiceSelection = (evt) => {
        let buttonKey = evt.target.dataset.option;
        if(chosen == buttonKey) {
            setChosen(null);
        } else {
        setChosen(buttonKey)
        }
    }

    const showCorrectAnswer = () => {
        if(chosen == null) {
            console.log("Choose an option");
        } else {
            setLockStatus(true);
            console.log("Fetching Correct Answer");
            if(chosen == questionSet[currentQuestion].correct_option) {
                setStats((prevState) => (
                    {
                        ...prevState,
                        "correct": stats["correct"]+1
                    }
                ));
                setCorrectStatus(true);
            } else {
                setStats((prevState) => (
                    {
                        ...prevState,
                        "wrong": stats["wrong"]+1
                    }
                ));
                setCorrectStatus(false);
            }
        }

    }

    const bringNextQuestion = () => {
        setLockStatus(false);
        setChosen(null);
        if(currentQuestion < questionSet.length-1) {
        setCurrentQuestion(currentQuestion + 1);
        } else {
            showSummary(true);
        }
        console.log("Next Question");
    }

    return (
        <div className={styles.quiz_body}>
            {summary ? (
                <QuizStats quizTitle="Front End Quiz" correct={stats["correct"]} wrong={stats["wrong"]} />

            ) : 
            <div className={styles.quiz_card}>
                <div className={styles.quiz_header}>
                    <Typography 
                        variant="h4">
                        Course Heading
                    </Typography>
                    <Typography
                        key={timeLeft}
                        variant="h4">
                        Time Left: {timeLeft}s
                    </Typography>
                </div>
                <hr id={styles.partition}/>
                <div className={styles.quiz_question}>
                    <Typography
                        variant="h4"
                        style={{
                            marginTop: "15px",
                            marginBottom: "15px"
                        }}>
                        {currentQuestion+1}) {questionSet[currentQuestion].question}
                    </Typography>
                    {questionSet[currentQuestion].options.map((option, key) => (
                        <Button 
                            disabled={lockStatus}
                            key={key}
                            data-option={key}
                            color="warning"
                            className={styles.options}
                            onClick={handleChoiceSelection}
                            variant="outlined"
                            style={{
                                backgroundColor: (lockStatus ? ((chosen == key ? (isCorrect ? "green" : "red") : (key == questionSet[currentQuestion].correct_option && "green") )) : (chosen == key && "blue")) ,
                                display: "flex",
                                justifyContent: "flex-start",
                                margin: "15px",
                                fontSize: "17px"
                            }}>
                            {option}{lockStatus && (chosen == key ? (isCorrect ? "✅" : "❌") : (key == questionSet[currentQuestion].correct_option &&  "✅") )}
                        </Button>
                    ))}
                </div>
                <hr id={styles.partition}/>
                <div className={styles.quiz_stats}>
                    <Typography>
                        Question Number
                    </Typography>
                    {lockStatus ? 
                    (<Button
                        variant="contained"
                        onClick={bringNextQuestion}>
                        Next Question
                    </Button>) : (<Button
                        variant="contained"
                        onClick={showCorrectAnswer}>
                        Submit
                    </Button>)}
                    
                </div>
            </div>}
        </div>
    )
}

export default QuizPage;