export default class Element{
    static preloaderDiv = document.querySelector('#preloader');
    
    // LOGIN PAGE
    static loginSection = document.querySelector('.login');
    static username     = document.querySelector('.username>span');
    static password     = document.querySelector('.password>span');
    static inpUsername  = document.querySelector('.inp-username');
    static inpPassword  = document.querySelector('.inp-password');
    static btnLogin     = document.querySelector('.btn-submit');
    static lblUser      = document.querySelector('#lbl_user');
    static lblPass      = document.querySelector('#lbl_pass');

    // MAIN SECTION
    static mainSection              = document.querySelector('.main');
    static userImg                  = document.querySelector('.user-img');
    static signOutBtn               = document.querySelector('.signOutBtn');
    static modalList                = document.querySelector('#modalList');
    static btnModalLists            = document.querySelector('.btnModalLists');
    static home_content             = document.querySelector('.home_content');
    static noteBtn                  = document.querySelectorAll('.noteBtn');
    static collabList               = document.querySelector('.collabList');

    // TOP ROW BUTTONS
    static btnRefresh   = document.querySelector('.btnRefresh');
    static btnGridList  = document.querySelector('.btnGridList');

    // FORM ELEMENTS
    static form            = document.querySelector('#form');
    static formContainer   = document.querySelector('#form-container');
    static noteTitle       = document.querySelector('#note-title');
    static noteText        = document.querySelector('#note-text');
    static btnRow          = document.querySelector('.btn-row');
    static nBtnBody        = document.querySelector('.nBtn-body');
    static clBtns          = document.querySelector('.cl-btns');
    static closeBtn        = document.querySelector('.closeBtn');
    static trashBtn        = document.querySelectorAll('.trashBtn');
    static trashBtn_i      = document.querySelectorAll('.trashBtn>i');
    static pinBtns         = document.querySelectorAll('.pinBtn');

    // TRASH BUTTONS
    static restoreBtn        = document.querySelectorAll('.restoreBtn');
    static removeBtn         = document.querySelectorAll('.removeBtn');

    // MODAL DIALOG
    static modal            = document.querySelector('.modal');

    // SIDEBAR BUTTON
    static notesSB           = document.querySelector('#notesSb');
    static reminderSb        = document.querySelector('#reminderSb');
    static trashSb           = document.querySelector('#trashSb');
    static collabSb          = document.querySelector('#collabSb');

    // CONTENT AREA
    static trashList        = document.querySelector('.trashList');
    static notesList        = document.querySelector('.notes-list');
    static noteMainBody     = document.querySelector('.noteMainBody');
    static trashMainBody    = document.querySelector('.trashMainBody');
    static noteBoxs         = document.querySelectorAll('.note');
    static reminderMainList = document.querySelector('.reminderMainList');
    static rmListcon        = document.querySelector('.rm-listcon');

    // FORM BUTTONS
    static colorBtn         = document.querySelectorAll('.colorBtn');
    static priorityBtn      = document.querySelectorAll('.priorityBtn');
    static remindBtn        = document.querySelectorAll('.remindBtn');
    static collaboratorBtn  = document.querySelectorAll('.collaboratorBtn');
    static bmdl             = document.querySelectorAll('.bmdl');

    // FORM BUTTON MODALS
    static colorList        = document.querySelector('.colorList');
    static colorsDiv        = document.querySelectorAll('.clr');
    static priorityList     = document.querySelector('.priorityList');
    static priorityStars    = document.querySelectorAll('.prl_i');
    static reminderForm     = document.querySelector('.rmd');
    static reminderFormBody = document.querySelector('.reminderList');
    static time_element     = document.querySelector('.time_element');
    static saveTime         = document.querySelector('#saveTime');
    static collaboratorList = document.querySelector('.collaboratorList');
    static collaboratorSave = document.querySelector('#collaboratorSave');
    static colab            = document.querySelector('.colab');
    static colab_list       = document.querySelector('#colab_list');

    // MODAL FIELDS
    static m_title          = document.querySelector('.modal-title');
    static m_text           = document.querySelector('.modal-text');
    static closeBtnM        = document.querySelector('.closeBtn-m');
    static btnModalLists_modal      = document.querySelector('.btnModalLists_m');
    // static m_title          = document.querySelector('.modal-title');
    // static m_title          = document.querySelector('.modal-title');
    static mc_button        = document.querySelector('#modal-close-button');

    // MODAL BOX BUTTONS LIST
    static colorList_m        = document.querySelector('.colorList_m');
    static priorityList_m     = document.querySelector('.priorityList_m');
    static priorityStars_m    = document.querySelectorAll('.prl_i_m');
    static reminderFormBody_m = document.querySelector('.reminderList_m');
    static time_element_m     = document.querySelector('.time_element_m');
    static saveTime_m         = document.querySelector('#saveTime_m');
    static collaboratorList_m = document.querySelector('.collaboratorList_m');
    static collaboratorSave_m = document.querySelector('#collaboratorSave_m');
    // static colab            = document.querySelector('.colab');
    // static colab_list       = document.querySelector('#colab_list');
}
