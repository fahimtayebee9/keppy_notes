import Auth from "./../modules/auth.js";

export default class NoteManager {
    static notesList = [];

    constructor(id, title, text, priority, color, date, collaborator = [], pin, user_id, remind_date, image, edited = false){
        this.id             = id;
        this.title          = title;
        this.priority       = priority;
        this.color          = color;
        this.text           = text;
        this.date           = date;
        this.collaborator   = collaborator;
        this.pin            = pin;
        this.user_id        = user_id;
        this.remind_date    = remind_date;
        this.image          = image;
        this.trash          = false;
        this.edited         = edited;
    }
    
    static filterUserNotes(notes , user_id){
        let userNotes = notes.filter(function(note){
            return note.user_id == user_id;
        });
        return userNotes;
    }

    static filterSharedNotes(notes , user_id){
        if(Boolean(notes.collaborator)){
            let shared = notes.filter(function(note){
                return note.collaborator.forEach(element => {
                    element == user_id;
                });
            });
            return shared;
        }
    }

    static findById = (id) => {
        const note = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? 
                        NoteManager.filterUserNotes(JSON.parse(localStorage.getItem('notes')) , 
                                                    Auth.getUser().u_id).filter( note => { 
                                                        return note.id == id; 
                                                    })[0] : null;
        return note;
    }
    
    static getAllNotes(){
        return (Boolean(JSON.parse(localStorage.getItem('notes')))) ? JSON.parse(localStorage.getItem('notes')) : [];
    }
    
    static convertToJson = (note) => {
        if(Boolean(note)){
            return {
                        "id"            : note.id, 
                        "title"         : note.title, 
                        "text"          : note.text, 
                        "priority"      : note.priority, 
                        "color"         : note.color, 
                        "date"          : note.date, 
                        "collaborator"  : note.collaborator, 
                        "pin"           : note.pin, 
                        "user_id"       : note.user_id, 
                        "remind_date"   : note.remind_date, 
                        "image"         : note.image,
                        "edited"        : note.edited
                    };
        }
    }
    
    static addNewNote(note){
        if(Boolean(note)){
            const jsonNote = NoteManager.convertToJson(note);
            NoteManager.notesList = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? JSON.parse(localStorage.getItem('notes')) : [];
            NoteManager.notesList.push(jsonNote);
            localStorage.setItem('notes', JSON.stringify(NoteManager.notesList));
        }
    }

    static updateNote(note){
        if(Boolean(note)){
            const jsonNote = NoteManager.convertToJson(note);
            NoteManager.notesList.push(jsonNote);
            localStorage.removeItem('notes');
            localStorage.setItem('notes', JSON.stringify(NoteManager.notesList));
        }
    }
}

