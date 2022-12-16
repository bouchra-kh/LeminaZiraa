import {getUser} from "../extends/GlobalFunctions"
import axios from "axios";
import {useEffect, useState} from "react";
import BarChart from "./BarChart";
//import { Data } from "./Data";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
const show = () => {
    document.getElementById("slide").classList.remove("d-none");
};
const Statistiques = () => {
    const [chartData, setChartData] = useState({


  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]

      });
    //const [loading, setLoading] = useState(true);
    const [moughataas, setMoughataas] = useState([]);
    const [statistiques, setStatistiques] = useState({
        'publications': {}
    });
    useEffect(() => {
       // setLoading(true);
        axios.get("/moughataaa/calcule").then((res) => {
            console.log("dddddddddd",res.data);
            setStatistiques(res);
        })
        axios.get("/moughataaa/calcule2").then((res) => {
          console.log("dddddddddd",res.data);
          setMoughataas(res);
      })


    }, []);


    const user = getUser();



    return (
        <>
        <div className="App ml-5">
	<h1>Statistiques des Moughataas par années</h1>
	<div style={{ maxWidth: "650px" }}>
		<Bar
		data={{
			// Name of the variables on x-axies for each bar
			labels: statistiques.data,
			datasets: [
			{
				// Label for bars
				label: "quantite par anne",
				// Data or value of your each variable
			//	data: [1552, 1319, 61, 140,152, 119, 13, 100,152, 139, 1, 14,152, 131, 63, 0,152, 19, 613],
				data:moughataas.data,
      // Color of each bar
				backgroundColor: ["aqua", "green", "red", "yellow"],
				// Border color of each bar
				borderColor: ["aqua", "green", "red", "yellow"],
				borderWidth: 0.5,
			},
			],
		}}
		// Height of graph
		height={400}
		options={{
			maintainAspectRatio: false,
			scales: {
			yAxes: [
				{
				ticks: {
					// The y-axis value will start from zero
					beginAtZero: true,
				},
				},
			],
			},
			legend: {
			labels: {
				fontSize: 15,
			},
			},
		}}
		/>
	</div>
	</div>
   {/* <div className="App">

      <BarChart chartData={chartData} />
    </div> */}

        </>
    );
};

export default Statistiques;