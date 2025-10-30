import express from "express";
import { getSurveyArticles } from "../services/surveyService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;

  try {
    const { data, total } = await getSurveyArticles(page, limit);

    const totalPages = Math.ceil(total / limit);

    // mapping data sesuai SurveyTable.tsx
    const formatted = data.map((row) => ({
      id: row.id,
      date: new Date(row.created_at).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      username: row.author_username,
      survey: row.title,
      action: "Post",
    }));

    return res.json({
      surveys: formatted,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch survey data" });
  }
});

export default router;
