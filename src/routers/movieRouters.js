import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ httpMethos: "GET" });
});



router.post("/", (req, res) => {
  res.json({ httpMethos: "POST" });
});



router.delete("/", (req, res) => {
  res.json({ httpMethos: "DELETE" });
});



router.put("/", (req, res) => {
  res.json({ httpMethos: "PUT" });
});



export default router;