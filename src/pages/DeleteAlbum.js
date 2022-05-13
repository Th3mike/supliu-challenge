import React, { useState, useEffect } from "react";
import api from "../services/api";

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
    get().finally(()=> {
      setLoaded(true);
    });
  }, [response]);

  const deleteAlbum = async (id, name) => {
    const res = await api.delete(`album/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "maarcio_lacerda@hotmail.com",
      },
    }).then((res) => {
      const { status } = res;

      if (status === 200) {
        alert(`Album ${id+"-"+name} deletado!`);
        setResponse(res);
      }
    });
  };

  return (
    loaded ? (
      <>
      {albuns.length > 0 ? <><ul>
          {albuns.map((album) => (
            <li key={album.id}>
              {album.name}

              <button onClick={() => deleteAlbum(album.id, album.name)}>
                      Remover
              </button>
            </li>
          ))}
        </ul></> : <>Não há albuns por aqui</>}    
      </>
    ) : (<>Carregando</>)
  );
}
