const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require("axios");
const { Dog, Temperament } = require("../db");

const router = Router();
//eliminar los valores duplicados
Array.prototype.unique = (function (a) {
  return function () {
    return this.filter(a);
  };
})(function (a, b, c) {
  return c.indexOf(a, b + 1) < 0;
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//get/dogs --trae todas las razas de perros y devuelve los datos de la ruta princial nombre, imagen, temperamento y peso.
const API_KEY = "9984f51f-f7f5-4fca-9e74-e5263efc358f"; // ponerla en el .env
const getDogsApi = async () => {
  const api = await axios(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const response = await api.data.map((el) => {
    return {
      id: el.id,
      name: el.name,
      life_span: el.life_span,
      temperament: el.temperament,
      origin: el.origin,
      weight: el.weight.metric,
      height: el.height.metric,
      image: el.image.url,
    };
  });
  return response;
};


const getDogsDb = async () => {
  let dogsDB = await Dog.findAll({ include: Temperament });

  let result = dogsDB.map((d) => {
    return {
      id: d.id,
      image: d.image,
      name: d.name,
      height: d.height,
      weight: d.weight,
      life_span: d.life_span,
      temperament: d.dataValues.temperaments
        .map((t) => t.temperament)
        .join(", "),
    };
  });
  console.log(result);
  return result;
};

const getDogsAll = async () => {
  const apiInfo = await getDogsApi();
  const dbInfo = await getDogsDb();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

// usamos la ruta de la query para buscar por nombre
//.. input
router.get("/dogs", async (req, res) => {
  try {
    const { name } = req.query;
    let dogsTotal = await getDogsAll();
    if (name) {
      let dogsName = await dogsTotal.filter((el) =>
        el.name.toLoweCase().includes(name.toLoweCase())
      );
      dogsName.length
        ? res.status(200).send(dogsName)
        : res.status(400).send("no esta el peshoo");
    } else {
      res.status(200).send(dogsTotal);
    }
  } catch (err) {
    console.log('se encontro error en la ruta get"/dogs" ', err);
  }
});

//-----------------------------------------------------

router.get("/temperaments", async (req, res) => {
  try {
    //llamamos a la api
    const temperamentsApi = await getDogsApi();
    //mapeamos y nos traemos el arreglo de temperamentos
    const temperaments = temperamentsApi.map((el) => el.temperament);
    //quitamos el espacio de algunos temperamentos, aplanamos el array
    const temp1 = temperaments.map((e) => e && e.split(", ")).flat();

    //tenemos los elementos repetidos y ademas tenemos un null(serian 2)
    const temp2 = temp1.filter((el) => el && el === el);
    // console.log(temp2);
    //quitamos los repetidos
    const temp = temp2.filter((el, i) => {
      return temp2.indexOf(el) === i;
    });

    for (let i = 0; i < temp.length; i++) {
      Temperament.create({
        temperament: temp[i],
      });
    }

    res.status(200).send(temp);
  } catch (err) {
    console.log('se encontro error en la ruta get"/temperaments" ', err);
  }
});

//-----------------------------

// ----------------------------------------------------------------------------

//--------------------------
//todo esto me llega por formulario(body)
router.post("/dog", async (req, res) => {
  let { name, life_span, temperament, height, weight, image } = req.body;

  // no le pasamos los temperamentos, realizamos la funcion aparte
  let dogCreated = await Dog.create({
    name,
    life_span,
    height,
    weight,
    image,
  });
  //encontrar los temperamentos que me llegen por body(formulario)
  //los temeramentos los encuentro en Temperament,
  let temperamentDb = await Temperament.findAll({
    where: { temperament: temperament },
  });
  // console.log(temperamentDb);
  await dogCreated.addTemperaments(temperamentDb);
  res.send("perro creado");
});
router.get("/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //realizamos la consulta a la api
    const consultaApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    //respuesta de la api
    const result = consultaApi.data.filter((el) => el.id === parseInt(id));
    if (result.length === 0) {
      res.status(400).json({ error: "no se encotro el id" });
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.log('se encontro error en la ruta get"/:id" ', err);
  }
});

module.exports = router;
