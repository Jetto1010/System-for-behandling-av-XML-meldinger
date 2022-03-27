import useFetch from "../api/useFetch";
import { useNavigate} from "react-router-dom";
import React from 'react';
import "../App.css";


const ShowData = () => {
    const {data, loading, error} = useFetch('/api/v1/meldinger');
    let msgList = []

    const navigate = useNavigate();

    //https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
    const routeChange = (url) =>{
        navigate(url);
    }

    const formatDate = (date) => {
        const newDate = new Date(date)
        const stringDate = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()} `
        return stringDate;
    }

    if (!loading && data !== null) {
        for (const key in data) {
            msgList.push(JSON.parse(key))
        }

        const rows = msgList.map((item, index) => (
                <tr key={index}>
                    <td >{item.id}</td>
                    <td>{item.Skjemanavn}</td>
                    <td>{item.Filnavn}</td>
                    <td>{formatDate(item.Endrettidspunkt)}</td>
                    <td ><button onClick={()=> {
                        if (item.Skjemanavn === 'KliniskProstataUtredning') {
                            routeChange("prostata-utredning/" + item.id)
                        } else if (item.Skjemanavn === 'KliniskProstataStraale') {
                            routeChange("prostata-straale/" + item.id)
                        } else if (item.Skjemanavn === 'KliniskProstataKirurgi') {
                            routeChange("prostata-kirurgi/" + item.id)
                        }
                    } }> Rediger </button></td>
                </tr>
            ))

        return (
        <div>
            <table>
                <thead style={{textAlign: "left"}}>
                <tr>
                    <th style={{minWidth: "50px", maxWidth: "100px"}}>
                        Id
                    </th>
                    <th style={{ maxWidth: "150px"}}>
                        Type
                    </th>
                    <th style={{ maxWidth: "150px"}}>
                        Filnavn
                    </th>
                    <th style={{ maxWidth: "150px"}}>
                        Endret
                    </th>
                    <th style={{ maxWidth: "150px"}}>
                        Handling
                    </th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>)
    } else if (error !== null) {
        let string = " Noe gikk feil ved innlasting: " + error;
        return <h4> {string} </h4>
    } else {
        return <h4> Laster ...</h4>
    }
}

export default ShowData;