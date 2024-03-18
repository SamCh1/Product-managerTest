// const { eventNames } = require("../../../models/product.model");

//Button status
const buttonstatus = document.querySelectorAll("[button-status]");
if(buttonstatus.length > 0){
    let url = new URL(window.location.href); //lấy đường link
    

    buttonstatus.forEach((button) => {
        button.addEventListener("click", () => {
           const status = button.getAttribute("button-status");
           console.log(status);
           if(status) {
            url.searchParams.set("status", status) //cập nhật lại đường link
           } else {
            url.searchParams.delete("status");
           }

           window.location.href = url.href;
        });
    });
}


//End Button status

//Form search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;
        
        if(keyword) {
            url.searchParams.set("keyword", keyword) //cập nhật lại đường link
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}

//End form search

//Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination.length > 0){
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", () =>{
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}
//End pagination

// Button-change-Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("[form-change-status]");
    const path = formChangeStatus.getAttribute("data-path");

    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            const statusChange = statusCurrent == "active" ? "inactive" : "active";
            
            const action = `${path}/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        });

    });
}
//End button-change-Status

//Checkbox-Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputId = checkboxMulti.querySelectorAll("input[name='id']");
    console.log(inputId);
    console.log(inputCheckAll);
    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked){
            inputId.forEach(input => {
                input.checked = true;
            });
        }else{
            inputId.forEach(input => {
                input.checked = false;
            });
        };
    });

    inputId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputId.length){
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false
            }
        });
    });
}
//End check-multi

//form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault();
        //Delete checked and Notification
        const type = event.target.elements.type.value;
        console.log(type);
        if(type == "delete-all"){
            const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?");
            if(!isConfirm){
                return;
            };
        };

        const inputsChecked = document.querySelectorAll("input[name='id']:checked");
        if(inputsChecked.length > 0) {
            const ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input => {
                const id = input.value;
                if(type == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value
                    ids.push(`${id}-${position}`);
                }
                else{
                    ids.push(id);
                }
            });
            inputIds.value = ids.join(", ");          
            formChangeMulti.submit();
        }else{
            alert("vui lòng chọn ít nhất một bản ghi")
        }
    });
}
//End form-change-multi

//Delete
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0){
    const formDeleteItem = document.querySelector("[form-delete-item]");
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
        button.addEventListener("click", ()=>{
            const isConfirm = confirm("Bạn có chắc muốn xóa bản ghi này?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                console.log(id);
                console.log(path)
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        });
    });
}
//End Delete

//Show Alert
const showAlert = document.querySelector("[show-Alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
    const closeAlert = showAlert.querySelector("[close-Alert]")
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}
//End Show Alert

//Preview image
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (event) => {
        const [file] = uploadImageInput.files;
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
//End preview image 