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
  spinLoadader,
} from "../../actions/index.js";
import { Link } from "react-router-dom";
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
  // const loading = useSelector((state) => state.Loading);

  //pagina actual-----
  // const [loading, setLoading] = useState(false);
  const [orden, setOrden] = useState("");
  const [ordenAz, setOrdenAz] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  //perros por pagina----
  const [dogsPerPage, setDogsPage] = useState(9);

  //ultima posicion del perro
  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;

  const primeraPag = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(allDogs.length / dogsPerPage));
  };
  //const que guarde todos los personajes que se tiene en cada pagina
  const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);
  //seteo la pagina en el numero de pagina que me pasan
  const paginado = (pageNum) => {
    setCurrentPage(pageNum);
  };

  //nos traemos del estado los perros cuando el componente se monta.

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  //
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
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
    setCurrentPage(1);
    setOrdenAz(`Ordenado ${e.target.value}`);
  }
  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(sortbyweight(e.target.value));
    setCurrentPage(1);
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
            Refresh
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
                            : "https://e.rpp-noticias.io/large/2016/03/24/055705_104904.jpg"
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
          primeraPag={primeraPag}
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>
      {/* <button onClick={lastPage}>&gt;</button> */}
    </div>
  );
}
