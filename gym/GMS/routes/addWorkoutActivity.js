const express = require("express");
const router = express.Router();
const data = require("../data");
const resultData = data.workoutActivity;
const userData = data.user;


router.get("/", async (req, res) => {

    try {
        let users = await userData.getAllUsers();
        res.render("addWorkoutActivity", { username: users });
    }
    catch (e) {
        res.render("error", { title: "error" });
        return;
    }

});

router.post("/", async (req, res) => {
    let user = req.body;
    let username = user.username;
    let level = user.level;
    let description = user.description;
    let startdate = user.startdate;
    let enddate = user.enddate;
    let days = user.days;
    let activity = user.activity;
    let sets = user.sets;
    let weight = user.weight;
    let repetitions = user.repetitions;

        try{
        let users = await userData.getAllUsers();
        }
        catch(e)
        {
            res.render("error", { title: "error" });
            return;
        }
        
        if (!username) {
            res.render("addWorkoutActivity", { username: users, message: "Please choose the member for adding activity", title: "addWorkoutActivity" });
            return;
        }

        if (!level) {
            res.render("addWorkoutActivity", { username: users, message: "Please provide level", title: "addWorkoutActivity" });
            return;
        }

        if (!description) {
            res.render("addWorkoutActivity", { username: users, message: "Please provide description", title: "addworkoutActivity" });
            return;
        }

        if (!startdate) {
            res.render("addWorkoutActivity", { username: users, message: "Please provide startdate", title: "addWorkoutActivity" });
            return;
        }
        if (!enddate) {
            res.render("addWorkoutActivity", { username: users, message: "Please provide enddate", title: "addWorkoutActivity" });
            return;
        }
        if (!days) {
            res.render("addWorkoutActivity", { username: users, message: "Please provide days", title: "addWorkoutActivity" });
            return;
        }
        if (!activity) {
            res.render("addWorkoutActivity", { username: users, message: "Please provide activity", title: "addWorkoutActivity" });
            return;
        }
        if (!sets) {
            res.render("addWorkoutActivity", { username: users, message: "Please provide sets", title: "addWorkoutActivity" });
            return;
        }
        if (!weight) {
            res.render("addWorkoutActivity", { username: users, message: "Please provide weight", title: "addWorkoutActivity" });
            return;
        }
        if (!repetitions) {
            res.render("addWorkoutActivity", { username: users, message: "Please provide repetitions", title: "addWorkoutActivity" });
            return;
        }
    let userId = null;
    let acitivityId = null;
    try {
        let usertoadd = await userData.getUserByUsername(username);
        userId = usertoadd._id;
        let postcredentials = await resultData.addActivity(level, description, startdate, enddate, days, activity, sets, weight, repetitions);
        acitivityId = postcredentials.newId;
        console.log("aid " +acitivityId)
        console.log(userId)
        console.log("userId: "+userId)
        let postuserActivity = await resultData.addUserActivity(userId, acitivityId);
        let users = await userData.getAllUsers();
        res.render("addworkoutActivity", {username: users,message: "Activity added successfully!" });
    }
    catch (e) {
        res.render("error", { title: "error" });
        return;
    }
});



module.exports = router;