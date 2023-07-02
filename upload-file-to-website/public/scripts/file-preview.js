const filePickerElement = document.querySelector("#image");
const imagePreviewElement = document.querySelector("#image-preview");

function showPreview(){
    const files = filePickerElement.files;

    if(!files || files.length === 0){
        imagePreviewElement.style.display = `none`;
        return;
    }

    const pickedFile = files[0];

    imagePreviewElement.src = URL.createObjectURL(pickedFile);
    imagePreviewElement.style.display = `block`;
}

filePickerElement.addEventListener(`change`, showPreview);