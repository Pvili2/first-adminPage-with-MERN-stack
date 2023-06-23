import { getAllData } from "../api"
import { useLoaderData } from "react-router"

export async function loader() {
    const data = await getAllData();

    return data.data;
}

export default function DeleteData() {

    const loaderData = useLoaderData();

    return (
        <div className="getData">
            Adatok törlése
        </div>
    )
}