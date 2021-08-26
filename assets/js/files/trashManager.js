import NoteManager from './noteManager.js';
import Auth from "./../modules/auth.js";

export default class TrashManager{
    static trashJson = [];

    static addToTrash = (note_id) => {
        var allNotes = NoteManager.filterUserNotes(JSON.parse(localStorage.getItem('notes')), Auth.getUser().u_id);
        TrashManager.trashJson = (Boolean(JSON.parse(localStorage.getItem('trashNotes')))) ? JSON.parse(localStorage.getItem('trashNotes')) : [];
        if(Boolean(allNotes)){
            allNotes.forEach(item =>{
                if(item.id == note_id){
                    TrashManager.trashJson = (Boolean(JSON.parse(localStorage.getItem('trashNotes')))) ? JSON.parse(localStorage.getItem('trashNotes')) : [];
                    TrashManager.trashJson.push(item);
                    localStorage.setItem('trashNotes', JSON.stringify(TrashManager.trashJson));
                    TrashManager.reBuildStorageData(note_id, true);
                }
            });
        }
        else if(TrashManager.trashJson.length > 0){
            allNotes.forEach(item =>{
                if(item.id == note_id){
                    TrashManager.trashJson.pop(item);
                    TrashManager.reBuildStorageData(note_id, false);
                }
            });
        }
        
    }

    static removeFromTrash = (note_id) => {
        TrashManager.trashJson = (Boolean(JSON.parse(localStorage.getItem('trashNotes')))) ? JSON.parse(localStorage.getItem('trashNotes')) : [];
        if(TrashManager.trashJson.length > 0){
            TrashManager.trashJson.forEach( item =>{
                if(item.id == note_id){
                    TrashManager.trashJson.pop(item);
                    localStorage.removeItem('trashNotes');
                    localStorage.setItem('trashNotes', JSON.stringify(TrashManager.trashJson));
                }
            });
        }
    }

    static restoreFromTrash = (note_id) => {
        TrashManager.trashJson = (Boolean(JSON.parse(localStorage.getItem('trashNotes')))) ? JSON.parse(localStorage.getItem('trashNotes')) : [];
        if(TrashManager.trashJson.length > 0){
            TrashManager.trashJson.forEach( item =>{
                if(item.id == note_id){
                    TrashManager.trashJson.pop(item);
                    NoteManager.notesList = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? JSON.parse(localStorage.getItem('notes')) : [];
                    NoteManager.notesList.push(item);
                    localStorage.removeItem('trashNotes');
                    localStorage.removeItem('notes');
                    localStorage.setItem('trashNotes', JSON.stringify(TrashManager.trashJson));
                    localStorage.setItem('notes', JSON.stringify(NoteManager.notesList));
                }
            });
        }
    }

    static reBuildStorageData = (note_id, type = false) => {
        if(type){
            let localNotes = JSON.parse(localStorage.getItem('notes'));
            localStorage.removeItem('notes');
            let afterRemoveList = localNotes.filter(function(note){
                return note.id != note_id;
            });
            localStorage.setItem('notes', JSON.stringify(afterRemoveList));
        }
        else{
            let localNotes = JSON.parse(localStorage.getItem('notes'));
            localStorage.removeItem('notes');
            let afterRemoveList = localNotes.filter(function(note){
                return note.id != note_id;
            });
            localStorage.setItem('notes', JSON.stringify(afterRemoveList));
        }
    }
    
}
