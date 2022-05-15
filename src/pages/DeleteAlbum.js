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
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 26px;
  display: flex;
`;

export default function DeleteAlbum() {
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

  const deleteAlbum = async (id, name) => {
    const res = await api
      .delete(`album/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "maarcio_lacerda@hotmail.com",
        },
      })
      .then((res) => {
        const { status } = res;

        if (status === 200) {
          alert(`Album ${id + "-" + name} deletado!`);
          setResponse(res);
        }
      });
  };

  return loaded ? (
    <DivMain>
      {albuns.length > 0 ? (
        <>
          <ul>
            {albuns.map((album) => (
              <List key={album.id}>
                <IoIosRemoveCircleOutline
                  onClick={() => deleteAlbum(album.id, album.name)}
                  style={{
                    fontSize: "26px",
                    marginRight: "5px",
                    cursor: "pointer",
                    color: "yellow",
                  }}
                ></IoIosRemoveCircleOutline>

                {album.name}
              </List>
            ))}
          </ul>
        </>
      ) : (
        <p style={{ color: "red", fontSize: "26px" }}>Não há albuns por aqui</p>
      )}
    </DivMain>
  ) : (
    <>Carregando</>
  );
}
