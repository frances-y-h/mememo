import { useHistory } from "react-router-dom";

const Trash = () => {
  const history = useHistory();

  return (
    <div className="nav-div" onClick={() => history.push("/trash")}>
      <div className="nav-div-left">
        <div className="nav-caret"></div>
        <i className="fa-solid fa-trash-can"></i>
        <div>Trash</div>
      </div>
		</div>
  )
};

export default Trash;
