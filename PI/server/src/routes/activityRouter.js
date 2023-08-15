const { Router } = require("express");
const {
  getActivities,
  postActivity,
} = require("../controllers/activityController");
const deleteActivity = require("../controllers/deleteActivity");
const activityRouter = Router();

activityRouter.get("/", getActivities);

activityRouter.post("/", postActivity);

activityRouter.delete("/", async (req, res) => {
  const { name } = req.query;

  try {
    const isDeleted = await deleteActivity(name);
    if (isDeleted) {
      return res.status(200).json({ message: "Actividad eliminada" });
    } else {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar la actividad" });
  }
});

module.exports = activityRouter;
