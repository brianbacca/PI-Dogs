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
  const response = await api.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      height_min:
        e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
      height_max:
        e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],
      weight_min:
        e.weight.metric.split(" - ")[0] !== "NaN"
          ? e.weight.metric.split(" - ")[0]
          : 6,
      weight_max:
        e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1],
      life_span: e.life_span,
      temperament: e.temperament,
      image: e.image.url,
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
      height_min: d.height_min,
      height_max: d.height_max,
      weight_min: d.weight_min,
      weight_max: d.weight_max,
      life_span: d.life_span,
      createInDb: d.createInDb,
      temperament: d.dataValues.temperaments
        .map((t) => t.temperament)
        .join(", "),
    };
  });
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
      const dogsName = dogsTotal.filter((el) => {
        return el.name.toLowerCase().includes(name.toLocaleLowerCase());
      });
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

    const allTemperaments = await getDogsApi();

    //mapeamos y nos traemos el arreglo de temperamentos
    const temperaments = allTemperaments.map((el) => el.temperament);
    //quitamos el espacio de algunos temperamentos, aplanamos el array
    const temp1 = temperaments.map((e) => e && e.split(", ")).flat();

    //tenemos los elementos repetidos y ademas tenemos un null(serian 2)
    const temp2 = temp1.filter((el) => el && el === el);
    // console.log(temp2);
    //quitamos los repetidos
    const temp = temp2.filter((el, i) => {
      return temp2.indexOf(el) === i;
    });
    if (Temperament.length === 0) {
      for (let i = 0; i < temp.length; i++) {
        Temperament.findOrCreate({
          where: { temperament: temp[i] },
        });
      }

      res.status(200).send(temp);
    }
  } catch (err) {
    console.log('se encontro error en la ruta get"/temperaments" ', err);
  }
});

//-----------------------------

// ----------------------------------------------------------------------------

//--------------------------
//todo esto me llega por formulario(body)
router.post("/dog", async (req, res) => {
  let {
    name,
    life_span,
    temperament,
    height_min,
    height_max,
    weight_min,
    weight_max,
    image,
    createInDb,
  } = req.body;

  // no le pasamos los temperamentos, realizamos la funcion aparte
  let dogCreated = await Dog.create({
    name,
    life_span,
    height_min,
    height_max,
    weight_min,
    weight_max,
    createInDb,
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

  //-----------------------------------
});
router.get("/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //realizamos la consulta a la api
    const dosgsId = await getDogsAll();
    //respuesta de la api
    const result = dosgsId.find((el) => el.id === parseInt(id));
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
