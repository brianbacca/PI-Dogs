import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterByTemps,
  filterCreated,
  sortByName,
  sortbyweight,
  getpage,
} from "../../actions/index.js";
import { Link, NavLink } from "react-router-dom";
import DogCard from "../DogCard/DogCard";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Loading from "../Loading/Loading.jsx";
import Nav from "../Nav/Nav.jsx";
import styles from "./DogsHome.module.css";

export default function DogsHome() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  console.log(allDogs.create)

  // const loading = useSelector((state) => state.Loading);

  //pagina actual-----
  // const [loading, setLoading] = useState(false);
  const [orden, setOrden] = useState("");
  const [ordenAz, setOrdenAz] = useState("");
  const pages = useSelector((state) => state.page);
  //perros por pagina----
  const [dogsPerPage, setDogsPage] = useState(9);

  //ultima posicion del perro
  const indexLastDog = pages * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;

  // const primeraPag = () => {
  //   setCurrentPage(1);
  // };
  // const lastPage = () => {
  //   setCurrentPage(Math.ceil(allDogs.length / dogsPerPage));
  // };
  //const que guarde todos los personajes que se tiene en cada pagina
  const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);
  console.log(currentDogs);
  //seteo la pagina en el numero de pagina que me pasan
  const paginado = (pageNum) => {
    dispatch(getpage(pageNum));
  };

  //nos traemos del estado los perros cuando el componente se monta.

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  //
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    // dispatch(getpage);
  }

  function handleTemp(e) {
    e.preventDefault();
    dispatch(filterByTemps(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    // setCurrentPage(1);
    setOrdenAz(`Ordenado ${e.target.value}`);
  }
  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(sortbyweight(e.target.value));
    // setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={styles.bkg}>
      <div>
        <nav>
          <div>
            <Nav />
          </div>
          <div>
            <SearchBar />
          </div>
        </nav>
        <div>
          <button
            className={styles.button}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            reset filter
          </button>
        </div>
        <div>
          <div className={styles.select}>
            <select
              className={styles.selectInd}
              onChange={(e) => handleSort(e)}
            >
              <option value="todos">All</option>
              <option value="asc">Ascendant</option>
              <option value="desc">Descendant</option>
            </select>
            <select
              className={styles.selectInd}
              onChange={(e) => handleSortWeight(e)}
            >
              <option value="ascW">Asc-weight</option>
              <option value="desW">Des-weight</option>
            </select>
            <select
              className={styles.selectInd}
              onChange={(e) => handleFilterCreated(e)}
            >
              <option value="All">All</option>
              <option value="created">Created</option>
              <option value="api">Api</option>
            </select>
            <select
              className={styles.selectInd}
              onChange={(e) => handleTemp(e)}
            >
              <option value="allT">All temperaments</option>
              {temperaments?.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <ul className={styles.cards}>
            {!currentDogs.length ? (
              <Loading />
            ) : (
              currentDogs.map((d) => {
                return (
                  <div key={d.id}>
                    <Link className={styles.cardLink} to={"/dogs/" + d.id}>
                      <DogCard
                        name={d.name}
                        image={
                          d.image
                            ? d.image
                            : "https://i.pinimg.com/originals/d7/8c/88/d78c886e714f2d4040b96037dbbaa79d.png"
                        }
                        weight_min={d.weight_min}
                        weight_max={d.weight_max}
                        temperament={d.temperament}
                      />
                    </Link>
                  </div>
                );
              })
            )}
          </ul>
        </div>
      </div>
      <div>
        {/* <button onClick={primeraPag}>&lt;</button> */}
        <Paginado
          allDogs={allDogs.length}
          dogsPerPage={dogsPerPage}
          paginado={paginado}
        />
      </div>
      {/* <button onClick={lastPage}>&gt;</button> */}
    </div>
  );
}

// "https://i.pinimg.com/originals/d7/8c/88/d78c886e714f2d4040b96037dbbaa79d.png";

// to={"/dogs/" + d.id}>
