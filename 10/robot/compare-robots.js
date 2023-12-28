const { runRobot, VillageState } = require("./state")

/*
    Compare two robots
*/

exports.compareRobots = function (robot1, memory1, robot2, memory2) {
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
