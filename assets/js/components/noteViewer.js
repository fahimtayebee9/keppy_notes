import NoteManager from "./../files/noteManager.js";
import UserManager from "./../files/userManager.js";
import Auth from "../modules/auth.js";
import Element from "../modules/element.js";
import TrashManager from "../files/trashManager.js";
import WriteComponent from "./writeComponent.js";

export default class NoteViewer{
    
    static displayNotes = () => {
        if(Auth.checkUser()){
            const allNotes = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? 
                        NoteManager.filterUserNotes(JSON.parse(localStorage.getItem('notes')) , Auth.getUser().u_id) : null;
            const sortedNotes = (Boolean(allNotes)) ? allNotes.sort((a, b) => parseFloat(Number(b.priority)) - parseFloat(Number(a.priority))) : [];

            let markUp = "";
            if(Boolean(sortedNotes)){
                sortedNotes.forEach( item => {
                    markUp += WriteComponent.writeNote(item, false, false);
                });
            }
            
            Element.notesList.innerHTML = markUp;
            this.TrashAction();
        }
    }

    static displaySharedNotes = () => {
        if(Auth.checkUser()){
            const allNotes = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? 
                        NoteManager.filterSharedNotes(JSON.parse(localStorage.getItem('notes')) , Auth.getUser().u_id) : null;
            const sortedNotes = (Boolean(allNotes)) ? allNotes.sort((a, b) => parseFloat(Number(a.priority)) > parseFloat(Number(b.priority))) : [];

            let markUp = "";
            if(Boolean(sortedNotes)){
                sortedNotes.forEach( item => {
                    const createDate = new Date(item.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });
                    markUp += `<div class="note noteMd noteBtn ${item.color}" data-toggle="modal" data-target="#note_${item.id}">
                                    <div class="n-con">
                                        <div class="img-con" style="display: none;">
                                            <img src="" alt="">
                                        </div>
                                        <h6 class="title">${item.title}</h6>
                                        <p class="text">${item.text}</p>
                                        <p class="text text-right pt-3 date">Created At ${createDate}</p>
                                        <div class="n-tagsList">
                                            <p>tag <span class="tag-icon">X<span></p>
                                        </div>
                                    </div>
                                    <div class="hv-btns">
                                        <div class="top-area">
                                            <button class="nBtn pinBtn" id="pinBtn" data-toggle="tooltip" data-placement="top" title="Pin">
                                                <i class="fas fa-map-pin"></i>
                                            </button>
                                        </div>
                                        <div class="bottom-area">
                                            <button type="button" class="nBtn remindBtn" data-toggle="tooltip" data-placement="top" title="Reminder">
                                                <i class="far fa-bell"></i>
                                            </button>
                                            <button type="button" class="nBtn collaboratorBtn" data-toggle="tooltip" data-placement="top" title="Collaborator">
                                                <i class='bx bxs-user-plus'></i>
                                            </button>
                                            <button type="button" class="nBtn colorBtn" data-toggle="tooltip" data-placement="top" title="Color">
                                                <i class="fas fa-palette"></i>
                                            </button>
                                            <button type="button" class="nBtn tagBtn" data-toggle="tooltip" data-placement="top" title="Tag">
                                                <i class="fas fa-pen-nib"></i>
                                            </button>
                                            <button type="button" class="nBtn imgBtn" data-toggle="tooltip" data-placement="top" title="Image">
                                                <i class="fas fa-paperclip"></i>
                                            </button>
                                            <button type="button" class="nBtn trashBtn" id="nid_${item.id}" data-toggle="tooltip" data-placement="top" title="Delete">
                                                <i class="far fa-trash-alt" id="nid_${item.id}"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                </div>`;
                });
            }
            
            Element.collabList.innerHTML = markUp;
        }
    }

    static toggleNotes = () => {
        Element.trashMainBody.style.display = "none";
        Element.noteMainBody.style.display  = "block";
    }

    static TrashAction = () => {
        document.querySelectorAll('.trashBtn').forEach(trashBtn => {
            trashBtn.addEventListener('click', function(event){
                event.stopPropagation();
                const noteId = event.target.id.split('_')[1];
                TrashManager.addToTrash(noteId);
                NoteViewer.displayNotes();
                NoteViewer.toggleNotes();
            });
        });

        document.querySelectorAll('.trashBtn>i').forEach(trashBtn => {
            trashBtn.addEventListener('click', function(event){
                event.preventDefault();
                TrashManager.addToTrash(event.target.id);
                NoteViewer.displayNotes();
                NoteViewer.toggleNotes();
            });
        });
    }

    static addNewNote = () => {
        
        if(Boolean(Element.noteTitle.value) && Boolean(Element.noteText.value)){
            let notesCount = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? JSON.parse(localStorage.getItem('notes')).length : 0;
            const note = new NoteManager(
                (notesCount > 0 ) ? ++NoteManager.getAllNotes()[ notesCount - 1 ].id : 1 , 
                Element.noteTitle.value, 
                Element.noteText.value,
                (Boolean(localStorage.getItem('priority_val'))) ? localStorage.getItem('priority_val') : 0, 
                (Boolean(localStorage.getItem('note_bg'))) ? localStorage.getItem('note_bg') : null, 
                new Date(), 
                (Boolean(localStorage.getItem('collaborator'))) ? [localStorage.getItem('collaborator')] : null, 
                (Boolean(localStorage.getItem('pinned'))) ? localStorage.getItem('pinned') : false, 
                Auth.getUser().u_id, 
                (Boolean(localStorage.getItem('reminderTime'))) ? localStorage.getItem('reminderTime') : null, 
                (Boolean(localStorage.getItem('image'))) ? localStorage.getItem('image') : null,
                false
            );
            NoteManager.addNewNote(note);
            this.displayNotes();
        }
    }

    static _selectNote = (event) => {
        let selected_note = null;
        const note_el = event.target.closest('.note');
        if(Boolean(note_el)){
            const allNotes = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? 
                            NoteManager.filterUserNotes(JSON.parse(localStorage.getItem('notes')) , Auth.getUser().u_id) : null;
            if(Boolean(allNotes)){
                selected_note = allNotes.filter( note => { return note.id == note_el.id; })[0];
                if(Boolean(selected_note)){
                    Element.m_title.value = selected_note.title;
                    Element.m_text.value = selected_note.text;
                    document.querySelector('#nid_hdn').value = selected_note.id;
                }
            }
        }
    }

    static saveEditedNote = () => {
        const note = NoteManager.findById(document.querySelector('#nid_hdn').value);
        NoteManager.notesList = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? JSON.parse(localStorage.getItem('notes')) : [];
        
        if(Boolean(Element.m_title.value) && Boolean(Element.m_text.value) && Element.m_title.value.trim() != note.title.trim() || Element.m_text.value.trim() != note.text.trim()){

            NoteManager.notesList.pop(note);
            note.title  = Element.m_title.value;
            note.text   = Element.m_text.value;
            note.date   = new Date();
            note.edited = true;

            const jsonNote = NoteManager.convertToJson(note);
            NoteManager.notesList.push(jsonNote);
            localStorage.removeItem('notes');
            localStorage.setItem('notes', JSON.stringify(NoteManager.notesList));
            NoteViewer.displayNotes();
            Element.modal.classList.remove('open-modal');
        }
        else{
            Element.modal.classList.remove('open-modal');
        }
    }

    static displayReminderMain = () => {
        const all_notes = NoteManager.getAllNotes();
        let markUp = "";
        if(Boolean(all_notes)){
            all_notes.forEach(item => {
                var minutesDifference = (Date.parse(item.remind_date) > new Date().getTime()) ? 
                                        Math.floor( ( Date.parse(item.remind_date) - new Date().getTime() ) /1000/60) : null;
                if(minutesDifference <= 30 && minutesDifference != null){
                    markUp += WriteComponent.writeNote(item, true, false);
                }
            });

            if(Boolean(markUp)){
                Element.reminderMainList.style.display = "block";
                Element.rmListcon.innerHTML = markUp;
            }
            else{
                Element.reminderMainList.style.display = "none";
                Element.rmListcon.innerHTML = "";
            }
        }
    }

};
