function generate() {
    let copyText = document.getElementById("output_box");

    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    let copied = document.getElementById("copied");
    
    copied.style.display = "block";
    
    setTimeout(() => {
        copied.style.display = "none";
    }, 3000)
}