import {useState,useEffect} from 'react';
import axios from "axios";

function ReadComponent() {
    const [data,setData] = useState([]);
    const [formData,setFormData] = useState(
         { exercise: "",
            weight: ""
         }
    );

     const [editId,setEditId] = useState(null);
     const [editWeight,setEditWeight] = useState("");

    const fetchData =  ()=> {
            fetch("http://localhost:8080/")
            .then((response)=> response.json())
            .then((data)=>{
                setData(data)
            }).catch((error) => {
               console.error("error fetching data",error);
            });
        };
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData((prev) => ({
            ...prev, [name]:value
        }));
    };
    const handleSumbit = ()=> {
        axios.post("http://localhost:8080/",formData)
        .then((response)=>{
            console.log("workout added: ",response.data);
            setFormData({exercise:"",weight:""})
            fetchData();
        })
        .catch((error)=>{
            console.error(error);
        })
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        axios.post(`http://localhost:8080/delete/${id}`)
        .then((response)=> {
            console.log("Deleted: ",response.data);
            setData(data.filter((item)=>item.id!==id));
        })
        .catch((error) => {
            console.error("Error deleting: ",error);
        });
    };

    const handleEditClick = (item) => {
        setEditId(item.id);
        setEditWeight(item.weight);
    }
    const handleWeightChange = (e) => {
        setEditWeight(e.target.value);
    }

    const handleUpdate = (id) => {
        axios.post(`http://localhost:8080/update/${id}`,{weight: editWeight})
        .then(()=> {
            setData((prev)=> 
                prev.map((item) =>
                    item.id === id ? {...item, weight: editWeight} : item
        )
    );
    setEditId(null);
        })
        .catch((error) => {
            console.error("updated failed",error);
        });
    };

    return(
        <div>
            <div>
                <h1>Enter workouts: </h1>
                <label>Enter workouts: </label>
                <input 
                    type="text" name="exercise" 
                    value={formData.exercise}
                    onChange={handleChange}/> <br/>
                <label>Enter weight: </label> 
                <input 
                    type="text" name="weight"
                    value={formData.weight}
                    onChange={handleChange}/> <br/>
                <button onClick={handleSumbit}>Add Workout</button>
            </div>
            <div>
                <h1>Gym Workouts</h1> 
                <table border="1">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Workouts</th>
                            <th>Weights in Kg</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.exercise}</td>
                                <td> {editId === item.id ? (
                                    <input type="number"
                                    value = {editWeight}
                                    onChange={handleWeightChange}/>
                                   ) : (item.weight)}
                                </td>
                                <td>
                                    { editId === item.id ? 
                                    (<button onClick = {() => handleUpdate(item.id)}>save</button> ) :
                                    (<button onClick = {() => handleEditClick(item)}>update</button>)
                                    }
                                    <button onClick={()=> handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ReadComponent;