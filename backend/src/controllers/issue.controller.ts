import { Request, Response } from "express";
import { Issue } from "../models/issue.model";
import { Society } from "../models/society.model";

// Create Issue (Resident)
export const createIssue = async (req: Request, res: Response) => {
  try {
    const { title, description, category, severity } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = req.user;
    
    // Fetch society to get SLA settings
    const society = await Society.findById(user.society);
    console.log("USER:", user);
    console.log("USER SOCIETY:", user?.society);
    if (!society) {
      return res.status(404).json({ message: "Society not found" });
    }

    // Calculate SLA deadline
    const slaHours = society.defaultSLAs[category as keyof typeof society.defaultSLAs] || 24;

    const slaDeadline = new Date(Date.now() + slaHours * 60 * 60 * 1000);

    // Basic priority logic
    let priorityScore = 1;
    if (severity === "high") priorityScore = 3;
    if (severity === "medium") priorityScore = 2;

    const issue = await Issue.create({
      title,
      description,
      category,
      severity,
      priorityScore,
      reportedBy: user.id,
      society: user.society,
      slaDeadline
    });

    res.status(201).json(issue);

  } catch (error) {
    console.error("CREATE ISSUE ERROR:", error);
    res.status(500).json({ message: "Failed to create issue" });
  }
};


// Get Issues for Society
export const getSocietyIssues = async (req: Request, res: Response) => {
  try {
    const issues = await Issue.find({ society: req.user.society })
      .populate("reportedBy", "name flatNumber")
      .sort({ priorityScore: -1 });

    res.json(issues);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch issues" });
  }
};


// Update Issue Status (Staff/Admin)
export const updateIssueStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.status = status;
    await issue.save();

    res.json(issue);

  } catch (error) {
    res.status(500).json({ message: "Failed to update issue" });
  }
};