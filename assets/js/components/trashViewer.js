import NoteManager from "./../files/noteManager.js";
import UserManager from "./../files/userManager.js";
import WriteComponent from "./writeComponent.js";
import Element from "../modules/element.js";
import Auth from "../modules/auth.js";
import TrashManager from "../files/trashManager.js";

export default class TrashViewer{
    static displayTrashList = () => {
        const allNotes = (Boolean(JSON.parse(localStorage.getItem('trashNotes')))) ? NoteManager.filterUserNotes(JSON.parse(localStorage.getItem('trashNotes')), Auth.getUser().u_id) : null;
        let markUp = "";
        if(Boolean(allNotes)){
            allNotes.forEach( item => {
                markUp += WriteComponent.writeNote(item, false, true);
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

    static toggle = () => {
        Element.trashMainBody.style.display = "block";
        Element.noteMainBody.style.display  = "none";
    }
};
