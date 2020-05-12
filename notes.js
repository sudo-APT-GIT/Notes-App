const fs = require('fs')
const chalk = require('chalk')

//  addNote function

const addNote = (title, body) => {
    const notes = loadNotes()

    //  const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    //  find will stop after finding one duplicate but filter doesn't
    //  duplicateNote === undefined when there is no duplicate in the folder


    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.black.bgGreen("New note added!"))
    }
    else {
        console.log(chalk.black.bgRed("Note title taken!"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {

    try {

        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (error) {
        return []
    }

}

//  remove note function

const removeNote = (title) => {

    const notes = loadNotes()
    const notesToBeKept = notes.filter((note) => note.title !== title)

    if (notesToBeKept.length === notes.length) {
        console.log(chalk.black.bgRed("No Note Found!"))
    }
    else {
        saveNotes(notesToBeKept)
        console.log(chalk.black.bgGreen("Note Removed"))
    }

}

//  list Notes function

const listNotes = () => {
    console.log(chalk.magenta.bold.underline("Your notes:\n"))
    const myNotes = loadNotes()
    i = 0
    myNotes.forEach(element => {
        i++
        console.log(chalk.yellow.bold(i.toString() + ". " + element.title))
    });
}

//  read Note function

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if (noteToRead) {
        console.log(chalk.magenta.bold(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.bold.inverse("Note not Found"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}