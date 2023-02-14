import "../style/Product.css";
import { productCard } from "../data/productCard";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState,useEffect } from "react";
import axios from "axios";
export const Product = () => {
  const [item,setItem] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8000/product")
        .then(res => {
            setItem(res.data.result)
           
        })

}

    , [])
  return (
    <>
      <span className="productTitle">Product</span>
      <h2>Our popular product</h2>
      <span className="productSpan">
        Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim
        placerat nisi, adipiscing mauris non purus parturient.
      </span>
      <div className="products flex ">
        {item.map((e, index) => (
          <Card className="productCards" key={index}>
            <Card.Img
              src={e.image}
              alt=""
              style={{ height: "200px", width: "300px" }}
            />
            <span>{e.category}</span>
            <Card.Title>{e.title}</Card.Title>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{e.text}</ListGroup.Item>
              <ListGroup.Item>${e.price}</ListGroup.Item>
            </ListGroup>
         
          </Card>
        ))}
      </div>
    </>
  );
};
