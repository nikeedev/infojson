const copy = () => {
    let copyText = document.getElementById("output_box");

    navigator.clipboard.writeText(copyText.innerText);

    // Alert the copied text
    let copied = document.getElementById("copied");

    alert("Copied to clipboard")
}

const infojson_types = {
    AV: {
        text: "Aioewa Info.json Version",
        input_type: "dropdown",
        options: ["1"],
        value: "" // empty if not text or number
    },
    name: {
        text: "Name of the addon",
        input_type: "text",
        options: [],
        value: ""
    },
    credits: {
        text: "Your Aioewa user ID",
        input_type: "text",
        value: ""
    },
    tags: {
        text: "Tags for your addon (separate with commas)",
        input_type: "text",
        value: "new"
    },
    version_added: {
        text: "The version of Aioewa the addon was introduced",
        input_type: "text",
        value: "1.0.0"
    }
}

// let element = document.createElement("select");
// element.id = data.name;
// data.options.forEach((option) => {
//     let temp = document.createElement("option");
//     temp.value = option;
//     temp.text = option;
//     element.append(temp);
// });
// document.getElementById("main_data").append(element)

let main_data = document.getElementById("main_data")
let input = document.getElementById("input")

let descs = document.createElement("div");
descs.id = "descs";
let p = document.createElement("p");
p.innerText += "Description: ";
descs.appendChild(p);
const button = document.createElement("button");
button.innerText = "Add description";
button.onclick = () => add_description();
descs.appendChild(button);

function add_description() {
    let desc = document.createElement("div");
    desc.id = "desc";

    let p = document.createElement("span");
    p.innerText += "Desc. type: ";
    p.style.marginTop = "25px";
    p.style.marginLeft = "10px";
    desc.appendChild(p);

    let select = document.createElement("select");
    desc.appendChild(select)
    select.options.add(new Option("just text (without id)", "just_text"))
    select.options.add(new Option("text"))
    select.options.add(new Option("field"))
    select.options.add(new Option("number"))
    select.options.add(new Option("link"))
    select.options.add(new Option("dropdown"))
    select.id = "select_desc_type"

    let text_input = document.createElement("input");
    text_input.type = "text";
    text_input.placeholder = "The text";
    text_input.style.display = "block";
    desc.appendChild(text_input);

    let the_link = document.createElement("input");
    the_link.type = "text";
    the_link.placeholder = "URL";
    the_link.style.display = "none";
    desc.appendChild(the_link);

    let link_text = document.createElement("input");
    link_text.type = "text";
    link_text.placeholder = "Link text";
    link_text.style.display = "none";
    desc.appendChild(link_text);

    let id = document.createElement("input");
    id.type = "text";
    id.placeholder = "ID for the description (will be used to retrieve the value in JS code)";
    id.title = "ID for the description (will be used to retrieve the value in JS code)";
    id.style.display = "none";
    desc.appendChild(id)

    let text = document.createElement("span");
    text.innerText = "Options for dropdown (separate with a comma): ";
    text.style.fontSize = "15px";
    text.style.paddingLeft = "10px";
    text.style.display = "none";
    desc.appendChild(text)

    let options = document.createElement("input");
    options.type = "text";
    options.placeholder = "Options for dropdown ";
    options.title = "Options for dropdown ";
    options.style.display = "none";
    desc.appendChild(options)

    select.onchange = (e) => {
        if (e.target.value != "just_text" && e.target.value != "link" && e.target.value != "text") {
            id.style.display = "block";
        } else {
            id.style.display = "none";
        }

        if (e.target.value == "text" || e.target.value == "just_text") {
            text_input.style.display = "block";
        } else {
            text_input.style.display = "none";
        }

        if (e.target.value == "link") {
            the_link.style.display = "block";
            link_text.style.display = "block";
        } else {
            the_link.style.display = "none";
            link_text.style.display = "none";
        }

        if (e.target.value == "dropdown") {
            options.style.display = "block";
            text.style.display = "block";
        } else {
            options.style.display = "none";
            text.style.display = "none";
        }
    }

    let remove_desc = document.createElement("button");
    remove_desc.innerText = "Remove description?";
    remove_desc.style.color = "white";
    remove_desc.style.backgroundColor = "crimson";
    remove_desc.style.border = "none";
    remove_desc.style.padding = "5px";
    remove_desc.style.marginTop = "20px";
    remove_desc.style.marginLeft = "10px";
    remove_desc.style.fontSize = "15px";
    remove_desc.style.position = "relative";

    remove_desc.onclick = () => {
        desc.remove();
    }
    desc.appendChild(remove_desc)

    descs.insertBefore(desc, button)
}

