import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../actions";

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    temperament: [],
    image: "",
  });
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }
  function handleDelete(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e),
    });
  }

  function handleSumbit(e) {
    e.preventDefault();
    dispatch(postDog(input));
    alert("perro creado");
    // setInput({
    //   name: "",
    //   height_min: "",
    //   height_max: "",
    //   weight_min: "",
    //   weight_max: "",
    //   life_span: "",
    //   temperament: [],
    //   image: "",
    // });
  }
  return (
    <div>
      <Link to="/dogs">
        <button>go back</button>
      </Link>
      <h1>Crea tu perro</h1>
      <form onSubmit={(e) => handleSumbit(e)}>
        <div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>height.min</label>
            <input
              type="number"
              value={input.height_min}
              name="height_min"
              onChange={(e) => handleChange(e)}
            />
            <label>height.max</label>
            <input
              type="number"
              value={input.height_max}
              name="height_max"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>weight.min</label>
            <input
              type="number"
              value={input.weight_min}
              name="weight_min"
              onChange={(e) => handleChange(e)}
            />
            <label>weight.max</label>
            <input
              type="number"
              value={input.weight_max}
              name="weight_max"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>life span</label>
            <input
              type="number"
              value={input.life_span}
              name="life_span"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <select onChange={(e) => handleSelect(e)}>
              {temperaments &&
                temperaments.map((t) => (
                  <option name="temperament" key={t} value={t}>
                    {t}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>image</label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button onSubmit={(e) => handleSumbit(e)}>Sumbit</button>
        </div>
        <div>
          <h4>Temperament:</h4>
          {input.temperament.map((el) => (
            <div key={el}>
              <p>{el}</p>
              <button onClick={() => handleDelete(el)}>x</button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
