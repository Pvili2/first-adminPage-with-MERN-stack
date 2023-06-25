import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { getAllData, getData, deleteData } from "../api"
import { useLoaderData, useActionData } from "react-router"
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2'
import search from "../images/search.png"
import 'react-toastify/dist/ReactToastify.css';

export async function loader() {
    const data = await getAllData();

    return data.data;
}

export async function action({ request }) {
    const formData = await request.formData();
    let dataValue = formData.get("search")
    let key = formData.get("slct-btn");

    let getdata = await getData(key, dataValue);
    return getdata.data[0] || null;
}

export default function DeleteData() {

    const allData = useLoaderData();
    console.log(allData)

    const specificData = useActionData();
    console.log(specificData)
    const [filter, setFilter] = useState("");
    const [searchDis, setSearchDis] = useState(true)

    const handleClick = (e) => {
        setSearchDis(false);
        setFilter(e.target.innerText)
    }

    useEffect(() => {

        if (specificData) {
            Swal.fire({
                title: `Biztosan törölni szeretnéd a ${specificData.name} nevű csapatot?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                denyButtonText: `Nevermind`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    deleteData(specificData).then(() => {
                        toast.success("Sikeres törlés! ❌")
                    })
                }
            })

        } else {
            if (specificData === null) {
                toast.info("Nem található ilyen csapat az adatbázisban!")
            }
        }


    }, [specificData])
    return (
        <div className="getData">
            <ToastContainer />
            <div className="searchOptions">
                <div onClick={handleClick} className={filter === "Name" ? "active-item" : "option-item"}>Name</div>
                <div onClick={handleClick} className={filter === "Abbreviation" ? "active-item" : "option-item"}>Abbreviation</div>
                <div onClick={handleClick} className={filter === "Fundation" ? "active-item" : "option-item"}>Fundation</div>
            </div>
            <Form method="post" className="search" replace>
                <input onChange={() => { }} type="text" hidden name="slct-btn" value={filter} />
                <input className="searchTerm" type="text" disabled={searchDis} name="search" placeholder="Search..." />
                <button className="searchButton" type="submit"><i className="fa fa-search"><img width={30} src={search} alt="search" /></i></button>
            </Form>
        </div>
    )
}