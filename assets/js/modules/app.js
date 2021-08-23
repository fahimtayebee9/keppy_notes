
import NoteManager from "./../files/noteManager.js";
import UserManager from "./../files/userManager.js";
import Element from "./element.js";
import Auth from "./auth.js";
import TrashManager from "../files/trashManager.js";

export default class App{
    static init = () => {
        App.displayTrashList();
        App.displayNotes();
        App.displaySharedNotes();
        Auth.renderAll();
    }

    static displayTrashList = () => {
        Element.trashMainBody.style.display = "none";
        const allNotes = (Boolean(JSON.parse(localStorage.getItem('trashNotes')))) ? NoteManager.filterUserNotes(JSON.parse(localStorage.getItem('trashNotes')), Auth.getUser().u_id) : null;
        let markUp = "";
        if(Boolean(allNotes)){
            allNotes.forEach( item => {
                markUp += `<div class="note noteBtn col-md-2" data-toggle="modal" data-target="#note_${item.id}">
                                <div class="n-con">
                                    <div class="img-con" style="display: none;">
                                        <img src="" alt="">
                                    </div>
                                    <h6 class="title">${item.title}</h6>
                                    <p class="text">${item.text}</p>
                                </div>
                                <div class="hv-btns">
                                    <div class="top-area">
                                        <button type="button" class="nBtn remindBtn" data-toggle="tooltip" data-placement="top" title="Restore">
                                            <i class="far fa-bell"></i>
                                        </button>
                                        <button type="button" class="nBtn trashBtn" id="nid_${item.id}" data-toggle="tooltip" data-placement="top" title="Delete">
                                            <i class="far fa-trash-alt" id="nid_${item.id}"></i>
                                        </button>
                                    </div>
                                </div>
                                
                            </div>`;
            });
        }
        else{
            markUp += `<div class="col-md-6 m-auto mt-5">
                            <div class="alert alert-warning">
                                <h2>No Items In Trash</h2>
                            </div>
                        </div>`;
        }
        Element.trashList.innerHTML = markUp;
    }

