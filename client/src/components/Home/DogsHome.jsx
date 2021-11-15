import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterByTemps,
  filterCreated,
  filterSortByName,
} from "../../actions/index.js";
import { Link } from "react-router-dom";
import DogCard from "../DogCard/DogCard";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
export default function DogsHome() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  //Estados:
  //pagina actual-----
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  //perros por pagina----
  const [dogsPerPage, setDogsPage] = useState(8);

  //ultima posicion del perro
  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;
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

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(filterSortByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  //   [ ] Botones/Opciones para filtrar por:
  // Temperamento
  // Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
  //   [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
  // Orden alfabético
  // Peso
  return (
    <div>
      <div>
        <nav>
          <div>
            <div>
              <Link to="/dog">Create new Dog</Link>
            </div>
          </div>
        </nav>
        <h1>Pichichens</h1>
        <div>
          <button
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Refresh
          </button>
        </div>
        <div>
          <select onChange={(e) => handleSortByName(e)}>
            <option value="all">todos</option>
            <option value="asc">Ascendente ↑</option>
            <option value="desc">Descendente ↓</option>
          </select>
          <select>
            <option value="ascP">Asendente</option>
            <option value="desP">Desendente</option>
          </select>
          <select onChange={(e) => handleFilterCreated(e)}>
            <option value="All">Todos</option>
            <option value="created">Creados</option>
            <option value="api">Api</option>
          </select>
          <select onChange={(e) => handleTemp(e)}>
            <option value="allT">All temperaments</option>
            {temperaments?.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <Paginado
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
          />
          <SearchBar />
          <ul>
            {currentDogs &&
              currentDogs.map((d) => {
                return (
                  <div key={d.id}>
                    <Link to={"/dogs/"}>
                      <DogCard
                        name={d.name}
                        image={d.image}
                        weight={d.weight}
                        temperament={d.temperament}
                      />
                    </Link>
                  </div>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
