import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Select from "../components/Select";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadSpinner from "../components/LoadSpinner"

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

const Button = styled.button`
  width: 100%;
  margin-top: 30px;
  height: 35px;
  font-size: 18px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  color: white;
  background-color: rgb(12, 136, 216);
  margin-bottom: 10px;
  &:hover {
    background-color: rgb(12, 80, 216);
  }
`;

const Error = styled.span`
  color: yellow;
  justify-content: center;
`;

export default function NewTracks() {
  const [albuns, setAlbuns] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [response, setResponse] = useState({});

  //pega todos os albuns
  useEffect(() => {
    const get = async () => {
      const res = await api.get("album", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "maarcio_lacerda@hotmail.com",
        },
      });
      setAlbuns(res?.data.data);
    };
    get().finally(() => {
      setLoaded(true);
    });
  }, []);

  const trackSchema = yup.object().shape({
    duration: yup
      .number()
      .required("Requirido")
      .typeError("Por favor insira somente números!"),
    title: yup.string().required("Insira um nome à faixa"),
    number: yup
      .number()
      .required("Requirido")
      .typeError("Por favor insira somente números!")
      .min(1, "Minimo é 01")
      .max(10000, "máximo é 10000"),
  });

  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(trackSchema),
  });

  const { errors } = formState;

  const albumId = watch("album");

  const onSubmit = async (data) => {
    setResponse({});
    const track = {
      album_id: albumId,
      duration: data.duration,
      title: data.title,
      number: data.number,
    };

    const res = await api
      .post("track", track, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "maarcio_lacerda@hotmail.com",
        },
      })
      .catch((res) => {
        setResponse(res.response.data);
      })
      .then((res) => {
        const { status } = res;

        if (status === 200) {
          alert("Faixa adicionada!");
          setResponse(res);
        }
      });
    setResponse(res);
  };

  return loaded ? (
    <DivMain>
      <form onSubmit={handleSubmit(onSubmit)}>
        {albuns && (
          <>
            <Select
              name="album"
              label="Selecione um álbum"
              values={albuns}
              register={register}
            />
          </>
        )}

        <Input
          type="text"
          name="title"
          label="Nome da faixa"
          errorMsg={errors.title?.message}
          register={register}
        />

        <Input
          type="number"
          name="number"
          label="Número"
          errorMsg={errors.number?.message}
          register={register}
        />

        <Input
          type="number"
          name="duration"
          label="Duração"
          errorMsg={errors.duration?.message}
          register={register}
        />
        <Button type="submit"> Enviar </Button>
        <Error>{response && response.error}</Error>
      </form>
    </DivMain>
  ) : (
    <LoadSpinner></LoadSpinner>
  );
}
