import Activity from "../models/Activity.js";

export const getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find();
    console.log("Activities:", activities);

    if (!activities.length) {
      throw { statusCode: 404, message: "Activity not found" };
    }
    res.json(activities);
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.find({ _id: id });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (error) {
    next(error);
  }
};
