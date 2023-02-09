import { productCard } from "../data/productCard";
import "../App.css";
import { ProductsPage } from "../data/pagesData";
import ProductCard from "../components/ProductCard";
import { useEffect,useState } from "react";
import axios from "axios";
export const Products = () => {
  const [item,setItem] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/product")
        .then(res => {
            setItem(res.data.result)
           
        })

}

    , [])

  return (
    <div className="flex flex-d align-items justify-content">
      {ProductsPage.map((data,index) => (
        <div key={index}>
          <div  className="containerTitle flex flex-d align-items justify-content">
            <h1 className="bigTitle">{data.title}</h1>
            <span className="bigText">{data.text}</span>
          </div>
          <img src={data.img} alt="" />
        </div>
      ))}
      <div className="flex" style={{ margin: "15px" }}>
        <div
          className="flex flex-row p-2"
          style={{ backgroundColor: "#f4f4f4" }}
        >
          <input
            type="text"
            placeholder=" Search property"
            style={{ width: "800px", margin: 5 }}
          />
          <button>Find Now</button>
        </div>
        <button>Filter</button>
      </div>
      <div>
        {/* <div className="flex justify-between">
          <div>
            <h1>Total Product</h1>
            <span>184</span>
          </div>
          <div>
            <span>Sort By</span>
          </div>
        </div> */}
       
  
            <ProductCard />
         
        
      </div>
    </div>
  );
};
