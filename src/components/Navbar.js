import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <Link to="/">Início </Link>
      <Link to="/album/new">Criar Álbum </Link>
      <Link to="/track/new">Criar Faixa </Link>
      <Link to="/album/delete">Deletar Álbum </Link>
      <Link to="/track/delete">Deletar Faixa </Link>
    </div>
  );
}
