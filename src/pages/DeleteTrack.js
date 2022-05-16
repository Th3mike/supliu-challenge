import React, { useState, useEffect } from "react";
import api from "../services/api";
import styled from "styled-components";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Pagination from "../components/Pagination";
import LoadSpinner from "../components/LoadSpinner"

const DivMain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
  align-items: center;
  font-size: 26px;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const TrackName = styled.p`
  display: flex;
`;

const TrackNull = styled.p`
  display: flex;
  color: yellow;
`;

export default function DeleteTrack() {
  const [albuns, setAlbuns] = useState([]);
  const [response, setResponse] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const get = async () => {
      const res = await api.get("album", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "maarcio_lacerda@hotmail.com",
        },
        params: {
          page: currentPage,
        },
      });
      setAlbuns(res.data.data);
      const total_pages = parseInt(
        Math.ceil(res.data.total / res.data.per_page)
      );
      if (pageCount !== total_pages) setPageCount(total_pages);
    };
    get().finally(() => {
      setLoaded(true);
    });
  }, [response, currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

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
      {albuns.length > 0 ? (
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
                      <div key={track.id}>
                        <TrackName>
                          <IoIosRemoveCircleOutline
                            onClick={() => deleteTrack(track.id)}
                            style={{
                              cursor: "pointer",
                              marginRight: "5px",
                              color: "yellow",
                            }}
                          ></IoIosRemoveCircleOutline>
                          Faixa: {track.title}
                          <span style={{ marginLeft: "10px" }}></span>
                        </TrackName>
                      </div>
                    ))}
                  </ul>
                </>
              ) : (
                <ul>
                  <li>
                    <TrackNull>Não há faixas no álbum</TrackNull>
                  </li>
                </ul>
              )}
            </List>
          ))}
        </ul>
      ) : (
        <p style={{ color: "red", fontSize: "26px" }}>Não há faixas por aqui</p>
      )}
      <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
    </DivMain>
  ) : (
    <LoadSpinner></LoadSpinner>
  );
}
