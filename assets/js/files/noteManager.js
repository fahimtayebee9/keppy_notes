export default class NoteManager {
    static notesList = [
        
    ];

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
    
    static getAllNotes(){
        return JSON.parse(localStorage.getItem('notes'));
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
        const pushed = NoteManager.notesList.push(note);
        return (pushed ==  true) ? true : false;
    }
}

