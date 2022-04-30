import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <div className="nav-div" onClick={() => history.push("/desktop")}>
      <div className="nav-div-left">
        <div className="nav-caret"></div>
        <i className="fa-solid fa-house-chimney"></i>
        <div>Home</div>
      </div>
    </div>
  )
};

export default Home;
