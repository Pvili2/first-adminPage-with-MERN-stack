import { TextField, Button } from "@mui/material"
import { Form, useActionData } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { createData } from "../api";
import "../CSS/IndexLayout.css"
import 'react-toastify/dist/ReactToastify.css';

export async function action({ request }) {
    const formData = await request.formData();
    const name = formData.get("name");
    const abbr = formData.get("abbreviation");
    const foundation = formData.get("fundation");
    return name && abbr && foundation ? formData : null;
}

export default function CreateData() {
    const formData = useActionData();

    const create = async (formD) => {
        const data = await createData(formD);

        toast.success("Data created!");
        return data;
    }

    formData && create(formData);

    return (
        <div className="getData">
            <ToastContainer />
            <Form method="post" className="create-form" replace>
                <TextField sx={{ width: 300, height: 30 }} label="Name" name="name" variant="outlined" />
                <TextField sx={{ width: 300, height: 30 }} label="Abbrevation" name="abbreviation" variant="outlined" />
                <TextField sx={{ width: 300, height: 30 }} label="Foundation" name="fundation" variant="outlined" />
                <Button sx={{ backgroundColor: "#A3C6C4", color: "#354649", }} variant="contained" type="primary">Create team</Button>
            </Form>
        </div>
    )
}