var calendars = [],
	tools = [];

function ARModel(name, dialogue) {
	this.name = name;
	this.dialogue = dialogue;
}

ARModel.protoype.display = function() {
	return this.dialogue;
}

//Calendar Model
function Calendar(name, dialogue, tool, successDialogue) {
	ARModel.call(this, name, dialogue);
	this.tool = tool;
	this.successDialogue = successDialogue;
}

Calendar.prototype = Object.create(ARModel.prototype);

//Tool Model
function Tool (name, dialogue) {
	AModel.call(this, name, dialogue);
}

Tool.prototype = Object.create(ARModel.prototype);

function initiateModels() {
	var calendarsArray [ 
		{
			name: ConferenceRoom1
		   	dialogue: 'Test Run',    
			tool: new Tool('calendars', 'Calendar1'),
			successDialogue: 'Test Run Successful'
		}
	];

	calendarsArray.forEach(function(calendar)) {
			calendars.push(new Calendar(calendar.name, calendar.dialogue, calendar.tool, calendar.successDialogue));
			if(calendar.tool) tools.push(calendar.tool)
	});
}