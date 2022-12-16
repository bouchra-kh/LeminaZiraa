
import users from "../data/data-users";
import './style.css';
import { BsCardList, BsFillGrid1X2Fill } from "react-icons/bs";
import { BiSort, BiDotsHorizontalRounded } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { SwitchMode, toGrid, ToList } from "../../app/features/local-config";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { MdDelete } from 'react-icons/md';
import {MdModeEdit } from 'react-icons/md';
import { userSlice,useGetUsersQuery,useDeleteUserMutation } from "./users-services";
import { ADMIN, UserHasAccess } from "../extends/GlobalFunctions";
export default function Users() {
  const dispatch = useDispatch();
  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    setInputText( e.target.value);

  };
  const responseInfos=[];
  const responseInfo =useGetUsersQuery();
 const  [deleteUser]  =useDeleteUserMutation();

console.log("userrrr")
 console.log("Reponse: ", responseInfo)
  console.log("Data: ", responseInfo.data);
  // console.log("Delete: ", deleteWilaya)
  // console.log("success: ", responseInfo.isSuccess);
  console.log("inputtext:",inputText);

  if (responseInfo.isLoading) {
    return <div>recherch....</div>
  }
  if (responseInfo.isError) {
    return <div>erreur :{responseInfo.error.data}</div>
  }
  if(inputText!=''){
    responseInfo.data.map((user, position) => {
      if (inputText==user.username) {
        console.log("hhhhhhhhhh")

         ;
         responseInfos.push(user);
         //const wilaya=responseInfos[0];


      }

    }

    );
  }

  return (
    <>
      <div className="app-content  ">
        <div className="d-flex flex-row  justify-content-between mb-3">
          <h1 className="app-content-headerText">les utilisateurs</h1>
          <div className="action-buttons">
            <button
              className="mode-switch"
              title="Switch Theme"
              onClick={() => dispatch(SwitchMode())}
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
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="row ">
        <div className="col  col-6">

        </div>
        {
              UserHasAccess(ADMIN) &&           <div className="col col-6  app-content-header justify-content-end  fixed">

        </div>}
        </div>
        <div className="app-content-actions fixed">
          <input onChange={inputHandler} className="search-bar" placeholder="Search..." type="text" />

          <div className="app-content-actions-wrapper">
            <button
              className="action-button list active"
              title="List View"
              onClick={() => dispatch(ToList())}
            >
              <BsCardList />
            </button>
            <button
              className="action-button grid"
              title="Grid View"
              onClick={() => dispatch(toGrid())}
            >
              <BsFillGrid1X2Fill />
            </button>
          </div>
        </div>
        <div
          className="products-area-wrapper tableView  "
          style={{ overflow: "scroll", height: "80vh" }}
        >
          <div className="products-header">
            <div className="product-cell image">
              Id
              <button className="sort-button">
                <BiSort />
              </button>
            </div>
            <div className="product-cell category">
             Nom
              <button className="sort-button">
                <BiSort />
              </button>
            </div>
            <div className="product-cell category">
            Adresse
              <button className="sort-button">
              <BiSort />
              </button>
            </div>
            <div className="product-cell category">
            Telephone
              <button className="sort-button">
              <BiSort />
              </button>
            </div>
            <div className="product-cell category">
            Email
              <button className="sort-button">
                <BiSort />
              </button>
            </div>
            <div className="product-cell category">

              <button className="sort-button">

              </button>
            </div>
            {
              UserHasAccess(ADMIN) &&        <div className="product-cell category">


            </div>}
            {
              UserHasAccess(ADMIN) &&         <div className="product-cell category" style={{    marginRight:"55px" }}>
              Actions

            </div>}
          </div>

          {
           responseInfos.length==0?
          responseInfo.data.map((wilaya, position) => {
            return (
              <div className="products-row" key={position}>
                <button className="cell-more-button">
                  <BiDotsHorizontalRounded />
                </button>
                <div className="product-cell category">
                  <span className="cell-label">Id :</span>
                  {wilaya.id}
                </div>

                <div className="product-cell category">
                  <span className="cell-label">Nom  :</span>
                  {wilaya.username}
                </div>

                <div className="product-cell category">
                  <span className="cell-label"></span>
                  {wilaya.adresse}
                </div>
                <div className="product-cell category">
                  <span className="cell-label"></span>
                  {wilaya.telephone}
                </div>
                <div className="product-cell category">
                  <span className="cell-label"></span>
                  {wilaya.email}
                </div>

                {
               UserHasAccess(ADMIN) &&   <div className="product-cell category">

    <MdDelete style={{   fontSize:"22px" , color:"red" , marginLeft:"260px" }}onClick={() => {deleteUser(responseInfos[0].id)}}/>




    </div>

                }
  {
               UserHasAccess(ADMIN) &&  <div className="product-cell category">
    <NavLink to={"update/"+wilaya.id}>
            {" "}
            <MdModeEdit style={{   fontSize:"22px" , color:"green"  }}/>
      </NavLink>
    </div>
          }
              </div>
            );
          }):
          <div className="products-row" >
          <button className="cell-more-button">
            <BiDotsHorizontalRounded />
          </button>
          <div className="product-cell category">
            <span className="cell-label">Id :</span>
            {responseInfos[0].id}
          </div>
          <div className="product-cell category">
            <span className="cell-label">Nom :</span>
            {responseInfos[0].username}
          </div>

          {
            UserHasAccess(ADMIN) &&
            <div className="product-cell category">

            <MdDelete style={{   fontSize:"22px" , color:"red" , marginLeft:"200px" }}onClick={() => {deleteUser(responseInfos[0].id)}}/>
            </div>
            }
            {
                  UserHasAccess(ADMIN) &&
            <div className="product-cell category">
            <NavLink to={"update/"+responseInfos[0].id}>
                  {" "}
            <button className="bc2" style={{    marginLeft:"50px" }}>Actions</button>
            </NavLink>
            </div>}

                    </div>



                    }

                    </div>
                  </div>
                </>
              );



            //   return (
            //     <>
            //       <div className="app-content  ">
            //         <div className="d-flex flex-row  justify-content-between mb-3">
            //           <h1 className="app-content-headerText">Users</h1>
            //           <div className="action-buttons">
            //             <button
            //               className="mode-switch"
            //               title="Switch Theme"
            //               onClick={() => dispatch(SwitchMode())}
            //             >
            //               <svg
            //                 className="moon"
            //                 fill="none"
            //                 stroke="currentColor"
            //                 strokeLinecap="round"
            //                 strokeLinejoin="round"
            //                 strokeWidth="2"
            //                 width="24"
            //                 height="24"
            //                 viewBox="0 0 24 24"
            //               >
            //                 <defs></defs>
            //                 <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            //               </svg>
            //             </button>
            //             <div className="action-buttons">
            //               <button className="menu-button" onClick={() => show()}>
            //                 <svg
            //                   xmlns="http://www.w3.org/2000/svg"
            //                   id="menu"
            //                   width="24"
            //                   height="24"
            //                   viewBox="0 0 24 24"
            //                   fill="none"
            //                   stroke="currentColor"
            //                   strokeWidth="2"
            //                   strokeLinecap="round"
            //                   strokeLinejoin="round"
            //                   className="feather feather-menu"
            //                 >
            //                   <line x1="3" y1="12" x2="21" y2="12" />
            //                   <line x1="3" y1="6" x2="21" y2="6" />
            //                   <line x1="3" y1="18" x2="21" y2="18" />
            //                 </svg>
            //               </button>
            //             </div>
            //           </div>
            //         </div>
            //         <div className="app-content-header justify-content-end  fixed">
            //           <NavLink to={"new"}>
            //             {" "}
            //             <button className="app-content-headerButton">Ajouter user</button>
            //           </NavLink>
            //         </div>
            //         <div className="app-content-actions fixed">
            //           <input className="search-bar" placeholder="Search..." type="text" />
            //           <div className="app-content-actions-wrapper">
            //             <button
            //               className="action-button list active"
            //               title="List View"
            //               onClick={() => dispatch(ToList())}
            //             >
            //               <BsCardList />
            //             </button>
            //           </div>
            //         </div>
            //         <div
            //           className="products-area-wrapper tableView  "
            //           style={{ overflow: "scroll", height: "80vh" }}
            //         >
            //           <div className="products-header">
            //             <div className="product-cell category">
            //               Id
            //               <button className="sort-button">
            //                 <BiSort />
            //               </button>
            //             </div>
            //             <div className="product-cell image">
            //               User nom
            //               <button className="sort-button">
            //                 <BiSort />
            //               </button>
            //             </div>
            //             <div className="product-cell category">
            //               Supprimer

            //             </div>
            //             <div className="product-cell category">
            //               Modifier
            //           </div>
            //           </div>
            //           {responseInfo.length==0?
            //           responseInfo.data.map((user, position) => {
            //             return (
            //               <div className="products-row" key={position}>
            //                 <button className="cell-more-button">
            //                   <BiDotsHorizontalRounded />
            //                 </button>

            //                 <div className="product-cell category">
            //                   <span className="cell-label">Id :</span>
            //                   {user.id}
            //                 </div>
            //                 <div className="product-cell category">
            //                   <span className="cell-label">nom:</span>
            //                   {user.username}
            //                 </div>
            //                 {/* <div className="product-cell image   ">
            //                   <img src={user.image} />
            //                   <span>
            //                     {" "}
            //                     {user.username}
            //                   </span>
            //                 </div> */}
            //                 <div className="product-cell category">

            //       <button className="bc"onClick={() => {deleteUser(user.id)}}>Suprimer</button>
            //     </div>


            //     <div className="product-cell category">
            //     <NavLink to={"update/"+user.id}>
            //             {" "}
            //       <button className="bc2">Modifier</button>
            //       </NavLink>
            //     </div>

            //               </div>
            //             );
            //             }):
            //           <div className="products-row" >
            //           <button className="cell-more-button">
            //             <BiDotsHorizontalRounded />
            //           </button>
            //           <div className="product-cell category">
            //             <span className="cell-label">Id :</span>
            //             {/* {responseInfo[0].id} */}
            //           </div>
            //           <div className="product-cell category">
            //             <span className="cell-label">Nom et prenom user :</span>
            //             {/* {responseInfo[0].nom} */}
            //           </div>


            // {/* <div className="product-cell category">

            // <button className="bc"onClick={() => {deleteUser(responseInfo[0].id)}}>Suprimer</button>
            // </div> */}


            // {/* <div className="product-cell category">
            // <NavLink to={"update/"+responseInfo[0].id}>
            //       {" "}
            // <button className="bc2">Modifier</button>
            // </NavLink>
            // </div> */}

            //         </div>
            // }





            //         </div>
            //       </div>
            //     </>
            //   );



                      }