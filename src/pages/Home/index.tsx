import React, { useEffect, useState } from "react";
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { IClient } from "../../interfaces/IClient";
import clientsServices from "../../resources/services/clientsServices";
import List from "./components/List";
import * as yup from "yup";
import { useFormik } from "formik";
import { getGender } from "../../utils/getGender";
import { DatePicker } from "@mui/lab";

const validationSchema = yup.object({
    name: yup
        .string()
        .required("Error: Campo obrigatório"),
    gender: yup
        .string()
        .required("Error: Campo obrigatório"),
    birthDate: yup
        .string()
        .required("Error: Campo obrigatório"),
    email: yup
      .string()
      .email("Digite um e-mail válido")
      .required("Error: Campo obrigatório"),
});

function Home(): React.ReactElement {
    const [clients, setClients] = useState<IClient[]>([]);
    const [clientId, setClientId] = useState<number>(-1);
    const [genders, setGenders] = useState([]);
    const formik = useFormik({
        initialValues: {
          name: "",
          gender: "",
          birthDate: "",
          email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values: IClient) => {
          handleSubmit(values);
        },
    });

    useEffect(() => {
        async function getClients() {
            try {
                const response = await clientsServices.get();
                const { data } = response;
                setClients(data);
            } catch (error) {
                alert(error);
            }
        };

        if(clients.length === 0) {
            getClients();
        };

    }, [clients]);

    useEffect(() => {
        async function getGenders() {
            try {
                const response = await clientsServices.getGenders();
                const { data } = response;
                setGenders(data);
            } catch (error) {
                alert(error);
            }
        };

        if(genders.length === 0) {
            getGenders();
        };

    }, [genders]);

    const handleDelete = async (payload: IClient) => {
        try {
            const response = await clientsServices.delete(payload);
            const { data } = response.data;
            const updateClients = clients
                .filter((client) => client.id !== data.id);
            setClients(updateClients);   
        } catch (error) {
            alert(error);
        }
    }

    const handleEdit = async (client: IClient) => {
        formik.resetForm();
        setClientId(client.id as number);
        formik.setFieldValue("name", client.name);
        formik.setFieldValue("gender", client.gender);
        formik.setFieldValue("birthDate", client.birthDate);
        formik.setFieldValue("email", client.email);
    }

    const handleCancel = () => {
        setClientId(-1);
        formik.resetForm();
    }

    const handleSubmit = async (payload: IClient) => {
        try {
            if(clientId < 0) {
                const response = await clientsServices.post(payload);
                const { data, error } = response.data;
                if(error) {
                    alert(error);
                    return;
                }
                if(data) {
                    alert("Salvo com sucesso!");
                }
                setClients([...clients, { ...data }]);
            };
            if(clientId > 0) {
                const response = await clientsServices.patch({
                    ...payload,
                    id: clientId,
                });
                const { data, error } = response.data;
                if(error) {
                    alert(error);
                    return;
                }
                if(data) {
                    alert("Atualizado com sucesso!");
                }
                const updateClients = clients
                    .filter((client) => client.id !== clientId);
                setClients([...updateClients, { ...data }]);
                setClientId(-1);
            }
            formik.resetForm();
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Grid container rowSpacing={10}>
            <Grid item xs={12}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Nome"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        style={{ marginBottom: "16px" }}
                    />
                    <FormControl 
                        fullWidth 
                        style={{ marginBottom: "16px" }} 
                        error={formik.touched.name && Boolean(formik.errors.name)}
                    >
                        <InputLabel>Sexo</InputLabel>
                        <Select
                            name="gender"
                            label="Sexo"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            {genders.map((gender) => 
                                <MenuItem key={gender} value={gender}>{getGender(gender)}</MenuItem>
                            )}
                        </Select>
                        <FormHelperText>
                            { 
                                formik.touched.name && 
                                Boolean(formik.errors.name) && 
                                formik.touched.name && 
                                formik.errors.name
                            }
                        </FormHelperText>
                    </FormControl>
                    <DatePicker
                        mask="__/__/____"
                        inputFormat="dd/MM/yyyy"
                        label="Dt Nascimento"
                        onChange={(value) => formik.setFieldValue("birthDate", value)}
                        value={formik.values.birthDate}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                id="birthDate"
                                name="birthDate"
                                value={formik.values.birthDate}
                                error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                                helperText={formik.touched.birthDate && formik.errors.birthDate}
                                style={{ marginBottom: "16px" }}
                            />
                        )}
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="E-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        style={{ marginBottom: "16px" }}
                    />
                    {clientId < 0
                        ? ( 
                            <Button color="primary" variant="contained" fullWidth type="submit">
                                Salvar
                            </Button>
                        ) : (
                            <Grid display="flex">
                                <Button color="info" variant="contained" fullWidth type="submit">
                                    Atualizar
                                </Button>
                                <Button color="warning" variant="contained" fullWidth onClick={handleCancel} >
                                    Cancelar
                                </Button>
                            </Grid>
                        )
                    }
                </form>
            </Grid>
            <Grid item xs={12}>
                <List
                    clients={clients}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            </Grid>
        </Grid>
    )
}

export default Home;