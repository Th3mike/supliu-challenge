/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../css/home.css";
import logo from "../assets/logo.png";
import styled from "styled-components";

const DivMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Campo = styled.div`
  width: 100%;
  margin-left: 25px;
  margin-right: 25px;
`;

const Valor = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  margin-bottom: 10%;
`;

export default function Home() {
  const [albuns, setAlbuns] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const get = async () => {
      const res = await api.get("album", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "maarcio_lacerda@hotmail.com",
        },
      });
      setAlbuns(res.data.data);
    };
    get().finally(() => {
      setLoaded(true);
    });
  }, []);

  const convertDuration = (duration) => {
    const newDuration = new Date(duration * 1000).toISOString().substr(11, 8);
    return newDuration;
  };

  return loaded ? (
    <div className="div-content font-custom">
      <div className="logo-content">
        <img src={logo} className="logo" />
        <h1>Discografia</h1>
      </div>
      <div className="search-content">
        <form>
          <label>Digite uma palavra chave</label>
          <input placeholder="Min" type="text" />
          <button type="submit">Procurar</button>
        </form>
      </div>
      {albuns.map((album) => (
        <DivMain key={album.id}>
          <h1 style={{ margin: "1.5%" }}>
            {album.name}, {album.year}
          </h1>
          {album.tracks.map((track) => (
            <div style={{ display: "flex" }} key={track.id}>
              <Campo>
                <strong>Nº</strong>
                <Valor>{track.number}</Valor>
              </Campo>
              <Campo>
                <strong>Faixa</strong>
                <Valor>{track.title}</Valor>
              </Campo>
              <Campo>
                <strong>
                  <div style={{ textAlign: "right" }}>Duração</div>
                </strong>
                <Valor style={{ textAlign: "right" }}>
                  {convertDuration(track.duration)}
                </Valor>
              </Campo>
            </div>
          ))}
        </DivMain>
      ))}
    </div>
  ) : (
    <>Carregando</>
  );
}
