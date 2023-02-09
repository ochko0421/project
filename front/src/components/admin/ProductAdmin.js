import axios from "axios"
import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ProductAdmin() {
    const [category, setCategory] = useState([])
    const [item, setItem] = useState([])
    const [item2, setItem2] = useState([])
    const [search, setSearch] = useState("")

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const [newobj, setNewobj] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: {
            rate:"",
            count:""
        }
    })
    


    useEffect(() => {
        axios.get("http://localhost:8000/product")
            .then(res => {
                setItem(res.data.result)
                setCategory(res.data.result)
                setItem2(res.data.result)
            })

    }

        , [])

    const newArr = []
    category.map((e) => {
        if (!newArr.includes(e.category)) {
            newArr.push(e.category)
        }
    })

    function sortPriceHigh() {
        const sortedArr = [...item]
        sortedArr.sort((a, b) => {
            return a.price - b.price
        })
        setItem(sortedArr)

    }
    function sortPriceLow() {
        const sortedArr = [...item]
        sortedArr.sort((a, b) => {
            return b.price - a.price
        })
        setItem(sortedArr)
    }

    function sortCat(a) {
        setItem(item2)

        if (a.target.value == "All") {
            setItem(item2)
        }
        else {
            setItem(item2.filter((b) => (b.category == a.target.value)))
        }
    }
    function onSearch(e) {

        setSearch(e.target.value)

        setItem(item2.filter((b) => b.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    function onDelete(id) {
        axios.delete(`http://localhost:8000/product/${id}`)
            .then(res => setItem(res.data.result))
    }

    function addProduct() {
        axios.post("http://localhost:8000/product",newobj)
            .then(res => {
                console.log(res.data.result)
                setItem(res.data.result)
                console.log(newobj);
                item.push(newobj)
                handleClose()
            })
    }


    return <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <h1>Add Product</h1>
            </Modal.Header>
            <Modal.Body>
                <div className="form">
                    <label>Product name</label>
                    <input value={newobj.title} onChange={(e) => setNewobj({...newobj, title : e.target.value})} className="form-control" />
                    <label>Item full description</label>
                    <input value={newobj.description} onChange={(e)=>setNewobj({...newobj, description: e.target.value})} className="form-control"/>
                    <label>Category</label>
                    <input value={newobj.category} onChange={(e) => setNewobj({...newobj, category : e.target.value})} className="form-control" />
                    <label>Price</label>
                    <input value={newobj.price} onChange={(e) => setNewobj({...newobj, price : e.target.value})} type={"number"} className="form-control" />
                    <label>Rating</label>
                    <input value={newobj.rating.rate} onChange={(e) => setNewobj({...newobj,rating:{count:newobj.rating.count,rate:e.target.value}})} className="form-control" />
                    Total Rates
                    <input value={newobj.rating.count} onChange={(e) => setNewobj({...newobj,rating:{count:e.target.value,rate:newobj.rating.rate} })} className="form-control" />
                    <label>Image</label>
                    <input onChange={(e) => {
                console.log(e.target.value);
                const url = "https://api.cloudinary.com/v1_1/dlwizyzqi/upload"

                const formData = new FormData()
                let file = e.target.files[0]
                formData.append("file", file)
                formData.append("api_key", "796678243292196")
                formData.append("folder", "project")
                formData.append("upload_preset", "sdvojfor")

                axios.post(url, formData)
                    .then((res) => {
                        console.log(res);
                        setNewobj( {...newobj, image :res.data.secure_url })

                    }
                    )



            }} className="form-control" type="file" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>addProduct()}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
        <h1>Products list</h1>

        <div className="row">
            <div className="col-md-10">
                <select className="form-select-md" onChange={(e) => sortCat(e)}>
                    <option>All</option>
                    {newArr.map((e, i) => {
                        return <option value={e} key={i}>
                            {e}
                        </option>
                    })}
                </select>
                <input className="form-control-md" placeholder="search" value={search} onChange={(e) => onSearch(e)}></input>
            </div>
            <div className="col-md-2">
                <div className="row">
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-10">
                        <button onClick={handleShow} className="btn btn-primary">
                            Add product
                        </button>
                    </div>
                </div>


            </div>
        </div>


        <table className="table table-striped mt-5">
            <tbody>
                <tr className="table bg-striped bg-info">
                    <th>#</th>
                    <th className="w-50">Name</th>
                    <th>Category

                    </th>
                    <th>Price
                        <div className="d-flex">
                            <button className="btn btn-dark text-black" onClick={() => sortPriceHigh()}>↑</button>
                            <button className="btn btn-dark text-black" onClick={() => sortPriceLow()}>↓</button>
                        </div>

                    </th>

                    <th>Rating out of</th>
                    <th>Actions</th>
                </tr>
                {item.map((e, i) => {
                    return <tr className="table table-primary striped" key={i}>
                        <td>{i + 1}</td>
                        <td>{e.title}</td>
                        <td>{e.category}</td>
                        <td>{e.price}</td>
                        <td>{e.rating.rate} from {e.rating.count} rates</td>
                        <td >
                            <div className="d-flex">
                                <button className="btn btn-primary text-black">Edit</button>
                                <button onClick={() => onDelete(e.id)} className="btn btn-danger text-black">Delete</button>
                            </div>
                        </td>
                    </tr>

                })
                }

            </tbody>






        </table>
    </div>
}