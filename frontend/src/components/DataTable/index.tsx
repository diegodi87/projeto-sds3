import axios from "axios";
import { useEffect, useState } from "react";
import { SalePage } from "types.ts/sale";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";

function DataTable () {
    
    const [page, setPage] = useState<SalePage>({
        first: true,
        last: true,
        number:0,
        totalElements:0,
        totalPages:0 
       })
    
       useEffect(( ) => {
        axios.get(`${BASE_URL}/sales?page=1&size=20&sort=date,desc`)
            .then(response => {
                setPage(response.data);
            });
       });
    
    return (
        <div >
            <div className="table-responsive">
    <table className="table table-striped table-sm">
        <thead>
            <tr>
                <th>Data</th>
                <th>Vendedor</th>
                <th>Clientes visitados</th>
                <th>Negócios fechados</th>
                <th>Valor</th>
            </tr>
        </thead>
        <tbody>
            {page.content?.map(intem => (
                <tr key={intem.id}>
                <td>{formatLocalDate(intem.date, "dd/MM/yyyy")}</td>
                <td>{intem.seller.name}</td>
                <td>{intem.visited}</td>
                <td>{intem.deals}</td>
                <td>{intem.amount.toFixed(2)}</td>
            </tr>
            ))}
        </tbody>
    </table>
</div>
           
        </div>
    );
}

export default DataTable