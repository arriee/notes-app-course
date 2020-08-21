const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes...';

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);


    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.inverse.green('Note added!'));
    } else {
        console.log(chalk.inverse.red('Title taken! Try again'));
    }


}

const removeNote = (title) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter(el => el.title !== title);

    if (notes.length > updatedNotes.length) {
        saveNotes(updatedNotes);
        console.log(chalk.inverse.green('Note removed!'));

    } else {
        console.log(chalk.inverse.red('Note not found!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse.yellow('List of the notes'))
    notes.forEach(el => {console.log(el.title)});
}

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find(el => el.title === title);

    if (note) {
        console.log(chalk.blue.bold.inverse(note.title.toUpperCase()));
        console.log(note.body);
    } else {
        console.log(chalk.red('Note not found'));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);

    } catch(e) {
        return [];
    }

}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
