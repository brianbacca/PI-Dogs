import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../actions";
import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./DogCreate.module.css";
//------------------------------------------------------
function tempsDup(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr.slice(i + 1).indexOf(arr[i]) !== 1) {
      return true;
    } else {
      return false;
    }
  }
}
// function tieneValoresDuplicados(arreglo) {
//     if (arreglo instanceof Array) {
//         for (let i = 0; i < arreglo.length - 1; ++i) {
//             if (arreglo.slice(i + 1).indexOf(arreglo[i]) !== -1) {
//                 return true;
//             }
//         }
function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "name is required";
  } else if (!/^[A-Z]+[A-Za-z\s]+$/g.test(input.name)) {
    errors.name =
      "the first letter must be capitalized and the name can only contain letters";
  }
  if (!input.height_min) {
    errors.height_min = "height min is required";
  } else if (input.height_min <= 0) {
    errors.height_min = "min height should be higher than 0!";
  } else if (!/^[1-9]\d*(\.\d+)?$/.test(input.height_min)) {
    errors.height_min = "min value has to be numeric, no comma is allowed";
  }
  if (!input.height_max) {
    errors.height_max = "height max is required";
  } else if (input.height_max <= input.height_min) {
    errors.height_max = "min cannot be greater than or equal to max";
  } else if (!/^[1-9]\d*(\.\d+)?$/.test(input.height_max)) {
    errors.height_max = "max value has to be numeric, no comma is allowed";
  }
  if (!input.weight_min) {
    errors.weight_min = "weight min is required";
  } else if (input.weight_min <= 0) {
    errors.weight_min = "min weight should be higher than 0!";
  } else if (!/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)) {
    errors.weight_min = "min value has to be numeric, no comma is allowed";
  }
  if (!input.weight_max) {
    errors.weight_max = "weight max is required";
  } else if (input.weight_max <= input.weight_min) {
    errors.weight_max = "min cannot be greater than or equal to max";
  } else if (!/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)) {
    errors.weight_max = "max value has to be numeric, no comma is allowed";
  }

  if (!input.life_span) {
    errors.life_span = "life span is required";
  }
  if (
    !input.image &&
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/.test(
      input.image
    )
  ) {
    errors.image =
      "It must be a url, if it is empty, a default image will be given";
  }
  return errors;
}

//------------------------------------------------
export default function DogCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [errors, setErrors] = useState({});
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
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (!input.temperament.includes(e.target.value)) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  }
  function handleDelete(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e),
    });
  }

  function handleSumbit(e) {
    e.preventDefault();
    if (
      Object.keys(errors).length === 0 &&
      input.name !== "" &&
      input.height_min !== "" &&
      input.height_max !== "" &&
      input.weight_min !== "" &&
      input.weight_max !== "" &&
      input.life_span !== "" &&
      input.temperament.length !== 0
    ) {
      dispatch(postDog(input));
      alert("perro creado");
      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        temperament: [],
        image: "",
      });
    } else {
    }
  }
  return (
    <div className={styles.divCreate}>
      <Nav />
      <h1 className={styles.title}>Create Dog</h1>
      <form className={styles.form} onSubmit={(e) => handleSumbit(e)}>
        <div>
          <div>
            <label>Name</label>
            <input
              className={styles.name}
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.name && <p className={styles.error1}>{errors.name}</p>}
          </div>
          <div>
            <label>height-min(Cm)</label>
            <input
              className={styles.heightMin}
              type="number"
              min="0"
              value={input.height_min}
              name="height_min"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.height_min && (
              <p className={styles.error}>{errors.height_min}</p>
            )}
          </div>
          <div>
            <label>height-max(Cm)</label>
            <input
              className={styles.heightMax}
              type="number"
              min="0"
              value={input.height_max}
              name="height_max"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.height_max && (
              <p className={styles.error}>{errors.height_max}</p>
            )}
          </div>
          <div>
            <label>weight-min(Kg)</label>
            <input
              className={styles.weighMin}
              type="number"
              min="0"
              value={input.weight_min}
              name="weight_min"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.weight_min && (
              <p className={styles.error}>{errors.weight_min}</p>
            )}
          </div>
          <div>
            <label>weight-max(Kg)</label>
            <input
              className={styles.input}
              type="number"
              min="0"
              value={input.weight_max}
              name="weight_max"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.weight_max && (
              <p className={styles.error}>{errors.weight_max}</p>
            )}
          </div>
          <div>
            <label>life span (years)</label>
            <input
              className={styles.lifeSpan}
              type="number"
              min="0"
              value={input.life_span}
              name="life_span"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.life_span && (
              <p className={styles.error}>{errors.life_span}</p>
            )}
          </div>
          <div className={styles.temp}>
            <select onChange={(e) => handleSelect(e)}>
              {temperaments &&
                temperaments.map((t) => (
                  <option
                    className={styles.temp}
                    name="temperament"
                    key={t}
                    value={t}
                  >
                    {t}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>image</label>
            <input
              className={styles.input}
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p className={styles.error}>{errors.image}</p>}
            <label className={styles.tempTi}>Temperament:</label>

            {input.temperament.map((el) => (
              <ul key={el} className={styles.allTemps}>
                <li>
                  <p className={styles.temp}>{el}</p>
                  <button onClick={() => handleDelete(el)}>x</button>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <button className={styles.button} onSubmit={(e) => handleSumbit(e)}>
          Create
        </button>

        <div></div>
      </form>
      <div>
        <img
          className={styles.image}
          src="https://www.hola.com/imagenes/estar-bien/20190820147813/razas-perros-pequenos-parecen-grandes/0-711-550/razas-perro-pequenos-grandes-a.jpg?filter=w500"
        />
      </div>
    </div>
  );
}
