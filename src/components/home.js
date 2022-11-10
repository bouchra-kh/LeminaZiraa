import React from "react";
import './home.css'


const Home = () => {
    
  
    return (
      <div id="myCarousel" class="carousel slide" data-ride="carousel">

  <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
  </ol>
  <p style={{  color: "green",marginTop:"14px" , fontSize:"25px" , marginRight:"30px"  }}>Bienvenue a l'agriculture</p>
  


  <div class="carousel-inner">
    <div class="item active">
      <img src="https://modernfarmer.com/wp-content/uploads/2021/01/shutterstock_653708227.jpg"/>
    </div>

  
  </div>


  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a><b/>
 
</div>



    
    );
  };
  
  export default Home;
  