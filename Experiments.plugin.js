/**
 * @name Experiments
 * @author oragne
 * @description Enables access to experiments and staff-only options for normal users (plugin is still in beta).
 * @version 1.0.3
 * @authorId 980377728165478470
 * @source https://github.com/choco705/BetterDiscordplugins
 * @updateUrl https://raw.githubusercontent.com/choco705/BetterDiscordplugins/main/Experiments.plugin.js
 */
let wpRequire

module.exports = class Experiments {
    load() {}

    start = () => {
        
        window.webpackChunkdiscord_app.push([[ Math.random() ], {}, (req) => { wpRequire = req; }]);
        let mod = Object.values(wpRequire.c).find(x => typeof x?.exports?.Z?.isDeveloper !== "undefined");
        let usermod = Object.values(wpRequire.c).find(x => x?.exports?.default?.getUsers)
        let nodes = Object.values(mod.exports.Z._dispatcher._actionHandlers._dependencyGraph.nodes)
        try {
            nodes.find(x => x.name == "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({user: {flags: 1}})
        } catch (e) {}
        let oldGetUser = usermod.exports.default.__proto__.getCurrentUser;
        usermod.exports.default.__proto__.getCurrentUser = () => ({isStaff: () => true})
        nodes.find(x => x.name == "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]()
        usermod.exports.default.__proto__.getCurrentUser = oldGetUser
    }

    stop = () => {}
}