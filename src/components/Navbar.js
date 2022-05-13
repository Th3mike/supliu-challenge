import React from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";

export default function Navbar() {
  return (
    <nav className="topnav">
      <div className="topnav-centered">
        <NavLink
          to="/"
          className="a-link"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#FBFF00",
                }
              : { color: "#FFFFFF" }
          }
        >
          Início
        </NavLink>
      </div>
      <NavLink
        to="/album/new"
        className="a-link"
        style={({ isActive }) =>
          isActive
            ? {
                color: "#FBFF00",
              }
            : { color: "#FFFFFF"}
        }
      >
        Criar Álbum
      </NavLink>
      <NavLink
          to="/album/delete"
          className="a-link"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#FBFF00",
                }
              : { color: "#FFFFFF" }
          }
        >
          Deletar Álbum
        </NavLink>
      <NavLink
        to="/track/new"
        className="a-link"
        style={({ isActive }) =>
          isActive
            ? {
                color: "#FBFF00",
              }
            : { color: "#FFFFFF" }
        }
      >
        Criar Faixa
      </NavLink>
      <div className="topnav-right">
        <NavLink
          to="/track/delete"
          className="a-link"
          style={({ isActive }) =>
            isActive
              ? {
                  color: "#FBFF00",
                }
              : { color: "#FFFFFF"}
          }
        >
          Deletar Faixa
        </NavLink>
      </div>
    </nav>
  );
}
