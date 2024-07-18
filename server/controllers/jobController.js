import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const GetAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const GetSingleJob = async (req, res) => {
  const { id } = req.params;
  const jobGet = await Job.findById(id);
  if (!jobGet) {
    new NotFoundError(`no job with id : ${id}`);
  }
  res.status(200).json({ jobGet });
};

export const CreateJob = async (req, res) => {
  try {
    const points_ = req.body.points ? JSON.parse(req.body.points || "[]") : [];

    const { company, title, companyIconBg, date } = req.body;
    const newJob = await Job.create({
      company,
      title,
      companyIconBg,
      date,
      points: points_,
    });

    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path);
      newJob.companyIcon = response.secure_url;
      newJob.companyIconPublicId = response.public_id;
      await fs.unlink(req.file.path); // Delete the file from the server
      await newJob.save();
    }

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create job", details: error.message });
  }
};

export const DeleteJob = async (req, res) => {
  const { id } = req.params;
  const jobToDelete = await Job.findByIdAndDelete(id);
  if (!jobToDelete) {
    return res.status(401).json({ msg: "No Job is found to be deleted !" });
  }
  res.status(200).json({ msg: "Job is deleted" });
};
