import React, { useState, useEffect } from "react";
import api from "../services/api";

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

  const deleteTrack = async (id, name) => {
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
    <>
      <ul>
        {albuns.map((album) => (
          <li key={album.id}>
            {album.name}
            {album.tracks.length > 0 ? (
              <>
                <ul>
                  {album.tracks.map((track) => (
                    <li key={track.id}>
                      {track.title}
                      <button onClick={() => deleteTrack(track.id)}>
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <br></br>
                <p style={{ color: "red", fontSize: "26px" }}>
                  <strong>Não há faixas neste album </strong>
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  ) : (
    <>Carregando</>
  );
}