function add_setting(type) {
    let div = document.createElement("div");
    div.id = "setting";

    let element, text;

    // console.log(type)
    switch (type.input_type) {
        case "text":
            element = document.createElement("input");
            element.id = type.text.toLowerCase().trim().replaceAll(" ", "_");
            element.value = type.value;
            text = document.createElement("span");
            text.style.paddingRight = "10px";
            text.innerText = type.text + ": "
            div.appendChild(text)
            div.appendChild(element)
            input.appendChild(div)
            break;

        case "dropdown":
            element = document.createElement("select");
            element.id = type.text.toLowerCase().trim().replaceAll(" ", "_");
            type.options.forEach((option) => {
                let temp = document.createElement("option");
                temp.value = option;
                temp.text = option;
                element.append(temp);
            });
            text = document.createElement("span");
            text.style.paddingRight = "10px";
            text.innerText = type.text + ": "
            div.appendChild(text)
            div.appendChild(element)
            input.appendChild(div)
            break;

        default:
            break;
    }
}

window.onload = () => {
    add_setting(infojson_types.AV)
    add_setting(infojson_types.name)
    input.appendChild(descs)
    add_description()
    add_setting(infojson_types.credits)
    add_setting(infojson_types.tags)
    add_setting(infojson_types.version_added)
}

let output = {};

function generate() {
    window.scrollTo(0, document.body.scrollHeight);
    let settings = document.querySelectorAll("#setting")

    settings.forEach((setting) => {
        // console.log(setting.children[1].id);

        switch (setting.children[1].id) {
            case "aioewa_info.json_version":
                output.AV = setting.children[1].value;
                break;

            case "name_of_the_addon":
                output.name = setting.children[1].value;
                break;

            case "your_aioewa_user_id":
                output.credits = [{ userID: parseInt(setting.children[1].value) != null ? parseInt(setting.children[1].value) : 0 }];
                break;

            case "tags_for_your_addon_(separate_with_commas)":
                output.tags = setting.children[1].value.trim().split(",").filter((tag) => tag.trim() != "").map(x => x.trim());
                break;

            case "the_version_of_aioewa_the_addon_was_introduced":
                output.versionAdded = setting.children[1].value;
                break;
        }
    })

    // parse description
    let descs = document.querySelectorAll("#desc")

    if (descs.length > 1) {
        output.description = []
        descs.forEach((desc) => {
            console.log(desc)
            switch (desc.children[1].value) {
                case "just_text":
                    output.description.push([desc.children[2].value]);
                    break;

                case "text":
                    output.description.push(["text", desc.children[2].value]);
                    break;

                case "field":
                    output.description.push(["field", { id: desc.children[5].value }]);
                    break;

                case "number":
                    output.description.push(["number", { id: desc.children[5].value }]);
                    break;

                case "link":
                    output.description.push(["link", { text: desc.children[4].value, url: desc.children[3].value }]);
                    break;

                case "dropdown":
                    output.description.push(["dropdown", { id : desc.children[5].value, options: desc.children[7].value.trim().split(",").filter((tag) => tag.trim() != "").map(x => x.trim()) }]); 
                    break;

            }
        })
    } else if (descs.length == 1) {
        output.description = ""

        let desc = descs[1];

        if (desc.children[1].value == "just_text" || desc.children[1].value == "text")
            output.description = desc.children[2].value;
    } else {
        output.description = ""
    }

    output = {
        "AV": output.AV,
        "description": output.description, // placing description before name
        "name": output.name,
        "credits": output.credits,
        "tags": output.tags,
        "versionAdded": output.versionAdded
    };

    document.getElementById("output_box").innerText = JSON.stringify(output, null, 4);
}