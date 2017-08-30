/* DOUBLE CLICK ON MOBILE */
(function($){var isiOS=false; var agent=navigator.userAgent.toLowerCase(); if(agent.indexOf('iphone') >=0 || agent.indexOf('ipad') >=0){isiOS=true;}$.fn.doubletap=function(onDoubleTapCallback, delay){var eventName, action; delay=delay==null? 500 : delay; eventName=isiOS==true? 'touchend' : 'click'; $(this).bind(eventName, function(event){var now=new Date().getTime(); var lastTouch=$(this).data('lastTouch') || now + 1; var delta=now - lastTouch; clearTimeout(action); if(delta<500 && delta>0){if(onDoubleTapCallback !=null && typeof onDoubleTapCallback=='function'){onDoubleTapCallback(event);}}$(this).data('lastTouch', now);});};})(jQuery);
var prevtop ="";
var prevleft ="";
var moveleftpos ="";
var prevt10top ="";
var prevt10left ="";
var prevt12top ="";
var prevt12left ="";
var moveleftt10pos ="";
var moveleftt12pos ="";
var weekphaseclick = false;
var quarterclick = false;
var currmonth ="";
/* SET POSITION OF ALL TASKS BASED ON 'DATA-' VALUES */
function taskspos(id){
        //console.log(id,"id")
	var monthperiod = $(".header #search-product").nextAll(".kies").text();
	var phaseperiod = $(".current-phase").find(".kies").text();
	$('#'+id+' .tasks span').each(function(){
		if(monthperiod == "Quarter" && id=="tl23"){
			quarterclick = true;
		}
		if(phaseperiod == "Week" && (id=="tl0" || id=="tl2")){
			weekphaseclick = true;
		}
        var t = $(this);
        var zoom = $('#'+id).attr('data-zoom');
        //console.log(zoom,"zoom")
                /* GET CURRENT MONTH VALUE */
        var mo = t.attr('data-mo');
                /* SET LENGTH IN DAYS OF MONTHS */
        
        if ( mo == 'Jan' ) { var month = 1 }
        else if ( mo == 'Feb' ) { var month = 31 * zoom }
        else if ( mo == 'Mar' ) { var month = 59 * zoom}
        else if ( mo == 'Apr' ) { var month = 90 * zoom}
        else if ( mo == 'May' ) { var month = 120 * zoom}
        else if ( mo == 'Jun' ) { var month = 151 * zoom}
        else if ( mo == 'Jul' ) { var month = 181 * zoom}
        else if ( mo == 'Aug' ) { var month = 212 * zoom}
        else if ( mo == 'Sep' ) { var month = 243 * zoom}
        else if ( mo == 'Oct' ) { var month = 273 * zoom}
        else if ( mo == 'Nov' ) { var month = 304 * zoom}
        else if ( mo == 'Dec' ) { var month = 334 * zoom}
        
        /* CONVERT THIS DAY VALUE TO LEFT POSITION */
        var day = parseInt((t.attr('data-day')),10) * zoom - zoom;
        /* CONVERT THIS LENGTH VALUE TO WIDTH VALUE */
        var days = parseInt(t.attr('data-days'),10) * zoom;
        /* CONVERT THIS ROW VALUE TO VERTICAL POSITION */
        var row = parseInt(t.attr('data-row'),10) * 40;
        //console.log(row,"row")
        /* GET THIS COLOR VALUE */
        var col = t.attr('data-col');
        //$(this.closest("#tl23")).find("span:first").css("background-color","#4395c9")
        $(this.closest("#tl23")).find("span:first").css("border-left-color","#4395c9")
        $(this.closest("#tl23")).find("span:first").css("border-right-color","#4395c9")
       	$(this.closest("#tl23")).find("span:first").attr("data-spanselect","true")
        //console.log($(this.closest("#tl23")).find("span em"),"testing123") 
        
        /* SET LEFT AND TOP POSITIONS, WIDTH AND BORDER(LABEL)COLOR TO DATA-VALUES */
               //console.log(days,"jj")
               //console.log(month,day,"month + day",days)

            
        	//var phaseperiod = $(".current-phase").find(".kies").text();
		    //console.log(weekphaseclick,"phaseperiod",quarterclick)
		    if(quarterclick && monthperiod == "Quarter"){
		    	$(this).css({
	                'left': month + day,
	                'width': days+10,
	                'top': row,
	                'border-left-color':'#'+col
	        		});
		    }else if(weekphaseclick && phaseperiod == "Week"){
		    	$(this).css({
	                'left': month + day,
	                'width': days+70,
	                'top': row,
	                'border-left-color':'#'+col
	        		});
		    }else{
		    $(this).css({
	                'left': month + day,
	                'width': days+30,
	                'top': row,
	                'border-left-color':'#'+col
	        		});	
		    }
		    
	});
	quarterclick = false;
	weekphaseclick = false;
	setTimeout(function(){
            var monthperiod = $(".header #search-product").nextAll(".kies").text();
            var taskpostl23 = $('#'+id+' .grid i.today').position();
            if(taskpostl23){
                $('#'+id+' > div').css({"left":-(taskpostl23.left - 35)})	
            }
            tlheight(1000,"tl23")   
	},1000)
}

