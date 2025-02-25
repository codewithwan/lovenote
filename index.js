import express from "express";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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
    return res.status(400).json({ error: "All fields are required!" });
  }

  next();
}

app.get("/", (req, res) => {
  res.render("index");
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

    res.json({
      success: true,
      message: "Pesan berhasil dibuat!",
      slug: newMessage.slug,
      data: {
        recipient_name: newMessage.recipient,
        greeting_text: newMessage.greeting,
        main_message: newMessage.mainMessage,
        chatbox_message: newMessage.chatMessage,
        ideas: newMessage.ideas,
        wish: {
          title: newMessage.wishTitle,
          text: newMessage.wishText,
        },
        replay_message: newMessage.replayMessage,
        last_smile: newMessage.lastSmile,
        image_path: newMessage.imagePath,
        nine_message: newMessage.nineMessage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan!");
  }
});

app.get("/view/:slug", async (req, res) => {
  const { slug } = req.params;
  const message = await prisma.message.findUnique({ where: { slug } });

  if (!message) return res.status(404).send("Pesan tidak ditemukan!");
  console.log(message);

  res.render("view", { message });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
