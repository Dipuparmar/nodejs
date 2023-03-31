const {parse} = require('csv-parse');
const fs = require('fs');

const path = require('path');

const planets= require('./planets.mongo');


function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
function loadplanetsData(){

  return new Promise((resolve,reject)=>{
   fs.createReadStream(path.join(__dirname,'..', '..','data', 'kepler_data.csv'))
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data', async (data) => {
    if (isHabitablePlanet(data)) {
         saveplanet(data)

      // // replace below create with insert+ upadte = upsert
      //  await planets.create({
      //   keplerName: data.kepler_name,
      //  });  //create  is asynchronous function 
    }
  })
  .on('error', (err) => {
    console.log(err);
    reject(err)
  })
  .on('end', async () => {
    const countPlanetsFound = (await getAllPlanets()).length;
    console.log(` ${countPlanetsFound} habitable planets found!`);
    resolve();
  });
})
}

async function getAllPlanets(){
  return await planets.find({},{
    '_id':0, '__v':0
  });

}

async function saveplanet(planet){
  try{
    await planets.updateOne({
      //filter
      keplerName: planet.kepler_name,
    },{
      //update
      keplerName: planet.kepler_name,
    },{
      //optional
      upsert:true,
    });
  }
   catch(err){
    console.error(`could not save planet ${err}`);
  }
}



module.exports={
    loadplanetsData,
     getAllPlanets
}