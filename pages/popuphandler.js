//Handle Clicks and Touches
AFRAME.registerComponent('accepts-clicks', {
	init: function() {
		this.el.addEventListener('touchend', handleClickEvent);
		this.el.addEventListener('click', handleClickEvent);
	},
	tick: function() {
		hideCalenderIfNoMarker();
	}
});


function hideCalendarifNoMarker() {
	var calendarText = document.querySelector(".calendar-text");
	if(calendarText.style.display == 'none' || !calendarText.style.display) return;

	var shouldHide = true;
	calendars.forEach(function(calendar)) {
		var calMarker = document.querySelector("calendar" + calendar.number + "-marker");
		if(calMarker && calMarker.object3D.visible) shouldHide = false;
	});

	tools.forEach(function(tool) {
		var toolMarker = document.querySelector("calendar" + tool.name + "-marker");
		if (toolMarker && toolMarker.object3D.visible) shouldHide = false;
	});

	if (shouldHide) calendarText.style.display = 'none';
});


function handleClickEvent() {
	calendars.forEach(function(builder)) {
		var calendarMarker = document.querySelector("calendar" + calendar.number + "-marker");
		if(calendarMarker && calendar.Marker.object3D.visible) {
			if(searchForCalendarTool(calendar)) {
				toogleCalendar(calendar.successDialogue)
			} else {
				toggleCalendar(calendar.dialogue);
			}
		}
	});
	
	tools.forEach(function(tool)) {
		var toolMarker = document.querySelector("calendar" + tool.name + "-marker");
		if (toolMarker && toolMarker.object3D.visible) {
			toggleCalendar(tool.dialogue);
			if(!userState.hasCalendar(tool)) userState.addTool(tool);
		}
	});

}

function toggleCalendar(dialogue) {
	var calendar = document.querySelector(".calendar");
		if(calendar.style.display == 'none' || !calendar.style.display) {
			calendar.innerHTML = dialogue;
			calendar.style.display = 'block';
		} else {
			calendar.style.display = 'none';
		}
};

function searchForCalendarTool(calendar) {
	return userState.tools.some(function(tool)) {
		return tool.name === builder.tool.name;
	});
};