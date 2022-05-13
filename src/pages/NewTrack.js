import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Select from "../components/Select";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    duration: yup.number().required('Requirido').typeError('Por favor insira somente números!'),
    title: yup.string().required('Requirido'),
    number: yup.number().required('Requirido').typeError('Por favor insira somente números!').min(1, "Minimo é 01").max(30, "máximo é 30")
  })

  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(trackSchema)
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

    await api.post("track", track, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "maarcio_lacerda@hotmail.com",
      },
    }).catch((res)=> {
      setResponse(res.response.data);
    });
  };

  return loaded ? (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {albuns && (
          <>
            <Select
              name="album"
              label="Selecione um album"
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

        <Input type="number" name="number" label="Número" errorMsg={errors.number?.message} register={register} />

        <Input
          type="number"
          name="duration"
          label="Duração"
          errorMsg={errors.duration?.message}
          register={register}
        />
        <button type="submit"> Enviar </button>
      </form>
      { response && response.error }
    </>
  ) : (
    <>Carregando</>
  );
}
