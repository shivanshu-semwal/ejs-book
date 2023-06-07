/* 
    Roads in the graph
*/
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

/* 
    Build graph from the roads
*/
function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        if (graph[from] == null) graph[from] = [to];
        else graph[from].push(to);
    }

    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);


/* 
    One timestamp
*/
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return { place: destination, address: p.address };
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

/* 
    Run robot in simulation
*/
function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

/* 
    Create random parcel orders
*/
VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({ place, address });
    }
    console.log(parcels)
    return new VillageState("Post Office", parcels);
};


/* 
    Robot - Random robot
    Does random moves
*/
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) };
}

// runRobot(VillageState.random(), randomRobot);


/* 
    Robot - route robot
    Uses a route that goes through all places
*/
const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}

// runRobot(VillageState.random(), routeRobot, [])


/* 
    Robot - goal oriented
    first go to the first parcel source, and the go to its destination
*/
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

function goalOrientedRobot({ place, parcels }, route) {
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

runRobot(VillageState.random(), goalOrientedRobot, []);

/* 
    Robot - goal oriented optimized
    instead of choosing first parcel, choose the one which is near
*/
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

function yourRobot({ place, parcels }, route) {
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

runRobot(VillageState.random(), yourRobot, []);


/*
    Compare two robots
*/

function compareRobots(robot1, memory1, robot2, memory2) {
    const TASKS = 10000;
    let tasks = new Array(TASKS).fill(VillageState.random());
    let total_steps = tasks.map((state) => {
        return {
            "robot1": runRobot(state, robot1, memory1),
            "robot2": runRobot(state, robot2, memory2)
        }
    }).reduce(
        (total, state) => {
            return {
                "robot1": total.robot1 + state.robot1,
                "robot2": total.robot2 + state.robot2
            }
        },
        { "robot1": 0, "robot2": 0 }
    );
    return {
        "robot1": total_steps.robot1 / TASKS,
        "robot2": total_steps.robot2 / TASKS
    }
}

console.log(compareRobots(yourRobot, [], goalOrientedRobot, []));