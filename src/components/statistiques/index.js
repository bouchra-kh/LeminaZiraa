import {getUser} from "../extends/GlobalFunctions"
import axios from "axios";
import {useEffect, useState} from "react";

const show = () => {
    document.getElementById("slide").classList.remove("d-none");
};
const Statistiques = () => {
    const [loading, setLoading] = useState(true);
    const [moughataas, setMoughataa] = useState([]);
    const [statistiques, setStatistiques] = useState({
        'publications': {}
    });
    useEffect(() => {
        setLoading(true);
        axios.get("stat/publications").then((res) => {
            setStatistiques((prev) => {
                return {
                    ...prev,
                    publications: res.data
                }
            });

        });
        axios.get("moughataaa/list").then((res) => {
            setMoughataa(res.data);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    const user = getUser();
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
        <>
            <div className="app-main    p-3">
                <div className="main-header-line">
                    <h1>Dashboard</h1>
                    <button
                        className="mode-switch"
                        title="Switch Theme"

                    >

                        <svg
                            className="moon"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <defs></defs>
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                        </svg>
                    </button>
                    <div className="action-buttons">
                        <button className="menu-button" onClick={() => show()}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="menu"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"


                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-menu"
                            >
                                <line x1="3" y1="12" x2="21" y2="12"/>
                                <line x1="3" y1="6" x2="21" y2="6"/>
                                <line x1="3" y1="18" x2="21" y2="18"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="chart-row three">
                    <div className="chart-container-wrapper">
                        <div className="chart-container  ">
                            <div className="chart-info-wrapper">
                                <h2>Nbr Publications</h2>
                                <span>{statistiques.publications?.count}</span>
                            </div>
                            <div className="chart-svg">
                                <svg viewBox="0 0 36 36" className="circular-chart pink">
                                    <path
                                        className="circle-bg"
                                        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                                    ></path>
                                    <path
                                        className="circle"
                                        strokeDasharray="30, 100"
                                        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                                    ></path>

                                    <text x="18" y="20.35" className="percentage">
                                        {statistiques.publications?.prc_valider} %
                                    </text>
                                </svg>
                                <span className={"text-success"}>Valider</span>
                            </div>
                        </div>
                    </div>
                    <div className="chart-container-wrapper">
                        <div className="chart-container">
                            <div className="chart-info-wrapper">
                                <h2>Total superficie</h2>
                                <span>{statistiques.publications?.total_superficie}</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="chart-row  two d-flex justify-content-center">
                    <div className="chart-container-wrapper small">
                        <div className="chart-container">
                            <div className="chart-container-header">
                                <h2>Publications par Moughataa</h2>
                            </div>
                            <hr style={{borderBottomWidth:1,borderBottomColor:"red",width:"100%"}}></hr>
                            {moughataas.map((moughataa,i) => (
                                moughataa.publicationList.length > 0 && (
                                <div key={i} className="progress-bar-info">
                                    <span className="progress-color applications"></span>
                                    <span className="progress-type">{moughataa.nom}</span>
                                    <span className="progress-amount">{moughataa.publicationList.length}</span>
                                </div>
                                )
                            ))}


                        </div>
                    </div>
                </div>
            </div>
            <div className="app-right   ">
                <button className="close-right">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
                <div className="profile-box">
                    <div className="profile-photo-wrapper">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"
                            alt="profile"
                        />
                    </div>
                    <p className="profile-text">{user?.username} </p>
                    <p className="profile-subtext">{user?.roles[0]?.roleName} </p>
                </div>
            </div>

        </>
    );
};

export default Statistiques;