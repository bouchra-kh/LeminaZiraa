import React, {useEffect, useState} from "react";
import './home.css'
import Typography from '@mui/material/Typography';
import {Paper} from "@mui/material";
import axios from "axios";

const Home = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("publication/list").then((res) => {
            setPublications(res.data);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });


    }, []);
    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="my-5 mx-3">
            <div className="row">
                {

                    publications.map((publication, key) => (
                        <div className="chart-row  two" key={key}>
                            <div className="chart-container-wrapper small">
                                <div className="chart-container">
                                    <div className="chart-container-header">
                                        <h2>{publication.titre}</h2>
                                    </div>
                                    <hr style={{borderBottomWidth: 1, borderBottomColor: "red", width: "100%"}}></hr>
                                    <div className="progress-bar-info">
                                        <span className="progress-color applications"></span>
                                        <span className="progress-type">prix semences</span>
                                        <span className="progress-amount">{publication.prix_semance}</span>
                                    </div>
                                    <div className="progress-bar-info">
                                        <span className="progress-color applications"></span>
                                        <span className="progress-type">prix main ouvre</span>
                                        <span className="progress-amount">{publication.main_ouvre}</span>
                                    </div>
                                    <div className="progress-bar-info">
                                        <span className="progress-color applications"></span>
                                        <span className="progress-type">prix outils</span>
                                        <span className="progress-amount">{publication.prix_outils}</span>
                                    </div>
                                <hr/>
                                <strong>Total Cout : </strong>
                                <strong className="text-danger">
                                    {publication.prix_semance + publication.main_ouvre +publication.prix_outils} MRU
                                </strong>
                                </div>
                            </div>
                        </div>


                    ))
                }
            </div>
        </div>


    );
};

export default Home;
  