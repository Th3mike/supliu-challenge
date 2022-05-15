import React, { useState } from "react";
import api from "../services/api";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

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
    <DivMain>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="name"
          label="Nome do álbum"
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
        <Button type="submit">Criar Álbum</Button>
      </form>
      {response && response.error}
    </DivMain>
  );
}
