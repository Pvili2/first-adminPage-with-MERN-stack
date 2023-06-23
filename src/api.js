import axios from "axios";
const getAllData = async () => {
    const datas = await axios("http://127.0.0.1:3002/api/v1/teams", {
        method: "GET",
    });

    return datas;
};
const getData = async (filter, data) => {
    filter = filter || "";
    const obj = {};
    obj[filter.toLowerCase()] = data;

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
    return datas.data;
};
const createData = async (formData) => {
    const data = await fetch('http://127.0.0.1:3002/api/v1/teams', {
        method: "POST",
        body: formData
    })
    console.log(data);

    return data;
}
const updateData = async (bodyData) => {
    console.log(bodyData);
    const data = await fetch('http://127.0.0.1:3002/api/v1/teams/update', {
        method: "PATCH",
        body: JSON.stringify({ data: bodyData[0], _id: bodyData[1] }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    console.log(data);
    return data;
}
export { getAllData, getData, createData, updateData };
