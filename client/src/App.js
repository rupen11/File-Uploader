import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
const FormData = require('form-data');

function App() {
  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setAvatar(e.target.files[0]);
    }
    else if (e.target.name === "name") {
      setName(e.target.value);
    }
  }

  const handleProfile = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.set("name", name);
    formdata.set("avatar", avatar);
    const res = await axios.post("http://localhost:5000/profile", formdata,
      { headers: { "Content-Type": "multipart/form-data" } });
    console.log(res);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/getData');
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, [])

  return (
    <>
      <form onSubmit={handleProfile}>
        <input type="text" name="name" onChange={handleChange} value={name} />
        <input type="file" name="avatar" onChange={handleChange} />
        <input type="submit" value="submit" />
      </form>

      {console.log(data)}
      {
        data && <>
          <img src={data.avatar} alt="image" width={250} />
          <h1>{data.name}</h1>
        </>
      }
    </>
  );
}

export default App;