/* DETECT MAX NEEDED TIMELINE HEIGHT TO DISPLAY ALL TASKS */
function tlheight(speed,id){
	var maximum = null;

	/* DETECT HIGHEST DATA-ROW DATA OF TASKS */
	$('#'+id+' .tasks span').each(function() {
		var value = parseFloat($(this).attr('data-row'));
		maximum = (value > maximum) ? value : maximum;
                //console.log(maximum,"maximum")
	});
	/* SET TIMELINE HEIGHT TO HIGHEST DATA-ROW DATA + MARGIN */
	$('#'+id).animate({'height':maximum * 40 + 80},speed);
}
/* ENABLE DRAGGABLE FOR TASKS */
var zoomlevel = 0;
function tasksdraggable(zoom){
	
	// var taskpos = $('#'+tl23+' .grid i.today').position();
 //    if(taskpos){
 //    	$('#'+tl23+' .grid i.today').css("left",taskpos.left)	
 //    }

	// $('#tl2 .tasks span').draggable({
	// 	addClasses: false,
	// 	/* SNAP HORIZONTALLY TO DAYS (30PX WIDE) AND VERTICALLY TO ROWS (40PX TALL) */
	// 	containment: [-3000, 40, 3000, 1000 ],
	// 	start: function(){
	// 		zoom = 30;
	// 	},
	// 	grid: [zoom, 40],
	// 	stop: function(event,ui) {
	// 		/* INCREASE TIMELINE HEIGHT IF DRAGGED TO BOTTOM ROW */
	// 		var h = $('#tl2').height()-80;
	// 		var p = ui.position.top;
	// 		if ( p > h ) {
	// 			$('#tl2').animate({'height':p + 80},200);
	// 		}
	// 		var t = $(this);
	// 		/* GET CURRENT MONTH VALUE */
	// 		var tmo = t.attr('data-mo');
	// 		/* SET LENGTH IN DAYS OF MONTHS */
	// 		if ( tmo == 'Jan' ) { var month = 0 }
	// 		else if ( tmo == 'Feb' ) { var month = 30 }
	// 		else if ( tmo == 'Mar' ) { var month = 61 }			
	// 		/* GET CURRENT LEFT POSITION */
	// 		var tpos = parseInt(t.css('left'),10) / zoom + 1;
	// 		/* SUBTRACT CURRENT MONTH FROM LEFT POSITION */
	// 		var day = tpos-month;
	// 		/* SET NEW DAY VALUE */
	// 		t.attr('data-day',day);
	// 		/* GET CURRENT VERTICAL POSITION */
	// 		var row = parseInt(t.css('top'),10) / 40;
	// 		/* SET NEW ROW VALUE */
	// 		t.attr('data-row',row);
	// 		/* REFRESH TIMELINE HEIGHT */
	// 		setTimeout(function(){
	// 			tlheight(500,'tl2');
	// 		},200);
	// 	}
	// });
	var temparrr = [];
	var timelineleftstoree=[];
	var timelineleftstoree1 =[];
	var temparrr1 =[];
	$('#tl0 .tasks span').draggable({
		addClasses: false,
		/* SNAP HORIZONTALLY TO DAYS (30PX WIDE) AND VERTICALLY TO ROWS (40PX TALL) */
		containment: [-3000, 40, 3000, 1000 ],
		start: function(){

			//console.log("here")
			zoom = 30;
		},
		grid: [zoom, 40],
		drag: function(){
			
                    moveleftt10pos = $(this).position().left;
                    var offset = $(this).offset();
                    var xPos = offset.left;
                    var yPos = offset.top;

                    // timeline design
                    var timelineleft = parseInt($(this).parents(".ui-draggable-handle").css("left"),10);
                    timelineleft = Number(timelineleft.toString().replace(/\-/g,''));
                    //console.log(timelineleft,"timelineleft");

                    	var spanwidth = parseInt($(this).css("width"),10);
                        var spanleft = parseInt($(this).css("left"),10);
                        var spantotal = spanwidth + spanleft;
                        //console.log(spanleft,timelineleft,"here")
                        
                        if(spanleft < timelineleft){
                            //console.log("leftside");
                        //var spanwidthcalc = ((timelineleft-spanleft) - ($(this).width() +20));
                        var emwidth = $(this).find("em").width();
                        var ph1width = $(this).find("em div#ph1").width();
                        var totalwidth = emwidth - ph1width;
                        var halfwid = totalwidth/2;
                        var halfem = spanleft + halfwid+10;
                        //var padLeft = parseInt($(this).css('padding-left'),10);
                                        
                        if(halfem < timelineleft){  
                            
                            console.log(spanleft,"spanleft",timelineleftstoree,"timelineleftstoree")
                            var timestop = timelineleftstoree.pop();
                            //console.log(spanleft+halfwid,"spanleft",spantotal,"spantotal",halfwid,"halfwid",halfem,"halfem",timelineleft,"timelineleft",timelineleftstoree,"timelineleftstoree")
                            if(spanleft > timestop){
                                console.log("if")	
                                var padLeft = parseInt($(this).find("em div#ph1").css("padding-left"),10);
                                padLeft = padLeft - 4; 
                                //console.log(padLeft,"padLeftif")
                                $(this).find("div#ph1").css("padding-left",padLeft+"px");
                                timelineleftstoree.push(timestop);
                                //timelineleftstoree.push(parseInt($(this).css("left"),10));
                            }else{
                            	var padLeft = parseInt($(this).find("em div#ph1").css("padding-left"),10);
                                    padLeft = padLeft + 3; 
                                    $(this).find("div#ph1").css("padding-left",padLeft+"px"); 
                                    timelineleftstoree.push(parseInt($(this).css("left"),10));
                            }
                        }else{
                        	console.log("else");
                            $(this).find("div#ph1").css("padding-left",0+"px");
                            timelineleftstoree = [];
                            //timelineleftstoree.splice(i,1)
                        }
                        //console.log(temparrr,"temparrr")
                        }else{
                        	// right side
                            if((timelineleft+1000) < spantotal){
                                
                                $(this).find("em div#ph1").css({'position':'relative'});
								var timelightwidth = timelineleft+1000;
                                var emwidth = $(this).find("em").width();
                                var ph1width = $(this).find("em div#ph1").width();
                                var totalwidth = emwidth - ph1width;
                                var halfwid = totalwidth/2;
                                var timelineenter = spantotal - halfwid - 10;
                                
                                if(timelightwidth < timelineenter){
                                    //console.log(timelightwidth,timelineleftstore1[i],"else")
                                    //console.log(spanleft,"spanleft",timelineleftstoree,"timelineleftstoree")
                            		var timestop = timelineleftstoree.pop();
                            		console.log(spanleft,"spanleft",timestop,"timelineleftstoree")
                            	if(spanleft < timestop){
                            		console.log("if");
                                    var padLeft = parseInt($(this).find("em div#ph1").css("right"),10);
                                    padLeft = padLeft - 3; 
                                    //console.log(padLeft,"padLeftif")
                                    $(this).find("div#ph1").css({'position':'relative','right':padLeft+"px"}); 
                                    timelineleftstoree.push(timestop);
                                }else{
                                		//console.log("padelse");
                                        var padLeft = parseInt($(this).find("em div#ph1").css("right"),10);
                                        padLeft = padLeft + 2; 
                                        $(this).find("div#ph1").css({'position':'relative','right':padLeft+"px"});
                                        timelineleftstoree.push(parseInt($(this).css("left"),10)); 
                                }
                            }else{
                                    $(this).find("div#ph1").css("right",0+"px");
                                    timelineleftstoree = [];
                                }
                                    }
                                
                        }
                },
		stop: function(event,ui) {
			//var r = confirm("Are you sure you want to move phase ?");
			var t = $(this);
			if(prevt10left != moveleftt10pos){
                                var r = confirm("Are you sure you want to move phase ?");
                                var asd = true;
                        }else{
                                var asd = false;
                        }	
			if(r || !asd){
			var phase_id = $(this).attr("data-id");	
                        var proj_id = $(this).attr("proj-id");
                        var row_no = $(this).attr("data-row");
                                               
			/* INCREASE TIMELINE HEIGHT IF DRAGGED TO BOTTOM ROW */
			var h = $('#tl0').height()-80;
			var p = ui.position.top;
			//console.log(p,h)
			if ( p > h ) {
				$('#tl0').animate({'height':p + 80},200);
			}
			
			/* GET CURRENT MONTH VALUE */
			/* GET CURRENT MONTH VALUE */
			var tmo = t.attr('data-mo');
			/* SET LENGTH IN DAYS OF MONTHS */
			if ( tmo == 'Jan' ) { var month = 1 }
			else if ( tmo == 'Feb' ) { var month = 31 }
			else if ( tmo == 'Mar' ) { var month = 59 }
			else if ( tmo == 'Apr' ) { var month = 90 }
			else if ( tmo == 'May' ) { var month = 120 }
			else if ( tmo == 'Jun' ) { var month = 151 }
			else if ( tmo == 'Jul' ) { var month = 181 }
			else if ( tmo == 'Aug' ) { var month = 212 }
			else if ( tmo == 'Sep' ) { var month = 243 }
			else if ( tmo == 'Oct' ) { var month = 273 }
			else if ( tmo == 'Nov' ) { var month = 304 }
			else if ( tmo == 'Dec' ) { var month = 334 }
			

			/* GET CURRENT LEFT POSITION */
		var phaseperiod = $(".current-phase").find(".kies").text();
		if(phaseperiod == "Week"){
			//console.log(parseInt(t.css('left'),10),"zoom",Math.floor(parseInt(t.css('left'),10) / zoom + 1)/2)
			var weekcal = parseInt(t.css('left'),10)/70;
			var tpos = weekcal + 1;
		}else{
			var tpos = parseInt(t.css('left'),10) / zoom + 1;	
		}
			//var tpos = parseInt(t.css('left'),10) / zoom + 1;
			
			/* SUBTRACT CURRENT MONTH FROM LEFT POSITION */
			var day = tpos;
			//console.log(tpos,day,month,"month") // 93,34,59
			var mnth ="";
			if(tpos >= 1 && tpos <= 31){
				mnth = "Jan";
			}else if(tpos >= 32 && tpos <= 59){
				day = (tpos-32)+1;
				mnth = "Feb";
			}else if(tpos >= 60 && tpos <= 90){
				day = (tpos-60)+1;	
				mnth = "Mar";
			}else if(tpos >= 91 && tpos <= 120){
				day = (tpos-91)+1;
				mnth = "Apr";
			}else if(tpos >= 121 && tpos <= 151){
				day = (tpos-121)+1;
				mnth = "May";
			}
			else if(tpos >= 152 && tpos <= 181){
				day = (tpos-152)+1;
				mnth = "Jun";
			}
			else if(tpos >= 182 && tpos <= 212){
				day = (tpos-182)+1;
				mnth = "Jul";
			}
			else if(tpos >= 213 && tpos <= 243){
				day = (tpos-213)+1;
				mnth = "Aug";
			}
			else if(tpos >= 244 && tpos <= 273){
				day = (tpos-244)+1;
				mnth = "Sep";
			}
			else if(tpos >= 274 && tpos <= 304){
				day = (tpos-274)+1;
				mnth = "Oct";
			}
			else if(tpos >= 305 && tpos <= 334){
				day = (tpos-305)+1;
				mnth = "Nov";
			}
			else if(tpos >= 335 && tpos <= 365){
				day = (tpos-335)+1;
				mnth = "Dec";
			}
			//console.log(mnth,tpos,month,day)
            var prevrow = t.attr('data-row')            
                        /* SET NEW DAY VALUE */
                        day = Math.ceil(day);
                        t.attr('data-day',day);
                        
			/* GET CURRENT VERTICAL POSITION */
			var row = parseInt(t.css('top'),10) / 40;
			/* SET NEW Month VALUE */
			t.attr('data-mo',mnth);
			/* SET NEW ROW VALUE */
			t.attr('data-row',row);
			var movedatid = t.attr('data-id');
			var datarow = t.attr('data-row');

			// overlapping functionality
			var currentleft = $(this).css("left").split("px");
			var currentwidth = $(this).css("width").split("px");
			var currenttotal = parseInt(currentleft[0]) + parseInt(currentwidth[0]);
			var currentleftpos = parseInt(currentleft[0]);
			//console.log(currentleftpos,currenttotal,datarow,"currenttotal",prevt10top,prevrow)
			
             // overlapping concept
			 setTimeout(function(){
                        	var spanarr = $(document).find('#tl0 .tasks span[data-row='+datarow+']');
                        	
                        	for (var i = 0; i < spanarr.length; i++) {
                                    var totalwidth = parseInt($(spanarr[i]).css("left"))+parseInt($(spanarr[i]).css("width"));
                                    var pos1 = parseInt($(spanarr[i]).css("left"));
                                    //console.log("pos1",pos1,"totalwidth",totalwidth)
                                    //console.log(currenttotal,totalwidth,"totalwidth")
                                    if((currenttotal != totalwidth)){
                                            if((currenttotal > pos1) && (currentleftpos < totalwidth)){
                                                    datarow =parseInt(prevrow);
                                                    $(spanarr[i]).attr("data-row",datarow)
                                                    var topsize =parseInt($(spanarr[i]).css("top"));
                                                    $(spanarr[i]).animate({"top":prevt10top},"slow");
                                                    var projid= $(spanarr[i]).attr("data-id")
                                                    var rowid= $(spanarr[i]).attr("data-row")
                                                    overlap_project(projid,rowid,'ph');
                                                    //console.log(projid,'projid')
                                                    //console.log(rowid,'rowid ')
                                                    tlheight(500,'tl0');
                                            }
                                    }else if(currenttotal == totalwidth){
                                            var currdataid = $(spanarr[i]).attr("data-id");
                                            if(movedatid != currdataid){
                                                    datarow =parseInt(prevrow);
                                                    $(spanarr[i]).attr("data-row",datarow)
                                                    $(spanarr[i]).animate({"top":prevt10top},"slow");
                                                    var projid= $(spanarr[i]).attr("data-id")
                                                    var rowid= $(spanarr[i]).attr("data-row")
                                                    //console.log(projid,'projid')
                                                    //console.log(rowid,'rowid ')
                                                    overlap_project(projid,rowid,'ph');
                                                    tlheight(500,'tl0');
                                            }

                                    }
                        	}	
                        
                },800)

			/* REFRESH TIMELINE HEIGHT */
			setTimeout(function(){
				tlheight(1000,'tl0');
			},5000);
			
			var row_no = $(this).attr("data-row");
                        
			/* Move Phase from timeline */
                        var img_url = $('#img_url').val();
                        $('.overly_loader').css('display','block');
                        $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
                        var user_id = get_userid();
                        var admin_url = get_ajaxurl();
                        $.ajax({
                            type : "POST",
                            url : admin_url,
                            dataType: 'json',
                            data: {
                                action:'move_phase', 
                                id:user_id,
                                p_id:proj_id,
                                phase_id:phase_id,
                                s_day:day,
                                s_month:mnth,
                                row_no:row_no
                            },
                            success: function(data) {
                                //console.log(data,'move-phase-data');
                                if(data.status){
                                    //console.log('if phase')
                                    $('.overly_loader').css('display','none');
                                }
                                else{
                                    if(asd){
                                        var art_id = $("#artist_list").val();
                                        //display_project_data(art_id);
                                        display_project_list(art_id);
                                        display_phase_grid(proj_id);
                                        var monthperiod = $(".header #search-product").nextAll(".kies").text();
                                        setTimeout(function(){
                                            var monthperiod = $(".header #search-product").nextAll(".kies").text();
                                            if(monthperiod == "Quarter"){
                                                tlwidth(10,"tl23")
                                            }else if(monthperiod == "Year"){
                                                tlwidth(3,"tl23")
                                                $("#tl23[data-zoom=3] .grid i.month").each(function(ind,val){
                                                    var monthvalue = $(val).find("em").text();
                                                    //console.log(monthvalue)
                                                    if(monthvalue == "January" || monthvalue == "March" || monthvalue == "May" || monthvalue == "July" || monthvalue == "September" || monthvalue == "November" 
                                                        || monthvalue == "Jan" || monthvalue == "Mar" || monthvalue == "May" || monthvalue == "Jul" || monthvalue == "Sep" || monthvalue == "Nov"){
                                                        $(val).nextAll().css("background","rgba(0,0,0,0.1)")
                                                    }else{
                                                        $(val).nextAll().css("background","rgba(153,153,153,0.1)")
                                                    }
                                                    var text = monthvalue.replace(monthvalue,monthvalue.substring(0,3))
                                                    //console.log(text)
                                                    $(val).find("em").text(text)
                                                })
                                            }else{
                                                    tlwidth(30,"tl23")
                                            }
                                            $('.overly_loader').css('display','none');
                                            },2000)
                                    }
                                }
                            }
                        });
                        var monthperiod = $(".header #search-product").nextAll(".kies").text();
					    if(monthperiod == "Quarter"){
					    		tlwidth(10,"tl23")
					    	}else if(monthperiod == "Year"){
					            tlwidth(3,"tl23")
					        }

                                                
			}else{
				$(this).css({top: currposelem.top, left: currposelem.left, position:'absolute'});
			}
		}
	});
                
	function overlapmovetask(datarow,datahandle){
		//console.log(datarow,"datarow1",datahandle)
		if(datahandle == "right"){
		var spanarrmore = $(document).find('#tl2 .tasks span[data-row='+datarow+']');
                                                    //console.log(spanarrmore,"spanarrmore")
                                                    var j = 0;

                                                    for (var i = 0; i < spanarrmore.length; i++) {
                                                    	if(j == 0){
                                                    		var totalwidthmore = parseInt($(spanarrmore[i]).css("left"))+parseInt($(spanarrmore[i]).css("width"));
                                    						var pos1more = parseInt($(spanarrmore[i]).css("left"));
                                    						var spantop = parseInt($(spanarrmore[i]).css("top")) + parseInt(40);
                                    						// if(spanarrmore.length == 1){
                                          //           			$(spanarrmore[0]).animate({"top":spantop},"slow");
	                                    					// 	var datarow1 = $(spanarrmore[0]).attr("data-row");
	                                    					// 	$(spanarrmore[0]).attr("data-row",parseInt(datarow1)+parseInt(1))
                                          //           		}
                                    						//$(spanarrmore[0]).animate({"top":spantop},"slow");	
                                    						//console.log(spantop,"spantop")
                                    						//console.log("pos1more",pos1more,"totalwidthmore",totalwidthmore,"--")
	                                    				}
                                                    	else{
                                                    		var totalwidthmore1 = parseInt($(spanarrmore[i]).css("left"))+parseInt($(spanarrmore[i]).css("width"));
                                    						var pos1more1 = parseInt($(spanarrmore[i]).css("left"));
	                                                    	//console.log("pos1more1",pos1more1,"totalwidthmore1",totalwidthmore1)
	                                    					//console.log(totalwidthmore1,"totalwidthmore1")	
	                                    					if(pos1more < totalwidthmore1){
                                    						$(spanarrmore[0]).animate({"top":spantop},"slow");
                                    						var datarow1 = $(spanarrmore[0]).attr("data-row");
                                    						$(spanarrmore[0]).attr("data-row",parseInt(datarow1)+parseInt(1))

                                    						var projid1= $(spanarrmore[0]).attr("data-id")
                                                    		var rowid1= $(spanarrmore[0]).attr("data-row");
                                    						
                                    						overlap_project(projid1,rowid1,'ta');
                                    						setTimeout(function(){
                                    							overlapmovetask(parseInt(datarow1)+parseInt(1),"right");	
                                    						},800)
                                    						
                                    						}
                                                    	}
                                                    	j++;
                                                    }
               }
               else{
               	// left resize
               	//console.log("elsehere for left resize")
               	var spanarrmore = $(document).find('#tl2 .tasks span[data-row='+datarow+']');
                                                    //console.log(spanarrmore,"spanarrmore")
                                                    var j = 0;
                                                    for (var i = 0; i < spanarrmore.length; i++) {
                                                    	if(j == 0){
                                                    		var totalwidthmore = parseInt($(spanarrmore[i]).css("left"))+parseInt($(spanarrmore[i]).css("width"));
                                    						var pos1more = parseInt($(spanarrmore[i]).css("left"));
                                    						var spantop = parseInt($(spanarrmore[i]).css("top")) + parseInt(40);	
                                    						//console.log(spantop,"spantop")
                                    						//console.log("pos1more",pos1more,"totalwidthmore",totalwidthmore,"--")
	                                    				}else{
	                                    					var pos1more1 = parseInt($(spanarrmore[i]).css("left")) - parseInt(60);
                                                    		var totalwidthmore1 = parseInt($(spanarrmore[i]).css("left"))+parseInt($(spanarrmore[i]).css("width"));
                                    						//console.log("pos1more1",pos1more1,"totalwidthmore1",totalwidthmore1)
	                                    					//console.log(totalwidthmore1,"totalwidthmore1")	
	                                    					if(totalwidthmore > pos1more1){
                                    						$(spanarrmore[0]).animate({"top":spantop},"slow");
                                    						var datarow1 = $(spanarrmore[0]).attr("data-row");
                                    						$(spanarrmore[0]).attr("data-row",parseInt(datarow1)+parseInt(1))

                                    						var projid1= $(spanarrmore[0]).attr("data-id")
                                                    		var rowid1= $(spanarrmore[0]).attr("data-row");
                                    						
                                    						overlap_project(projid1,rowid1,'ta');
                                    						setTimeout(function(){
                                    							overlapmovetask(parseInt(datarow1)+parseInt(1));	
                                    						},600)
                                    						
                                    						}
                                                    	}
                                                    	j++;
                                                    }
               }                                     
	}	
	var temparrr = [];
	var timelineleftstoree2=[];
	var timelineleftstoree1 =[];
	var temparrr1 =[];
	$('#tl2 .tasks span').draggable({
		addClasses: false,
		/* SNAP HORIZONTALLY TO DAYS (30PX WIDE) AND VERTICALLY TO ROWS (40PX TALL) */
		grid: [zoom, 40],
		containment: [-3000, 40, 3000, 1000 ],
		drag: function(){
			moveleftt12pos = $(this).position().left;
			var movetoppos = $(this).position().top;
                    var offset = $(this).offset();
                    var xPos = offset.left;
                    var yPos = offset.top;
                    
                    // timeline design
                    var timelineleft = parseInt($(this).parents(".ui-draggable-handle").css("left"),10);
                    timelineleft = Number(timelineleft.toString().replace(/\-/g,''));
                    //console.log(timelineleft,"timelineleft");

                    	var spanwidth = parseInt($(this).css("width"),10);
                        var spanleft = parseInt($(this).css("left"),10);
                        var spantotal = spanwidth + spanleft;
                        //console.log(spanleft,timelineleft,"here")
                        
                        if(spanleft < timelineleft){
                            //console.log("leftside");
                        //var spanwidthcalc = ((timelineleft-spanleft) - ($(this).width() +20));
                        var emwidth = $(this).find("em").width();
                        var ph1width = $(this).find("em div#ph1").width();
                        var totalwidth = emwidth - ph1width;
                        var halfwid = totalwidth/2;
                        var halfem = spanleft + halfwid+10;
                        //var padLeft = parseInt($(this).css('padding-left'),10);
                                        
                        if(halfem < timelineleft){  
                            
                            console.log(spanleft,"spanleft",timelineleftstoree2,"timelineleftstoree2")
                            var timestop = timelineleftstoree2.pop();
                            //console.log(spanleft+halfwid,"spanleft",spantotal,"spantotal",halfwid,"halfwid",halfem,"halfem",timelineleft,"timelineleft",timelineleftstoree2,"timelineleftstoree2")
                            if(spanleft > timestop){
                                console.log("if")	
                                var padLeft = parseInt($(this).find("em div#ph1").css("padding-left"),10);
                                padLeft = padLeft - 4; 
                                //console.log(padLeft,"padLeftif")
                                $(this).find("div#ph1").css("padding-left",padLeft+"px");
                                timelineleftstoree2.push(timestop);
                                //timelineleftstoree2.push(parseInt($(this).css("left"),10));
                            }else{
                            	var padLeft = parseInt($(this).find("em div#ph1").css("padding-left"),10);
                                    padLeft = padLeft + 3; 
                                    $(this).find("div#ph1").css("padding-left",padLeft+"px"); 
                                    timelineleftstoree2.push(parseInt($(this).css("left"),10));
                            }
                        }else{
                        	console.log("else");
                            $(this).find("div#ph1").css("padding-left",0+"px");
                            timelineleftstoree2 = [];
                            //timelineleftstoree2.splice(i,1)
                        }
                        //console.log(temparrr,"temparrr")
                        }else{
                        	// right side
                            if((timelineleft+1000) < spantotal){
                                
                                $(this).find("em div#ph1").css({'position':'relative'});
								var timelightwidth = timelineleft+1000;
                                var emwidth = $(this).find("em").width();
                                var ph1width = $(this).find("em div#ph1").width();
                                var totalwidth = emwidth - ph1width;
                                var halfwid = totalwidth/2;
                                var timelineenter = spantotal - halfwid - 10;
                                
                                if(timelightwidth < timelineenter){
                                    //console.log(timelightwidth,timelineleftstore1[i],"else")
                                    //console.log(spanleft,"spanleft",timelineleftstoree2,"timelineleftstoree2")
                            		var timestop = timelineleftstoree2.pop();
                            		console.log(spanleft,"spanleft",timestop,"timelineleftstoree2")
                            	if(spanleft < timestop){
                            		console.log("if");
                                    var padLeft = parseInt($(this).find("em div#ph1").css("right"),10);
                                    padLeft = padLeft - 3; 
                                    //console.log(padLeft,"padLeftif")
                                    $(this).find("div#ph1").css({'position':'relative','right':padLeft+"px"}); 
                                    timelineleftstoree2.push(timestop);
                                }else{
                                		//console.log("padelse");
                                        var padLeft = parseInt($(this).find("em div#ph1").css("right"),10);
                                        padLeft = padLeft + 2; 
                                        $(this).find("div#ph1").css({'position':'relative','right':padLeft+"px"});
                                        timelineleftstoree2.push(parseInt($(this).css("left"),10)); 
                                }
                            }else{
                                    $(this).find("div#ph1").css("right",0+"px");
                                    timelineleftstoree2 = [];
                                }
                                    }
                                
                        }
                },
		stop: function(event,ui) {
			//var r = confirm("Are you sure you want to move task ?");
			var t = $(this);
			if($(this).position().top <= 0){
				$(this).css("top","40")	
			}
			
			//console.log(prevt12left,moveleftt12pos,"moveleftt10pos")
                      if(prevt12left != moveleftt12pos){
                                //var r = confirm("Are you sure you want to move task ?");
                                var r = ' ';
                                var asd = true;
                        }else{
                                var asd = false;
                        }
			//if(r){
			//console.log("move",asd)
			if(r || !asd){
                        var task_id = $(this).attr("data-id");	
                        var phase_id = $(this).attr("phase-id");
                        var proj_id = $(this).attr("proj-id");
                        //var ph_id = $(this).attr("ph-id");
                        //console.log(row_no,"row_no")
                        /* INCREASE TIMELINE HEIGHT IF DRAGGED TO BOTTOM ROW */
			var h = $('#tl2').height()-80;
			var p = ui.position.top;
			if ( p > h ) {
				$('#tl2').animate({'height':p + 80},200);
			}
			
			/* GET CURRENT MONTH VALUE */
			/* GET CURRENT MONTH VALUE */
			var tmo = t.attr('data-mo');
			/* SET LENGTH IN DAYS OF MONTHS */
			if ( tmo == 'Jan' ) { var month = 1 }
			else if ( tmo == 'Feb' ) { var month = 31 }
			else if ( tmo == 'Mar' ) { var month = 59 }
			else if ( tmo == 'Apr' ) { var month = 90 }
			else if ( tmo == 'May' ) { var month = 120 }
			else if ( tmo == 'Jun' ) { var month = 151 }
			else if ( tmo == 'Jul' ) { var month = 181 }
			else if ( tmo == 'Aug' ) { var month = 212 }
			else if ( tmo == 'Sep' ) { var month = 243 }
			else if ( tmo == 'Oct' ) { var month = 273 }
			else if ( tmo == 'Nov' ) { var month = 304 }
			else if ( tmo == 'Dec' ) { var month = 334 }
			

			/* GET CURRENT LEFT POSITION */
			var phaseperiod = $(".current-phase").find(".kies").text();
			if(phaseperiod == "Week"){
				//console.log(parseInt(t.css('left'),10),"zoom",Math.floor(parseInt(t.css('left'),10) / zoom + 1)/2)
				var weekcal = parseInt(t.css('left'),10)/70;
				var tpos = weekcal + 1;
			}else{
				var tpos = parseInt(t.css('left'),10) / zoom + 1;	
			}

			//console.log(tpos,"tpostask")
			/* SUBTRACT CURRENT MONTH FROM LEFT POSITION */
			var day = tpos;
			//console.log(tpos,day,month) // 93,34,59
			var mnth ="";
			if(tpos >= 1 && tpos <= 31){
				mnth = "Jan";
			}else if(tpos >= 32 && tpos <= 59){
				day = (tpos-32)+1;
				mnth = "Feb";
			}else if(tpos >= 60 && tpos <= 90){
				day = (tpos-60)+1;	
				mnth = "Mar";
			}else if(tpos >= 91 && tpos <= 120){
				day = (tpos-91)+1;
				mnth = "Apr";
			}else if(tpos >= 121 && tpos <= 151){
				day = (tpos-121)+1;
				mnth = "May";
			}
			else if(tpos >= 152 && tpos <= 181){
				day = (tpos-152)+1;
				mnth = "Jun";
			}
			else if(tpos >= 182 && tpos <= 212){
				day = (tpos-182)+1;
				mnth = "Jul";
			}
			else if(tpos >= 213 && tpos <= 243){
				day = (tpos-213)+1;
				mnth = "Aug";
			}
			else if(tpos >= 244 && tpos <= 273){
				day = (tpos-244)+1;
				mnth = "Sep";
			}
			else if(tpos >= 274 && tpos <= 304){
				day = (tpos-274)+1;
				mnth = "Oct";
			}
			else if(tpos >= 305 && tpos <= 334){
				day = (tpos-305)+1;
				mnth = "Nov";
			}
			else if(tpos >= 335 && tpos <= 365){
				day = (tpos-335)+1;
				mnth = "Dec";
			}
			//console.log(mnth,tpos,month,day)
			 var prevrow = t.attr('data-row')         
                         /* SET NEW DAY VALUE */
                        day = Math.ceil(day);
                        t.attr('data-day',day);
                        /* GET CURRENT VERTICAL POSITION */
			var row = parseInt(t.css('top'),10) / 40;
			if(row <= 0){
				row = 1;
			}

            /* SET NEW Month VALUE */
			t.attr('data-mo',mnth);
			/* SET NEW ROW VALUE */
			t.attr('data-row',row);
			/* REFRESH TIMELINE HEIGHT */
			

			// overlapping functionality
			var movedatid = t.attr('data-id');
			var datarow = t.attr('data-row');
			var currentleft = $(this).css("left").split("px");
			var currentwidth = $(this).css("width").split("px");

			var currenttotal = parseInt(currentleft[0]) + parseInt(currentwidth[0]);
			var currentleftpos = parseInt(currentleft[0]);
			//console.log(currentleftpos,currenttotal,datarow,"currenttotal",prevt12top,prevrow)
			
			// overlapping concept
			 setTimeout(function(){
                        	var spanarr = $(document).find('#tl2 .tasks span[data-row='+datarow+']');
                        	//console.log(spanarr,"spanarr")
                        	for (var i = 0; i < spanarr.length; i++) {
                                    var totalwidth = parseInt($(spanarr[i]).css("left"))+parseInt($(spanarr[i]).css("width"));
                                    var pos1 = parseInt($(spanarr[i]).css("left"));
                                    //console.log("pos1",pos1,"totalwidth",totalwidth)
                                    //console.log(currenttotal,totalwidth,"totalwidth")

                                    if((currenttotal != totalwidth)){
                                    	if((currenttotal > pos1) && (currentleftpos < totalwidth)){
                                                    datarow =parseInt(prevrow);
                                                    //console.log(datarow,"datarow")
                                                    $(spanarr[i]).attr("data-row",datarow)
                                                    var topsize =parseInt($(spanarr[i]).css("top"));

                                                   

                                                    $(spanarr[i]).animate({"top":prevt12top},"slow");
                                                    var projid= $(spanarr[i]).attr("data-id")
                                                    var rowid= $(spanarr[i]).attr("data-row")

                                                   
                                                    overlap_project(projid,rowid,'ta');

                                                     setTimeout(function(){
                                                    	overlapmovetask(datarow,"right");
                                                    },800)	
                                                    //console.log(projid,'projid')
                                                    //console.log(rowid,'rowid ')
                                                    tlheight(500,'tl2');
                                            }
                                    }else if(currenttotal == totalwidth){
                                            var currdataid = $(spanarr[i]).attr("data-id");
                                            if(movedatid != currdataid){
                                                    datarow =parseInt(prevrow);
                                                    //console.log(datarow,"datarow1")
                                                    $(spanarr[i]).attr("data-row",datarow);

                                                    $(spanarr[i]).animate({"top":prevt12top},"slow");
                                                    var projid= $(spanarr[i]).attr("data-id")
                                                    var rowid= $(spanarr[i]).attr("data-row")
                                                   
                                                    //console.log(projid,'projid')
                                                    //console.log(rowid,'rowid ')
                                                    overlap_project(projid,rowid,'ta');
                                                     setTimeout(function(){
                                                    	overlapmovetask(datarow,"right");
                                                    },800)
                                                    //tlheight(500,'tl2');
                                            }

                                    }
                        	}	
                        
                },800)

			/* REFRESH TIMELINE HEIGHT */
			setTimeout(function(){
				tlheight(1000,'tl2');
			},5000);

			var row_no = $(this).attr("data-row");
                        
                        /* Move Task from timeline */
                        var img_url = $('#img_url').val();
                        $('.overly_loader').css('display','block');
                        $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
                        var user_id = get_userid();
                        var admin_url = get_ajaxurl();
                        $.ajax({
                            type : "POST",
                            url : admin_url,
                            dataType: 'json',
                            data: {
                                action:'move_task', 
                                id:user_id,
                                p_id:proj_id,
                                phase_id:phase_id,
                                task_id:task_id,
                                s_day:day,
                                s_month:mnth,
                                row_no:row_no
                            },
                            success: function( data ) {
                                console.log(data, 'data-move-task');
                                if(data.status){
                                    $('.overly_loader').css('display','none');
                                }
                                else{
                                    if(asd){
                                        display_task_grid(task_id);
                                        var art_id = $("#artist_list").val();
                                        //display_project_data(art_id);
                                        display_project_list(art_id);
                                        display_phase_grid(proj_id);
                                        display_phase_task_list(proj_id);
                                        var monthperiod = $(".header #search-product").nextAll(".kies").text();
                                        setTimeout(function(){
                                            var monthperiod = $(".header #search-product").nextAll(".kies").text();
                                            if(monthperiod == "Quarter"){
                                                tlwidth(10,"tl23")
                                            }else if(monthperiod == "Year"){
                                                tlwidth(3,"tl23")
                                                $("#tl23[data-zoom=3] .grid i.month").each(function(ind,val){
                                                    var monthvalue = $(val).find("em").text();
                                                    //console.log(monthvalue)
                                                    if(monthvalue == "January" || monthvalue == "March" || monthvalue == "May" || monthvalue == "July" || monthvalue == "September" || monthvalue == "November" 
                                                        || monthvalue == "Jan" || monthvalue == "Mar" || monthvalue == "May" || monthvalue == "Jul" || monthvalue == "Sep" || monthvalue == "Nov"){
                                                        $(val).nextAll().css("background","rgba(0,0,0,0.1)")
                                                    }else{
                                                        $(val).nextAll().css("background","rgba(153,153,153,0.1)")
                                                    }
                                                    var text = monthvalue.replace(monthvalue,monthvalue.substring(0,3))
                                                    //console.log(text)
                                                    $(val).find("em").text(text)
                                                })
                                            }else{
                                                    tlwidth(30,"tl23")
                                            }
                                        $('.overly_loader').css('display','none');    
                                        },2000)	
                                    }
                                    else{
                                      $('.overly_loader').css('display','none');  
                                    }
                                }
                            }
                        });
                        
                       
			}else{
				$(this).css({top: currposelem.top, left: currposelem.left, position:'absolute'});
			}
		}
	});
	var dayt123 ="";
    var montht123 ="";
    var temparrr = [];
	var timelineleftstoree23=[];
	$('#tl23 .tasks span').draggable({
		addClasses: false,
		/* SNAP HORIZONTALLY TO DAYS (30PX WIDE) AND VERTICALLY TO ROWS (40PX TALL) */
		grid: [zoom, 40],
		containment: [-3000, 40, 3000, 1000 ],
		start: function() {
			/* START SHOWING TASK SHADOW */
		var monthperiod = $(".header #search-product").nextAll(".kies").text();
        //console.log(monthperiod,"monthperiod")  
            /* GET CURRENT LEFT POSITION */
            if(monthperiod == "Year"){
                $(this).find("em sup").addClass('tooltip');
            }
			
		},
		drag: function(){

					//var todayposition = $(this).parent().next().find(".today").position().left;

					moveleftpos = $(this).position().left;
					// console.log($(this).parent().next().find(".today").position().left,"drag",moveleftpos)
					// if(moveleftpos >= todayposition && moveleftpos < todayposition + parseInt(30)){
					// 	console.log("test123")
					// 	zoom = 30;
					// }
                    var offset = $(this).offset();
                    var xPos = offset.left;
                    var yPos = offset.top;
                    var tp = $(this);
                    var tpos = parseInt(tp.css('left'),10) / zoom +1;
                   	//console.log(moveleftpos,"prevleft",tpos,"xpos")
					var pos = Math.floor(tpos);
                   	
                   	var monthperiod = $(".header #search-product").nextAll(".kies").text();

                   	// timeline design
                   	// timeline design
                    var timelineleft = parseInt($(this).parents(".ui-draggable-handle").css("left"),10);
                    timelineleft = Number(timelineleft.toString().replace(/\-/g,''));
                    //console.log(timelineleft,"timelineleft");

                    	var spanwidth = parseInt($(this).css("width"),10);
                        var spanleft = parseInt($(this).css("left"),10);
                        var spantotal = spanwidth + spanleft;
                        //console.log(spanleft,timelineleft,"here")
                        
                        if(spanleft < timelineleft){
                            //console.log("leftside");
                        //var spanwidthcalc = ((timelineleft-spanleft) - ($(this).width() +20));
                        var emwidth = $(this).find("em").width();
                        var ph1width = $(this).find("em div#ph1").width();
                        var totalwidth = emwidth - ph1width;
                        var halfwid = totalwidth/2;
                        var halfem = spanleft + halfwid+10;
                        //var padLeft = parseInt($(this).css('padding-left'),10);
                                        
                        if(halfem < timelineleft){  
                            
                            console.log(spanleft,"spanleft",timelineleftstoree23,"timelineleftstoree23")
                            var timestop = timelineleftstoree23.pop();
                            //console.log(spanleft+halfwid,"spanleft",spantotal,"spantotal",halfwid,"halfwid",halfem,"halfem",timelineleft,"timelineleft",timelineleftstoree23,"timelineleftstoree23")
                            if(spanleft > timestop){
                                console.log("if")	
                                var padLeft = parseInt($(this).find("em div#ph1").css("padding-left"),10);
                                padLeft = padLeft - 4; 
                                //console.log(padLeft,"padLeftif")
                                $(this).find("div#ph1").css("padding-left",padLeft+"px");
                                timelineleftstoree23.push(timestop);
                                //timelineleftstoree23.push(parseInt($(this).css("left"),10));
                            }else{
                            	var padLeft = parseInt($(this).find("em div#ph1").css("padding-left"),10);
                                    padLeft = padLeft + 3; 
                                    $(this).find("div#ph1").css("padding-left",padLeft+"px"); 
                                    timelineleftstoree23.push(parseInt($(this).css("left"),10));
                            }
                        }else{
                        	//console.log("else");
                            $(this).find("div#ph1").css("padding-left",0+"px");
                            timelineleftstoree23 = [];
                            //timelineleftstoree23.splice(i,1)
                        }
                        //console.log(temparrr,"temparrr")
                        }else{
                        	// right side
                            if((timelineleft+1000) < spantotal){
                                
                                $(this).find("em div#ph1").css({'position':'relative'});
								var timelightwidth = timelineleft+1000;
                                var emwidth = $(this).find("em").width();
                                var ph1width = $(this).find("em div#ph1").width();
                                var totalwidth = emwidth - ph1width;
                                var halfwid = totalwidth/2;
                                var timelineenter = spantotal - halfwid - 10;
                                
                                if(timelightwidth < timelineenter){
                                    //console.log(timelightwidth,timelineleftstore1[i],"else")
                                    //console.log(spanleft,"spanleft",timelineleftstoree23,"timelineleftstoree23")
                            		var timestop = timelineleftstoree23.pop();
                            		console.log(spanleft,"spanleft",timestop,"timelineleftstoree23")
                            	if(spanleft < timestop){
                            		console.log("if");
                                    var padLeft = parseInt($(this).find("em div#ph1").css("right"),10);
                                    padLeft = padLeft - 3; 
                                    //console.log(padLeft,"padLeftif")
                                    $(this).find("div#ph1").css({'position':'relative','right':padLeft+"px"}); 
                                    timelineleftstoree23.push(timestop);
                                }else{
                                		//console.log("padelse");
                                        var padLeft = parseInt($(this).find("em div#ph1").css("right"),10);
                                        padLeft = padLeft + 2; 
                                        $(this).find("div#ph1").css({'position':'relative','right':padLeft+"px"});
                                        timelineleftstoree23.push(parseInt($(this).css("left"),10)); 
                                }
                            }else{
                                    $(this).find("div#ph1").css("right",0+"px");
                                    timelineleftstoree23 = [];
                                }
                                    }
                                
                        }
        			//console.log(monthperiod,"monthperiod")  
            /* GET CURRENT LEFT POSITION */
            if(monthperiod == "Year"){
            if(pos >= 1 && pos <= 31){
                        dayt123 = pos;
						montht123 = "Jan";
			}else if(pos >= 32 && pos <= 59){
				dayt123 = (pos-32)+1;
				montht123 = "Feb";
			}else if(pos >= 60 && pos <= 90){
				dayt123 = (pos-60)+1;	
				montht123 = "Mar";
			}else if(pos >= 91 && pos <= 120){
				dayt123 = (pos-91)+1;
				montht123 = "Apr";
			}else if(pos >= 121 && pos <= 151){
				dayt123 = (pos-121)+1;
				montht123 = "May";
					if ( dayt123 == 2 || dayt123 == 9 || dayt123 == 16 || dayt123 == 23 || dayt123 == 30) { var day = 'TUE' }
                    else if ( dayt123 == 3 || dayt123 == 10 || dayt123 == 17 || dayt123 == 24 || dayt123 == 31) { var day = 'WED' }
                    else if ( dayt123 == 4 || dayt123 == 11 || dayt123 == 18 || dayt123 == 25 ) { var day = 'THU' }
                    else if ( dayt123 == 5 || dayt123 == 12 || dayt123 == 19 || dayt123 == 26 ) { var day = 'FRI' }
                    else if ( dayt123 == 6 || dayt123 == 13 || dayt123 == 20 || dayt123 == 27 ) { var day = 'SAT' }
                    else if ( dayt123 == 7 || dayt123 == 14 || dayt123 == 21 || dayt123 == 28 ) { var day = 'SUN' }
                    else if ( dayt123 == 8 || dayt123 == 15 || dayt123 == 22 || dayt123 == 29 || dayt123 == 1 ) { var day = 'MON' }
			}
			else if(pos >= 152 && pos <= 181){
				dayt123 = (pos-152)+1;
				montht123 = "Jun";
					if ( dayt123 == 2 || dayt123 == 9 || dayt123 == 16 || dayt123 == 23 || dayt123 == 30) { var day = 'FRI' }
                    else if ( dayt123 == 3 || dayt123 == 10 || dayt123 == 17 || dayt123 == 24 || dayt123 == 31) { var day = 'SAT' }
                    else if ( dayt123 == 4 || dayt123 == 11 || dayt123 == 18 || dayt123 == 25 ) { var day = 'SUN' }
                    else if ( dayt123 == 5 || dayt123 == 12 || dayt123 == 19 || dayt123 == 26 ) { var day = 'MON' }
                    else if ( dayt123 == 6 || dayt123 == 13 || dayt123 == 20 || dayt123 == 27 ) { var day = 'TUE' }
                    else if ( dayt123 == 7 || dayt123 == 14 || dayt123 == 21 || dayt123 == 28 ) { var day = 'WED' }
                    else if ( dayt123 == 8 || dayt123 == 15 || dayt123 == 22 || dayt123 == 29 || dayt123 == 1 ) { var day = 'THU' }
			}
			else if(pos >= 182 && pos <= 212){
				dayt123 = (pos-182)+1;
				montht123 = "Jul";
			}
			else if(pos >= 213 && pos <= 243){
				dayt123 = (pos-213)+1;
				montht123 = "Aug";
				if ( dayt123 == 2 || dayt123 == 9 || dayt123 == 16 || dayt123 == 23 || dayt123 == 30) { var day = 'WED' }
                    else if ( dayt123 == 3 || dayt123 == 10 || dayt123 == 17 || dayt123 == 24 || dayt123 == 31) { var day = 'THU' }
                    else if ( dayt123 == 4 || dayt123 == 11 || dayt123 == 18 || dayt123 == 25 ) { var day = 'FRI' }
                    else if ( dayt123 == 5 || dayt123 == 12 || dayt123 == 19 || dayt123 == 26 ) { var day = 'SAT' }
                    else if ( dayt123 == 6 || dayt123 == 13 || dayt123 == 20 || dayt123 == 27 ) { var day = 'SUN' }
                    else if ( dayt123 == 7 || dayt123 == 14 || dayt123 == 21 || dayt123 == 28 ) { var day = 'MON' }
                    else if ( dayt123 == 8 || dayt123 == 15 || dayt123 == 22 || dayt123 == 29 || dayt123 == 1 ) { var day = 'TUE' }
			}
			else if(pos >= 244 && pos <= 273){
				dayt123 = (pos-244)+1;
				montht123 = "Sep";
				
			}
			else if(pos >= 274 && pos <= 304){
				dayt123 = (pos-274)+1;
				montht123 = "Oct";
				// oct,jan
			}
			else if(pos >= 305 && pos <= 334){
				dayt123 = (pos-305)+1;
				montht123 = "Nov";
				// mar,nov
			}
			else if(pos >= 335 && pos <= 365){
				dayt123 = (pos-335)+1;
				montht123 = "Dec";
			}
				
		if(montht123 == "Dec" || montht123 == "Sep"){
			if ( dayt123 == 2 || dayt123 == 9 || dayt123 == 16 || dayt123 == 23 || dayt123 == 30) { var day = 'SAT' }
                    else if ( dayt123 == 3 || dayt123 == 10 || dayt123 == 17 || dayt123 == 24 || dayt123 == 31) { var day = 'SUN' }
                    else if ( dayt123 == 4 || dayt123 == 11 || dayt123 == 18 || dayt123 == 25 ) { var day = 'MON' }
                    else if ( dayt123 == 5 || dayt123 == 12 || dayt123 == 19 || dayt123 == 26 ) { var day = 'TUE' }
                    else if ( dayt123 == 6 || dayt123 == 13 || dayt123 == 20 || dayt123 == 27 ) { var day = 'WED' }
                    else if ( dayt123 == 7 || dayt123 == 14 || dayt123 == 21 || dayt123 == 28 ) { var day = 'THU' }
                    else if ( dayt123 == 8 || dayt123 == 15 || dayt123 == 22 || dayt123 == 29 || dayt123 == 1 ) { var day = 'FRI' }
		}else if(montht123 == "Mar" || montht123 == "Nov" || montht123 == "Feb"){
			if ( dayt123 == 2 || dayt123 == 9 || dayt123 == 16 || dayt123 == 23 || dayt123 == 30) { var day = 'THU' }
                    else if ( dayt123 == 3 || dayt123 == 10 || dayt123 == 17 || dayt123 == 24 || dayt123 == 31) { var day = 'FRI' }
                    else if ( dayt123 == 4 || dayt123 == 11 || dayt123 == 18 || dayt123 == 25 ) { var day = 'SAT' }
                    else if ( dayt123 == 5 || dayt123 == 12 || dayt123 == 19 || dayt123 == 26 ) { var day = 'SUN' }
                    else if ( dayt123 == 6 || dayt123 == 13 || dayt123 == 20 || dayt123 == 27 ) { var day = 'MON' }
                    else if ( dayt123 == 7 || dayt123 == 14 || dayt123 == 21 || dayt123 == 28 ) { var day = 'TUE' }
                    else if ( dayt123 == 8 || dayt123 == 15 || dayt123 == 22 || dayt123 == 29 || dayt123 == 1 ) { var day = 'WED' }
		}else if(montht123 == "Oct" || montht123 == "Jan"){
			if ( dayt123 == 2 || dayt123 == 9 || dayt123 == 16 || dayt123 == 23 || dayt123 == 30) { var day = 'MON' }
                    else if ( dayt123 == 3 || dayt123 == 10 || dayt123 == 17 || dayt123 == 24 || dayt123 == 31) { var day = 'TUE' }
                    else if ( dayt123 == 4 || dayt123 == 11 || dayt123 == 18 || dayt123 == 25 ) { var day = 'WED' }
                    else if ( dayt123 == 5 || dayt123 == 12 || dayt123 == 19 || dayt123 == 26 ) { var day = 'THU' }
                    else if ( dayt123 == 6 || dayt123 == 13 || dayt123 == 20 || dayt123 == 27 ) { var day = 'FRI' }
                    else if ( dayt123 == 7 || dayt123 == 14 || dayt123 == 21 || dayt123 == 28 ) { var day = 'SAT' }
                    else if ( dayt123 == 8 || dayt123 == 15 || dayt123 == 22 || dayt123 == 29 || dayt123 == 1 ) { var day = 'SUN' }
		}else if(montht123 == "Jul" || montht123 == "Apr"){
			if ( dayt123 == 2 || dayt123 == 9 || dayt123 == 16 || dayt123 == 23 || dayt123 == 30) { var day = 'SUN' }
                    else if ( dayt123 == 3 || dayt123 == 10 || dayt123 == 17 || dayt123 == 24 || dayt123 == 31) { var day = 'MON' }
                    else if ( dayt123 == 4 || dayt123 == 11 || dayt123 == 18 || dayt123 == 25 ) { var day = 'TUE' }
                    else if ( dayt123 == 5 || dayt123 == 12 || dayt123 == 19 || dayt123 == 26 ) { var day = 'WED' }
                    else if ( dayt123 == 6 || dayt123 == 13 || dayt123 == 20 || dayt123 == 27 ) { var day = 'THU' }
                    else if ( dayt123 == 7 || dayt123 == 14 || dayt123 == 21 || dayt123 == 28 ) { var day = 'FRI' }
                    else if ( dayt123 == 8 || dayt123 == 15 || dayt123 == 22 || dayt123 == 29 || dayt123 == 1 ) { var day = 'SAT' }
		}
				tp.find('em sup').css({'display':'block'});
                tp.find('em sup').text(day+' '+dayt123);
                   //console.log(day,"Daymonth",dayt123) 
                    }
            
                },
		stop: function(event,ui) {
			//console.log("stop")
			var t = $(this);
			var monthperiod = $(".header #search-product").nextAll(".kies").text();
        	if(monthperiod == "Year"){
            	t.find('em sup').css({'display':'none'});
            }
			//

			//if(prevleft != leftpos.left){}
			//var r = confirm("Are you sure you want to move project ?");
				
			//if(r){
				if(prevleft != moveleftpos){
					var r = confirm("Are you sure you want to move project ?");
					var asd = true;
				}else{
					var asd = false;
				}
				if(r || !asd){
			//console.log(this,"move");
                        var proj_id = $(this).attr("data-id");
                       
                        //console.log(proj_id,'proj_id');
			/* INCREASE TIMELINE HEIGHT IF DRAGGED TO BOTTOM ROW */
			var h = $('#tl23').height()-80;
			var p = ui.position.top;
			//console.log(p,h)
			if ( p > h ) {
				$('#tl23').animate({'height':p + 80},200);
			}
			
			/* GET CURRENT MONTH VALUE */
			var tmo = t.attr('data-mo');
                       // console.log(tmo);
                                                
			/* SET LENGTH IN DAYS OF MONTHS */
			if ( tmo == 'Jan' ) { var month = 1 }
			else if ( tmo == 'Feb' ) { var month = 31 }
			else if ( tmo == 'Mar' ) { var month = 59 }
			else if ( tmo == 'Apr' ) { var month = 90 }
			else if ( tmo == 'May' ) { var month = 120 }
			else if ( tmo == 'Jun' ) { var month = 151 }
			else if ( tmo == 'Jul' ) { var month = 181 }
			else if ( tmo == 'Aug' ) { var month = 212 }
			else if ( tmo == 'Sep' ) { var month = 243 }
			else if ( tmo == 'Oct' ) { var month = 273 }
			else if ( tmo == 'Nov' ) { var month = 304 }
			else if ( tmo == 'Dec' ) { var month = 334 }
				
			var monthperiod = $(".header #search-product").next(".kies").text();	
			/* GET CURRENT LEFT POSITION */
			//console.log(monthperiod)
			if(monthperiod == "Quarter"){
				zoom = 10;
				var tpos = parseInt(t.css('left'),10) / zoom + 1;	
			}else if(monthperiod == "Year"){
				zoom = 3;
				var tpos = parseInt(t.css('left'),10) / zoom + 1;	
			}else{
				var tpos = parseInt(t.css('left'),10) / zoom + 1;	
			}
			
			//console.log(tpos,"tpos",zoom)
			/* SUBTRACT CURRENT MONTH FROM LEFT POSITION */
			var day = tpos;
			//console.log(tpos,day,month) // 93,34,59
			var mnth ="";
			if(tpos >= 1 && tpos <= 31){
				mnth = "Jan";
			}else if(tpos >= 32 && tpos <= 59){
				day = (tpos-32)+1;
				mnth = "Feb";
			}else if(tpos >= 60 && tpos <= 90){
				day = (tpos-60)+1;	
				mnth = "Mar";
			}else if(tpos >= 91 && tpos <= 120){
				day = (tpos-91)+1;
				mnth = "Apr";
			}else if(tpos >= 121 && tpos <= 151){
				day = (tpos-121)+1;
				mnth = "May";
			}
			else if(tpos >= 152 && tpos <= 181){
				day = (tpos-152)+1;
				mnth = "Jun";
			}
			else if(tpos >= 182 && tpos <= 212){
				day = (tpos-182)+1;
				mnth = "Jul";
			}
			else if(tpos >= 213 && tpos <= 243){
				day = (tpos-213)+1;
				mnth = "Aug";
			}
			else if(tpos >= 244 && tpos <= 273){
				day = (tpos-244)+1;
				mnth = "Sep";
			}
			else if(tpos >= 274 && tpos <= 304){
				day = (tpos-274)+1;
				mnth = "Oct";
			}
			else if(tpos >= 305 && tpos <= 334){
				day = (tpos-305)+1;
				mnth = "Nov";
			}
			else if(tpos >= 335 && tpos <= 365){
				day = (tpos-335)+1;
				mnth = "Dec";
			}
			//console.log(mnth,tpos,month,day)
			var prevrow = t.attr('data-row')
			
			/* SET NEW DAY VALUE */
                        //console.log(t.attr('data-day'),"t1")
                         day = Math.ceil(day);
                        t.attr('data-day',day);
                         //console.log(t.attr('data-day'),"t2")
			/* GET CURRENT VERTICAL POSITION */
			var row = parseInt(t.css('top'),10) / 40;

			/* SET NEW Month VALUE */
			t.attr('data-mo',mnth);
			/* SET NEW ROW VALUE */
			t.attr('data-row',row);
			var movedatid = t.attr('data-id');
			var datarow = t.attr('data-row');

			var currentleft = $(this).css("left").split("px");
			var currentwidth = $(this).css("width").split("px");
			var currenttotal = parseInt(currentleft[0]) + parseInt(currentwidth[0]);
			var currentleftpos = parseInt(currentleft[0]);
			//console.log(currentleftpos,currenttotal,datarow,"currenttotal",prevtop,prevrow)
			
                        // overlapping concept
			 setTimeout(function(){
                        	var spanarr = $(document).find('#tl23 .tasks span[data-row='+datarow+']');
                        	
                        	for (var i = 0; i < spanarr.length; i++) {
                                    var totalwidth = parseInt($(spanarr[i]).css("left"))+parseInt($(spanarr[i]).css("width"));
                                    var pos1 = parseInt($(spanarr[i]).css("left"));
                                    //console.log("pos1",pos1,"totalwidth",totalwidth)
                                    //console.log(currenttotal,totalwidth,"totalwidth")
                                    if((currenttotal != totalwidth)){
                                            if((currenttotal > pos1) && (currentleftpos < totalwidth)){
                                                    datarow =parseInt(prevrow);
                                                    $(spanarr[i]).attr("data-row",datarow)
                                                    var topsize =parseInt($(spanarr[i]).css("top"));
                                                    $(spanarr[i]).animate({"top":prevtop},"slow");
                                                    var projid= $(spanarr[i]).attr("data-id")
                                                    var rowid= $(spanarr[i]).attr("data-row")
                                                    overlap_project(projid,rowid,'pr');
                                                    //console.log(projid,'projid')
                                                    //console.log(rowid,'rowid ')
                                                    tlheight(500,'tl23');
                                            }
                                    }else if(currenttotal == totalwidth){
                                            var currdataid = $(spanarr[i]).attr("data-id");
                                            if(movedatid != currdataid){
                                                    datarow =parseInt(prevrow);
                                                    $(spanarr[i]).attr("data-row",datarow)
                                                    $(spanarr[i]).animate({"top":prevtop},"slow");
                                                    var projid= $(spanarr[i]).attr("data-id")
                                                    var rowid= $(spanarr[i]).attr("data-row")
                                                    //console.log(projid,'projid')
                                                    //console.log(rowid,'rowid ')
                                                    overlap_project(projid,rowid,'pr');
                                                    tlheight(500,'tl23');
                                            }

                                    }
                        	}	
                        
                },800)

			/* REFRESH TIMELINE HEIGHT */
			setTimeout(function(){
				tlheight(1000,'tl23');
			},5000);

			// move row
			var row_no = $(this).attr("data-row");
			
			/* Move Project from timeline */
                        var img_url = $('#img_url').val();
                        $('.overly_loader').css('display','block');
                        $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
                        
                        var user_id = get_userid();
                        var admin_url = get_ajaxurl();
                        $.ajax({
                            type : "POST",
                            url : admin_url,
                            dataType: 'json',
                            data: {
                                action:'move_project', 
                                id:user_id,
                                p_id:proj_id,
                                s_day:day,
                                s_month:mnth,
                                row_no:row_no
                            },
                            success: function( data ) {
                                //console.log(data);
                                if(data.status){
                                    $('.overly_loader').css('display','none');
                                }
                                else{
                                    display_phase_task_list(proj_id);
                                    $('.overly_loader').css('display','none');
                                }
                            }
                        });
			}else{
				$(this).css({top: currposelem.top, left: currposelem.left, position:'absolute'});
			}

		}
	});

        var dayt12 ="";
        var montht12 ="";
        var dayt12right ="";
        var montht12right ="";
        var handlebar = "";
	$('#tl2 .tasks i').draggable({
		addClasses: false,
		axis: 'x',
		grid: [zoom, 40],
		start: function() {
			/* START SHOWING TASK SHADOW */
			$(this).parent().addClass('tasksdrag');
			/* MAKE CURRENT DRAG CIRCLE BLUE */
			$(this).addClass('dragblue');
		},
		/* SHOW CURRENT DRAG DATE = UNCOMPLETED */
		drag: function() {
			//console.log("drag")
			var t = $(this);

                    var tp = t.parent();
                    var tpos = parseInt(tp.css('left'),10) / zoom +1;
                    var newpos = parseInt(t.css('left'),10) / zoom;
                    var newposright = Math.floor(tpos+newpos);
                    
                    if(t.attr("data-cust") == "left"){
                    	handlebar = "left";
                    //Left handle
                    var pos = Math.floor(tpos+newpos);
                   	// console.log("left",tpos,"---",pos,"here")
                   	var leftdays = parseInt(tp.attr("data-days")) + parseInt(tpos);
                   	// console.log(leftdays,"leftdays",pos)
        if(pos <= leftdays){
        	//console.log("test1")
            if(pos >= 1 && pos <= 31){
                        dayt12 = pos;
						montht12 = "Jan";
			}else if(pos >= 32 && pos <= 59){
				dayt12 = (pos-32)+1;
				montht12 = "Feb";
			}else if(pos >= 60 && pos <= 90){
				dayt12 = (pos-60)+1;	
				montht12 = "Mar";
			}else if(pos >= 91 && pos <= 120){
				dayt12 = (pos-91)+1;
				montht12 = "Apr";
			}else if(pos >= 121 && pos <= 151){
				dayt12 = (pos-121)+1;
				montht12 = "May";
					if ( dayt12 == 2 || dayt12 == 9 || dayt12 == 16 || dayt12 == 23 || dayt12 == 30) { var day = 'TUE' }
                    else if ( dayt12 == 3 || dayt12 == 10 || dayt12 == 17 || dayt12 == 24 || dayt12 == 31) { var day = 'WED' }
                    else if ( dayt12 == 4 || dayt12 == 11 || dayt12 == 18 || dayt12 == 25 ) { var day = 'THU' }
                    else if ( dayt12 == 5 || dayt12 == 12 || dayt12 == 19 || dayt12 == 26 ) { var day = 'FRI' }
                    else if ( dayt12 == 6 || dayt12 == 13 || dayt12 == 20 || dayt12 == 27 ) { var day = 'SAT' }
                    else if ( dayt12 == 7 || dayt12 == 14 || dayt12 == 21 || dayt12 == 28 ) { var day = 'SUN' }
                    else if ( dayt12 == 8 || dayt12 == 15 || dayt12 == 22 || dayt12 == 29 || dayt12 == 1 ) { var day = 'MON' }
			}
			else if(pos >= 152 && pos <= 181){
				dayt12 = (pos-152)+1;
				montht12 = "Jun";
					if ( dayt12 == 2 || dayt12 == 9 || dayt12 == 16 || dayt12 == 23 || dayt12 == 30) { var day = 'FRI' }
                    else if ( dayt12 == 3 || dayt12 == 10 || dayt12 == 17 || dayt12 == 24 || dayt12 == 31) { var day = 'SAT' }
                    else if ( dayt12 == 4 || dayt12 == 11 || dayt12 == 18 || dayt12 == 25 ) { var day = 'SUN' }
                    else if ( dayt12 == 5 || dayt12 == 12 || dayt12 == 19 || dayt12 == 26 ) { var day = 'MON' }
                    else if ( dayt12 == 6 || dayt12 == 13 || dayt12 == 20 || dayt12 == 27 ) { var day = 'TUE' }
                    else if ( dayt12 == 7 || dayt12 == 14 || dayt12 == 21 || dayt12 == 28 ) { var day = 'WED' }
                    else if ( dayt12 == 8 || dayt12 == 15 || dayt12 == 22 || dayt12 == 29 || dayt12 == 1 ) { var day = 'THU' }
			}
			else if(pos >= 182 && pos <= 212){
				dayt12 = (pos-182)+1;
				montht12 = "Jul";
			}
			else if(pos >= 213 && pos <= 243){
				dayt12 = (pos-213)+1;
				montht12 = "Aug";
				if ( dayt12 == 2 || dayt12 == 9 || dayt12 == 16 || dayt12 == 23 || dayt12 == 30) { var day = 'WED' }
                    else if ( dayt12 == 3 || dayt12 == 10 || dayt12 == 17 || dayt12 == 24 || dayt12 == 31) { var day = 'THU' }
                    else if ( dayt12 == 4 || dayt12 == 11 || dayt12 == 18 || dayt12 == 25 ) { var day = 'FRI' }
                    else if ( dayt12 == 5 || dayt12 == 12 || dayt12 == 19 || dayt12 == 26 ) { var day = 'SAT' }
                    else if ( dayt12 == 6 || dayt12 == 13 || dayt12 == 20 || dayt12 == 27 ) { var day = 'SUN' }
                    else if ( dayt12 == 7 || dayt12 == 14 || dayt12 == 21 || dayt12 == 28 ) { var day = 'MON' }
                    else if ( dayt12 == 8 || dayt12 == 15 || dayt12 == 22 || dayt12 == 29 || dayt12 == 1 ) { var day = 'TUE' }
			}
			else if(pos >= 244 && pos <= 273){
				dayt12 = (pos-244)+1;
				montht12 = "Sep";
				
			}
			else if(pos >= 274 && pos <= 304){
				dayt12 = (pos-274)+1;
				montht12 = "Oct";
				// oct,jan
			}
			else if(pos >= 305 && pos <= 334){
				dayt12 = (pos-305)+1;
				montht12 = "Nov";
				// mar,nov
			}
			else if(pos >= 335 && pos <= 365){
				dayt12 = (pos-335)+1;
				montht12 = "Dec";
			}
				
		if(montht12 == "Dec" || montht12 == "Sep"){
			if ( dayt12 == 2 || dayt12 == 9 || dayt12 == 16 || dayt12 == 23 || dayt12 == 30) { var day = 'SAT' }
                    else if ( dayt12 == 3 || dayt12 == 10 || dayt12 == 17 || dayt12 == 24 || dayt12 == 31) { var day = 'SUN' }
                    else if ( dayt12 == 4 || dayt12 == 11 || dayt12 == 18 || dayt12 == 25 ) { var day = 'MON' }
                    else if ( dayt12 == 5 || dayt12 == 12 || dayt12 == 19 || dayt12 == 26 ) { var day = 'TUE' }
                    else if ( dayt12 == 6 || dayt12 == 13 || dayt12 == 20 || dayt12 == 27 ) { var day = 'WED' }
                    else if ( dayt12 == 7 || dayt12 == 14 || dayt12 == 21 || dayt12 == 28 ) { var day = 'THU' }
                    else if ( dayt12 == 8 || dayt12 == 15 || dayt12 == 22 || dayt12 == 29 || dayt12 == 1 ) { var day = 'FRI' }
		}else if(montht12 == "Mar" || montht12 == "Nov" || montht12 == "Feb"){
			if ( dayt12 == 2 || dayt12 == 9 || dayt12 == 16 || dayt12 == 23 || dayt12 == 30) { var day = 'THU' }
                    else if ( dayt12 == 3 || dayt12 == 10 || dayt12 == 17 || dayt12 == 24 || dayt12 == 31) { var day = 'FRI' }
                    else if ( dayt12 == 4 || dayt12 == 11 || dayt12 == 18 || dayt12 == 25 ) { var day = 'SAT' }
                    else if ( dayt12 == 5 || dayt12 == 12 || dayt12 == 19 || dayt12 == 26 ) { var day = 'SUN' }
                    else if ( dayt12 == 6 || dayt12 == 13 || dayt12 == 20 || dayt12 == 27 ) { var day = 'MON' }
                    else if ( dayt12 == 7 || dayt12 == 14 || dayt12 == 21 || dayt12 == 28 ) { var day = 'TUE' }
                    else if ( dayt12 == 8 || dayt12 == 15 || dayt12 == 22 || dayt12 == 29 || dayt12 == 1 ) { var day = 'WED' }
		}else if(montht12 == "Oct" || montht12 == "Jan"){
			if ( dayt12 == 2 || dayt12 == 9 || dayt12 == 16 || dayt12 == 23 || dayt12 == 30) { var day = 'MON' }
                    else if ( dayt12 == 3 || dayt12 == 10 || dayt12 == 17 || dayt12 == 24 || dayt12 == 31) { var day = 'TUE' }
                    else if ( dayt12 == 4 || dayt12 == 11 || dayt12 == 18 || dayt12 == 25 ) { var day = 'WED' }
                    else if ( dayt12 == 5 || dayt12 == 12 || dayt12 == 19 || dayt12 == 26 ) { var day = 'THU' }
                    else if ( dayt12 == 6 || dayt12 == 13 || dayt12 == 20 || dayt12 == 27 ) { var day = 'FRI' }
                    else if ( dayt12 == 7 || dayt12 == 14 || dayt12 == 21 || dayt12 == 28 ) { var day = 'SAT' }
                    else if ( dayt12 == 8 || dayt12 == 15 || dayt12 == 22 || dayt12 == 29 || dayt12 == 1 ) { var day = 'SUN' }
		}else if(montht12 == "Jul" || montht12 == "Apr"){
			if ( dayt12 == 2 || dayt12 == 9 || dayt12 == 16 || dayt12 == 23 || dayt12 == 30) { var day = 'SUN' }
                    else if ( dayt12 == 3 || dayt12 == 10 || dayt12 == 17 || dayt12 == 24 || dayt12 == 31) { var day = 'MON' }
                    else if ( dayt12 == 4 || dayt12 == 11 || dayt12 == 18 || dayt12 == 25 ) { var day = 'TUE' }
                    else if ( dayt12 == 5 || dayt12 == 12 || dayt12 == 19 || dayt12 == 26 ) { var day = 'WED' }
                    else if ( dayt12 == 6 || dayt12 == 13 || dayt12 == 20 || dayt12 == 27 ) { var day = 'THU' }
                    else if ( dayt12 == 7 || dayt12 == 14 || dayt12 == 21 || dayt12 == 28 ) { var day = 'FRI' }
                    else if ( dayt12 == 8 || dayt12 == 15 || dayt12 == 22 || dayt12 == 29 || dayt12 == 1 ) { var day = 'SAT' }
		}
				t.find('sup').css({'display':'block'});
                t.find('sup').text(day+' '+dayt12);
             } // leftdays if
              else{
              	t.find('sup').css({'display':'none'});
              	$(this).children(":first::before").css("left","0")
              	$(this).draggable({
              		stop: function( event, ui ) {}
              	})
              }  

            }else if(t.attr("data-cust") == "right"){
            	handlebar = "left";
                    //Right handle
                    //console.log($(this).css("left"),"$this")
                    //console.log("right",tpos,"---",newposright,"here")
        if(newposright >= tpos){            
            if(tpos >= 1 && tpos <= 31){
                dayt12 = tpos;
                montht12 = "Jan";
            }else if(tpos >= 32 && tpos <= 59){
                dayt12 = (tpos-32)+1;
                montht12 = "Feb";
            }else if(tpos >= 60 && tpos <= 90){
                dayt12 = (tpos-60)+1;	
                montht12 = "Mar";
            }else if(tpos >= 91 && tpos <= 120){
                dayt12 = (tpos-91)+1;
                montht12 = "Apr";
            }else if(tpos >= 121 && tpos <= 151){
                dayt12 = (tpos-121)+1;
                montht12 = "May";
            }
            else if(tpos >= 152 && tpos <= 181){
                dayt12 = (tpos-152)+1;
                montht12 = "Jun";
            }
            else if(tpos >= 182 && tpos <= 212){
                dayt12 = (tpos-182)+1;
                montht12 = "Jul";
            }
            else if(tpos >= 213 && tpos <= 243){
                dayt12 = (tpos-213)+1;
                montht12 = "Aug";
            }
            else if(tpos >= 244 && tpos <= 273){
                dayt12 = (tpos-244)+1;
                montht12 = "Sep";
            }
            else if(tpos >= 274 && tpos <= 304){
                dayt12 = (tpos-274)+1;
                montht12 = "Oct";
            }
            else if(tpos >= 305 && tpos <= 334){
                dayt12 = (tpos-305)+1;
                montht12 = "Nov";
            }
            else if(tpos >= 335 && tpos <= 365){
                dayt12 = (tpos-335)+1;
                montht12 = "Dec";
            }
            
            //console.log(dayt12,"dayt12")
            // Right Handle
            //console.log(newposright,"newposright")
            //var newposright =newposright;
            if(newposright >= 1 && newposright <= 31){
            dayt12right = newposright;
                                    montht12right = "Jan";
            }else if(newposright >= 32 && newposright <= 59){
                dayt12right = (newposright-32)+1;
                montht12right = "Feb";
            }else if(newposright >= 60 && newposright <= 90){
                dayt12right = (newposright-60)+1;	
                montht12right = "Mar";
            }else if(newposright >= 91 && newposright <= 120){
                dayt12right = (newposright-91)+1;
                montht12right = "Apr";
            }else if(newposright >= 121 && newposright <= 151){
                dayt12right = (newposright-121)+1;
                montht12right = "May";
                if ( dayt12right == 2 || dayt12right == 9 || dayt12right == 16 || dayt12right == 23 || dayt12right == 30) { var day = 'TUE' }
                else if ( dayt12right == 3 || dayt12right == 10 || dayt12right == 17 || dayt12right == 24 || dayt12right == 31) { var day = 'WED' }
                else if ( dayt12right == 4 || dayt12right == 11 || dayt12right == 18 || dayt12right == 25 ) { var day = 'THU' }
                else if ( dayt12right == 5 || dayt12right == 12 || dayt12right == 19 || dayt12right == 26 ) { var day = 'FRI' }
                else if ( dayt12right == 6 || dayt12right == 13 || dayt12right == 20 || dayt12right == 27 ) { var day = 'SAT' }
                else if ( dayt12right == 7 || dayt12right == 14 || dayt12right == 21 || dayt12right == 28 ) { var day = 'SUN' }
                else if ( dayt12right == 8 || dayt12right == 15 || dayt12right == 22 || dayt12right == 29 || dayt12right == 1 ) { var day = 'MON' }
            }
            else if(newposright >= 152 && newposright <= 181){
                dayt12right = (newposright-152)+1;
                montht12right = "Jun";
                if ( dayt12right == 2 || dayt12right == 9 || dayt12right == 16 || dayt12right == 23 || dayt12right == 30) { var day = 'FRI' }
                else if ( dayt12right == 3 || dayt12right == 10 || dayt12right == 17 || dayt12right == 24 || dayt12right == 31) { var day = 'SAT' }
                else if ( dayt12right == 4 || dayt12right == 11 || dayt12right == 18 || dayt12right == 25 ) { var day = 'SUN' }
                else if ( dayt12right == 5 || dayt12right == 12 || dayt12right == 19 || dayt12right == 26 ) { var day = 'MON' }
                else if ( dayt12right == 6 || dayt12right == 13 || dayt12right == 20 || dayt12right == 27 ) { var day = 'TUE' }
                else if ( dayt12right == 7 || dayt12right == 14 || dayt12right == 21 || dayt12right == 28 ) { var day = 'WED' }
                else if ( dayt12right == 8 || dayt12right == 15 || dayt12right == 22 || dayt12right == 29 || dayt12right == 1 ) { var day = 'THU' }
            }
            else if(newposright >= 182 && newposright <= 212){
                dayt12right = (newposright-182)+1;
                montht12right = "Jul";
            }
            else if(newposright >= 213 && newposright <= 243){
                dayt12right = (newposright-213)+1;
                montht12right = "Aug";
                if ( dayt12right == 2 || dayt12right == 9 || dayt12right == 16 || dayt12right == 23 || dayt12right == 30) { var day = 'WED' }
                else if ( dayt12right == 3 || dayt12right == 10 || dayt12right == 17 || dayt12right == 24 || dayt12right == 31) { var day = 'THU' }
                else if ( dayt12right == 4 || dayt12right == 11 || dayt12right == 18 || dayt12right == 25 ) { var day = 'FRI' }
                else if ( dayt12right == 5 || dayt12right == 12 || dayt12right == 19 || dayt12right == 26 ) { var day = 'SAT' }
                else if ( dayt12right == 6 || dayt12right == 13 || dayt12right == 20 || dayt12right == 27 ) { var day = 'SUN' }
                else if ( dayt12right == 7 || dayt12right == 14 || dayt12right == 21 || dayt12right == 28 ) { var day = 'MON' }
                else if ( dayt12right == 8 || dayt12right == 15 || dayt12right == 22 || dayt12right == 29 || dayt12right == 1 ) { var day = 'TUE' }
            }
            else if(newposright >= 244 && newposright <= 273){
                dayt12right = (newposright-244)+1;
                montht12right = "Sep";

            }
            else if(newposright >= 274 && newposright <= 304){
                dayt12right = (newposright-274)+1;
                montht12right = "Oct";
                // oct,jan
            }
            else if(newposright >= 305 && newposright <= 334){
                dayt12right = (newposright-305)+1;
                montht12right = "Nov";
                // mar,nov
            }
            else if(newposright >= 335 && newposright <= 365){
                dayt12right = (newposright-335)+1;
                montht12right = "Dec";
            }
				
            if(montht12right == "Dec" || montht12right == "Sep"){
                    if ( dayt12right == 2 || dayt12right == 9 || dayt12right == 16 || dayt12right == 23 || dayt12right == 30) { var day = 'SAT' }
                else if ( dayt12right == 3 || dayt12right == 10 || dayt12right == 17 || dayt12right == 24 || dayt12right == 31) { var day = 'SUN' }
                else if ( dayt12right == 4 || dayt12right == 11 || dayt12right == 18 || dayt12right == 25 ) { var day = 'MON' }
                else if ( dayt12right == 5 || dayt12right == 12 || dayt12right == 19 || dayt12right == 26 ) { var day = 'TUE' }
                else if ( dayt12right == 6 || dayt12right == 13 || dayt12right == 20 || dayt12right == 27 ) { var day = 'WED' }
                else if ( dayt12right == 7 || dayt12right == 14 || dayt12right == 21 || dayt12right == 28 ) { var day = 'THU' }
                else if ( dayt12right == 8 || dayt12right == 15 || dayt12right == 22 || dayt12right == 29 || dayt12right == 1 ) { var day = 'FRI' }
            }else if(montht12right == "Mar" || montht12right == "Nov" || montht12right == "Feb"){
                    if ( dayt12right == 2 || dayt12right == 9 || dayt12right == 16 || dayt12right == 23 || dayt12right == 30) { var day = 'THU' }
                else if ( dayt12right == 3 || dayt12right == 10 || dayt12right == 17 || dayt12right == 24 || dayt12right == 31) { var day = 'FRI' }
                else if ( dayt12right == 4 || dayt12right == 11 || dayt12right == 18 || dayt12right == 25 ) { var day = 'SAT' }
                else if ( dayt12right == 5 || dayt12right == 12 || dayt12right == 19 || dayt12right == 26 ) { var day = 'SUN' }
                else if ( dayt12right == 6 || dayt12right == 13 || dayt12right == 20 || dayt12right == 27 ) { var day = 'MON' }
                else if ( dayt12right == 7 || dayt12right == 14 || dayt12right == 21 || dayt12right == 28 ) { var day = 'TUE' }
                else if ( dayt12right == 8 || dayt12right == 15 || dayt12right == 22 || dayt12right == 29 || dayt12right == 1 ) { var day = 'WED' }
            }else if(montht12right == "Oct" || montht12right == "Jan"){
                    if ( dayt12right == 2 || dayt12right == 9 || dayt12right == 16 || dayt12right == 23 || dayt12right == 30) { var day = 'MON' }
                else if ( dayt12right == 3 || dayt12right == 10 || dayt12right == 17 || dayt12right == 24 || dayt12right == 31) { var day = 'TUE' }
                else if ( dayt12right == 4 || dayt12right == 11 || dayt12right == 18 || dayt12right == 25 ) { var day = 'WED' }
                else if ( dayt12right == 5 || dayt12right == 12 || dayt12right == 19 || dayt12right == 26 ) { var day = 'THU' }
                else if ( dayt12right == 6 || dayt12right == 13 || dayt12right == 20 || dayt12right == 27 ) { var day = 'FRI' }
                else if ( dayt12right == 7 || dayt12right == 14 || dayt12right == 21 || dayt12right == 28 ) { var day = 'SAT' }
                else if ( dayt12right == 8 || dayt12right == 15 || dayt12right == 22 || dayt12right == 29 || dayt12right == 1 ) { var day = 'SUN' }
            }else if(montht12right == "Jul" || montht12right == "Apr"){
                    if ( dayt12right == 2 || dayt12right == 9 || dayt12right == 16 || dayt12right == 23 || dayt12right == 30) { var day = 'SUN' }
                else if ( dayt12right == 3 || dayt12right == 10 || dayt12right == 17 || dayt12right == 24 || dayt12right == 31) { var day = 'MON' }
                else if ( dayt12right == 4 || dayt12right == 11 || dayt12right == 18 || dayt12right == 25 ) { var day = 'TUE' }
                else if ( dayt12right == 5 || dayt12right == 12 || dayt12right == 19 || dayt12right == 26 ) { var day = 'WED' }
                else if ( dayt12right == 6 || dayt12right == 13 || dayt12right == 20 || dayt12right == 27 ) { var day = 'THU' }
                else if ( dayt12right == 7 || dayt12right == 14 || dayt12right == 21 || dayt12right == 28 ) { var day = 'FRI' }
                else if ( dayt12right == 8 || dayt12right == 15 || dayt12right == 22 || dayt12right == 29 || dayt12right == 1 ) { var day = 'SAT' }
            }
            t.find('sup').css({'display':'block'});
            t.find('sup').text(day+' '+dayt12right);
        }
        else{
                //console.log($(this).find('sup'),"sup")
                        $(this).find('sup').css({'display':'none'});
        $(this).children(":last::before").css("right","0")
        $(this).draggable({
                stop: function( event, ui ) {}
        })
        }
        }
    },
            stop: function() {
            	//console.log(dayt12right,montht12,"monthdayy")
                    var t = $(this);
                    var tp = t.parent();
                    var resizerow = tp.attr('data-row');
                    overlapmovetask(resizerow,handlebar);
                    t.find('sup').css({'display':'none'});
                    /* STOP SHOWING TASK SHADOW */
                    tp.removeClass('tasksdrag');
                    t.removeClass('dragblue');
                    /* GET CURRENT DAY AND LENGTH VALUES */
                    var thiswid = parseInt(tp.attr('data-days'),10);
                    var thispos = parseInt(tp.attr('data-day'),10);
                  
                    if ( t.is(':first-child') ) {
                            /* GET START POSITION OF LEFT HANDLER */
                            var newpos = parseInt(t.css('left'),10) / zoom;
                    } else {
                            /* GET START POSITION OF RIGHT HANDLER */
                            //var newpos = parseInt(t.css('right'),10) / zoom;
                            var newpos = parseInt((($(tp).width() - $(t).position().left) - $(t).width()),10) / zoom;
                            //   FOUT FOUT FOUT SAFARI KAN GEERN RIGHT VALUE VINDEN!!!! //
                    }
                     // console.log(thispos,"thispos",newpos)
                    if ( newpos <= 0 ) {
                    	//console.log("ifhere")
                            if ( t.is(':first-child') ) {
                                    /* SET NEW START DAY VALUE IF LEFT HANDLER IS MOVED LEFT */
                                    var newposless = thispos-(newpos*-1);
                                    tp.attr('data-day', newposless );
                            }
                            /* SET NEW LENGTH VALUE */
                            var newwidmore =  thiswid+(newpos*-1);
                            tp.attr('data-days',Math.ceil(newwidmore));
                    } else {
                    	//console.log("elsehere")
                        if ( t.is(':first-child') ) {
                                /* SET NEW START DAY VALUE IF LEFT HANDLER IS MOVED RIGHT */
                                var newposmore = thispos+newpos;
                                tp.attr('data-day', newposmore );
                        }
                        /* SET NEW LENGTH VALUE */
                        var newwidless = thiswid-newpos;
                        if(newwidless < 0){
                            tp.attr('data-days', Math.ceil(0));
                        }else{
                            tp.attr('data-days', Math.ceil(newwidless));	
                        }
                    }
                   var tmo = tp.attr("data-mo");
                   var tday = tp.attr("data-day");
                    /* Resize Task from timeline */
                    var user_id = get_userid();
                    var admin_url = get_ajaxurl();
                    var proj_id = tp.attr('proj-id');
                    var phase_id = tp.attr('phase-id');
                    var task_id = tp.attr('data-id');
                    //var ph_id = tp.attr('ph-id');
                    var length = parseInt(tp.attr('data-days')) + 1;
                    var day = tp.attr('data-day',dayt12);
                    var mnth = tp.attr('data-mo',montht12);
                    var row_no = tp.attr('data-row');
                    taskspos('tl2');
                    if ( t.is(':first-child') ) {
                        /* IF LEFT HANDLER IS MOVED */
                        t.css({'left':0});
                        tp.find('i:last-child').css({'width':'3px','right':'-5px','left':''});
                    } else {
                        /* IF RIGHT HANDLER IS MOVED */
                        t.css({'width':'5px','right':'-5px','left':''});
                    }
                    
                    var img_url = $('#img_url').val();
                    $('.overly_loader').css('display','block');
                    $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
                    
                    $.ajax({
                        type : "POST",
                        url : admin_url,
                        dataType: 'json',
                        data: {
                            action:'resize_task', 
                            id:user_id,
                            p_id:proj_id,
                            task_id:task_id,
                            phase_id:phase_id,
                            s_day:dayt12,
                            s_month:montht12,
                            row_no:row_no,
                            length:length
                        },
                        success: function( data ) {
                            if(data.status){
                                console.log(data);
                                display_task_grid(task_id);
                                var art_id = $("#artist_list").val();
                                //display_project_data(art_id);
                                display_project_list(art_id);
                                display_phase_task_list(proj_id);
                                /* UPDATE TASK POSITION AND LENGTH */
                                taskspos('tl2');
                                /* RESET RESIZE HANDLES POSITIONS */
                               if ( t.is(':first-child') ) {
                                        /* IF LEFT HANDLER IS MOVED */
                                        t.css({'left':0});
                                        tp.find('i:last-child').css({'right':'0px','left':''});
                                } else {
                                        /* IF RIGHT HANDLER IS MOVED */
                                        t.css({'right':'0px','left':''});
                                }
                                setTimeout(function() {
                                    $('.overly_loader').css('display','none');
                                },1200)
                                
                            }
                        }
                    });
              }
	});
};

