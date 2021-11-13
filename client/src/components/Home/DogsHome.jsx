import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterByTemps,
} from "../../actions/index.js";
import { Link } from "react-router-dom";
import DogCard from "../DogCard/DogCard";
import Paginado from "../Paginado/Paginado.jsx";

export default function DogsHome() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  //Estados:
  //pagina actual-----
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
            search bar...
            <div>
              <Link to="/newDog">Create new Dog</Link>
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
          <select>
            <option value="ascP">Asendente</option>
            <option value="desP">Desendente</option>
          </select>
          <select>
            <option value="all" key="all">
              all dogs
            </option>
            <option value="number" key="number">
              Api
            </option>
            <option value="notnumber" key="notnumber">
              Created
            </option>
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
