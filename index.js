import express from "express";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import rateLimit from "express-rate-limit";
import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Too many requests from this IP, please try again later."
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("public/ctf"));
app.use(express.urlencoded({ extended: true }));
app.use(limiter); 

function validateRequestBody(req, res, next) {
  const {
    recipient,
    greeting,
    mainMessage,
    chatMessage,
    wishTitle,
    wishText,
    replayMessage,
    lastSmile,
    imagePath,
    nineMessage,
  } = req.body;

  if (
    !recipient ||
    !greeting ||
    !mainMessage ||
    !chatMessage ||
    !wishTitle ||
    !wishText ||
    !replayMessage ||
    !lastSmile ||
    !imagePath ||
    !nineMessage
  ) {
    logger.warn('Validation failed: Missing fields in request body');
    return res.status(400).json({ error: "All fields are required!" });
  }

  next();
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/ctf", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ctf", "chall.zip"));
});

app.post("/create", validateRequestBody, async (req, res) => {
  const {
    recipient,
    greeting,
    mainMessage,
    chatMessage,
    wishTitle,
    wishText,
    customSlug,
    replayMessage,
    lastSmile,
    imagePath,
    nineMessage,
    ideasOne,
    ideasTwo,
    ideasThree,
    ideasFour,
    ideasFive,
    ideasSix,
  } = req.body;

  const ideas = [
    ideasOne,
    ideasTwo,
    ideasThree,
    ideasFour,
    ideasFive,
    ideasSix,
  ].filter(Boolean);

  const slug = customSlug || nanoid(8);

  try {
    const newMessage = await prisma.message.create({
      data: {
        slug,
        recipient,
        greeting,
        mainMessage,
        chatMessage,
        ideas,
        wishTitle,
        wishText,
        replayMessage,
        lastSmile,
        imagePath,
        nineMessage,
      },
    });

    logger.info(`Message created with slug: ${newMessage.slug}`);
    res.redirect(`/view/${newMessage.slug}`);
  } catch (error) {
    logger.error(`Error creating message: ${error.message}`);
    res.status(500).send("Terjadi kesalahan!");
  }
});

app.get("/view/:slug", async (req, res) => {
  const { slug } = req.params;
  const message = await prisma.message.findUnique({ where: { slug } });

  if (!message) {
    logger.warn(`Message not found for slug: ${slug}`);
    return res.redirect("/");
  }

  res.render("view", { message });
});

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
