const { log } = require("console");
const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(__dirname, "db.json");

async function getNote() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function addNote(title) {
  const notes = await getNote();

  const note = {
    title,
    id: Math.random().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function removeNote(id) {
  const notes = await getNote();

  const filtred = notes.filter((note) => note.id !== id);

  await fs.writeFile(notesPath, JSON.stringify(filtred));
}

async function editNote(id, getTitle) {
  let notes = await getNote();

  const index = notes.findIndex((note) => note.id == id);
  notes[index] = getTitle;

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
  getNote,
  addNote,
  removeNote,
  editNote,
};
