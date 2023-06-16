import { Request, Response } from "express";
import Note from "../models/noteModel.js";

const getNote = async (req: Request, res: Response) => {};

const getNotes = async (req: Request, res: Response) => {};

const createNote = async (req: Request, res: Response) => {};

const deleteNote = async (req: Request, res: Response) => {};

const editNote = async (req: Request, res: Response) => {};

const saveNote = async (req: Request, res: Response) => {};

const publishNote = async (req: Request, res: Response) => {};

export {
  getNote,
  getNotes,
  createNote,
  editNote,
  deleteNote,
  saveNote,
  publishNote,
};
