function UserState() {
	this.tools = [];
}

UserState.prototype.addTool = function(tool) {
	this.tools.push(tool);
}

UserState.prototype.hasCalendarTool = function(calendar) {
	return calendar.tool && this.tools.includes(calendar.tool.name);
}

var UserState = new UserState();