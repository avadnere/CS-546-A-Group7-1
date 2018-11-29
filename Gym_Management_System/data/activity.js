const mongoCollections = require("../config/mongoCollections");
const activity = mongoCollections.activity;
const uuid = require('uuid/v1');


const exportedMethods = {
    async addActivity(activityname,activitytrainer,membershipplan,member) {
        
        if (!activityname) throw "No activityname provided";
        if (!activitytrainer) throw "No activitytrainer provided";
        if (!membershipplan) throw "No membershipplan provided";
        if (!member) throw "No member provided";
        console.log(activityname)
        console.log(activitytrainer)
        console.log(membershipplan)
        console.log(member)
       
        const activityCollection = await activity();
        const newactivity = {
            _id: uuid(),
            activityname: activityname,
            activitytrainer:activitytrainer,
            membershipplan:membershipplan,
            member:member            
        };

        const addedactivity = await activityCollection.insertOne(newactivity);
        const newId = addedactivity.insertedId;
        
        return {
            status: true,
            addedactivity,
            newId
        }
        
    },
    

    async removeActivity(activityId) {
        if (!activityId) throw "You must provide an id to delete";

        const activityCollection = await activity();

        const removeActivity = await activityCollection.removeOne({ _id: activityId });

        if (removeActivity.deletedCount === 0) {
            throw `Could not delete activity with id: ${activityId}`;
        }
    },
   

    async getAllActivities() {
        const activityCollection = await activity();
        const getActivities = await activityCollection.find({}).toArray();
        return getActivities;

    },

    async getActivityById(acitivityid) {
        const activityCollection = await activity();
        const getActivities = await activityCollection.findOne({ _id: acitivityid });
        return getActivities;
    },

}
module.exports = exportedMethods;