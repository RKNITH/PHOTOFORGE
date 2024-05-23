const fileInput = document.querySelector(".file-input"),
    previewImg = document.querySelector(".preview-img img"),
    filterOptions = document.querySelectorAll(".filter button"),
    filterName = document.querySelector(".filter-info .name"),
    filterValue = document.querySelector(".filter-info .value"),
    filterSlider = document.querySelector(".slider input"),
    rotateOptions = document.querySelectorAll(".rotate button"),
    resetFilterBtn = document.querySelector(".reset-filter"),
    saveImgBtn = document.querySelector(".save-img"),
    chooseImgBtn = document.querySelector(".choose-img");


let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;
applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
        document.querySelector("h2").innerHTML = '"Craft Stunning Images with Ease"';
    });
}


filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerHTML = option.innerHTML;

        if (option.id === "Brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerHTML = `${brightness}%`;
        }
        else if (option.id === "Saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerHTML = `${saturation}%`;
        }
        else if (option.id === "Inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerHTML = `${inversion}%`;
        }
        else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerHTML = `${grayscale}%`;
        }
    });
});



updateFilters = () => {
    filterValue.innerHTML = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");
    if (selectedFilter.id === "Brightness") {
        brightness = filterSlider.value;
    }
    else if (selectedFilter.id === "Saturation") {
        saturation = filterSlider.value;
    }
    else if (selectedFilter.id === "Inversion") {
        inversion = filterSlider.value;
    }
    else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}



rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90;
        }
        else if (option.id === "right") {
            rotate += 90;
        }
        else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter = () => {
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
    rotate = 0, flipHorizontal = 1, flipVertical = 1;
    filterOptions[0].click();
    document.querySelector("h2").innerHTML = "You Reset The Filters!";
    applyFilter();
}




const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flipHorizontal, flipVertical);
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);


    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
    document.querySelector("h2").innerHTML = 'Congratulations! Your Image Has Been Saved.'

}



fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilters);
saveImgBtn.addEventListener("click", saveImage);
resetFilterBtn.addEventListener("click", resetFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());

