import axios from "axios"
import { useEffect, useState } from "react"
import { Form } from "react-router-dom"

export default function Product() {
    const [category, setCategory] = useState([])
    const [item, setItem] = useState([])
    const [item2, setItem2] = useState([])
    const [search, setSearch] = useState("")
    const [productItem,setProductItem]=useState("")




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

    function onDelete() {

    }


    return <div>
        <h1>Products list</h1>

        <select className="form-select-md" onChange={(e) => sortCat(e)}>
            <option>All</option>
            {newArr.map((e, i) => {
                return <option value={e} key={i}>
                    {e}
                </option>
            })}
        </select>
        <input className="form-control-md" placeholder="search" value={search} onChange={(e) => onSearch(e)}></input>
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
                                <button className="btn btn-danger text-black">Delete</button>
                            </div>
                        </td>
                    </tr>

                })
                }

            </tbody>






        </table>
        <form className="form">
            <h3>Products</h3>
            <h6>Product name</h6>
            <input className="form-control" type="text" />
            <h6>Price</h6>
            <input className="form-control" type="number" />
            <h6>Image</h6>
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
                        setProductItem({...productItem,thumbImage : res.data.secure_url})

                    }
                    )



            }} className="form-control" type="file" />
            <button className="btn btn-light">Close</button>
            <button className="btn btn-primary">Save</button>
        </form>
    </div>
}