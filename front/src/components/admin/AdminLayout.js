import axios from "axios"
import { useEffect, useState } from "react"

export default function AdminLayout() {
  const [category,setCategory]=useState([])
  const [item, setItem] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/product")
      .then(res => {
        setItem(res.data.result)
        
      })

  }

    , [])

    const newArr=[]
  item.map((e)=>{
      if (!newArr.includes(e.category)){
          newArr.push(e.category)
      }
  })
console.log(newArr);
    function sortPriceHigh(){
      const sortedArr = [...item] 
      sortedArr.sort((a,b)=>{
        return a.price-b.price
      })
      setItem(sortedArr)
     
    }
    function sortPriceLow(){
      const sortedArr = [...item] 
      sortedArr.sort((a,b)=>{
        return b.price-a.price
      })
      setItem(sortedArr)
    }
    
   

  return <div>
    <h1>Products list</h1>
    <select>
      <option>All</option>
      {newArr.map((e,i)=>{
        return <option key={i}>
         {e}
        </option>
      })}
    </select>
    <table className="table table-striped ">
      <tbody>
    <tr className="table bg-striped bg-info">     
              <th>#</th>
              <th className="w-50">Name</th>
              <th>Category
                
              </th>
              <th>Price
              <button className="btn btn-dark" onClick={()=>sortPriceHigh()}>↑</button>
              <button className="btn btn-dark" onClick={()=>sortPriceLow()}>↓</button>
              </th>
             
              <th>Rating out of</th>
            </tr>
      { item.map((e,i) => {
          return <tr className="table table-primary striped" key={i}>
            <td>{i+1}</td>
              <td>{e.title}</td>
              <td>{e.category}</td>
              <td>{e.price}</td>
              <td>{e.rating.rate} from {e.rating.count} rates</td>
            </tr>
          
        })
      }

</tbody>






    </table>
  </div>
}