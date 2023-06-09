const {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,

} = require('../../models/launches.model');


async function httpgetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

 async function httpaddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "missing required launch property"
        })
    }


    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid launch Date"
        })
    }

   await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

const exitsLaunch= await existsLaunchWithId(launchId);

    if (!exitsLaunch) {
        console.log("httpAbortLaunch");
        return res.status(404).json({
            error: 'Launch not found',
        });
    }

    const aborted = await abortLaunchById(launchId);
    console.log('httpAbortLaunch');

    if(!aborted){
        return res.status(400).json({
            error:'laucnh not aborted'
        })
    }
    return res.status(200).json({
        "acknowledged": true,
    });
}

module.exports = {
    httpgetAllLaunches,
    httpaddNewLaunch,
    httpAbortLaunch
}