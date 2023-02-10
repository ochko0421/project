import "./../style/ProductCard.css";
import { useEffect,useState } from "react";
import axios from "axios";import ReactStars from 'react-stars'
import React from 'react'


export default function ProductCard() {
  const [item,setItem] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/product")
        .then(res => {
            setItem(res.data.result)
           
        })

}

    , [])
   
  return (<div className="productCard">
    {item.map((e,i)=>{
      return (<div key={i} className="product-card">
      <img src={e.image} alt="img" />
      <span className="product-card-category">{e.category}</span>
      <h2 className="product-card-title">{e.title}</h2>
      <span className="product-card-text">{e.text}</span>
      <span className="product-card-price">${e.price}</span>
      <span className="product-card-rate">{e.rating.rate}<ReactStars count={5} value={Number(e.rating.rate)} edit={false} /></span>
    </div>)
    })}
   </div>
  );
}
