import React, { useState, useEffect } from "react";
import api from "../services/api";
import styled from "styled-components";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const DivMain = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.815);
  border-radius: 3px;
  margin-top: 2.5%;
  -webkit-box-shadow: 5px 5px 20px 10px #000000;
  box-shadow: 5px 5px 20px 10px #000000;
  color: white;
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  font-size: 26px;
`;

export default function DeleteTrack() {
  const [albuns, setAlbuns] = useState([]);
  const [response, setResponse] = useState([]);
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
  }, [response]);

  const deleteTrack = async (id) => {
    const res = await api
      .delete(`track/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "maarcio_lacerda@hotmail.com",
        },
      })
      .then((res) => {
        const { status } = res;

        if (status === 200) {
          alert(`Faixa deletada!`);
          setResponse(res);
        }
      });
    setResponse(res);
  };

  return loaded ? (
    <DivMain>
      <ul>
        {albuns.map((album) => (
          <List key={album.id}>
            <p>
              <strong>Álbum: {album.name}</strong>
            </p>
            {album.tracks.length > 0 ? (
              <>
                <ul style={{ display: "flex" }}>
                  {album.tracks.map((track) => (
                    <List key={track.id}>
                      <p>
                        {" "}
                        <IoIosRemoveCircleOutline
                          onClick={() => deleteTrack(track.id)}
                          style={{
                            fontSize: "26px",
                            cursor: "pointer",
                            marginRight: "5px",
                            color: "yellow",
                          }}
                        ></IoIosRemoveCircleOutline>
                        Faixa: {track.title}
                      </p>
                    </List>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <br></br>
                <li style={{ color: "red", fontSize: "26px" }}>
                  <strong>Não há faixas no álbum: {album.name} </strong>
                </li>
              </>
            )}
          </List>
        ))}
      </ul>
    </DivMain>
  ) : (
    <>Carregando</>
  );
}
