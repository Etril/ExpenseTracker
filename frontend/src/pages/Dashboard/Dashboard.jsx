import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import ExpenseRecap from "../../component/ExpenseRecap/ExpenseRecap";
import ExpenseFilter from "../../component/ExpenseFilter/ExpenseFilter";
import ExpenseList from "../../component/ExpenseList/ExpenseList";
import ExpenseWidgets from "../../component/ExpenseWidgets/ExpenseWidgets";
import ModalAdd from "../../component/ModaleAdd/ModaleAdd";
import ModaleEdit from "../../component/ModaleEdit/ModaleEdit";
import Modal from 'react-modal';
import api from "../../api";


function Dashboard () { 



const [filters, setFilters] = useState({});
const [isModalOpen, setIsModalOpen] = useState(false);
const [isEditOpen, setIsEditOpen] =useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const [expenses, setExpenses] = useState ([]);
const [list, setList] = useState([]);
const [widgets, setWidgets] = useState([]);
const [trends, setTrends] = useState([]);
const widgetsArray= Object.entries(widgets);


const getExpenses= async () => {
    try {
        const response= await api.get("/expenses");
        setExpenses(response.data);
        setList(response.data);

    }
    catch (err) {
        console.error (err)
        setError("No expenses")
    }
    
};


const getWidgets = async () => {
    try {
        const response = await api.get("/expenses/widgets");
        setWidgets(response.data)
    }
    catch (err) {
        console.error (err)
        setError("No widgets")
    }
    }

const getTrends= async() => {
    try {
        const response= await api.get("/expenses/trends");
        setTrends(response.data)
    }
    catch (err) {
        console.error(err)
        setError("No trends")
    }
}

useEffect(() => {
    getExpenses();
    getWidgets()
    getTrends();

}, []);








const filterData = (newFilter) => {
    const filtered = expenses.filter( (item) => newFilter ? item.category.includes(newFilter) : true );
    setList(filtered);
};

const handleFilterClick = (newFilter) =>  {
    setFilters(newFilter);
    filterData(newFilter);
};

function openModale() {
    setIsModalOpen(true);
}

function closeModal() {
    setIsModalOpen(false);
}

function openEdit(item) {
    setIsEditOpen(true);
    setSelectedItem(item);
    console.log(item)
}

function closeEdit() {
    setIsEditOpen(false);
}



return (
    <main> 
       
        <h1> Dashboard </h1>
        <section> 
            <div> 
                <div>
                <button onClick={openModale}> Add Expense </button>
                </div>
                <ExpenseRecap total= {trends.total} trend= {trends.trends} />
                <ExpenseFilter onFilterClick={handleFilterClick} expenses={expenses}/>
                <ExpenseList list={list} openEdit={openEdit} refreshExpenses={getExpenses} />
                 
                    {widgetsArray.map(([key, value], index) => (
                        <div key={index}> 
                        <ExpenseWidgets title={key} value={value} />
                            </div>
                    ))} 
                </div>
        </section>
         <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Adding expenses"> 
         <button onClick={closeModal}> X </button>
         <ModalAdd/> 
         </ Modal >
         <Modal isOpen={isEditOpen} onRequestClose={closeEdit} contentLabel="Edit Expenses"> 
            <button onClick={closeEdit}> X </button>
            <ModaleEdit item={selectedItem} closeEdit={closeEdit} />
            
        </Modal>
                </main>
        
);


}
export default Dashboard ;