console.log("Hello from content-script.js");

class Data {
    tabs;
    chosen_study_area;
    hint_element;
    list_items;
}
var data = new Data();
main();
 


function main(){
    get_user_study_area();
    setup();
    display_random_item();
    for (var i = 0; i < data.list_items.length; i++){
        console.log(data.list_items[i]);
        data.list_items[i].addEventListener("click", function(){
            display_certain_item(this);
        });
    }


    //display_random_item();
    addEventListener("keyup", event => {
        if (event.code === 'Space') {
            display_random_item();
        }
    });
}

function get_user_study_area(){
    chosen = ""
    valid_input = false;
    while (valid_input == false){
        inp = prompt("What do you want to study? OSOF(1), Neuro(2), BV3(3)");
        if (Number(inp) == 1) {
            chosen = "OSOF";
            valid_input = true;
        }
        else if (Number(inp) == 2) {
            chosen = "Neuro";
            valid_input = true;
        }
        else if (Number(inp) == 3) {
            chosen = "Basvetenskap3";
            valid_input = true;
        }
        else {
            console.log("Invalid selection! Please type 1, 2 or 3");
        }
    }
    data.chosen_study_area = chosen;
}

function setup(){
    button_container = document.querySelector(".openseadragon-container");
    console.log(button_container);
    //get second child of button_container
    button_container = button_container.children[1];
    button_container = button_container.children[0];
    button_container = button_container.children[0];

    console.log(button_container);

    //add an element to the button_container
    var hint_element = document.createElement("div");
    hint_element.className = "hint_element";
    hint_element.innerHTML = "press 'space' for a random picture!";
    button_container.appendChild(hint_element);

    var hint_element_block = document.createElement("div");
    hint_element_block.className = "hint_element_block";
    hint_element.appendChild(hint_element_block);

    list_items = document.querySelectorAll("#" + data.chosen_study_area + " .dropdown-content ul li");
    data.hint_element = hint_element;
    data.list_items = list_items;
}

function display_random_item(){
    var idx = Math.floor(Math.random() * data.list_items.length);
    display_certain_item(data.list_items[idx]);
}

function display_certain_item(item){
    item.click();
    var chosen_item_name = item.innerHTML.split(".").pop();
    data.hint_element.innerHTML = chosen_item_name;
    
    var hint_element_block = document.createElement("div");
    hint_element_block.className = "hint_element_block";
    hint_element_block.onhov
    data.hint_element.appendChild(hint_element_block);
}
