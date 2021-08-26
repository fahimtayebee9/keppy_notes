import NoteManager from "./../files/noteManager.js";
import Element from "./element.js";
import Auth from "./auth.js";
import TrashManager from "../files/trashManager.js";
import NoteViewer from "../components/noteViewer.js";
import TrashViewer from "../components/trashViewer.js";

export default class App{
    
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

    static colorActive = () => {
        Element.colorsDiv.forEach(item => {
            console.log(item.classList.contains(localStorage.getItem('note_bg')))
            if(item.classList.contains(localStorage.getItem('note_bg'))){
                item.classList.add('clr-active');
            }
            else if(!item.classList.contains(localStorage.getItem('note_bg'))){
                item.classList.remove('clr-active');
            }
        });

        Element.colorsDiv_m.forEach(item => {
            console.log(item.classList.contains(localStorage.getItem('note_bg')))
            if(item.classList.contains(localStorage.getItem('note_bg'))){
                item.classList.add('clr-active');
            }
            else if(!item.classList.contains(localStorage.getItem('note_bg'))){
                item.classList.remove('clr-active');
            }
        });
    }

    static fromButtonActionResult = () => {
        Element.colorsDiv.forEach(item => {
            if(Element.btnModalLists.classList.contains('active')){
                Element.btnModalLists.classList.remove('active');
            }
            
            item.addEventListener('click', event => {
                event.stopPropagation();
                const bg_color = event.target.id;
                localStorage.setItem('note_bg', bg_color);
                Element.colorList.classList.toggle('active');
                Element.btnModalLists.classList.remove('active');
            });
        });

        Element.priorityStars.forEach(item => {
            item.addEventListener('click', event => {
                event.stopPropagation();
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

        Element.time_element.addEventListener('change', event => {
            event.stopPropagation();
            const reminderTime = Element.time_element.value;
            localStorage.setItem('reminderTime', reminderTime);
            Element.reminderFormBody.classList.toggle('active');
            Element.btnModalLists.classList.remove('active');
        });

        Element.collaboratorSave.addEventListener('click', event => {
            event.stopPropagation();
            const colab = Element.colab.value;
            localStorage.setItem('collaborator', colab);
            Element.collaboratorList.classList.toggle('active');
            Element.btnModalLists.classList.remove('active');
        });
    }

    static closeModal = (event) => {
        Element.modal.classList.remove('open-modal');
    }

    static formButtonAction = () => {
        Element.colorBtn.forEach(item => {
            item.addEventListener('click', event => {
                App.colorActive();
                event.stopPropagation();
                if(event.target.id == "modal_clrb" || event.target.closest('#modal_clrb')){
                    Element.btnModalLists_modal.classList.toggle('active');
                    Element.colorList_m.classList.toggle('active');
                }
                else{
                    Element.btnModalLists.classList.toggle('active');
                    Element.colorList.classList.toggle('active');
                }
            });
        });

        Element.priorityBtn.forEach( item => {
            item.addEventListener('click', event => {
                event.stopPropagation();
                if(event.target.id == "modal_prb" || event.target.closest('#modal_prb')){
                    Element.btnModalLists_modal.classList.toggle('active');
                    Element.priorityList_m.classList.toggle('active');
                }
                else{
                    Element.btnModalLists.classList.toggle('active');
                    Element.priorityList.classList.toggle('active');
                }
            });    
        });

        Element.remindBtn.forEach( item => {
            item.addEventListener('click', event =>{
                event.stopPropagation();
                if(event.target.id == "modal_rmd" || event.target.closest('#modal_rmd')){
                    Element.btnModalLists_modal.classList.toggle('active');
                    Element.reminderFormBody_m.classList.toggle('active');
                }
                else{
                    Element.btnModalLists.classList.toggle('active');
                    Element.reminderFormBody.classList.toggle('active');
                }
            });
        });

        // document.querySelector('.modal').addEventListener('click', event => {
        //     event.stopPropagation();
        //     this.closeModal(event);
        // })
    }

    static clearLocalStorage = () => {
        localStorage.removeItem('note_bg');
        localStorage.removeItem('priority_val');
        localStorage.removeItem('reminderTime');
        localStorage.removeItem('collaborator');
        localStorage.removeItem('tags');
        localStorage.removeItem('image');
    }

    static modalFormButtonAction = () => {
        Element.colorsDiv_m.forEach(item => {
            if(Element.btnModalLists_modal.classList.contains('active')){
                Element.btnModalLists_modal.classList.remove('active');
            }
            
            item.addEventListener('click', event => {
                event.stopPropagation();
                const bg_color = event.target.id;
                localStorage.setItem('note_bg', bg_color);
                Element.colorList_m.classList.toggle('active');
                Element.btnModalLists_modal.classList.remove('active');
            });
        });

        Element.priorityStars_m.forEach(item => {
            item.addEventListener('click', event => {
                event.stopPropagation();
                const priority_val = event.target.id;
                for(let i = 0 ; i < priority_val; i++){
                    if(Element.priorityStars_m[i].classList.contains('far')){
                        Element.priorityStars_m[i].classList.remove('far');
                        Element.priorityStars_m[i].classList.add('fas');
                    }
                    else{
                        for(let i = Element.priorityStars_m.length - 1 ; i > priority_val - 1; i--){
                            Element.priorityStars_m[i].classList.add('far');
                            Element.priorityStars_m[i].classList.remove('fas');
                        }
                    }
                }
                localStorage.setItem('priority_val', priority_val);
                Element.priorityList_m.classList.toggle('active');
                Element.btnModalLists_modal.classList.remove('active');
            });
        });

        Element.time_element_m.addEventListener('change', event => {
            event.stopPropagation();
            const reminderTime = Element.time_element_m.value;
            localStorage.setItem('reminderTime', reminderTime);
            Element.reminderFormBody_m.classList.toggle('active');
            Element.btnModalLists_modal.classList.remove('active');
        });

    }

    static openEditModal = (event) => {
        if(event.target.closest(".note")){
            Element.modal.classList.toggle('open-modal');
        }
    }

    static removeActive = () => {
        Element.btnModalLists.classList.remove('active');
        Element.colorList.classList.remove('active');
        Element.priorityList.classList.remove('active');
        Element.collaboratorList.classList.remove('active');
        Element.reminderFormBody.classList.remove('active');
        Element.noteTitle.value = "";
        Element.noteText.value = "";
        App.clearLocalStorage();
    }

    static displayReminderMain = () => {
        const all_notes = NoteManager.getAllNotes();
        let markUp = "";
        if(Boolean(all_notes)){
            all_notes.forEach(item => {
                var minutesDifference = (Date.parse(item.remind_date) > new Date().getTime()) ? 
                                        Math.floor( ( Date.parse(item.remind_date) - new Date().getTime() ) /1000/60) : null;
                if(minutesDifference <= 30 && minutesDifference != null){
                    markUp += App.writeNote(item, true, false);
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

    static makeAlert = () => {
        const all_notes = NoteManager.getAllNotes();
        if(Boolean(all_notes)){
            all_notes.forEach(item => {
                var minutesDifference = (Date.parse(item.remind_date) >= new Date().getTime()) ? 
                                        Math.floor( ( Date.parse(item.remind_date) - new Date().getTime() ) /1000/60) : null;
                if(minutesDifference == 0 && minutesDifference != null ){
                    const audio = new Audio('assets/media/swiftly-610.mp3');
                    audio.load();
                    audio.play();
                    setTimeout(() => {
                        if(!audio.paused){
                            audio.pause();
                        }
                    }, 2000);
                }
            });
        }
    }

    static eventListeners = () => {
        document.body.addEventListener('click', function(event){
            NoteViewer.addNewNote();
            App.removeActive();
            App.closeForm();
            NoteViewer._selectNote(event);
            App.openEditModal(event);
        });

        Element.form.addEventListener('click', event => {
            event.stopPropagation();
            if(Element.form.contains(event.target)){
                App.openForm();
            }
            else{
                NoteViewer.addNewNote();
                App.closeForm();
                App.clearLocalStorage();
            }
        });

        Element.closeBtn.addEventListener('click', event => {
            event.stopPropagation();
            App.closeForm();
            NoteViewer.addNewNote();
            App.removeActive();
            App.clearLocalStorage();
        });

        Element.notesSB.addEventListener('click', event => {
            event.preventDefault();
            NoteViewer.toggleNotes();
            NoteViewer.displayNotes();
        });

        Element.trashSb.addEventListener('click', event => {
            event.preventDefault();
            TrashViewer.toggle();
            TrashViewer.displayTrashList();
            App.restoreRemove();
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
                    Element.btnGridList.innerHTML = "<i class='far fa-list-alt'></i>";
                }
                else if(element.classList.contains('col-md-4')){
                    Element.notesList.classList.remove('d-block');
                    Element.notesList.classList.add('d-flex');
                    element.classList.add('col-md-2');
                    element.classList.remove('col-md-4');
                    element.style.margin = "15px";
                    Element.btnGridList.innerHTML = "<i class='fas fa-border-all'></i>";
                }
            });
        });
        
        App.formButtonAction();
        App.fromButtonActionResult();
        App.modalFormButtonAction();

        document.querySelectorAll('.noteBtn').forEach( item => {
            item.addEventListener('click', e => {
                e.target.closest('.noteBtn').addEventListener('click', event => {
                    event.preventDefault();
                    App.openEditModal(event);
                });
            })
        });

        Element.closeBtnM.addEventListener('click', NoteViewer.saveEditedNote);
    }

    static restoreRemove = () => {
        document.querySelectorAll('.removeBtn').forEach( item => {
            console.log(item);
            item.addEventListener('click', event => {
                event.stopPropagation();
                TrashManager.removeFromTrash(event.target.id);
                TrashViewer.displayTrashList();
                NoteViewer.displayNotes();
                App.removeActive();
                console.log("permanently deleted");
            });
        });

        document.querySelectorAll('.restoreBtn').forEach( item => {
            item.addEventListener('click', event => {
                event.stopPropagation();
                TrashManager.restoreFromTrash(event.target.id);
                TrashViewer.displayTrashList();
                NoteViewer.displayNotes();
                NoteViewer.toggleNotes();
                App.removeActive();
            });
        });
    }

    static init = () => {
        Auth.renderAll();
        if(Auth.checkUser()){
            NoteViewer.displayNotes();
            App.eventListeners();
            setInterval(()=>{
                NoteViewer.displayReminderMain();
                App.makeAlert();
            });
        }

        // localStorage.removeItem('notes');
        // localStorage.removeItem('trashNotes');
        
    }
};
