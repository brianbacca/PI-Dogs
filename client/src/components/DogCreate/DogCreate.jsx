import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../actions";

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperament: [],
  });
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  return (
    <div>
      <Link to="/dogs">
        <button>go back</button>
      </Link>
      <h1>Crea tu perro</h1>
      <form>
        <div>
          <div>
            <lavel>Nombre</lavel>
            <input type="text" value={input.name} name="name" />
          </div>
          <div>
            <label>Height</label>
            <input type="text" value={input.height} name="height" />
          </div>
          <div>
            <lavel>weight</lavel>
            <input type="text" value={input.weight} name="weight" />
          </div>
          <div>
            <lavel>temperament</lavel>
            <input type="text" value={input.temperament} name="weight" />
          </div>
        </div>
      </form>
    </div>
  );
}