$(document).ready(function(){
	
    // DETECT TOUCH
    function isTouchDevice() { return 'ontouchstart' in document.documentElement };
    // IF TOUCH DEVICE, ADD DATA-TOUCH TO TIMELINE	
    if (isTouchDevice()) {
            $('#tl2').attr('data-touch','touch');
    } else {
            $('#tl2').attr('data-touch','notouch');
    }
    /* MOVE ALL TASKS TO POSITIONS */
    taskspos('tl0');
    taskspos('tl2');
    taskspos('tl23');
    /* DETECT MAX NEEDED TIMELINE HEIGHT TO DISPLAY ALL TASKS */	
    tlheight(0,'tl0');
    tlheight(0,'tl2');
    tlheight(0,'tl23');
    /* ADD <EM> FOR TASK OVERFLOW AND <I> FOR RESIZE HANDLES TO ALL TASKS */
    $('.tasks span').wrapInner('<em></em>');
    $('#tl23 .tasks span:first em').css("color","#fff");
    $('#tl2 .tasks span').prepend('<i><sup></sup></i>');
    $('#tl2 .tasks span').append('<i><sup></sup></i>');
    /* MAKE TASKS DRAGGABLE */
    var zoom = $('#tl2').attr('data-zoom');
    tasksdraggable(zoom);
    /* MAKE PHASE TIMELINE DRAGGABLE */
	var prevX = -1;
	var leftIsDragging   = false;
	var middleIsDragging = false;
	var rightIsDragging  = false;  

$(document).bind('mousemove', function(event) {
    if (leftIsDragging) 
    {
        console.log('left dragging');
    }
    if (middleIsDragging) 
    {
        console.log('mousewheel dragging');
    }
    if (rightIsDragging) 
    {
        console.log('right dragging');
    }
});
var temparr = [];
var timelineleftstore=[];
var timelineleftstore1 =[];
var temparr =[];
var temparr1 =[];
    $('#tl0 > div').draggable({
            addClasses: false,
            axis: 'x',
            drag:function(e,ui){
            	  // console.log(ui.originalPosition.left ,"--",ui.position.left);
            	
            		// template design
    				 var textpadding = 0;        		 
                     var timelineleft = $(this).css("left");
                     timelineleft = parseInt(timelineleft,10);
                     timelineleft = Number(timelineleft.toString().replace(/\-/g,''));
                     //console.log(timelineleft,e,"timelineleft")
                     $(this).find("span").each(function(i,v){

                     	var spanwidth = parseInt($(v).css("width"),10);
                     	var spanleft = parseInt($(v).css("left"),10);
                     	var spantotal = spanwidth + spanleft;
                     	//console.log(spanleft,timelineleft,"here")
                     	if(spanleft < timelineleft){
                     		//console.log("leftside");
						//var spanwidthcalc = ((timelineleft-spanleft) - ($(v).width() +20));
                     	var emwidth = $(v).find("em").width();
                    	var ph1width = $(v).find("em div#ph1").width();
                    	var totalwidth = emwidth - ph1width;
                    	var halfwid = totalwidth/2;
                    	var halfem = spanleft + halfwid + 10;
                    	//var padLeft = parseInt($(v).css('padding-left'),10);
						            	
                    	if(halfem < timelineleft){	
                    		
                    		//console.log(spanleft,"spanleft",halfwid,"halfwid",halfem,"halfem",timelineleft,"timelineleft",timelineleftstore,"timelineleftstore")
                    		if(timelineleft < timelineleftstore[i]){
                    			var padLeft = parseInt($(v).find("em div#ph1").css("padding-left"),10);
                                padLeft = padLeft - 4; 
                                //console.log(padLeft,"padLeftif")
                                $(v).find("div#ph1").css("padding-left",padLeft+"px");
                    		}else if(spantotal < timelineleft){
                    			timelineleftstore[i] = spantotal;
                    			if(temparr.indexOf($(v).attr("data-id")) == -1){
                    				temparr.push($(v).attr("data-id"));
                    			}
                    		}
                    		else{
                    			//console.log($(v),"right")
                    			var padLeft = parseInt($(v).find("em div#ph1").css("padding-left"),10);
		                    		padLeft = padLeft + 4; 
		                    		$(v).find("div#ph1").css("padding-left",padLeft+"px");	
                    		}
                    		if(temparr.indexOf($(v).attr("data-id")) == -1){
                    			timelineleftstore[i] = timelineleft;	
                    		}
                    	}else{
                    		$(v).find("div#ph1").css("padding-left",0+"px");
                    		temparr.splice(i,1);
                    		//timelineleftstore.splice(i,1)
                    	}
                    	//console.log(temparr,"temparr")
                    	}
                    	else{
                    		// right side
                    		if((timelineleft+1000) < spantotal){
                    			//console.log("rightside");
                    			$(v).find("em div#ph1").css({'position':'relative'});

                    			var timelightwidth = timelineleft+1000;
		                     	var emwidth = $(v).find("em").width();
		                    	var ph1width = $(v).find("em div#ph1").width();
		                    	var totalwidth = emwidth - ph1width;
		                    	var halfwid = totalwidth/2;
		                    	var timelineenter = spantotal - halfwid - 10;
                    			//console.log(spantotal,"spantotal",spanleft,"spanleft",halfwid,"halfwid",timelineenter,"timelineenter",timelineleft,"timelineleft",timelightwidth,"timelightwidth",timelineleftstore1,"timelineleftstore1")
		                    	if(timelightwidth < timelineenter){
		                    		//console.log(i,timelightwidth,timelineleftstore1,"else")

		                    	if(timelightwidth > timelineleftstore1[i]){
	                    			var padLeft = parseInt($(v).find("em div#ph1").css("right"),10);
	                                padLeft = padLeft - 2; 
	                                //console.log(padLeft,"padLeftif")
	                                $(v).find("div#ph1").css({'position':'relative','right':padLeft+"px"});	
	                                timelineleftstore1[i] = timelightwidth;
	                    			temparr1.push(timelineleftstore1[i]);
		                    	}else if(timelightwidth < spanleft){
		                    		//console.log("elseif")
                    			//timelineleftstore1[i] = spantotal;
                    			if(temparr1.indexOf($(v).attr("data-id")) == -1){
                    				temparr1.push($(v).attr("data-id"));
                    			}
                    		}else{
		                    			//console.log("padelse");
		                    			var padLeft = parseInt($(v).find("em div#ph1").css("right"),10);
		                    			padLeft = padLeft + 2; 
				                    	$(v).find("div#ph1").css({'position':'relative','right':padLeft+"px"});	
				                    	timelineleftstore1[i] = timelightwidth;
	                    				temparr1.push(timelineleftstore1[i]);
		                    	}
		                    		
	                    		// if(temparr1.indexOf($(v).attr("data-id")) == -1){
	                    		// 	timelineleftstore1[i] = timelightwidth;
	                    		// 	temparr1.push(timelineleftstore1[i]);
	                    		// }

	                    		//console.log(i,timelineleftstore1[i],"timelineleftstore2")

		                    	}else{
		                    		$(v).find("div#ph1").css("right",0+"px");
		                    		temparr1.splice(i,1);
		                    	}
									}
		                    	}
                    	

                     })
            },
            stop:function(){
            	console.log("stop");
            }

    });
var timelineleftstore2=[];
var timelineleftstore21 =[];
var temparr2 =[];
var temparr21 =[];
var load_timeline = false;
var cuur_year_data = [];
var cuur_year_data_left = [];
    $('#tl23 > div').draggable({
            addClasses: false,
            axis: 'x',
            drag:function(e,ui){
                //console.log(e,'uii',ui);
                //console.log(ui.position.left,"left");
                var curr_i = $(e.toElement).prevAll(".month")[0];
                var curr_month = $(curr_i).data('month');
                var curr_year = $(curr_i).data('year');
               console.log(curr_i,'curr_i',curr_month,curr_year);
                var admin_url = get_ajaxurl();
                if(curr_month == 11 && cuur_year_data.indexOf(curr_year) == -1){
                   //if(cuur_year_data.indexOf(curr_year) == -1){
                        cuur_year_data.push(curr_year);
                       
                    //if(load_timeline == false) {
                    $.ajax({
                        type : "POST",
                        url : admin_url,
                        dataType: 'json',
                        data: {
                            action:'load_next_project_timeline',
                            curr_year:curr_year,
                            curr_month:curr_month,
                        },
                        success: function( data ) {
                            console.log(data.detail,'data');
                            //if(data.mt_status == 'before'){
                                $("#tl23 div .grid").append(data.detail)
                            
                        }
                    });
                }else if(curr_month == 2 && cuur_year_data_left.indexOf(curr_year)== -1){
                    console.log(curr_year,"else if")
//                    var current_year = cuur_year_data.indexOf(curr_year);
//                    cuur_year_data.splice(current_year,1);
                        cuur_year_data_left.push(curr_year);
                    $.ajax({
                        type : "POST",
                        url : admin_url,
                        dataType: 'json',
                        data: {
                            action:'load_prev_project_timeline',
                            curr_year:curr_year,
                            curr_month:curr_month,
                        },
                        success: function( data ) {
                            console.log(data.detail,'data');
                            
                                $("#tl23 div .grid").prepend(data.detail)
                            
                        }
                    });
                }
                    //load_timeline = true;
                    //}
                //}
                
                /*else{
                    console.log('else in');
                }*/

            	// template design
    		    var textpadding = 0;        		 
                     var timelineleft = $(this).css("left");
                     timelineleft = parseInt(timelineleft,10);
                     timelineleft = Number(timelineleft.toString().replace(/\-/g,''));
                     //console.log(timelineleft,e,"timelineleft")
                     $(this).find("span").each(function(i,v){

                     	var spanwidth = parseInt($(v).css("width"),10);
                     	var spanleft = parseInt($(v).css("left"),10);
                     	var spantotal = spanwidth + spanleft;
                     	//console.log(spanleft,timelineleft,"here")
                     	if(spanleft < timelineleft){
                     		//console.log("leftside");
						//var spanwidthcalc = ((timelineleft-spanleft) - ($(v).width() +20));
                     	var emwidth = $(v).find("em").width();
                    	var ph1width = $(v).find("em div#ph1").width();
                    	var totalwidth = emwidth - ph1width;
                    	var halfwid = totalwidth/2;
                    	var halfem = spanleft + halfwid + 10;
                    	//var padLeft = parseInt($(v).css('padding-left'),10);
						            	
                    	if(halfem < timelineleft){	
                    		
                    		//console.log(spanleft,"spanleft",halfwid,"halfwid",halfem,"halfem",timelineleft,"timelineleft",timelineleftstore,"timelineleftstore")
                    		if(timelineleft < timelineleftstore2[i]){
                    			var padLeft = parseInt($(v).find("em div#ph1").css("padding-left"),10);
                                padLeft = padLeft - 4; 
                                //console.log(padLeft,"padLeftif")
                                $(v).find("div#ph1").css("padding-left",padLeft+"px");
                    		}else if(spantotal < timelineleft){
                    			timelineleftstore2[i] = spantotal;
                    			if(temparr2.indexOf($(v).attr("data-id")) == -1){
                    				temparr2.push($(v).attr("data-id"));
                    			}
                    		}
                    		else{
                    			//console.log($(v),"right")
                    			var padLeft = parseInt($(v).find("em div#ph1").css("padding-left"),10);
		                    		padLeft = padLeft + 4; 
		                    		$(v).find("div#ph1").css("padding-left",padLeft+"px");	
                    		}
                    		if(temparr2.indexOf($(v).attr("data-id")) == -1){
                    			timelineleftstore2[i] = timelineleft;	
                    		}
                    	}else{
                    		$(v).find("div#ph1").css("padding-left",0+"px");
                    		temparr2.splice(i,1);
                    		//timelineleftstore2.splice(i,1)
                    	}
                    	//console.log(temparr2,"temparr2")
                    	}
                    	else{
                    		// right side
                    		if((timelineleft+1000) < spantotal){
                    			//console.log("rightside");
                    			$(v).find("em div#ph1").css({'position':'relative'});

                    			var timelightwidth = timelineleft+1000;
		                     	var emwidth = $(v).find("em").width();
		                    	var ph1width = $(v).find("em div#ph1").width();
		                    	var totalwidth = emwidth - ph1width;
		                    	var halfwid = totalwidth/2;
		                    	var timelineenter = spantotal - halfwid - 10;
                    			//console.log(spantotal,"spantotal",spanleft,"spanleft",halfwid,"halfwid",timelineenter,"timelineenter",timelineleft,"timelineleft",timelightwidth,"timelightwidth",timelineleftstore21,"timelineleftstore21")
		                    	if(timelightwidth < timelineenter){
		                    		//console.log(i,timelightwidth,timelineleftstore21,"else")

		                    	if(timelightwidth > timelineleftstore21[i]){
	                    			var padLeft = parseInt($(v).find("em div#ph1").css("right"),10);
	                                padLeft = padLeft - 4 
	                                //console.log(padLeft,"padLeftif")
	                                $(v).find("div#ph1").css({'position':'relative','right':padLeft+"px"});	
	                                timelineleftstore21[i] = timelightwidth;
	                    			temparr21.push(timelineleftstore21[i]);
		                    	}else if(timelightwidth < spanleft){
		                    		//console.log("elseif")
                    			//timelineleftstore21[i] = spantotal;
                    			if(temparr21.indexOf($(v).attr("data-id")) == -1){
                    				temparr21.push($(v).attr("data-id"));
                    			}
                    		}else{
		                    			//console.log("padelse");
		                    			var padLeft = parseInt($(v).find("em div#ph1").css("right"),10);
		                    			padLeft = padLeft + 4; 
				                    	$(v).find("div#ph1").css({'position':'relative','right':padLeft+"px"});	
				                    	timelineleftstore21[i] = timelightwidth;
	                    				temparr21.push(timelineleftstore21[i]);
		                    	}
		                    		
	                    		// if(temparr21.indexOf($(v).attr("data-id")) == -1){
	                    		// 	timelineleftstore21[i] = timelightwidth;
	                    		// 	temparr21.push(timelineleftstore21[i]);
	                    		// }

	                    		//console.log(i,timelineleftstore21[i],"timelineleftstore22")

		                    	}else{
		                    		$(v).find("div#ph1").css("right",0+"px");
		                    		temparr21.splice(i,1);
		                    	}
									}
		                    	}
                    	

                     })
            }
    });
var timelineleftstore23=[];
var timelineleftstore231 =[];
var temparr23 =[];
var temparr231 =[];
    /* MAKE TASK TIMELINE DRAGGABLE */
    $('#tl2 > div').draggable({
            addClasses: false,
            axis: 'x',
            drag:function(e,ui){
            	var textpadding = 0;        		 
                     var timelineleft = $(this).css("left");
                     timelineleft = parseInt(timelineleft,10);
                     timelineleft = Number(timelineleft.toString().replace(/\-/g,''));
                     //console.log(timelineleft,e,"timelineleft")
                     $(this).find("span").each(function(i,v){

                     	var spanwidth = parseInt($(v).css("width"),10);
                     	var spanleft = parseInt($(v).css("left"),10);
                     	var spantotal = spanwidth + spanleft;
                     	//console.log(spanleft,timelineleft,"here")
                     	if(spanleft < timelineleft){
                     		//console.log("leftside");
						//var spanwidthcalc = ((timelineleft-spanleft) - ($(v).width() +20));
                     	var emwidth = $(v).find("em").width();
                    	var ph1width = $(v).find("em div#ph1").width();
                    	var totalwidth = emwidth - ph1width;
                    	var halfwid = totalwidth/2;
                    	var halfem = spanleft + halfwid + 10;
                    	//var padLeft = parseInt($(v).css('padding-left'),10);
                    	if(emwidth > ph1width){
                    	if(halfem < timelineleft){	
                    		
                    		//console.log(spanleft,"spanleft",halfwid,"halfwid",halfem,"halfem",timelineleft,"timelineleft",timelineleftstore,"timelineleftstore")
                    		if(timelineleft < timelineleftstore23[i]){
                    			var padLeft = parseInt($(v).find("em div#ph1").css("padding-left"),10);
                                padLeft = padLeft - 3; 
                                //console.log(padLeft,"padLeftif")
                                $(v).find("div#ph1").css("padding-left",padLeft+"px");
                    		}else if(spantotal < timelineleft){
                    			timelineleftstore23[i] = spantotal;
                    			if(temparr23.indexOf($(v).attr("data-id")) == -1){
                    				temparr23.push($(v).attr("data-id"));
                    			}
                    		}
                    		else{
                    			//console.log($(v),"right")
                    			var padLeft = parseInt($(v).find("em div#ph1").css("padding-left"),10);
		                    		padLeft = padLeft + 3; 
		                    		$(v).find("div#ph1").css("padding-left",padLeft+"px");	
                    		}
                    		if(temparr23.indexOf($(v).attr("data-id")) == -1){
                    			timelineleftstore23[i] = timelineleft;	
                    		}
                    	}else{
                    		$(v).find("div#ph1").css("padding-left",0+"px");
                    		temparr23.splice(i,1);
                    		//timelineleftstore23.splice(i,1)
                    	}
                    	}
                    	//console.log(temparr23,"temparr23")
                    	}
                    	else{
                    		// right side
                    		if((timelineleft+1000) < spantotal){
                    			//console.log("rightside");
                    			$(v).find("em div#ph1").css({'position':'relative'});

                    			var timelightwidth = timelineleft+1000;
		                     	var emwidth = $(v).find("em").width();
		                    	var ph1width = $(v).find("em div#ph1").width();
		                    	var totalwidth = emwidth - ph1width;
		                    	var halfwid = totalwidth/2;
		                    	var timelineenter = spantotal - halfwid - 10;
                    			//console.log(spantotal,"spantotal",spanleft,"spanleft",halfwid,"halfwid",timelineenter,"timelineenter",timelineleft,"timelineleft",timelightwidth,"timelightwidth",timelineleftstore231,"timelineleftstore231")
		                    	console.log(emwidth,"---",ph1width)
                    			if(emwidth+10 > ph1width){
		                    	if(timelightwidth < timelineenter){
		                    		console.log(i,timelightwidth,timelineleftstore231,"else")

		                    	if(timelightwidth > timelineleftstore231[i]){
	                    			var padLeft = parseInt($(v).find("em div#ph1").css("right"),10);
	                                padLeft = padLeft - 3
	                                //console.log(padLeft,"padLeftif")
	                                $(v).find("div#ph1").css({'position':'relative','right':padLeft+"px"});	
	                                timelineleftstore231[i] = timelightwidth;
	                    			temparr231.push(timelineleftstore231[i]);
		                    	}else if(timelightwidth < spanleft){
		                    		//console.log("elseif")
                    			//timelineleftstore231[i] = spantotal;
                    			if(temparr231.indexOf($(v).attr("data-id")) == -1){
                    				temparr231.push($(v).attr("data-id"));
                    			}
                    		}else{
		                    			var padLeft = parseInt($(v).find("em div#ph1").css("right"),10);
		                    			padLeft = padLeft + 3; 
				                    	$(v).find("div#ph1").css({'position':'relative','right':padLeft+"px"});	
				                    	timelineleftstore231[i] = timelightwidth;
	                    				temparr231.push(timelineleftstore231[i]);
		                    	}
		                    		
	                    		}else{
		                    		$(v).find("div#ph1").css("right",0+"px");
		                    		temparr231.splice(i,1);
		                    	}// end of timlinewidth
		                    }

									}
		                    	} // end of else
                    })
            }
    });
    /* SET BG COLORS OF COLOR PICKER */
    $('.colorpick i').each(function(){
            $(this).css({
                    'background':'#'+$(this).attr('data-col')
            });
    });
	/* COLOR PICKER CHOOSE COLOR */
    $(document).on("tap", ".colorpick i", function() {
		$('.colorpick i').removeClass('kies');
		$(this).addClass('kies');
	});
        
    
	// Project Timelibe
    $(document).on("mousedown","#tl23 .tasks span",function(event){
    
    //console.log($(this))
    var attrid = $(this).attr("data-id");
    proj_id_sel = attrid;
    //console.log(proj_id_sel,'mousedown',attrid)
    $("#tl23 span").css({"background-color":"","data-spanselect":"false"});
    $("#tl23 span").attr("data-spanselect","false");
    $("#tl23 span em").css({"color":"black"});
    $(this).css("background-color","#4395c9");
    $(this).attr("data-spanselect","true");
    $(this).find("em").css("color","#fff");
    //console.log(attrid,'calling from here');
    display_phase_task_list(attrid);
    currposelem = $(this).position();
    $(this).attr({"data-currleft":currposelem.left,"data-currtop":currposelem.top})
    //console.log(currposelem)
    prevtop = currposelem.top;
    prevleft = currposelem.left;
    $('select#get_project option[value="'+attrid+'"]').attr('selected','selected');
    $("#tl0").show();
	$("#tl2").hide();
	$("#project").show();
	$("#phase").hide();
	})

    // Phase Timeline
    $(document).on("mousedown","#tl0 .tasks span",function(event){
    var attrid = $(this).attr("proj-id");
    proj_id_sel = attrid;    
     
    currposelem = $(this).position();
    $(this).attr({"data-currleft":currposelem.left,"data-currtop":currposelem.top})
    //console.log(currposelem,"here")
    prevt10top = currposelem.top;
    prevt10left = currposelem.left;
    var monthperiod = $(".header #search-product").nextAll(".kies").text();

    if(monthperiod == "Quarter"){
            tlwidth(10,"tl23")
        }else if(monthperiod == "Year"){
            tlwidth(3,"tl23")
        }
    var phaseperiod = $(".current-phase").find(".kies").text();
    //console.log(phaseperiod,"phaseperiod")
    if(phaseperiod == "Week"){
    	tasksdraggable(70);
    }else{
    	tasksdraggable(30);
    }
    })

    $(document).on("mousedown","#tl2 .tasks span",function(event){
        var attrid = $(this).attr("proj-id");
        proj_id_sel = attrid; 
        currposelem = $(this).position();
	    $(this).attr({"data-currleft":currposelem.left,"data-currtop":currposelem.top})
	    prevt12top = currposelem.top;
	    prevt12left = currposelem.left;
	    //console.log(prevt12top,"prevt12top")
        var monthperiod = $(".header #search-product").nextAll(".kies").text();
        if(monthperiod == "Quarter"){
            tlwidth(10,"tl23")
        }else if(monthperiod == "Year"){
            tlwidth(3,"tl23")
        }
        var phaseperiod = $(".current-phase").find(".kies").text();
    //console.log(phaseperiod,"phaseperiod")

	    if(phaseperiod == "Week"){
	    	tasksdraggable(70);
	    }else{
	    	tasksdraggable(30);
	    }
	})

	/* GET CURRENT DAY FOR NEXT FUNCTION */
    $(document).on("dblclick", "#tl2 .grid i", function() {
    	//console.log("tap")
    	$("#input1").val("")
		$("#input2").val("")

		if($(this).hasClass("month")){
			var currentmonth = $(this).find("em").text();
			var firsttext = $(this).text().substr(0,1);
		}else{
			var thismonth = $(this).prevAll("i.month")[0];
    		var currentmonth = $(thismonth).find("em").text();
    		var firsttext = $(this).text();
		}
    	var cur_year = new Date().getFullYear();
    	//console.log(firsttext,"--",currentmonth,"--",cur_year)
    	var addmonth = new Date(currentmonth+' '+firsttext+','+cur_year);
    	//var addmonth = formatDate($(this).text()+''+currentmonth+' '+cur_year);
    	addmonth = myYmd(addmonth);
    	//console.log(new Date($(this).text(),currentmonth,"2017"))
		var deze = $(this).index();
		$('#tl2 .grid').attr('data-today',deze);
		$(".datepicker").datepicker();
		$('.datepicker').datepicker('refresh');
		flex('addtask');
		
		setTimeout(function(){
			$("#input1").val(addmonth);	
		$(".datepicker").datepicker().datepicker('setDate',addmonth);
		var currentdate = $(".datepicker").datepicker('getDate');
    	currmonth = currentdate.getMonth()+1;	
    	$(".changetitle").text("Pick end:")	
		},300)
		
		
		
	
		//$( ".datepicker" ).datepicker({ changeMonth: true,changeYear: true,defaultDate: '-2m' });
	});
	/* SHOW WINDOW TO CREATE NEW TASK IN TIMELINE */
	$('#tl2 .grid i').on("doubletap",function(event){
		//console.log("sss")
		/* SHOW WINDOW */
		
		/* FOCUS ON TASK NAME */
		invoer('taskname');
		/* GET SELECTED DAY NUMBER ( -30 DAYS OF FIRST MONTH AND +7 'DAYS' OF DAY NAMES IN POPUP CALENDAR)  */
		var deze = parseInt($('#tl2 .grid').attr('data-today'),10) - 23;
		/* MARK CURRENT DAY AS START */
		$('#addtask .calendar i:nth-child('+deze+')').addClass('kies-s'); /* FIXEN : ALLEEN ROND TOEVOEGEN OP MOBILE */
		/* ENABLE SELECTING END DAY IN CALENDAR */
		$('#addtask .calendar').addClass('kiesend');
		/* CHANGE INFO TEXT */
		$('#cal2label').text('Pick end:');
	},400);
	
	/* DETECT DOUBLE OR SINGLE TAP */
	
        function formatDate(date) {
        	//console.log(new Date(date))
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate() ,
                year = d.getFullYear();
                //console.log(month,day,year)
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [month, day, year].join('/');
        }
        
        function myYmd(D){
		    var pad = function(num) {
		        var s = '0' + num;
		        return s.substr(s.length - 2);
		    }
		    var Result = pad((D.getMonth() + 1)) + '/' + pad(D.getDate()) + '/' + D.getFullYear();
		    return Result;
		}

        function adddaysinDate(date,day){
            var someDate = new Date(date);
            someDate.setDate(someDate.getDate() + parseInt(day)); 
            return formatDate(someDate);
        }
        
        var tappededittask = false;
	function edittimelinetask(deze,temp){
             //console.log(temp,'temp')
            // if(!tappededittask){
            //     tappededittask = setTimeout(function(){
            //             tappededittask = null;
            //     },300);
            // } else {
            	
    			// currmonth = currentdate.getMonth()+1;
                clearTimeout(tappededittask);
                tappededittask=null;
                var cur_year = new Date().getFullYear();
                if(temp == 'tr'){
                    /* AT DOUBLE TAP */
                    var naam = deze[4].innerText;
                    var color_code = deze[0].attributes[0].nodeValue;
                    var color = color_code.split(":");
                    var col = color[2].split("#");
                    col = col[1];
                    var status = deze[1].attributes[0].nodeValue;
                    //var st_date = formatDate(deze[6].innerText+' '+cur_year);
                    var st_date = formatDate(deze[6].innerText);
                    //var end_date = formatDate(deze[7].innerText+' '+cur_year);
                    var end_date = formatDate(deze[7].innerText);
                    var task_id = deze[9].innerText;
                    
                }
                else{
                    var naam = deze.find("em").html();
                    var task_id = deze.attr("data-id");
                    var col = deze.attr("data-col");
                    var status = deze.attr("st-class");
                    var data_mo = deze.attr("data-mo");
                    var data_day = deze.attr("data-day");
                    var data_days = deze.attr("data-days");
                    var st_dt = data_day +' '+data_mo+' '+cur_year;
                    var st_date = formatDate(st_dt);
                    var end_date = adddaysinDate(st_dt,data_days);
                }
                //console.log(col,'data-col');
                $('.statuskeuze div').not(status).removeClass('kies');
                flex('edittask');
                $('#edittaskname').val(naam);
                $('#edittask .colorpick i[data-col="'+col+'"]').addClass('kies');
                $('#edittask .statuskeuze .'+status+'').addClass('kies');
                $('#edittask #edit_dt1').val(st_date);
                $('#edittask #edit_dt2').val(end_date);
                $('#task_id').val(task_id);
                $(".edit_datepicker").datepicker().datepicker('setDate',st_date);
                var currentdate = $(".edit_datepicker").datepicker('getDate');
        		currmonth = currentdate.getMonth()+1;
                adduistateerror(currmonth);
                
            /*}*/
        }
	
        
        // Phase title edit
        /*$(document).on("click", "#phaselist td i.edit_phase, #donephaselist td i.edit_phase", function(e) {
            if($(this).hasClass("edit_phase")){
                 $(this).parent().prev().removeAttr("onclick").removeClass("editphasetitle");
                e.stopPropagation();
                console.log("here")
               
                var titlevalue = $(this).parent().prev().text();
                var dataphaseid = $(this).parent().prev().attr("data-phaseid");
                $(this).parent().prev().html("<input type='text' id="+dataphaseid+" value='"+titlevalue+"' onblur='savephasetitle("+dataphaseid+")'>");
            }
        }); */               
        
	/* DETECT TOUCH AND DETECT DOUBLE TAP ON TASK IN TIMELINE TO EDIT */
	if ( $('#tl2').attr('data-touch') == 'touch' ) {
		$(document).on("touchstart", "#tl2 .tasks span, #phasetodo td:nth-child(5), #phasedone td:nth-child(5)", function() {		
			/* IF TOUCH DEVICE USE TOUCHSTART */
                        var deze = $(this).index();		
			edittimelinetask(deze);
			
		});
	} else {
		/* IF DESKTOP USE CLICK */
		$(document).on("click", "#phasetodo td:nth-child(5), #phasedone td:nth-child(5)", function() {
			 //console.log("ifclick")
			 var deze = $(this).parent()[0].cells;
                            //console.log(deze,'tr-row');
                            edittimelinetask(deze,"tr");
                            
                });
                
                $(document).on("dblclick", "#tl2 .tasks span", function(){
                	//console.log("elseclick")
                    var deze = $(this);
                    edittimelinetask(deze,"span");
                })
	}
   
	/* UNDO WITH CTRL + Z AFTER DELETE TASK */
	$(document).keydown(function(e){
		if( e.which === 90 && e.ctrlKey ){
			var deze = parseInt($('#tl2 .tasks').attr('data-today'),10) + 1;
			$('#tl2 .tasks span:nth-child('+deze+')').fadeIn(1000);
		}          
	});
	/* SCROLL TO CURRENT DAY */
	var taskpostl23 = $('#tl23 .grid i.today').position();
	if(taskpostl23){
    	$('#tl23 > div').css("left",-(taskpostl23.left - 35))	
    }
	setTimeout(function(){
		var taskpost10 = $('#tl0 .grid i.today').position();
		if(taskpost10){
			$('#tl0 > div').css("left",-(taskpost10.left -35))
		}
	},1000)
	
	//$('#tl0 > div').css({'left':'-1000'});
	//$('#tl23 > div').css({'left':'-840px'});
                
	
});

