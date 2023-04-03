import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/Registration");
    }
  }, []);
  return (
    <>
      <props.cmp />
    </>
  );
}

export default Protected;
