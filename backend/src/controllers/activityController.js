const activityService = require("../services/activityService");

exports.getRecentActivity = async (req, res) => {
  try {
    const activity = await activityService.getRecentActivity(req.user.id);

    res.json(activity);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
