import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import ExpenseRecap from "../../component/ExpenseRecap/ExpenseRecap";
import ExpenseFilter from "../../component/ExpenseFilter/ExpenseFilter";
import ExpenseList from "../../component/ExpenseList/ExpenseList";
import ExpenseWidgets from "../../component/ExpenseWidgets/ExpenseWidgets";
import ModalAdd from "../../component/ModaleAdd/ModaleAdd";
import ModaleEdit from "../../component/ModaleEdit/ModaleEdit";
import Modal from 'react-modal';
import data from "../../data/data.json";





function Dashboard () { 

const total = data.total;
const trend = data.trend;
const widgetValues= Object.entries(data.widgets);
const [filters, setFilters] = useState({});
const [list, setList] = useState(data.expenses);
const [isModalOpen, setIsModalOpen] = useState(false);
const [isEditOpen, setIsEditOpen] =useState(false);
const [selectedItem, setSelectedItem] = useState(null);



const filterData = (newFilter) => {
    const filtered = data.expenses.filter( (item) => newFilter ? item.category.includes(newFilter) : true );
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
                <ExpenseRecap total= {total} trend= {trend} />
                <ExpenseFilter onFilterClick={handleFilterClick} expenses={data.expenses}/>
                <ExpenseList list={list} openEdit={openEdit} />
                 
                    {widgetValues.map(([key, value], index) => (
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