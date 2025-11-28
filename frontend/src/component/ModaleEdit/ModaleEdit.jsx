import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../api";




function ModaleEdit({closeEdit, item, refreshExpenses}) {
    const [formData, setFormData] = useState(null);

  const handleSubmit= async (e) => {
  e.preventDefault();
  const id= item.id;
  const payload= {
    ...formData, 
    amount: parseFloat(formData.amount),
    date: new Date(formData.date)
  }

  try {
    console.log(payload);
    await api.put(`/expenses/${id}`, payload)
    refreshExpenses();
    closeEdit();
  }
  catch(err) {
    console.error(err)
  }
}

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        amount: item.amount,
        category: item.category,
        date: item.date,
        type: item.type,
      });
    }
  }, [item]);
  

if (!formData) return null;



return (
    <div> 
       <form onSubmit={(e) => {
        handleSubmit(e); 
       }}>
        <input type="text"
        placeholder={formData.title}
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        />

        <input type="number"
        placeholder={formData.amount}
        value={formData.amount}
        onChange={(e) => setFormData({...formData, amount: e.target.value})}
        /> 
        
     <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

         <input
            type="text"
            placeholder= {formData.amount}
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />

        <button type="submit">Save</button>
        <button type="button" onClick={closeEdit}>Cancel</button>



        
         </form> 
    </div>
);

}

export default ModaleEdit;