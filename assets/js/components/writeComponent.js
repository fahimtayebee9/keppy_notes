export default class WriteComponent{
    static writeNote = (item, remind = false, trash = false) => {
        let markUp = "";
        const createDate = new Date(item.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour12: true , hour: "2-digit", minute: "2-digit" });
        const remind_date = new Date(item.remind_date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' , hour12: true, hour: "2-digit", minute: "2-digit" });
        const dataInfo   = (item.edited == false) ? "Created At" : "Edited At";
        const remind_val = (remind == true) ? `<p class="text text-right pt-3 date">Reminder ${remind_date}</p>` : '';
        if(trash == true){
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
                                    <button type="button" class="nBtn restoreBtn" data-toggle="tooltip" id="${item.id}" data-placement="top" title="Restore">
                                        <i class="fas fa-trash-restore restoreBtn_i" id="${item.id}"></i>
                                    </button>
                                    <button type="button" class="nBtn removeBtn" id="${item.id}" data-toggle="tooltip" data-placement="top" title="Delete">
                                        <i class="far fa-trash-alt" id="${item.id}"></i>
                                    </button>
                                </div>
                            </div>
                            
                        </div>`;
        }
        else{
            markUp += `<div class="note noteMd noteBtn ${item.color} col-md-2" id="${item.id}">
                            <div class="n-con">
                                <div class="img-con" style="display: none;">
                                    <img src="" alt="">
                                </div>
                                <h6 class="title">${item.title}</h6>
                                <p class="text">${item.text}</p>
                                <p class="text text-right pt-3 date">${dataInfo} ${createDate}</p>
                                ${remind_val}
                            </div>
                            <div class="hv-btns">
                                <div class="top-area">
                                    <button type="button" class="nBtn trashBtn tbtn" id="nid_${item.id}" data-toggle="tooltip" data-placement="top" title="Delete">
                                        <i class="far fa-trash-alt" id="nid_${item.id}"></i>
                                    </button>
                                </div>
                            </div>
                        </div>`;
        }
        return markUp;
    } 
}