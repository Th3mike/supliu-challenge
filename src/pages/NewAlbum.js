import React, { useState } from "react";
import api from "../services/api";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function NewAlbum() {
  const [response, setResponse] = useState({});

  const albumSchema = yup.object().shape({
    year: yup
      .string()
      .test("len", "Exemplo: 2022", (val) => val.length === 4)
      .required("1")
      .typeError("Amount must be a number"),
    name: yup.string().required("Digite o nome do álbum"),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(albumSchema),
  });

  const { errors } = formState;

  const onSubmit = async (data) => {
    setResponse({});
    await api
      .post("album", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "maarcio_lacerda@hotmail.com",
        },
      })
      .catch((res) => {
        setResponse(res.response.data);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="name"
          label="Nome do album"
          errorMsg={errors.name?.message}
          register={register}
        />

        <Input
          type="number"
          name="year"
          label="Ano"
          errorMsg={errors.year?.message}
          register={register}
        />
        <button type="submit">Criar Álbum</button>
      </form>
      {response && response.error}
    </>
  );
}
