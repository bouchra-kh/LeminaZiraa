import React, { useState } from "react";
import { useCreateCommandesMutation } from "./commandes-services";
import { useSelector, useDispatch } from "react-redux";
import { SwitchMode, toGrid, ToList } from "../../app/features/local-config";
export default function CommandesNew() {
  const dispatch = useDispatch();
  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
  const [etatCommande, setEtatCommande] = useState("");
  const [createCommandes] = useCreateCommandesMutation();
  return (
    <div class="app-content  ">
      <div className="d-flex flex-row  justify-content-between mb-3">
        <h1 class="app-content-headerText">Nouveaux Commandes</h1>
        <div class="action-buttons">
          <button
            class="mode-switch"
            title="Switch Theme"
            onClick={() => dispatch(SwitchMode())}
          >
            <svg
              class="moon"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <defs></defs>
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
          </button>
          <div class="action-buttons">
            <button class="menu-button" onClick={() => show()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="menu"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <form
        className="form-add"
        onSubmit={(e) => {
          e.preventDefault();
          createCommandes({
            etat_commande: etatCommande,
          });
        }}
      >
        <div className="form-add-item">
          <h2 className="app-content-headerText">Etat Comande</h2>
          <input
            placeholder="Etat Comande"
            onChange={(e) => setEtatCommande(e.target.value)}
          />
        </div>

        <div className="footer-button">
          <button type="submit" className="app-content-headerButton">
            {" "}
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
