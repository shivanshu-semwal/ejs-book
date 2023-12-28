const robots = require("./example-robots")
const { runRobot, VillageState } = require("./state")
const { compareRobots } = require("./compare-robots")

// runRobot(VillageState.random(), robots.randomRobot);
// runRobot(VillageState.random(), robots.routeRobot, [])
// runRobot(VillageState.random(), robots.goalOrientedRobot, []);
runRobot(VillageState.random(), robots.yourRobot, []);
// console.log(compareRobots(robots.yourRobot, [], robots.goalOrientedRobot, []));