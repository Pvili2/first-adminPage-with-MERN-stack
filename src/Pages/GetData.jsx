import { useState, useEffect } from "react";
import { Form, useLoaderData, useActionData, defer } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import { getAllData, getData } from "../api";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../CSS/IndexLayout.css";
import search from "../images/search.png"
import 'react-toastify/dist/ReactToastify.css';

export async function loader() {
    return defer({ teams: await getAllData() })
}

export async function action({ request }) {
    const formData = await request.formData();

    console.log(formData.get("search"))
    return formData.get("search") ? { status: "OK", data: formData.get("search") } : { status: "NOT OK", data: null };
}

export default function GetData() {
    const loaderData = useLoaderData();
    const [teams, setTeams] = useState(useLoaderData()["teams"].data.data)
    const [filter, setFilter] = useState();
    const [searchDis, setSearchDis] = useState(true)
    const searchValue = useActionData();

    const handleClick = (e) => {
        setSearchDis(false);
        setFilter(e.target.innerText)
    }
    const getDataHandler = async () => {

        const response = await toast.promise(
            getData(filter, searchValue.data),
            {
                error: 'Hiba a keresés közben'
            }
        );
        if (response.data.length > 0) {
            toast.success(`Keresés feldolgozva, talált csapatok: ${response.data.length} 👌`)
        } else {
            toast.warn(`Nincs a keresésednek megfelelő csapat:(`)
        }
        setTeams(response.data);
    }
    // searchValue && [{index: 0, name: "aa", abbreviation: "a", fundation: 1200 }]!==teams &&setTeams([{index: 0, name: "aa", abbreviation: "a", fundation: 1200 }])
    useEffect(() => {
        try {
            if (searchValue.status === "OK") {
                getDataHandler();
            } else {
                setTeams(loaderData.teams.data.data);
            }
        } catch (error) {

        }

    }, [searchValue]);

    return (

        <div className="getData">
            <ToastContainer />
            <div className="searchOptions">
                <div onClick={handleClick} className={filter === "Name" ? "active-item" : "option-item"}>Name</div>
                <div onClick={handleClick} className={filter === "Abbreviation" ? "active-item" : "option-item"}>Abbreviation</div>
                <div onClick={handleClick} className={filter === "Fundation" ? "active-item" : "option-item"}>Fundation</div>
            </div>
            <Form method="post" className="search" replace>
                <input className="searchTerm" type="text" disabled={searchDis} name="search" placeholder="Search..." />
                <button className="searchButton" type="submit"><i className="fa fa-search"><img width={30} src={search} alt="search" /></i></button>
            </Form>
            <DataTable data={teams} />
        </div>
    )
}

const DataTable = ({ data }) => {
    const createData = (index, name, abbrevation, foundation) => {
        return { index, name, abbrevation, foundation }
    }

    let rows = [];

    data.forEach((item, index) => {
        rows.push(createData(index, item.name, item.abbreviation, item.fundation))
    })
    return (
        <TableContainer sx={{ width: 640, marginTop: 10, marginBottom: 10 }} component={Paper}>
            <Table sx={{ width: 600 }} align="center" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell >Abbrevation</TableCell>
                        <TableCell >Foundation</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell width={25} align="right">{row.index + 1}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell width={50} >{row.abbrevation}</TableCell>
                            <TableCell >{row.foundation}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}