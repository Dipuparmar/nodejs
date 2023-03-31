const { Error } = require('mongoose');
const launchesDatabase= require('./launches.mongo');

const planets= require('./planets.mongo');

const default_flight_number=100;

// const launches= new Map();

// let latestFlightNumber=100;

const launch={
    flightNumber:100,
    mission:'djjdg  djgdj kd',
    rocket:'exploere iS1',
    launchDate: new Date('december 27,2030'),
    target:"Kepler-442 b",
    customers:['kdd','jdjd'],
    upcoming:true,
    success:true,
}

saveLaunch(launch);
// launches.set(launch.flightNumber,launch);
// getAllLaunches();
async function existsLaunchWithId(launchId){
    return await launchesDatabase.findOne({
        flightNumber:launchId,
    })
}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDatabase
    .findOne()
    .sort('-flightNumber');

    if(!latestLaunch){
        return default_flight_number;
    }

    return latestLaunch.flightNumber;
}



async function getAllLaunches(){
    return await launchesDatabase.find({},{
        '_id':0, '__v':0
      });
}

async function saveLaunch(launch){
     const planet = await planets.findOne({
        keplerName:launch.target,
     });
     if(!planet){
        throw new Error('no matching planet found')
     }

    await launchesDatabase.findOneAndUpdate({
        flightNumber:launch.flightNumber,
    },launch,{
        upsert:true,
    });
}

 async function scheduleNewLaunch(launch){
    const newFlightNumber =await getLatestFlightNumber() + 1;

  const newLaunch=  Object.assign(launch,{
         success:true,
         upcoming:true,
         customer:['zero to masttery','NASA'],
         flightNumber:newFlightNumber,
    });

    await saveLaunch(newLaunch);
 }


// function addNewLaunch(launch){
//     latestFlightNumber = latestFlightNumber + 1;
//     launches.set(
//         latestFlightNumber,
//         Object.assign(launch,{
//             success:true,
//             upcoming:true,
//             customer:['zero to masttery','NASA'],
//             flightNumber:latestFlightNumber,
//         })
//     )
// }

async function abortLaunchById(launchId){
    // console.log("abort launch by id : ",launchId);
    // const aborted = launches.get(launchId);
    // aborted.upcoming=false;
    // aborted.success=false;
    // console.log(aborted);

    // return aborted;

    return await launchesDatabase.updateOne({
        flightNumber:launchId,
    },{
        upcoming:false,
        success:false,
    })


}


module.exports={
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
}
