$(document).ready(function(){
	//add new tasks to the main to do list on click

	$("#addTaskButton").click(function() {
		var tasks = $("#tasks");
		var newTask = $("#newTaskInput").val();

		//if it is an empty input field dont go to the next step
		if (newTask == "") { 
			return;
		}
		//append new tasks to the div "tasks"
		tasks.prepend(` 
			<div class="individualTasks">
				<span class="handle">&#8801;</span>
				<p contenteditable="true">${newTask}</p>
				<button class="buttonCheck"><i class="fa fa-check-square"></i></button>
				<button class="buttonDelete"><i class="fa fa-trash"></i></button>
			</div>`);

		//clear the input field after entering a new task	
		$("#newTaskInput").val(""); 
		
		//*** on every add task button click the function adds the buttonDelete and buttonCheck function to all its elements anew. This is why it needs to be switched off first ***//

		//remove tasks from the main to do list.
		$(".buttonDelete").off(); 
		$(".buttonDelete").click(function() {
			if (confirm('Are you sure you want to delete this task?')) {
				$(this).parent().remove();
			}
		});

		//check tasks as done on click and display them differently. At the same time remove the reactivation button for completed tasks if the checkbox is unchecked. At the same time hide the completed tasks if the checkbox is unchecked.
		$(".buttonCheck").off();
		$(".buttonCheck").click(function() {
			$(this).toggleClass("done");
			$(this).parent().toggleClass("done");
			if ($("#checkboxEnable").prop("checked")) {
				$(".done > .buttonCheck").show();
			} else {
				$(".done > .buttonCheck").hide();
			}
			if ($("#checkboxShow").prop("checked")) {
				$(".done").show();
			} else {
				$(".done").hide();
			}
		});
	});

	//add new tasks to the main to do list on pressing enter key
	$("#newTaskInput").keypress(function(e) {
		if(e.which == 13){
			$("#addTaskButton").click();
		}
	});
	
	//Checkbox: enable reactivation of completed tasks**toogle doesn't work well**
	$("#checkboxEnable").click(function() {
		if($(this).prop("checked")) {
			$(".done > .buttonCheck").show();
		} else {
			$(".done > .buttonCheck").hide();
		}
	});

	//Checkbox: show and hide completed tasks**toogle doesn't work well**
	$("#checkboxShow").click(function() {
		if($(this).prop("checked")) {
			$(".done").show();
		} else {
			$(".done").hide();
		}
	});

	//Drag and drop for the tasks with the handle for sorting so that we can keep "contenteditable"
	$("#tasks").sortable({axis:"y", handle:'.handle'});

});



