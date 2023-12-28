const { roadGraph } = require("./roads")

/****************************************************
    Robot - Random robot
    Does random moves
*****************************************************/
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

exports.randomRobot = function (state) {
    return { direction: randomPick(roadGraph[state.place]) };
}

/***************************************************
    Robot - route robot
    Uses a route that goes through all places
****************************************************/
const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

exports.routeRobot = function (state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}

/****************************************************
    Robot - goal oriented
    first go to the first parcel source, and the go to its destination
*****************************************************/
function findRoute(graph, from, to) {
    let work = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
}

exports.goalOrientedRobot = function ({ place, parcels }, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}


/****************************************************
    Robot - goal oriented optimized
    instead of choosing first parcel, choose the one which is near
****************************************************/
function findNearest(graph, from, parcels) {
    let work = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (parcels.some((parcel) => parcel.place == place)) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
}

exports.yourRobot = function ({ place, parcels }, route) {
    if (route.length == 0) {
        let index = parcels.findIndex((parcel) => parcel.place == place);
        if (index <= -1)
            route = findNearest(roadGraph, place, parcels);
        else {
            let parcel = parcels[index];
            if (parcel.place != place) {
                route = findRoute(roadGraph, place, parcel.place);
            } else {
                route = findRoute(roadGraph, place, parcel.address);
            }
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}