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
    description: {
        text: "Description of the addon",
        input_type: "desc",
        value: []
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
let desc = document.createElement("div");
desc.id = "descs";

function add_description() {
    let div = document.createElement("div");
    div.id = "setting"
    let desc_text = document.createElement("span")
    desc_text
    desc_text.innerText = "Description: "
    let desc_input = document.createElement("input")
    desc_input.type = "text"
    desc_input.id = "desc_input";
    div.appendChild(desc_text)
    div.appendChild(desc_input)

    desc.appendChild(div);
}

function add_setting(type) {
    let div = document.createElement("div");
    div.id = "setting";

    let element, text;

    console.log(type)
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
    input.appendChild(desc);
    add_description()
    add_setting(infojson_types.credits)
    add_setting(infojson_types.tags)
    add_setting(infojson_types.version_added)
}

let output = {};

function generate() {
    let settings = document.querySelectorAll("#setting")

    settings.forEach((setting) => {
        console.log(setting.children[1].id);

        switch (setting.children[1].id) {
            case "aioewa_info.json_version":
                output.AV = setting.children[1].value;
                break;

            case "name_of_the_addon":
                output.name = setting.children[1].value;
                break;
                
            case "desc_input":
                // output["name"] = setting.children[1].value;
                break;

            case "your_aioewa_user_id":
                output.credits = [{id: setting.children[1].value}];
                break;

            case "tags_for_your_addon_(separate_with_commas)":
                output.tags = setting.children[1].value.trim().split(",").filter((tag) => tag.trim() != "").map(x => x.trim());
                break;
            
            case "the_version_of_aioewa_the_addon_was_introduced":
                output.versionAdded = setting.children[1].value;
                break;
        }
    })

    document.getElementById("output_box").innerText = JSON.stringify(output, null, 4);
}