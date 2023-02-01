import { useState, useEffect } from "react";

export default function About(){
      const [users, setUsers] = useState()
  useEffect(() => {
    fetchAllData();
  }, []);
  async function fetchAllData() {
    const FETCHED_DATA = await fetch("http://localhost:8000/user");
    const FETCHED_JSON = await FETCHED_DATA.json();
    console.log(FETCHED_JSON.result);
    setUsers(FETCHED_JSON.result);

  }
  async function handleDelete(userId) {

    const options = {
    method: "DELETE",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    id: userId,
    }),
    };
    const FETCHED_DATA = await fetch(`http://localhost:8000/user/${userId}`,options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    setUsers(FETCHED_JSON.result);
    }
    return <div>
           <h1>USER LIST</h1>
      {users &&
        users.map((user, i) => {
          return (
            <div className="d-flex align-items-center gap-5" key={i}>
              {user.name}
              <button className="btn btn-danger" onClick={()=>handleDelete(user.id)}>Delete</button>
            </div>
          );
        })}
    </div>
}