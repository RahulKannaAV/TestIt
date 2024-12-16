"use client"
import CustomTextField from "@/components/form_field";
import styles from "./page.module.css";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import Dropdown from "@/components/dropdown"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";


const ContentPage = () => {

    const query = useParams();
    console.log(query.content);


    return (
        <div className={styles.body_container}>
            <div className={styles.center_card}>
                <Typography variant="h3" sx={{
                    textAlign: "center",
                    marginBottom: "25px"
                }}>
                    EXTRACTED TEXT
                </Typography>

                
            </div>
        </div>
    )
}


export default ContentPage;