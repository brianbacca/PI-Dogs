const { Router } = require("express");
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require("axios");
const { Dog, Temperament } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//get/dogs --trae todas las razas de perros y devuelve los datos de la ruta princial nombre, imagen, temperamento y peso.

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
        e.weight.metric.split(" - ")[0] && e.weight.metric.split(" - ")[0],
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
      id: d.id + 300,
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

//---------------------------------------------------------------------------------------------------------

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
        : res.status(400).send("the breed was not found");
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
    const allTemperaments = await getDogsApi();

    const temperaments = allTemperaments.map((el) => el.temperament);

    const temp1 = temperaments.map((e) => e && e.split(", ")).flat();

    const temp2 = temp1.filter((el) => el && el === el);

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

// ----------------------------------------------------------------------------

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
  res.send("dog created");

 
});

//----------------------------------------------------------------------------------------------------------
router.get("/dogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //realizamos la consulta a la api
    const dosgsId = await getDogsAll();
    //respuesta de la api
    const result = dosgsId.filter((el) => el.id === parseInt(id));
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
