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
	var syllabusType = "basic";

	var loadActiveTab = function() {
		var mainbody = document.getElementById('mainbody'); //jquery failed me
		mainbody.scrollTop=0;
		// correctPipelines();
		// console.log(activeTab);
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
	   	// $("#" + activeTab).css('pointer-events', none);
		if (activeTab === "labs") window.setTimeout(correctPipelines, switchSpeed);
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
		$("#schedule-button").animate({width:"175px"}, switchSpeed/1.5);
		$("#schedule-text").show(switchSpeed/1.5);
	}
	var scheduleOut = function() {
		$("#schedule-button").animate({width:"60px"}, switchSpeed/1.5);
		$("#schedule-text").hide(switchSpeed/1.5);
	}
	var logisticsHover = function() {
		$("#logistics-button").animate({width:"175px"}, switchSpeed/1.5);
		$("#logistics-text").show(switchSpeed/1.5);
		
	}
	var logisticsOut = function() {
		$("#logistics-button").animate({width:"60px"}, switchSpeed/1.5);
		$("#logistics-text").hide(switchSpeed/1.5);
	}
	var piazzaHover = function() {
		$("#piazza-button").animate({width:"145px"}, switchSpeed/1.5);
		$("#piazza-text").show(switchSpeed/1.5);
	}
	var piazzaOut = function() {
		$("#piazza-button").animate({width:"60px"}, switchSpeed/1.5);
		$("#piazza-text").hide(switchSpeed/1.5);
	}

	var resize = function() {
		// contactMargin = window.innerWidth/16 + "px";
		// console.log(contactMargin);
	 //  	$(".contact-icon").css("margin-top", contactMargin);
	 	correctPipelines();
	}

	var start = function() {
		loadActiveTab();
		resize();
		$( window ).resize(resize);
		appendLabsToPipeline();
		window.setTimeout(correctPipelines, 10);
		// correctPipelines();
		$(".info-text").hide();
		$(".info-button").width("50px");
		$(".tab").mouseenter(function() {
			if ($(this)[0].id === "syllabus") {
				$(".navbar-dropdown").show(100);//('display', 'block');
			}
			if ($(this)[0].id === activeTab) {
				return;
			}
			$(this).css('background-color', "#e2dad8");
		});
		$(".tab").mouseleave(function() {
			$(this).css('background-color', "transparent");
			if ($(activeTab != "syllabus")) {
				$(".navbar-dropdown").hide(100);//('display', 'none');
			}
		});
		// updateSyllabus();
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