// GET LOGGED USER ID
function get_userid(){
    var user_id = $('#user_id').val();
    return user_id;
}

// GET ADMIN AJAX URL
function get_ajaxurl(){
    var admin_url = $('#admin_url').val();
    return admin_url;
}


function display_phase_task_list(proj_id){
    //console.log('display_phase_task_list');
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'display_phase_detail', 
            id:user_id,
            p_id:proj_id,
        },
        success: function( data ) {
            
            var timeline_detail = data.timeline_data;
            var phase_list = data.phase_list;
            var artist_id = data.proj_artist;
            var proj_id = data.proj_id;
            
            $("#proj_id").val(proj_id);
            $('#tl0 div').html(timeline_detail);
            $('#project').html(phase_list);
            $('#setting_project_title').val(data.proj_title);
            $('#list_contact').html(data.contact_html);
            $('#newartista2').val(artist_id).attr("selected", "selected");
            $('.projtitle').html('Project: '+data.proj_title);
            $('#list_contact').html(data.contact_html);
        },
        complete:function(){
        	var phaseperiod = $(".current-phase").find(".kies").text();
        	if(phaseperiod == "Week"){
	        	taskspos("tl0")
		        tlheight(500,"tl0")
		        tlwidth(70,'tl0');
        	}else{
	    		taskspos("tl0")
		        tlheight(500,"tl0")
		        tlwidth(30,'tl0');
        	}
        $("#tl0 .tasks span").on("mousedown",function(event){
            currposelem = $(this).position();
            $(this).attr({"data-currleft":currposelem.left,"data-currtop":currposelem.top})
        })
       }
    });  
}

// Overlap project
function overlap_project(projid,rowno,flag){
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    $.ajax({
        type : "POST",
        url : admin_url,
        
        data: {
            action:'overlap_project', 
            id:user_id,
            proj_id:projid,
            row_no:rowno,
            flag :flag
        },
        success: function( data ) {
            //console.log(data)
            /*if(data){
                display_project_list();
                display_phase_task_list(proj_id);
            }*/
       },
   });   
}
