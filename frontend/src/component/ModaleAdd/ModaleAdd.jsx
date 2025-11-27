import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../api";


function ModalAdd({closeModal}) {

    
const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    type: ""
});

const handleSubmit= async (e) => {
    e.preventDefault();
    const payload= {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date)
    };

    try {
        console.log(payload);
        await api.post("/expenses", payload);
        
    }
    catch(err) {
        console.error(err)
    }
}



return (
    <div> 
       <form onSubmit={(e) => { 
        handleSubmit(e);
       }}>
        <input type="text"
        placeholder="title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        />

        <input type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({...formData, amount: e.target.value})}
        /> 

        <input type="test"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}/> 
        
     <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

         <input
            type="text"
            placeholder="Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />

        <button type="submit">Save</button>
        <button type="button" onClick={closeModal}>Cancel</button>



        
         </form> 
    </div>
);

}

export default ModalAdd;