var updateHash = function(hash) {
	if(history.pushState) {
	    history.pushState(null, null, '#'+ hash);
	}
	else {
	    location.hash = '#'+ hash;
	}
}

var Main = (function() {

	var switchSpeed = 0;
	var tabs = {
		"home":["home-header", "home-info"],
		"about":["about-info", "about-facilitators"],
		"syllabus":["syllabus-header", "syllabus-main", "dropdown-basic", "dropdown-advanced"],
		"labs":["labs-header", "labs-pipeline", "lab"],
		"projects":["projects-header", "projects-blurb", "projects-samples"]
	}
	var activeTab = "home";

	var loadActiveTab = function() {
		var mainbody = document.getElementById('mainbody'); //jquery failed me
		mainbody.scrollTop=0;
		for (var tab in tabs) {
			for (var i = 0; i < tabs[tab].length; i++) {
				if (tab === activeTab) {
					$("#" + tabs[tab][i]).show(switchSpeed);
					$("#" + tab + "-image").attr("src", "images/menu bar icons/hover-"+tab+".svg");
					$("#" + tab).css('background-color', 'transparent');
				}
				else {
					$("#" + tabs[tab][i]).hide(switchSpeed);
					$("#" + tab + "-image").attr("src", "images/menu bar icons/"+tab+".svg");
				}
			}
		}
	   	$("#blue-box").animate({left:$("#"+activeTab).position().left - $("#blue-box-region").position().left + 20 + "px"}, switchSpeed+200);
		if (activeTab === "labs") window.setTimeout(correctPipelines, switchSpeed);
		if (activeTab === "syllabus") {
			updateHash(activeTab + syllabusType);
		} else {
			updateHash(activeTab);
		}
		$(".navbar-dropdown").hide();
	}

	var loadHome = function() {
		activeTab = "home";
		loadActiveTab();
	}
	var loadAbout = function() {
		activeTab = "about";
		loadActiveTab();
	}
	var loadSyllabus = function() {
		activeTab = "syllabus";
		loadActiveTab();
	}
	var loadLabs = function() {
		activeTab = "labs";
		loadActiveTab();
	}
	var loadProjects = function() {
		activeTab = "projects";
		loadActiveTab();
	}

	var scheduleHover = function() {
		$("#schedule-button").animate({width:"175px"}, 150);
		$("#schedule-text").show(150);
	}
	var scheduleOut = function() {
		$("#schedule-button").animate({width:"60px"}, 150);
		$("#schedule-text").hide(150);
	}
	var logisticsHover = function() {
		$("#logistics-button").animate({width:"175px"}, 150);
		$("#logistics-text").show(150);
		
	}
	var logisticsOut = function() {
		$("#logistics-button").animate({width:"60px"}, 150);
		$("#logistics-text").hide(150);
	}
	var piazzaHover = function() {
		$("#piazza-button").animate({width:"145px"}, 150);
		$("#piazza-text").show(150);
	}
	var piazzaOut = function() {
		$("#piazza-button").animate({width:"60px"}, 150);
		$("#piazza-text").hide(150);
	}

	var resize = function() {
		// contactMargin = window.innerWidth/16 + "px";
		// console.log(contactMargin);
	 //  	$(".contact-icon").css("margin-top", contactMargin);
	 	correctPipelines();
	}

	var checkForHash = function() {
		if(window.location.hash) {
			var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
			if (hash in tabs) {
				activeTab = hash;
				loadActiveTab();
			} else if (hash.startsWith("labs")) {
				console.log(hash, hash.substring(4));
				activeTab = "labs";
				// loadActiveTab();
				createLab(hash.substring(4));
				updateHash(hash);
			} else if (hash.startsWith("syllabus")) {
				if (hash.substring(8) in {"basic":0, "advanced":0}) {
					syllabusType = hash.substring(8);
					activeTab = "syllabus";
					updateSyllabus();
					loadActiveTab();
				}
			}
			// hash found
		} else {
			// No hash found
		}
	}
	var start = function() {
		resize();
		$( window ).resize(resize);
		appendLabsToPipeline();
		window.setTimeout(correctPipelines, 10);
		// correctPipelines();
		$(".info-text").hide();
		$(".info-button").width("50px");
		$(".tab").mouseenter(function() {
			if ($(this)[0].id === "syllabus") {
				$(".navbar-dropdown").show(100);
			}
			if ($(this)[0].id === activeTab) {
				return;
			}
			$(this).css('background-color', "#e2dad8");
		});
		$(".tab").mouseleave(function() {
			$(this).css('background-color', "transparent");
			if ($(activeTab != "syllabus")) {
				$(".navbar-dropdown").hide(100);
			}
		});
		checkForHash();
		loadActiveTab();
	};

	return {
		start: start,

		about: loadAbout,
		home: loadHome,
		labs: loadLabs,
		projects: loadProjects,
		syllabus: loadSyllabus,

		scheduleHover: scheduleHover,
		logisticsHover: logisticsHover,
		piazzaHover: piazzaHover,

		scheduleOut: scheduleOut,
		logisticsOut: logisticsOut,
		piazzaOut: piazzaOut
	}
})();