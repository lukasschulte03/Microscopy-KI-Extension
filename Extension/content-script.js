console.log("Hello from content-script.js");

class Data {
	tabs;
	chosen_study_area;
	hint_element;
	list_items;
}
var data = new Data();
main();

function main() {
	get_user_study_area();
	setup();
    hide_other_study_areas();

	//display_random_item();
	addEventListener("keyup", (event) => {
		if (event.code === "Space") {
			display_random_item();
		}
	});
}

function get_user_study_area() {
	chosen = "";
	valid_input = false;
	//prompt user for study area
	inp = prompt("What do you want to study? OSOF(1), Neuro(2), BV3(3)");
	while (valid_input == false) {
		if ((Number(inp) == 1) || (String(inp).toLowerCase() == "osof")) {
			chosen = "OSOF";
			valid_input = true;
		} else if ((Number(inp) == 2) || (String(inp).toLowerCase() == "neuro")){
			chosen = "Neuro";
			valid_input = true;
		} else if ((Number(inp) == 3) || (String(inp).toLowerCase() == "bv3")){
			chosen = "Basvetenskap3";
			valid_input = true;
		} else {
			inp = prompt("Invalid input. Please input one of the following: OSOF(1), Neuro(2), BV3(3)");
		}
	}
	//set chosen study area
	data.chosen_study_area = chosen;
}

function setup() {
	button_container = document.querySelector(".openseadragon-container");
	//get second child of button_container
	button_container = button_container.children[1];
	button_container = button_container.children[0];
	button_container = button_container.children[0];

	//add an element to the button_container
	var hint_element = document.createElement("div");
	hint_element.className = "hint_element";
	hint_element.innerHTML = "press 'space' for a random picture!";
	button_container.appendChild(hint_element);

	//add hint element block to the button_container
	var hint_element_block = document.createElement("div");
	hint_element_block.className = "hint_element_block";
	hint_element_block.innerHTML = "?";
	//hint_element.appendChild(hint_element_block);

	//get the list items
	list_items = document.querySelectorAll(
		"#" + data.chosen_study_area + " .dropdown-content ul li"
	);
	data.hint_element = hint_element;
	data.list_items = list_items;

	//add event listeners to the list items, so that when manually clicked, the item displayed also updates the hint element
	for (var i = 0; i < data.list_items.length; i++) {
		data.list_items[i].addEventListener("click", function () {
			display_certain_item(this);
		});
	}
}

function hide_other_study_areas() {
    var study_area_dropdowns = document.querySelectorAll(".dropdown");
    console.log(study_area_dropdowns);
    var thing_to_keep = [data.chosen_study_area, "kompendier", "about"]
    for (var i = 0; i < study_area_dropdowns.length; i++) {
        if (!thing_to_keep.includes(study_area_dropdowns[i].id)) {
            study_area_dropdowns[i].style.display = "none";
        }
    }
}

function display_random_item() {
	var idx = Math.floor(Math.random() * data.list_items.length);
	display_certain_item(data.list_items[idx]);
}

function display_certain_item(item) {
	item.click();
	var chosen_item_name = item.innerHTML.split(".").pop();
	data.hint_element.innerHTML = chosen_item_name;

	//add hint element block to the button_container, since it disappears when the text is changed
	var hint_element_block = document.createElement("div");
	hint_element_block.className = "hint_element_block";
	hint_element_block.onhov;
	hint_element_block.innerHTML = "?";
	data.hint_element.appendChild(hint_element_block);
}