    static displayNotes = () => {
        if(Auth.checkUser()){
            const allNotes = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? 
                        NoteManager.filterUserNotes(JSON.parse(localStorage.getItem('notes')) , Auth.getUser().u_id) : null;
            const sortedNotes = (Boolean(allNotes)) ? allNotes.sort((a, b) => parseFloat(Number(b.priority)) - parseFloat(Number(a.priority))) : [];

            let markUp = "";
            if(Boolean(sortedNotes)){
                sortedNotes.forEach( item => {
                    const remaining_time = new Date().getTime();
                    console.log(remaining_time);
                    // if(item.){

                    // }
                    const createDate = new Date(item.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' });
                    const dataInfo   = (item.edited == false) ? "Created At" : "Edited At";
                    markUp += `<div class="note noteMd noteBtn ${item.color} col-md-2" id="${item.id}">
                                    <div class="n-con">
                                        <div class="img-con" style="display: none;">
                                            <img src="" alt="">
                                        </div>
                                        <h6 class="title">${item.title}</h6>
                                        <p class="text">${item.text}</p>
                                        <p class="text text-right pt-3 date">${dataInfo} ${createDate}</p>
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
            
            Element.notesList.innerHTML = markUp;
            App.TrashAction();
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

    static openForm = () => {
        Element.noteTitle.style.display     = "block";
        Element.nBtnBody.style.display      = "flex";
        Element.clBtns.style.display        = "block";
    }

    static closeForm = () => {
        Element.noteTitle.style.display     = "none";
        Element.nBtnBody.style.display      = "none";
        Element.clBtns.style.display        = "none";
    }

    static TrashAction = () => {
        document.querySelectorAll('.trashBtn').forEach(trashBtn => {
            trashBtn.addEventListener('click', function(event){
                const noteId = event.target.id.split('_')[1];
                TrashManager.addToTrash(noteId);
                // location.reload();
            });
        });

        document.querySelectorAll('.trashBtn>i').forEach(trashBtn => {
            trashBtn.addEventListener('click', function(event){
                event.preventDefault();
                TrashManager.addToTrash(event.target.id);
                // location.reload();
            });
        });
    }

    static addNewNote = () => {
        if(Boolean(Element.noteTitle.value) && Boolean(Element.noteText.value)){
            let notesCount = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? JSON.parse(localStorage.getItem('notes')).length : 0;
            const note = new NoteManager(
                ++notesCount, 
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
            const jsonNote = NoteManager.convertToJson(note);
            NoteManager.notesList = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? JSON.parse(localStorage.getItem('notes')) : [];
            NoteManager.notesList.push(jsonNote);
            localStorage.setItem('notes', JSON.stringify(NoteManager.notesList));
            App.clearLocalStorage();
            location.reload();
        }
    }

    static formAction = () => {
        
    }

    static fromButtonActionResult = () => {
        Element.colorsDiv.forEach(item => {
            if(Element.btnModalLists.classList.contains('active')){
                Element.btnModalLists.classList.remove('active');
            }
            item.addEventListener('click', event => {
                const bg_color = event.target.id;
                localStorage.setItem('note_bg', bg_color);
                Element.colorList.classList.toggle('active');
                Element.btnModalLists.classList.remove('active');
            });
        });

        Element.priorityStars.forEach(item => {
            item.addEventListener('click', event => {
                const priority_val = event.target.id;
                for(let i = 0 ; i < priority_val; i++){
                    if(Element.priorityStars[i].classList.contains('far')){
                        Element.priorityStars[i].classList.remove('far');
                        Element.priorityStars[i].classList.add('fas');
                    }
                    else{
                        for(let i = Element.priorityStars.length - 1 ; i > priority_val - 1; i--){
                            Element.priorityStars[i].classList.add('far');
                            Element.priorityStars[i].classList.remove('fas');
                        }
                    }
                }
                localStorage.setItem('priority_val', priority_val);
                Element.priorityList.classList.toggle('active');
                Element.btnModalLists.classList.remove('active');
            });
            
        });

        Element.saveTime.addEventListener('click', event => {
            const reminderTime = Element.time_element.value;
            localStorage.setItem('reminderTime', reminderTime);
            Element.reminderFormBody.classList.toggle('active');
            Element.btnModalLists.classList.remove('active');
        });

        Element.collaboratorSave.addEventListener('click', () => {
            const colab = Element.colab.value;
            localStorage.setItem('collaborator', colab);
            Element.collaboratorList.classList.toggle('active');
            Element.btnModalLists.classList.remove('active');
        });

        Element.imageSave.addEventListener('click', () => {
            const image = Element.image.files[0].name;
            localStorage.setItem('image', image);
            Element.imgList.classList.toggle('active');
            Element.btnModalLists.classList.remove('active');
        });

    }

    static displayUsersList = () => {
        let markUp = "";
        UserManager.getAllUsers().forEach(item => {
            markUp += `<option value="${item.u_id}">${item.name}</option>`;
        });
        Element.colab_list.innerHTML = markUp;
    }

    static formButtonAction = () => {
        Element.colorBtn.addEventListener('click', event => {
            Element.btnModalLists.classList.toggle('active');
            Element.colorList.classList.toggle('active');
        });

        Element.priorityBtn.addEventListener('click', function(){
            Element.btnModalLists.classList.toggle('active');
            Element.priorityList.classList.toggle('active');
        });

        Element.remindBtn.addEventListener('click', function(){
            Element.btnModalLists.classList.toggle('active');
            Element.reminderFormBody.classList.toggle('active');
        });

        Element.imgBtn.addEventListener('click', function(){
            Element.btnModalLists.classList.toggle('active');
            Element.imgList.classList.toggle('active');
        });

        Element.collaboratorBtn.addEventListener('click', function(){
            Element.btnModalLists.classList.toggle('active');
            Element.collaboratorList.classList.toggle('active');
            App.displayUsersList();
        });
    }

    static clearLocalStorage = () => {
        localStorage.removeItem('note_bg');
        localStorage.removeItem('priority_val');
        localStorage.removeItem('reminderTime');
        localStorage.removeItem('collaborator');
        localStorage.removeItem('tags');
        localStorage.removeItem('image');
    }

    static openEditModal = (event) => {
        if(event.target.closest(".note")){
            Element.modal.classList.toggle('open-modal');
        }
    }

    static _selectNote = (event) => {
        let selected_note = null;
        const note_el = event.target.closest('.note');
        if(Boolean(note_el)){
            console.log(note_el.id);
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
        const note = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? 
                        NoteManager.filterUserNotes(JSON.parse(localStorage.getItem('notes')) , 
                                                    Auth.getUser().u_id).filter( note => { 
                                                        return note.id == document.querySelector('#nid_hdn').value; 
                                                    })[0] : null;
        NoteManager.notesList = (Boolean(JSON.parse(localStorage.getItem('notes')))) ? JSON.parse(localStorage.getItem('notes')) : [];
        NoteManager.notesList.pop(note);

        if(Boolean(Element.m_title.value) && Boolean(Element.m_text.value) 
            && Element.m_title.value.trim() != note.title.trim() 
            || Element.m_text.value.trim() != note.text.trim()){
            
            note.title  = Element.m_title.value;
            note.text   = Element.m_text.value;
            note.date   = new Date();
            note.edited = true;

            const jsonNote = NoteManager.convertToJson(note);
            NoteManager.notesList.push(jsonNote);
            localStorage.removeItem('notes');
            localStorage.setItem('notes', JSON.stringify(NoteManager.notesList));
            App.clearLocalStorage();
            location.reload();
        }
        else{
            Element.modal.classList.remove('open-modal');
        }
    }

    static removeActive = () => {
        Element.btnModalLists.classList.remove('active');
        Element.colorList.classList.remove('active');
        Element.priorityList.classList.remove('active');
        Element.collaboratorList.classList.remove('active');
        Element.imgList.classList.remove('active');
        Element.reminderFormBody.classList.remove('active');
        Element.noteTitle.innerHTML = "";
        Element.noteText.innerHTML = "";
        App.clearLocalStorage();
    }

    static eventListeners = () => {
        document.body.addEventListener('click', function(event){
            App.addNewNote();
            App.removeActive();
            App.closeForm();
            App._selectNote(event);
            App.openEditModal(event);
        });

        Element.form.addEventListener('click', event => {
            event.stopPropagation();
            if(Element.form.contains(event.target)){
                App.openForm();
            }
            else{
                App.addNewNote();
                App.closeForm();
                App.clearLocalStorage();
            }
        });

        Element.btnRefresh.addEventListener('click', event => {
            location.reload();
        });

        Element.closeBtn.addEventListener('click', event => {
            event.stopPropagation();
            console.log("modal btn");
            App.closeForm();
            App.addNewNote();
            App.clearLocalStorage();
        });

        Element.notesSB.addEventListener('click', event => {
            event.preventDefault();
            Element.trashMainBody.style.display = "none";
            Element.noteMainBody.style.display  = "block";
            Element.collabList.style.display  = "none";
        });

        Element.trashSb.addEventListener('click', event => {
            event.preventDefault();
            Element.trashMainBody.style.display = "block";
            Element.noteMainBody.style.display  = "none";
            Element.collabList.style.display  = "none";
        });

        Element.collabSb.addEventListener('click', event => {
            event.preventDefault();
            Element.collabList.style.display = "block";
            Element.noteMainBody.style.display  = "none";
            Element.trashMainBody.style.display  = "none";
        });

        Element.btnGridList.addEventListener('click', event => {
            event.preventDefault();
            document.querySelectorAll('.note').forEach( element => {
                if(element.classList.contains('col-md-2')){
                    Element.notesList.classList.add('d-block');
                    Element.notesList.classList.remove('d-flex');
                    element.classList.remove('col-md-2');
                    element.classList.add('col-md-4');
                    element.style.margin = "auto";
                    element.style.marginBottom = "15px";
                    console.log("click if");
                }
                else if(element.classList.contains('col-md-4')){
                    Element.notesList.classList.remove('d-block');
                    Element.notesList.classList.add('d-flex');
                    element.classList.add('col-md-2');
                    element.classList.remove('col-md-4');
                    element.style.margin = "15px";
                    console.log("click else if");
                }
            });
        });
        
        App.formButtonAction();
        App.fromButtonActionResult();

        document.querySelectorAll('.noteBtn').forEach( item => {
            item.addEventListener('click', e => {
                e.target.closest('.noteBtn').addEventListener('click', event => {
                    event.preventDefault();
                    App.openEditModal(event);
                });
            })
        });

        Element.closeBtnM.addEventListener('click', this.saveEditedNote);
    }

    // RENDER ALL
    static renderAll = () => {
        App.init();
        App.eventListeners();
        App.formAction();
        // App.displayModals();

        // localStorage.removeItem('notes');
        // localStorage.removeItem('user');
        // localStorage.removeItem('trashNotes');
        // App.clearLocalStorage();
    };

};
