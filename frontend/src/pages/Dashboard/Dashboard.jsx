import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ExpenseRecap from "../../component/ExpenseRecap/ExpenseRecap";
import ExpenseFilter from "../../component/ExpenseFilter/ExpenseFilter";
import ExpenseList from "../../component/ExpenseList/ExpenseList";
import ExpenseWidgets from "../../component/ExpenseWidgets/ExpenseWidgets";
import data from "../../data/data.json";





function Dashboard () { 

const total = data.total;
const trend = data.trend;
const widgetValues= Object.entries(data.widgets);
console.log(widgetValues)
const [filters, setFilters] = useState({});
const [list, setList] = useState(data.expenses);



const filterData = (newFilter) => {
    const filtered = data.expenses.filter( (item) => newFilter ? item.category.includes(newFilter) : true );
    setList(filtered);
};

const handleFilterClick = (newFilter) =>  {
    setFilters(newFilter);
    filterData(newFilter);
};


return (
    <main> 
        <h1> Dashboard </h1>
        <section> 
            <div> 
                <ExpenseRecap total= {total} trend= {trend} />
                <ExpenseFilter onFilterClick={handleFilterClick} expenses={data.expenses}/>
                <ExpenseList list={list}/>
                 
                    {widgetValues.map(([key, value], index) => (
                        <div key={index}> 
                        <ExpenseWidgets title={key} value={value} />
                            </div>
                    ))} 
                </div>
        </section>
        </main>
);


}
export default Dashboard ;