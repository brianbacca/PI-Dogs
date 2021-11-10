const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require("axios");
const { Dog, Temperament } = require("../db");

const router = Router();
//eliminar los valores duplicados
Array.prototype.elReps = (function (a) {
  return function () {
    return this.filter(a);
  };
})(function (a, b, c) {
  return c.indexOf(a, b + 1) < 0;
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//get/dogs --trae todas las razas de perros y devuelve los datos de la ruta princial nombre, imagen, temperamento y peso.
const API_KEY = "9984f51f-f7f5-4fca-9e74-e5263efc358f";
const getDogs = async () => {
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
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["temperament"],
      through: {
        attributes: [],
      },
    },
  });
};

const getDogsAll = async () => {
  const apiInfo = await getDogs();
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
    // nos traemos los temperamentos como no hay nada en db tenemos un obj= {}
    const allTemperament = await Temperament.findAll();
    if (allTemperament.length === 0) {
      //si no hay nada hacemos entramos aca;
      var arr = [];
      const tempApi = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );

      //mapeamos y nos traemos el objeto.
      const temperaments = tempApi.data.map((e) => {
        const temp = e.temperament;
        return temp;
      });
      // console.log(temperaments);
      const temp2 = temperaments.map((e) => e && e.split(", ")).flat();
      const tempSinR = temp2.elReps();
      for (let i = 0; i < tempSinR.length; i++) {
        let itm = tempSinR[i];

        arr.push(itm);
      }
      console.log(arr);
      // const arr2 = arr.forEach((el) => {
      //   Temperament.create({
      //     temperament: el,
      //   });
      // });
      const arr2 = arr.map((el) => {
        return {
          temperament: el,
        };
      });
      const final = Temperament.bulkCreate(arr2);
      res.send(final);
    } else {
      res.send(allTemperament);
    }
  } catch (err) {
    console.log('se encontro error en la ruta get"/temperaments" ', err);
  }
});

// ----------------------------------------------------------------------------

//--------------------------
//todo esto me llega por formulario(body)
router.post("/dog", async (req, res) => {
  try {
    let {
      name,
      life_span,
      temperament,
      origin,
      height,
      weight,
      image,
      createInDb,
    } = req.body;

    // no le pasamos los temperamentos, realizamos la funcion aparte
    let dogCreated = await Dog.create({
      name,
      life_span,
      origin,
      height,
      weight,
      image,
      createInDb,
    });
    //encontrar los temperamentos que me llegen por body(formulario)
    //los temeramentos los encuentro en Temperament,
    let temperamentDb = await Temperament.findAll({
      where: { temperament: temperament },
    });
    dogCreated.addTemperament(temperamentDb);
    res.send("perro creado");
  } catch (err) {
    console.log('se encontro error en la ruta post"/dog" ', err);
  }
});

router.get("/:id", async (req, res) => {
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
