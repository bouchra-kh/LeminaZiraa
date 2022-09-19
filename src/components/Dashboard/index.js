import React, { useEffect } from "react";
import "./dashboard.scss";

import { useSelector, useDispatch } from "react-redux";
import { SwitchMode } from "../../app/features/local-config";

const Dashboards = (props) => {
  const dispatch = useDispatch();

  const show = () => {
    document.getElementById("slide").classList.remove("d-none");
  };
  return (
    <>
      <div class="app-container ">
        <div class="app-main    p-3">
          <div class="main-header-line">
            <h1>Dashboard</h1>
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
          <div class="chart-row three">
            <div class="chart-container-wrapper">
              <div class="chart-container  ">
                <div class="chart-info-wrapper">
                  <h2>Taux de Livraisons</h2>
                  <span>19</span>
                </div>
                <div class="chart-svg">
                  <svg viewBox="0 0 36 36" class="circular-chart pink">
                    <path
                      class="circle-bg"
                      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    ></path>
                    <path
                      class="circle"
                      stroke-dasharray="30, 100"
                      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    ></path>
                    <text x="18" y="20.35" class="percentage">
                      30%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            <div class="chart-container-wrapper">
              <div class="chart-container">
                <div class="chart-info-wrapper">
                  <h2>Publication par Moughataa</h2>
                  <span>42</span>
                </div>
                <div class="chart-svg">
                  <svg viewBox="0 0 36 36" class="circular-chart blue">
                    <path
                      class="circle-bg"
                      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    ></path>
                    <path
                      class="circle"
                      stroke-dasharray="60, 100"
                      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    ></path>
                    <text x="18" y="20.35" class="percentage">
                      60%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            <div class="chart-container-wrapper">
              <div class="chart-container">
                <div class="chart-info-wrapper">
                  <h2>Nombre de Commandes</h2>
                  <span>78</span>
                </div>
                <div class="chart-svg">
                  <svg viewBox="0 0 36 36" class="circular-chart orange">
                    <path
                      class="circle-bg"
                      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    ></path>
                    <path
                      class="circle"
                      stroke-dasharray="90, 100"
                      d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                    ></path>
                    <text x="18" y="20.35" class="percentage">
                      90%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="chart-row two">
            <div class="chart-container-wrapper big">
              <div class="chart-container">
                <div class="chart-container-header">
                  <h2>Principaux Activités</h2>
                  <span>Les 30 derniers jours</span>
                </div>
                <div class="line-chart">
                  <canvas id="chart"></canvas>
                </div>
                <div class="chart-data-details">
                  <div class="chart-details-header"></div>
                </div>
              </div>
            </div>
            <div class="chart-container-wrapper small">
              <div class="chart-container">
                <div class="chart-container-header">
                  <h2>Taux de livraison</h2>
                  <span href="#">Ce mois-ci</span>
                </div>
                <div class="acquisitions-bar">
                  <span
                    class="bar-progress rejected"
                    style={{ width: "8%" }}
                  ></span>
                  <span
                    class="bar-progress on-hold"
                    style={{ width: "10%" }}
                  ></span>
                  <span
                    class="bar-progress shortlisted"
                    style={{ width: "18%" }}
                  ></span>
                  <span
                    class="bar-progress applications"
                    style={{ width: "64%" }}
                  ></span>
                </div>
                <div class="progress-bar-info">
                  <span class="progress-color applications"></span>
                  <span class="progress-type">Livraison</span>
                  <span class="progress-amount">64%</span>
                </div>
                <div class="progress-bar-info">
                  <span class="progress-color shortlisted"></span>
                  <span class="progress-type">Commandes</span>
                  <span class="progress-amount">18%</span>
                </div>
                <div class="progress-bar-info">
                  <span class="progress-color on-hold"></span>
                  <span class="progress-type">ligne de commandes</span>
                  <span class="progress-amount">10%</span>
                </div>
                <div class="progress-bar-info">
                  <span class="progress-color rejected"></span>
                  <span class="progress-type">publication</span>
                  <span class="progress-amount">8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="app-right   ">
          <button class="close-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div class="profile-box">
            <div class="profile-photo-wrapper">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"
                alt="profile"
              />
            </div>
            <p class="profile-text">User nom et prenom</p>
            <p class="profile-subtext">Role </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboards;
