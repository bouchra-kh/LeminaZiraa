import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import {
    BrowserRouter as Router,
    
    useParams
  } from 'react-router-dom'
  import {useGetUsersQuery,useGetUserByIdQuery,useUpdateUserMutation} from "./users-services";
import axios from "axios";

export default function UsersUpdate() {
    const { id } = useParams();

  const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const result = await axios.get(`user/${id}`);
            setUser(result.data);
        };
        fetchData().then(r=>{
            axios.get('roles').then(res=>{
                setRoles(res.data)
                setLoading(false);
            })
        });
    }, []);

  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);



if (loading) {
        return <div>Loading...</div>;

}
  return (
    <div class="login d-flex flex-column">
      <h1 className="my-2">Modifier</h1>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-dark">
                       utilisateur modifié avec succés
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        <button type="button" onClick={()=>{
                            // eslint-disable-next-line no-undef
                            const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
                            myModal.hide();
                            setTimeout(() => {
                                window.location.href="/users";
                            }, 1000);

                        }} className="btn btn-primary">retourner vers la liste</button>
                    </div>
                </div>
            </div>
        </div>
     
      <form
        className=""
        onSubmit={(e) => {

          e.preventDefault();

          axios.put(`user_update/${id}`, user).then((res) => {
              // open modal
              // eslint-disable-next-line no-undef
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
                myModal.show();
          }).catch((err) => {
                console.log(err);
          });
        }}
      >
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          required="required"
        />
          <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              required="required"
          />
          <input
              type="text"
              value={user.adresse}
              onChange={(e) => setUser({ ...user, adresse: e.target.value })}
              placeholder="Adresse"
              required="required"
          />
          <input
              type="number"
              value={user.telephone}
              onChange={(e) => setUser({ ...user, telephone: e.target.value })}
              placeholder="Telephone"
              required="required"
          />
          <select

              onChange={(e) => setUser({ ...user, roles: [{"id":parseInt(e.target.value)}] })}
              value={user.roles?.length>0?user.roles[0].id:undefined}
               className="form-control my-2">
                {roles?.map((role,key) => (
                    <option  key={key} value={role.id}>{role.roleName}</option>
                ))}
          </select>
        {/* <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required="required"
        /> */}
        {/* <input
          type="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required="required"
        /> */}
         
       <button class="btn btn-primary btn-block btn-large" type="submit">
        Modifier user</button>
      
        {/* <button class="btn btn-primary btn-block btn-large" type="submit">
          Sign up
        </button> */}
        {/* <NavLink to="/login">
          <button class="btn btn-success btn-block btn-large  mt-3">
            Login
          </button>
        </NavLink> */}
      </form>
    </div>
  );
}
