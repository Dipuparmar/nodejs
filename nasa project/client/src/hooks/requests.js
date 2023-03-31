const api_url = "http://localhost:8000";

 // Load planets and return as JSON.
async function httpGetPlanets() {
  const response= await fetch(`${api_url}/planets`)
  return await response.json();
}




 // Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
const response = await fetch(`${api_url}/launches`);
const fetchedLaunches =await response.json();
return fetchedLaunches.sort((a,b)=>{
  return a.flightNumber - b.flightNumber;
})

}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  try{
    return await fetch(`${api_url}/launches`,{
      method:"post",
      headers:{
        "content-Type":"application/json",
      },
      body:JSON.stringify(launch),
    });
  }catch(err){
    return{
      ok:false,
    };
  }

}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
 
  try{
    console.log("front end ", id);
    return await fetch(`${api_url}/launches/${id}`,{
      method:"delete",
    });
  }catch(err){
    console.log(err);
    return{
      ok: false,
    };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};