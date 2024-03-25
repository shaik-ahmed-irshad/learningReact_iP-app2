import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Loading from "./Loading";
function App() {
  const [totalData, setTotaldata] = useState([]);
  const [data, setData] = useState([]);
  const [completed, setCompleted] = useState(true);
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        let res = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        // artificial delay for loading animation. #badPractice
        // setTimeout(()=>{
            setLoading(false);
            setData(res.data);
            setTotaldata(res.data);
        // },500)
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  function filterTodos() {
    if (completed) {
      const filteredData = totalData.filter((ele) => ele.completed);
      setData(filteredData);
    } else {
      const filteredData = totalData.filter((ele) => !ele.completed);
      setData(filteredData);
    }
    setCompleted(!completed);
  }
  return (
    <>
      {loading && <Loading />}
      <center>
        <div className="table-responsive">
          <h1>My Todos!</h1>
          <button onClick={filterTodos}>Task Filter</button>
          <table className="table table-primary">
            <thead>
              <tr>
                <th className="th">Id</th>
                <th className="th">User Id</th>
                <th className="th">Title</th>
                <th className="th">Completed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ele) => (
                <tr key={ele.id}>
                  <td>{ele.id}</td>
                  <td>{ele.userId}</td>
                  <td>{ele.title}</td>
                  <td>{ele.completed ? "True" : "False"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </>
  );
}

export default App;
