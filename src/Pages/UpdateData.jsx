import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { updateData } from "../api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import "../CSS/IndexLayout.css";

export async function action({ request }) {
    const formData = await request.formData();

    const obj = {};
    if (formData.get("name")) {
        obj["name"] = formData.get("name");
    }
    if (formData.get("abbrevation")) {
        obj["abbreviation"] = formData.get("abbrevation");
    }
    if (formData.get("foundation")) {
        obj["fundation"] = formData.get("foundation");
    }
    console.log(obj);
    const queryString = Object.entries(obj)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    const url = `http://127.0.0.1:3002/api/v1/teams/search?${queryString}`;

    const datas = await axios(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        body: obj,
    });

    console.log(datas.data.data[0]);
    return datas.data.data[0] || null;
}

export default function UpdateData() {
    const actionData = useActionData();
    const navigate = useNavigate();

    const [inputComps, setInputComps] = useState([]);
    const [uName, setUName] = useState("");
    const [uAbbrevation, setUAbbrevation] = useState("");
    const [uFoundation, setUFoundation] = useState("");

    const handleButtonClick = (e) => {

        const name = e.target.innerText;
        let newInputComps = [];
        let j = 0;
        inputComps.forEach((element) => {
            if (name === element.props.inputName) {
                j++;
            } else {
                newInputComps.push(element);
            }
        })
        j === 0 && setInputComps([...inputComps, <CustomInput key={inputComps.length} inputName={e.target.innerText} />]);
        j > 0 && setInputComps([...newInputComps]);
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        switch (e.target.name) {
            case "Uname":
                setUName(e.target.value)
                break;
            case "Uabbreviation":
                setUAbbrevation(e.target.value)
                break;
            case "Ufundation":
                setUFoundation(e.target.value)
                break;
            default:
                break;
        }
    }
    const handleUpdate = async () => {
        let obj = [];
        obj[0] = {};
        if (uName) {
            obj[0]["name"] = uName;
        }
        if (uAbbrevation) {
            obj[0]["abbreviation"] = uAbbrevation;
        }
        if (uFoundation) {
            obj[0]["fundation"] = uFoundation;
        }
        obj[1] = actionData["_id"];
        console.log(obj)
        const update = await updateData(obj);
        console.log(update);
        await toast.promise(
            updateData(obj),
            {
                error: 'Hiba a keresés közben',
                success: `Sikeres frissítés! 👌`
            }
        )
        toast.done(`Sikeres frissítés! 👌`);
        setTimeout(() => {
            navigate("/")
        }, 2000)
    }
    return (
        <div className="updateData">
            <ToastContainer />
            <div className="updateButtons">
                <Button onClick={handleButtonClick} sx={{ backgroundColor: "#A3C6C4", color: "#354649", width: 200, height: 50 }} variant="contained" type="primary">Name</Button>
                <Button onClick={handleButtonClick} sx={{ backgroundColor: "#A3C6C4", color: "#354649", width: 200, height: 50 }} variant="contained" type="primary">Abbrevation</Button>
                <Button onClick={handleButtonClick} sx={{ backgroundColor: "#A3C6C4", color: "#354649", width: 200, height: 50 }} variant="contained" type="primary">Foundation</Button>
            </div>
            {inputComps.length > 0 &&
                <Form method="post" replace className="inputs">
                    {inputComps}
                    <Button sx={{ backgroundColor: "#A3C6C4", color: "#354649", width: 600, height: 50 }} type="primary">Search</Button>
                </Form>
            }
            {actionData !== undefined && inputComps.length > 0 &&
                <>
                    <Form className="inputs">
                        <TextField onChange={handleChange} sx={{ width: 300, height: 30 }} label="Name" name="Uname" variant="outlined" defaultValue={actionData["name"]} />
                        <TextField onChange={handleChange} sx={{ width: 300, height: 30 }} label="Abbrevation" name="Uabbreviation" variant="outlined" defaultValue={actionData["abbreviation"]} />
                        <TextField onChange={handleChange} sx={{ width: 300, height: 30 }} label="Foundation" name="Ufundation" variant="outlined" defaultValue={actionData["fundation"]} />
                        <Button onClick={handleUpdate} sx={{ backgroundColor: "#A3C6C4", color: "#354649", width: 600, height: 50 }}>Update</Button>
                    </Form>
                </>
            }
        </div>
    )
}

function CustomInput({ inputName }) {

    return (
        <TextField sx={{ width: 300, height: 30 }} label={inputName} name={inputName.toLowerCase()} variant="outlined" />
    )
}