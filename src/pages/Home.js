import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../css/home.css";

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
<ul>
            {albuns.map((album) => (
              <li key={album.id}>
                {album.name}

                <ul>
                  {album.tracks.map((track) => (
                    <li key={track.id}>{track.title} - {convertDuration(track.duration)}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
    </div>
  ) : (
    <>Carregando</>
  );
}
