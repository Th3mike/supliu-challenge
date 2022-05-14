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

const DivResult = styled.div`
  display: flex;
  margin-left: 40px;
`;

export default function Home() {
  const [albuns, setAlbuns] = useState([]);
  const [query, setQuery] = useState("");
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
          <label className="label-home">
            Digite uma palavra chave para pesquisar um álbum
          </label>
          <input
            placeholder="Min"
            type="text"
            className="input-home"
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="home-button">
            Procurar
          </button>
          {query.length > 0 && (
            <DivResult>
              <p>
                <strong>Resultado da pesquisa:</strong>
              </p>
            </DivResult>
          )}
          {albuns
            .filter((album) => {
              if (query === "") {
                return album;
              } else if (
                album.name.toLowerCase().includes(query.toLowerCase())
              ) {
                return album;
              }
            })
            .map((album, index) => (
              <div key={index}>
                {query.length > 0 && (
                  <ul>
                    <li>
                      <strong>
                        ◦ {album.name}, {album.year}
                      </strong>
                    </li>
                  </ul>
                )}
              </div>
            ))}
        </form>
      </div>
      {albuns.map((album) => (
        <DivMain key={album.id}>
          <h1 style={{ margin: "1.5%" }}>
            {album.name}, {album.year}
          </h1>
          {album.tracks.map((track) => (
            <div
              style={{ display: "flex", backgroundColor: "#f8f7f7" }}
              key={track.id}
            >
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
