import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      if (!req.body.title) {
        console.log("Missing title");
      }
      if (!req.body.author) {
        console.log("Missing author");
      }
      if (!req.body.publishYear) {
        console.log("Missing publishYear");
      }
      return res.status(400).send("Missing required fields");
    }

    const existingBook = await Book.findOne({ title: req.body.title });
    if (existingBook) {
      return res.status(400).send("Book already exists");
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();

    return res.status(200).json({
      count: books.length,
      books: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    if (req.body.title) {
      book.title = req.body.title;
    }
    if (req.body.author) {
      book.author = req.body.author;
    }
    if (req.body.publishYear) {
      book.publishYear = req.body.publishYear;
    }

    await book.save();

    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    return res.status(200).send("Book deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;
