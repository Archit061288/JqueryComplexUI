var alert_cont_ids = [];
var projdays = 0;
$(function() {
    var y =0;
    console.log($('#editalert'));
    $(".datepicker").datepicker({
       // dateFormat: "dd-M-yy",
       minDate: 0,
       maxDate: new Date(2017, 12-1 , 31),
       showAnim: "fadeIn",
        //numberOfMonths: [3,1],
        beforeShowDay: function(date) {
            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());
            if (date >= date1 && date <= date2) {
                return [true, 'ui-state-error', 'tooltipText'];
            }

            return [true, '', ''];

                //return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
        },
        onSelect: function(dateText, inst) {
            //console.log(dateText, inst.selectedDay)
            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());
            var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);

            $("ui-state-error").first().css( "border", "1px solid !important" );
            if (!date1 || date2) {
                $(".changetitle").text("Pick end:")
                $("#input1").val(dateText);
                $("#input2").val("");
                $(this).datepicker();
            //$(this).datepicker('refresh');
            } else if( selectedDate < date1 ) {
                $(".changetitle").text("Done")
                $("#input2").val( $("#input1").val() );
                $("#input1").val( dateText );
                $(this).datepicker();
                //$(this).datepicker('refresh');
            } else {
                $(".changetitle").text("Done")
                $("#input2").val(dateText);
                $(this).datepicker();
                //$(this).datepicker('refresh');
            }
            var currentdate = $(".datepicker").datepicker('getDate');
            currmonth = currentdate.getMonth()+1;
            //console.log(currentdate.getMonth()+1,"currentdate")
            adduistateerror(currmonth);
        }
    });
    
    $(".ph_datepicker").datepicker({
       // dateFormat: "dd-M-yy",
       minDate: 0,
       maxDate: new Date(2017, 12-1 , 31),
       showAnim: "fadeIn",
        //numberOfMonths: [3,1],
        beforeShowDay: function(date) {
            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#ph_input1").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#ph_input2").val());
            if (date >= date1 && date <= date2) {
                return [true, 'ui-state-error', 'tooltipText'];
            }

            return [true, '', ''];

                //return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
        },
        onSelect: function(dateText, inst) {
            //console.log(dateText, inst.selectedDay)
            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#ph_input1").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#ph_input2").val());
            var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);

            $("ui-state-error").first().css( "border", "1px solid !important" );
            if (!date1 || date2) {
                $(".changetitle").text("Pick end:")
                $("#ph_input1").val(dateText);
                $("#ph_input2").val("");
                $(this).datepicker();
            //$(this).datepicker('refresh');
            } else if( selectedDate < date1 ) {
                $(".changetitle").text("Done")
                $("#ph_input2").val( $("#ph_input1").val() );
                $("#ph_input1").val( dateText );
                $(this).datepicker();
                //$(this).datepicker('refresh');
            } else {
                $(".changetitle").text("Done")
                $("#ph_input2").val(dateText);
                $(this).datepicker();
                //$(this).datepicker('refresh');
            }
            var currentdate = $(".ph_datepicker").datepicker('getDate');
            currmonth = currentdate.getMonth()+1;
            //console.log(currentdate.getMonth()+1,"currentdate")
            adduistateerror(currmonth);
        }
    });

    $(document).on('click', '.ui-datepicker-prev', function () {
    currmonth = currmonth-1;
    //console.log(currmonth,"prev")
    adduistateerror(currmonth);
    $("body").find(".datepicker td.ui-datepicker-today a").removeClass("ui-state-hover");
    $("body").find(".edit_datepicker td.ui-datepicker-today a").removeClass("ui-state-hover");
    setTimeout(function(){
        $("body").find(".edit_datepicker td.kiesmiddle a").removeClass("ui-state-active");    
    },100)
    

});

    $(document).on('click', '.ui-datepicker-next', function () {
        currmonth = currmonth+1;
        //console.log(currmonth,"next")
        adduistateerror(currmonth);
    });
    
    // Phase - 2  Dt:29-6-2017 
    $(".edit_datepicker").datepicker({
    minDate: 0,
    maxDate: new Date(2017, 12-1 , 31),
    beforeShowDay: function(date) {

        var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#edit_dt1").val());
        var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#edit_dt2").val());

        if (date >= date1 && date <= date2) {

            return [true, 'ui-state-error', 'tooltipText'];
        }

        return [true, '', ''];

            //return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
        },
        //beforeShowDay: highlightDays,
        onSelect: function(dateText, inst) {
            var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#edit_dt1").val());
            var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#edit_dt2").val());
            var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);

            if (!date1 || date2) {
                 $(".changetitle").text("Pick end:")
                $("#edit_dt1").val(dateText);
                $("#edit_dt2").val("");
                $(this).datepicker();
            //$(this).datepicker('refresh');
        } else if( selectedDate < date1 ) {
             $(".changetitle").text("Done")
            $("#edit_dt2").val( $("#edit_dt1").val() );
            $("#edit_dt1").val( dateText );
            $(this).datepicker();
            //$(this).datepicker('refresh');
        } else {
            $(".changetitle").text("Done")
         $("#edit_dt2").val(dateText);
         $(this).datepicker();
            //$(this).datepicker('refresh');
        }
        var currentdate = $(".edit_datepicker").datepicker('getDate');
        currmonth = currentdate.getMonth()+1;
        adduistateerror(currmonth);
    }

});

    // SHOW/HIDE DONE PHASES/TASKS BY CLICKING THE 'DONE' TITLE
    $(document).on("tap", ".showhide", function() {
        var dit = $(this);
        var par = dit.parent().parent().parent();
        var icon = dit.find('div');
        if ( dit.hasClass('projnote') ) {
            if ( dit.hasClass('hide1') ){
                   $('#projnote2').hide();
                    dit.removeClass('hide1').addClass('show1');
            } else {
                   $('#projnote2').show();
                    dit.removeClass('show1').addClass('hide1');
            }
        } else if ( dit.hasClass('projinfo') ) {
            if ( dit.hasClass('hide1') ){
                    $('#projinfo').hide();
                    dit.removeClass('hide1').addClass('show1');
            } else {
                    $('#projinfo').show();
                    dit.removeClass('show1').addClass('hide1');
            }
        } else if ( dit.hasClass('phasenote') ) {
            if ( dit.hasClass('hide1') ){
                   $('#phasenote2').hide();
                    dit.removeClass('hide1').addClass('show1');
            } else {
                   $('#phasenote2').show();
                    dit.removeClass('show1').addClass('hide1');
            }
        } else if ( dit.hasClass('phaseinfo') ) {
            if ( dit.hasClass('hide1') ){
                    $('#phaseinfo').hide();
                    dit.removeClass('hide1').addClass('show1');
            } else {
                    $('#phaseinfo').show();
                    dit.removeClass('show1').addClass('hide1');
            }
        } else {
            if ( dit.hasClass('hide1') ){
                   par.find('tr:not(tr:first-child),th:not(th:first-child)').hide();
                   par.parent().next('.btn').hide();
                   if ( par.parent().hasClass('donedone') ) { par.parent().removeClass('mb20') }
                   if ( par.parent().hasClass('notdone') ) { par.parent().removeClass('mb10') }
                    dit.removeClass('hide1').addClass('show1');
            } else {
                    par.find('tr:not(.noo,.in),th').show();
                   par.parent().next('.btn').show();
                   if ( par.parent().hasClass('donedone') ) { par.parent().addClass('mb20') }
                   if ( par.parent().hasClass('notdone') ) { par.parent().addClass('mb10') }
                    dit.removeClass('show1').addClass('hide1');
            }
        }
    });
    
    // ENABLE/DISABLE CHECKBOXES FOR CONTACTS IN ADD PROJECT WINDOW
    $(document).on("tap", "#newprojuser tr td", function() {
        var img_url = $('#img_url').val();
        var deze = $(this).index() + 1;
        var cb = $(this).find('img');
        var cont_id = $(this).attr('data-contid');
        var user_id = get_userid();
        var admin_url = get_ajaxurl();
        if(cb.attr('src') == img_url+'status4.png'){
            var cont_status = 'inactive';
        }
        else{
            var cont_status = 'active';
        }
        
        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: 'json',
            data: {
                action:'update_contact_status',
                id:user_id,
                cont_id:cont_id,
                cont_status:cont_status
            },
            success: function( data ) {
                if(data.status){
                    if ( cb.attr('src') == img_url+'status4.png' ) {
                        cb.attr('src',img_url+'status0.png');
                    }else {
                        cb.attr('src',img_url+'status4.png');
                    }
                }
            }
        });
    });
    
    // SET CHECKBOXES FOR CONTACTS AND ALERTS
    $('.users1 input').prop('checked', true);	
    $('#alert3, #reminder3').prop('checked', false);	
    $('#alertme').prop('checked', true);	

    // ALERT - ENABLE/DISABLE THE DAY/WEEK DROPDOWNS BASED ON 'AT DAY OF THE TASK' CHECKBOX
    $(document).on("change", "#alert3", function() {
        if ( $(this).prop('checked') == false ) {
            $('#alert2 select').prop('disabled', false);
        } else {
            $('#alert2 select').prop('disabled', true);
            check_alert_day_task();
        }
    });	

    // ALERT - ENABLE/DISABLE THE DAY/WEEK DROPDOWNS BASED ON THE REMINDER 'DISABLED' CHECKBOX
    $(document).on("change", "#reminder3", function() {
        if ( $(this).prop('checked') == true ) {
            $('#reminder2 select').prop('disabled', true);
        } else {
            $('#reminder2 select').prop('disabled', false);
        }
    });

    // ALERT - MAKE THE DAY/WEEK/MONTH DROPDOWN PLURAL/SINGULAR BASED BASED ON THE NUMBER DROPDOWN
    $(document).on("change", ".one", function() {
        var par = $(this).parent().parent().find('.two');
        if ( $(this).val() == '1' ) {
            par.find('option:eq(0)').text('day before');
            par.find('option:eq(1)').text('week before');
            par.find('option:eq(2)').text('month before');
        } else {
            par.find('option:eq(0)').text('days before');
            par.find('option:eq(1)').text('weeks before');
            par.find('option:eq(2)').text('months before');
        }
    });

    // ALERT - SEND TO FIELD - AVOID ENTERING TWO COMMAS AND REPLACE CERTAIN CHARACTERS WITH A COMMA
    $('.reminder').keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        var str = $(this).val();
        var n = str.endsWith(",");
        if (keycode == '32' || keycode == '13' || keycode == '186' || keycode == '191' || keycode == '188') {
            e.preventDefault();
            if ( n == false && str != '' ) {
                    $(this).val((str + ','));
            }
        }
});
    
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
        
    // Display contact detail for edit contact
    $(document).on("tap", "#list_contact tr td:last-child", function() {
        var cont_id = $(this).parent()[0]['attributes'][0]['value'];
        $("#cont_id").val(cont_id);
        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: 'json',
            data: {
                action:'display_edit_contact_detail',
                id:user_id,
                cont_id:cont_id,
            },
            success: function( data ) {
                console.log(data,'display_edit_contact_detail')
                if(data.status){
                   $("#edit_cname").val(data.title); 
                   $("#edit_cemail").val(data.email);
                   $('#edit_ctag').tokenfield('destroy');
                   $("#edit_ctag").val(data.tags+',');
                   $('#edit_ctag').tokenfield({
                        autocomplete: {
                            source: admin_url+'/?action=get_tag_list',
                            delay: 100
                        },
                        showAutocompleteOnFocus: false
                    });
                    $('#edit_ctag').on('tokenfield:createtoken', function (event) {
                        var existingTokens = $(this).tokenfield('getTokens');
                        $.each(existingTokens, function(index, token) {
                            if (token.value === event.attrs.value)
                                event.preventDefault();
                        });
                    });
                }
            }
        });
    });
        
    // Get All Contact Tags - Input Auto Suggestion Box
    $('#cont_tags').tokenfield({
	autocomplete: {
	    source: admin_url+'/?action=get_tag_list',
	    delay: 100
	},
	showAutocompleteOnFocus: false
    })

    $('#cont_tags').on('tokenfield:createtoken', function (event) {
        var existingTokens = $(this).tokenfield('getTokens');
        $.each(existingTokens, function(index, token) {
            if (token.value === event.attrs.value)
                event.preventDefault();
        });
    });
    
    // Get All Contact Tags for Setting - Input Auto Suggestion Box
    $('#cont_tags_setting').tokenfield({
	autocomplete: {
	    source: admin_url+'/?action=get_tag_list',
	    delay: 100
	},
	showAutocompleteOnFocus: false
    })

    $('#cont_tags_setting').on('tokenfield:createtoken', function (event) {
        var existingTokens = $(this).tokenfield('getTokens');
        $.each(existingTokens, function(index, token) {
            if (token.value === event.attrs.value)
                event.preventDefault();
        });
    });
    
    /* Check alert time */
    $( "#alert_time" ).change(function() {
        var alert_int = $("#alert_interval").val();
        check_alert_time($(this).val(),alert_int);
    });
    
    $( "#alert_interval" ).change(function() {
        var alert_time = $("#alert_time").val();
        check_alert_time(alert_time,$(this).val());
    });
    
    $( "#reminder_time" ).change(function() {
        var rem_alert_int = $("#reminder_interval").val();
        check_alert_time($(this).val(),rem_alert_int);
    });
    
    $( "#reminder_interval" ).change(function() {
        var rem_alert_time = $("#reminder_time").val();
        check_alert_time(rem_alert_time,$(this).val());
    });
                       
    var project_id = $("#tl23").find("span:first").attr('data-id');
    var proj_id = '';
    
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'display_phase_detail',
            id:user_id,
            p_id:project_id,
        },
        success: function( data ) {
            var timeline_detail = data.timeline_data;
            var phase_list = data.phase_list;
            var artist_id = data.proj_artist;
            proj_id = data.proj_id;
            
            $("#proj_id").val(proj_id);
            $('#tl0 div').html(timeline_detail);
            $('#project').html(phase_list);
            $('#setting_project_title').val(data.proj_title);
            $('#newartista2').val(artist_id).attr("selected", "selected");
            $('.projtitle').html('Project: '+data.proj_title);
            $('#list_contact').html(data.contact_html);
            //display_project_list();
        },
        complete:function(){
            taskspos("tl0")
            tlheight(500,"tl0")
            tlwidth(30,'tl0');
            $("#tl0 .tasks span").on("mousedown",function(event){
                currposelem = $(this).position();
                $(this).attr({"data-currleft":currposelem.left,"data-currtop":currposelem.top})
            });
        }
    });
         
    /* Settings 
    $("#settings_icon").click(function(){
       
        var user_id = get_userid();
        var admin_url = get_ajaxurl();
        var frstspan = $("#tl23 .tasks span[data-spanselect='true']").attr("data-id");
        $("#proj_id").val("");
        $('#newartista2').val("");
        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: 'json',
            data: {
                action:'project_settings',
                proj_id:frstspan,
            },o
            success: function( data ) {
                if(data){
                    var artist_id = data.proj_artist;
                    var proj_id = data.proj_id;
                    $("#proj_id").val(proj_id);
                    if(hidedata){
                        hidedata = false;
                    }else{
                        $('#setting_project_title').val(data.proj_title);
                        $('.projtitle').html('Project: '+data.proj_title);
                    }
                    //$('#setting_project_title').val(data.proj_title);
                    $('#newartista2').val(artist_id).attr("selected", "selected");
                    flex('settings')
                    //display_project_list();
                    //$("#tl1-dropdowns div").html(data);
                }
            },
            complete:function(){

            }
        });
    })*/

    /* Artist - Project dropdown*/
    $('#tl1-dropdowns > div').show();
    //$('#tl1-dropdowns > div').animate({'height': 50 },300);
    //$('#tl1-dropdowns').delay(1000).animate({'height':  $('#tl1-dropdowns > div').height() + 55 },300);
    display_search_project_data();
    $('.ui-datepicker-prev, .ui-datepicker-next').attr('title','');
    
} );

$(document).ready(function(){
      
    $(".date1content").datepicker({
        dateFormat: "dd-M-yy",
        minDate: 0,
        maxDate: new Date(2017, 12-1 , 31),
        autoclose: true,
        onSelect: function (date) {
            $("#dt1").val(date);
        }
    });
})

var temp_id = '';
function display_search_project_data(){
    var art_sel = $("#artist_list").val();
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    $.ajax({
        type : "POST",
        url : admin_url,
        //dataType: 'json',
        data: {
            action:'display_search_project_data',
            id:user_id,
        },
        success: function( data ) {
            ////console.log(data)
            if(data){
                $("#tl1-dropdowns div").html(data);
                $('#artist_list  option[value='+art_sel+']').attr("selected", "selected");
                display_project_data(art_sel,1);
            }
        }
    });
}

var hidedata= false;

function adduistateerror(currmonth){
    setTimeout(function(){
    var uicallength = $("body").find("table tr td.ui-state-error");
      
    var splarr1 = $("#input1").val().split("/");
    var splarr2 = $("#input2").val().split("/");

    var splarredit1 = $("#edit_dt1").val().split("/");
    var splarredit2 = $("#edit_dt2").val().split("/");
    
    var ph_dt1 = $("#ph_input1").val().split("/");
    var ph_dt2 = $("#ph_input2").val().split("/");
    
    //console.log(ph_dt1 ,"hello ", ph_dt2 ," and here", uicallength)
    var selmonth = "0"+currmonth;
     //|| (ph_dt1[0] == ph_dt2[0] && ph_dt1[0] != "" && ph_dt2[0] != "")
    
    if((splarr1[0] == splarr2[0] && splarr1[0] != "" && splarr2[0] != "") 
        || (splarredit1[0] == splarredit2[0] && splarredit1[0] != "" && splarredit2[0] != "")
        || (ph_dt1[0] == ph_dt2[0] && ph_dt1[0] != "" && ph_dt2[0] != "")
        ) {
        //console.log("if")
        for (var i = 0; i < uicallength.length; i++) {
           if(i==0){
               $(uicallength[i]).addClass("kiesstart")
           }else if(i==(uicallength.length-1)){
               $(uicallength[i]).addClass("kiesend")
           }else{
               $(uicallength[i]).addClass("kiesmiddle")
           }
           if(i==0 && i==(uicallength.length-1)){
            $(uicallength[i]).addClass("starttoend").removeClass('kiesstart kiesend kiesmiddle');
        }
    }
}   else{
    ////console.log(uicallength.length)
    for (var i = 0; i < uicallength.length; i++) {
        if(i==0){
            //console.log(selmonth,"--",splarr1[0],"and",splarredit1[0])
             //|| selmonth == ph_dt1[0]
            if(selmonth == splarr1[0] || selmonth == splarredit1[0] || selmonth == ph_dt1[0]){
               $(uicallength[i]).addClass("kiesstart")
           }else if(uicallength.length == 1){
               $(uicallength[i]).addClass("kiesend")
           }else{
            $(uicallength[i]).addClass("kiesmiddle")
           }
       }else if(i==(uicallength.length-1)){
        if(selmonth == splarr2[0] || selmonth == splarredit2[0] || selmonth == ph_dt2[0]){
           $(uicallength[i]).addClass("kiesend")
       }else{
        $(uicallength[i]).addClass("kiesmiddle")
        }
    }else{
   $(uicallength[i]).addClass("kiesmiddle")
}
}
}
},100)
}

// CHOOSE USER TYPE
function kies(deze,die,dat,daar){
    var img_url = $('#img_url').val();
    $('#user'+deze).addClass('kies');
    $('#user'+die).removeClass('kies');
    $('#user'+deze+' img').attr('src',img_url+'user'+dat+'b.png');
    $('#user'+die+' img').attr('src',img_url+'user'+daar+'.png');
}
// CHOOSE DATE TYPE
function kies2(deze,die,dat,daar,sedate){
    ////console.log(sedate)
    $(".date2content").datepicker('destroy');
    if(sedate == 'sd'){
        $(".date_content .date1content").css("display","block");
        $(".date_content .date2content").css("display","none");
        
        
        
        $(".date1content").datepicker({
        dateFormat: "dd-M-yy",
        minDate: 0,
        maxDate: new Date(2017, 12-1 , 31),
        autoclose: true,
        onSelect: function (date) {
           
        }
    });
//        $("#date1").datepicker("show");
//        $("#date2").datepicker("hide");
//        
//        $("#dt1").removeClass('dt2date');
//        $("#dt2").addClass('dt2date');
//        $("#dt2").val('');
    }else if(sedate == 'ed'){
        console.log(projdays)

        $(".date2content").datepicker({
        dateFormat: "dd-M-yy",
        minDate: projdays,
        maxDate: new Date(2017, 12-1 , 31),
        autoclose: true,
        onSelect: function (date) {
            $("#dt2").val(date);
        }
    });
    
    $(".date_content .date1content").css("display","none");
    $(".date_content .date2content").css("display","block");
    
    
//        $("#date1").datepicker("hide");
//        $("#date2").datepicker("show");
//     $("#dt1").val('');
//     $("#dt1").addClass('dt2date');
//     $("#dt2").removeClass('dt2date').addClass('dt1date');
 }
 var img_url = $('#img_url').val();
 $('#date'+deze).addClass('kies');
 $('#date'+die).removeClass('kies');
 $('#date'+deze+' img').attr('src',img_url+'date'+dat+'b.png');
 $('#date'+die+' img').attr('src',img_url+'date'+daar+'.png');
}
// SHOW POPUP FLEX ON DESKTOP, FIXED ON MOBILE
function flex(id){
        
    //clear_addprojectdata();
    $("#input1").val("")
    $("#input2").val("")
    $(".datepicker").datepicker();
    $('.datepicker').datepicker('refresh');
    $("#edit_dt1").val("")
    $("#edit_dt2").val("")
    $(".edit_datepicker").datepicker();
    $('.edit_datepicker').datepicker('refresh');
    $("#ph_input1").val("")
    $("#ph_input2").val("")
    $(".ph_datepicker").datepicker();
    $('.ph_datepicker').datepicker('refresh');
    $('body').addClass('flex');
    $('body').css({'overflow':'hidden'});
    if ( $('body').hasClass('flex') ) {
        if ( $(window).height() <= 650 ){
            $('#'+id).css({'display':'block'});
            $('#'+id+' > div').css({'display':'block'});
        } else {
            $('#'+id).css({'display':'flex'});
            $('#'+id+' > div').css({'display':'inline-block'});
        }
    }
    if(id=="choosetemplate"){
        $("#date1").addClass("kies");
        $("#date2").removeClass("kies");
        $(".date1content").css("display","block");
        $(".date2content").css("display","none");
        clear_addprojectdata();
    }
    $('#'+id).scrollTop(0);
    if(id=="adduser2" || id=="adduser"){
       $(".token").remove(); 
    }
    if(id=="addtask"){
        // setTimeout(function(){
        //console.log("here")
        $("body").find(".datepicker .ui-state-active").attr('style', 'color: #333 !important; background: transparent !important');   
        // },200)

    }
    if(id=="addphase"){
        // setTimeout(function(){
        //console.log("here")
        $("body").find(".ph_datepicker .ui-state-active").attr('style', 'color: #333 !important; background: transparent !important');   
        // },200)

    }
    if(id=="editphase"){
        var ph_color = '';
        $("#phasename2").val($('.ph-title').html());
        var ph_color = $('.ph-color').html();
        $('#editphase .colorpick i').removeClass('kies');
        $('#editphase .colorpick i[data-col="'+ph_color+'"]').addClass('kies');
    }
    
    if(id=="settings"){
        $( "#newartista2"  ).change(function() {
            var art_id = $(this).val();
            console.log(art_id,"newartista2")
            display_contact_list(art_id,1);
        });
    }
   
    
    setTimeout(function(){
        if(id=="edittask"){
            $("body").find(".edit_datepicker .kiesmiddle .ui-state-active").attr('style', 'background: #555 !important');
        }
        
        if(id=="addproject"){
        // Display contact list based on selected artist from Add project popup
            var sel_art_id = $("#newartista1 option:selected").val();
            display_contact_list(sel_art_id,0);
            $( "#newartista1"  ).change(function() {
                var art_id = $(this).val();
                display_contact_list(art_id,0);
            });
        }
        
    },300)

}
// MAKE POPUP ALWAYS FLEX - FOR SMALL ALERTS
function flex2(id){
    ////console.log(id)
    //$('body').css({'overflow':'hidden'});
    $('#'+id).css({'display':'flex'});
    $('#'+id+' > div').css({'display':'inline-block'});
}
// CHECK IF POPUP SHOULD BE FLEX
function flexcheck(){
    if ( $('body').hasClass('flex') ) {
        $('.popup:visible').each(function() {
            if ( $(window).height() < 650 ){
                $(this).css({'display':'block'});
                $(this > div).css({'display':'block'});
            } else {
                $(this).css({'display':'flex'});
                $(this > div).css({'display':'inline-block'});
            }
        });
    }
}
// HIDE LAST POPUP (DISABLE FLEX FOR FUTURE POPUPS) AND MAKE BODY SCROLL
function xx(){
    $('body').removeClass('flex');
    $('body').css({'overflow':'auto'});
}
// SHOW ID
function toon(id){
    $('#'+id).show()
}
// HIDE ID, MAKE BODY SCROLL
function weg(id){
    $("#templatesingle").removeClass('kies');
    $("#input1").val("")
    $("#input2").val("")
    $(".datepicker").datepicker();
    $('.datepicker').datepicker('refresh');
    $("#edit_dt1").val("")
    $("#edit_dt2").val("")
    $(".edit_datepicker").datepicker();
    $('.edit_datepicker').datepicker('refresh');
    $('.datepicker').datepicker('setDate', null);
    $('.edit_datepicker').datepicker('setDate', null);
    $('#'+id).hide();
    $('body').css({'overflow':'auto'});
    if(id=="addtask"){
        $(".changetitle").text("Pick start:")    
    }
    if(id=="edittask"){
        $(".changetitle").text("Pick start:")    
    }
    
}
// HIDE ID
function weg2(id){
    $('#'+id).hide();
}
// FOCUS ON TEXT FIELD
function invoer(id){ $('#'+id).focus() }
// CLEAR POPUP DATA
function leeg(id){
    $('#'+id+' .calendar').removeClass('kiesend');
    $('#'+id+' input[type!=hidden], #'+id+' textarea').val(" ");
    //$('#'+id+' .caltitle').text('Pick start:');
    $('#'+id+' i').removeClass('kies kies-e kies-e2 kies-m kies-m2 kies-s kies-s2 kies-rond');
}
var note="";
function textAreaAdjust(o) {
    note = $(':focus');
    o.style.height = "1px";
    o.style.height = o.scrollHeight + "px";
}

// REPLACE MONTH NAMES WITH MONTH NUMBERS
function datakort(){
    if ( $(window).width() <= 500 ){
            // SWITCH TO MONTH NUMBERS
            $('.project tr td:nth-child(4), .project tr td:nth-child(5), .phase tr td:nth-child(7), .phase tr td:nth-child(8)').text(function(index,text){
                return text.replace(' jan','-1').replace(' feb','-2').replace(' mar','-3').replace(' apr','-4').replace(' may','-5').replace(' jun','-6').replace(' jul','-7').replace(' aug','-8').replace(' sep','-8').replace(' oct','-10').replace(' nov','-11').replace(' dec','-12');
            });
        } else {
            // SWITCH BACK TO FULL MONTH NAMES
            $('.project tr td:nth-child(4), .project tr td:nth-child(5), .phase tr td:nth-child(7), .phase tr td:nth-child(8)').text(function(index,text){
                return text.replace('-1',' jan').replace('-2',' feb').replace('-3',' mar').replace('-4',' apr').replace('-5',' may').replace('-6',' jun').replace('-7',' jul').replace('-8',' aug').replace('-9',' sep').replace('-10',' oct').replace('-11',' nov').replace('-12',' dec');
            });
        }
    }
    var resizeTimer;
    $(window).on('resize', function(e) {
     clearTimeout(resizeTimer);
     resizeTimer = setTimeout(function() {
      flexcheck();
      datakort();
  }, 250);
 });

    /* CHANGE TIMELINE ZOOM SCALE */
    function tlwidth(zoom,id){
        $('#'+id+' .grid i').css({'width':zoom});
        $('#'+id).attr('data-zoom',zoom);
        taskspos(id);
        tasksdraggable(zoom);
        var monthperiod = $(".header #search-product").nextAll(".kies").text();
        /* GET CURRENT LEFT POSITION */
        if(monthperiod == "Quarter"){
            tasksdraggable(10);
        }else if(monthperiod == "Year"){
            tasksdraggable(3);
        }else{
            tasksdraggable(30);
        }
        if ( zoom > 30 ) {
          var nu = parseInt($('#'+id+' > div').css('left'),10) * 2;
          $('#'+id+' > div').css({'left':nu});
      } else {
          var nu = parseInt($('#'+id+' > div').css('left'),10) * 0.5;
          $('#'+id+' > div').css({'left':nu});
      }


  }

// ADD A NEW PROJECT
function addproject(){
    var gekozen = $('.templates .kies').length;
    if (  gekozen == 0){
        flex2('choosetemplateerror');
    } else {
        weg('choosetemplate');
        flex('addproject');
        invoer('addprojectname');
        $('.newartist').val( $('.newartist option:first').val() );
    }
}
// ADD A NEW ARTIST
function addartist(){
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    var color;
    $('#addartist .colorpick i').each(function(){
        if ( $( this ).hasClass( "kies" ) ) {
            color = $(this).css('background-color');
        }
    });

    var name = $.trim($('#editartistname').val());
        
    if ( name == '' ) {
        flex2('addartisterror');
    } else {
        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: "json",
            data: {
                action:'add_artist',
                id:user_id,
                a_name:name,
                a_color:color,
            },
            success: function( data ) {
                if(data.status == 1){
                    weg2('addartist');
                    $('.newartist').each(function(){
                        $(this).find('option:last').remove();
                    });
                    $('.newartist').append('<option value="'+data.artist_id+'">'+name+'</option>');
                    $('.newartist').val( $('.newartist option:last').val() );
                    $('.newartist').append('<option value="addnew">+ Add new</option>');
                    $('#artist_list').append('<option value="'+data.artist_id+'">'+name+'</option>');
                }
            }
        });
    }
}

// CANCEL ADDING NEW ARTIST
function canceladdartist(){
    weg2('addartist');
    $('.newartist').val( $('.newartist option:first').val() );
}
// HIDE NOTES AND INFO
function wegnoteinfo(pid){
    $('#'+pid+' .noo, #'+pid+' .in').hide();
    $('#'+pid+' .no3').each(function(){
        $(this).removeClass('no3').addClass('no1');
    });
    $('#'+pid+' .in3').each(function(){
        $(this).removeClass('in3').addClass('in2');
    });
}

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

var flag = 0;
var span_data ="";
// Display Project list
function display_project_list(art_id){
    var user_id = get_userid();
    var admin_url = get_ajaxurl();

    $.ajax({
        type : "POST",
        url : admin_url,
       // dataType: 'json',
       data: {
        action:'display_project_list',
        id:user_id,
        art_id : art_id
    },
    success: function( data ) {
        
        if(data){
            $("#tl23 div").html(data);
            //$('#tl23 .tasks span:first em').css("background-color","none");
            //$('#tl23 .tasks span:first em').css("color","black");
        }
        $("#tl23 .tasks span").each(function(i,value){
            if($(value).attr("data-spanselect")){
                $(value).attr("data-row",i+1)
            }else{
                $(value).attr("data-row",i+1)
            }
        })
        var proj_rowid=[]
        setTimeout(function(){
            $('#tl23 > div .tasks span').each(function(i) {
                var rowid = parseFloat($(this).attr('data-row'));
                var pid = parseFloat($(this).attr('data-id'));
                proj_rowid.push({"pid":pid,"rowid":rowid})
            });
            proj_rowid = JSON.stringify(proj_rowid);
            add_project_rows(proj_rowid);
        },100)
    },
    complete:function(){
        var monthperiod = $(".header #search-product").nextAll(".kies").text();
        if(monthperiod == "Quarter"){
            quarterclick = true;
            //console.log(quarterclick,"quarterclick")
            taskspos("tl23")
            tlheight(500,"tl23")
            tlwidth(10,'tl23');
            $("#tl23[data-zoom=10] .grid i").each(function(ind,val){
                        if((ind%2) == 0){
                            $(val).css({"background":"rgba(0,0,0,0.1)","font-size": "8px","color":"transparent"})
                        }else{
                            $(val).css({"background":"rgba(153,153,153,0.1)","font-size": "8px","color":"transparent"})
                        }
                    })
             var monthsize = $("#tl23[data-zoom=10] .grid i.month");
                    $("#tl23[data-zoom=10] .grid i.month").each(function(ind,val){

                        var monthvalue = $(val).find("em").text();
                        //console.log(monthvalue)
                        if(monthvalue == "January" || monthvalue == "March" || monthvalue == "May" || monthvalue == "July" || monthvalue == "September" || monthvalue == "November"
                            || monthvalue == "Jan" || monthvalue == "Mar" || monthvalue == "May" || monthvalue == "Jul" || monthvalue == "Sep" || monthvalue == "Nov"){
                            $(this).css("background","rgba(0,0,0,0.1)")
                        $(val).nextAll().css("background","rgba(0,0,0,0.1)")
                    }else{
                        $(this).css("background","rgba(153,153,153,0.1)")
                        $(val).nextAll().css("background","rgba(153,153,153,0.1)")
                    }
                    var text = monthvalue.replace(monthvalue,monthvalue.substring(0,9))
                    //console.log(text)
                    $(val).find("em").text(text)
                })
        }else if(monthperiod == "Year"){
            taskspos("tl23")
            tlheight(500,"tl23")
            tlwidth(3,'tl23');
            $("#tl23[data-zoom=3] .grid i.month").each(function(ind,val){
                var monthvalue = $(val).find("em").text();
                if(monthvalue == "January" || monthvalue == "March" || monthvalue == "May" || monthvalue == "July" || monthvalue == "September" || monthvalue == "November"
                    || monthvalue == "Jan" || monthvalue == "Mar" || monthvalue == "May" || monthvalue == "Jul" || monthvalue == "Sep" || monthvalue == "Nov"){
                    $(val).nextAll().css("background","rgba(0,0,0,0.1)")
            }else{
                $(val).nextAll().css("background","#999")
            }
            var text = monthvalue.replace(monthvalue,monthvalue.substring(0,3))
            $(val).find("em").text(text)
        })
        }else{
            taskspos("tl23")
            tlheight(500,"tl23")
            tlwidth(30,'tl23');
        }

        $("#tl23 .tasks span").on("mousedown",function(event){
            currposelem = $(this).position();
            $(this).attr({"data-currleft":currposelem.left,"data-currtop":currposelem.top})
        })
        if(proj_id_sel){
          //  $('select#get_project option[value="'+proj_id_sel+'"]').attr('selected','selected');
          $('#tl23 span[data-id="'+proj_id_sel+'"]').css("background-color","#4395c9");
          $('#tl23 span[data-id="'+proj_id_sel+'"]').attr("data-spanselect","true");
          $('#tl23 span[data-id="'+proj_id_sel+'"]').find("em").css("color","#fff");
      }
  }
});

}

var selected_proj_id = '';
function display_phase_detail(temp,status){

    var img_url = $('#img_url').val();
    if(!status){
        $('.overly_loader').css('display','block');
        $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
    }else{
     $('.overly_loader').css('display','none');
     $('#image-zoom img').attr({"src":"","width":"","height":""});
 }

 var user_id = get_userid();
 var admin_url = get_ajaxurl();

    // setTimeout(function(){
        var  project_id;
        if(temp == ''){
            project_id = $("#tl23").find("span:first").attr('data-id');
        }
        else{
            project_id = temp;
        }
        //alert(project_id)
        selected_proj_id = project_id;
        ////console.log($('select#get_project option').val(project_id).attr("selected", "selected"),'selct');
        //$('select#get_project option[value="'+project_id+'"]').attr('selected','selected');

        $("#tl23 span").css({"background-color":"","data-spanselect":"false"});
        $("#tl23 span").attr("data-spanselect","false");
        $("#tl23 span em").css({"color":"black"});


        $('#tl23 span[data-id="'+project_id+'"]').css("background-color","#4395c9");
        $('#tl23 span[data-id="'+project_id+'"]').attr("data-spanselect","true");
        $('#tl23 span[data-id="'+project_id+'"]').find("em").css("color","#fff");
        var art_ids = $("#artist_list").val();
        if(art_ids != 'all'){
            var proj_count = $('select#get_project option').length;
            var proj_ids_arr = [];
            $("select#get_project option").each(function()
            {
                proj_ids_arr.push($(this).val());
            });
            span_data.each(function(i,value){
                var proj_val = $(value).attr("data-id");
                if(proj_count > 1){
                    if($.inArray(proj_val, proj_ids_arr) == -1) {
                       // //console.log($(value),'select-pro-id')
                        //$(value).css("display","none")
                        $('#tl23 span[data-id="'+proj_val+'"]').css("display","none");
                    }else{
                        $('#tl23 span[data-id="'+proj_val+'"]').css("display","block");
                        //$(value).css("display","block")
                    }
                }
                else{
                    if(proj_val != project_id){

                        $('#tl23 span[data-id="'+proj_val+'"]').css("display","none");
                        //$(value).css("display","none")
                    }else{
                        $('#tl23 span[data-id="'+proj_val+'"]').css("display","block");
                        //$(value).css("display","block")
                    }
                }
            })
        }
        else{
            span_data.each(function(i,value){
            })
        }
        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: 'json',
            data: {
                action:'display_phase_detail',
                id:user_id,
                p_id:project_id,
            },
            success: function( data ) {
                if(data){

                    var timeline_detail = data.timeline_data;
                    var phase_list = data.phase_list;
                    var artist_id = data.proj_artist;
                    var proj_id = data.proj_id;

                    $("#proj_id").val(proj_id);
                    $('#tl0 div').html(timeline_detail);
                    $('#project').html(phase_list);
                    $('#setting_project_title').val(data.proj_title);
                    $('.projtitle').html('Project: '+data.proj_title);
                    $('#newartista2').val(artist_id).attr("selected", "selected");
                    $('#list_contact').html(data.contact_html);
                    $('.overly_loader').css('display','none');
                }
            },
            complete:function(){
                taskspos("tl0")
                tlheight(500,"tl0")
                tlwidth(30,'tl0');
                $("#tl0 .tasks span").on("mousedown",function(event){
                    currposelem = $(this).position();
                    $(this).attr({"data-currleft":currposelem.left,"data-currtop":currposelem.top})
                })
                $('.overly_loader').css('display','none');
                $('#image-zoom img').attr({"src":"","width":"50px","height":"50px"});


            }
        });
    // },600)
}

function display_multiple_project_detail(project_ids){
        //var proj_id = $('select#get_project option:selected').val();
        ////console.log($('select#get_project option[value="'+proj_id+'"]').attr('selected','selected'),'selct');

        $("#tl23 span").css({"background-color":"","data-spanselect":"false"});
        $("#tl23 span").attr("data-spanselect","false");
        $("#tl23 span em").css({"color":"black"});

        //var project_id = $("#project_dropdown select option:first-child").val();
        var project_id = $( "#project_dropdown select option:selected" ).val();
        $('#tl23 span[data-id="'+project_id+'"]').css("background-color","#4395c9");
        $('#tl23 span[data-id="'+project_id+'"]').attr("data-spanselect","true");
        $('#tl23 span[data-id="'+project_id+'"]').find("em").css("color","#fff");

        var art_ids = $("#artist_list").val();
        if(art_ids != 'all'){
         span_data.each(function(i,value){
            var proj_val = $(value).attr("data-id");
            if($.inArray(proj_val, project_ids) == -1) {
                $(value).css("display","none")
            }else{
                $(value).css("display","block")
            }
        })
         flag++;
     }
     else{
        if(flag > 1){
            $("#tl23 div.tasks").html("");
        }
        span_data.each(function(i,value){
            //$("#tl23 div.tasks").html("");
            if(flag > 1){
                $("#tl23 div.tasks").append(value);
//                    $('#tl23 span[data-id="'+project_id+'"]').css("background-color","#4395c9");
//                    $('#tl23 span[data-id="'+project_id+'"]').attr("data-spanselect","true");
//                    $('#tl23 span[data-id="'+project_id+'"]').find("em").css("color","#fff");
            }
            $(value).css("display","block")
        })
        setTimeout(function(){
            tlheight(1000,"tl23")
        },1000)

    }

}

function clear_addprojectdata(){
    $("#addprojectname").val("");
    $("#dt1").val("");
    $("#dt2").val("");
    $("#p_note").val("");
}

function clear_addcontactdata(){
    $('#cont_name').val("");
    $("#cont_email").val("");
    $("#cont_tags").val("");
    $("#cont_tags-tokenfield").val("");
    $('#cont_name_setting').val("");
    $("#cont_email_setting").val("");
    $("#cont_tags_setting").val("");
    $("#cont_tags_setting-tokenfield").val("");
}

function clear_savealertdata(){
    console.log('clear_savealertdata');
    $('#alert_interval').val('1');
    //$('#reminder_time').val('day before');
    $('#alert_time').find('option:eq(0)').text('day before').prop('selected',true);
    $('#alert_time').find('option:eq(1)').text('week before');
    $('#alert_time').find('option:eq(2)').text('month before');
    $('#reminder_time').removeAttr('disabled');
    $('#reminder_interval').removeAttr('disabled');
    $('#reminder_time').find('option:eq(0)').text('day before').prop('selected',true);
    $('#reminder_time').find('option:eq(1)').text('week before');
    $('#reminder_time').find('option:eq(2)').text('month before');
    $('#reminder_interval').val('1');
    $('#alert3, #reminder3').prop('checked', false);	
    $('#alertme').prop('checked', true);
    $('#alert_text').val('');
    $('#editalert div').find('.tokenfield .token').remove();
}

// ADD PROJECT
function add_project(){
    
    var img_url = $('#img_url').val();
    $('.overly_loader').css('display','block');
    $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
    var user_id = get_userid();
    var admin_url = get_ajaxurl();

    var name = $("#addprojectname").val();
    var artist = $("#newartista1").val();
    
    var start_dt = $("#dt1").val();
    var end_dt = $("#dt2").val();
    var p_note = $("#p_note").val();
           
    if ( name == '' ) {
        $("#addproject").css("display","flex")
        flex2('addprojectnameerror');
        $('.overly_loader').css('display','none');
    }
    else if((start_dt == '' || start_dt == undefined) && (end_dt == '' || end_dt == undefined)){
        $("#addproject").css("display","flex")
        flex2('addprojectdateerror');
        $('.overly_loader').css('display','none');
    }
    /*else if(p_note == '' ){
        $("#addproject").css("display","flex")
        flex2('addprojectnoteerror');
        $('.overly_loader').css('display','none');
    }*/
    else {
        var cont_ids = [];
        $( "#newprojuser tr td" ).each(function( index ) {
            var contid = $(this).attr('data-contid');
            var status_img = $(this).find('div img').attr('src');
            if(status_img == img_url+'status4.png'){
               cont_ids.push(contid); 
            }
        });
        
        var maximum ="";
        var proj_rowid =[];

        $('#tl23 > div .tasks span').each(function(i) {
            var value = parseFloat($(this).attr('data-row'));
            maximum = (value > maximum) ? value : maximum;
        });

        var row = maximum + 1;
               
        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: "json",
            data: {
                action:'add_project',
                id:user_id,
                p_name:name,
                p_artist:artist,
                p_startdt:start_dt,
                p_enddt:end_dt,
                p_note:p_note,
                temp_id:temp_id,
                cont_ids:cont_ids
                //p_row:row,
                //p_rowids:proj_rowid
            },
            success: function( data ) {
               console.log(data);
                if(data.proj_cnt == 1){
                    location.reload();
                }
            else{
                display_search_project_data();
                display_project_list('all');
                var temp = '';
                display_phase_detail(temp,0);
                $('#phase, #tl2').hide();
                $('#project, #tl0').show();
                $('#artist_list').val('all').attr("selected", "selected");
                   // display_project_data('all');
                   clear_addprojectdata();
                   tlheight(500,"tl23");
                   var taskpostl23 = $('#tl23 .grid i.today').position();
                   $('#tl23 > div').css({"left":-(taskpostl23.left - 35)});
                   $('.overly_loader').css('display','none');
                   flex2('addproject2');
               }
           },
           complete:function(){

           }
       });
    }
    //return false;
}

// Add project rows
function add_project_rows(rows_id){
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    $.ajax({
        type : "POST",
        url : admin_url,
    // dataType: 'json',
    data: {
        action:'add_project_rows',
        id:user_id,
        row_id:rows_id
    },
    success: function( data ) {
    },
    complete:function(){

    }
});
}

// Display Task Details
//,phase_id
function taskdetail(proj_id,orig_phase_id){
    //console.log("task")
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        crossDomain:true,
        data: {
            action:'display_task_detail',
            id:user_id,
            proj_id:proj_id,
            //phase_id:phase_id,
            orig_phase_id:orig_phase_id
        },
        success: function( data ) {
            var task_detail = data.task_detail;
            var task_timeline = data.task_timeline;
            $('#phase').html(task_detail);
            $('#tl2 div').html(task_timeline);
            $('#phase_id').val(orig_phase_id);
            //$('#ph_id').val(phase_id);
        },
        complete:function(){
            var phaseperiod = $(".current-phase").find(".kies").text();
            if(phaseperiod == "Week"){
                taskspos("tl2")
                tlheight(500,"tl2")
                tlwidth(70,'tl2');
            }else{
                taskspos("tl2")
                tlheight(500,"tl2")
                tlwidth(30,'tl2');
            }

            $("#tl2 .tasks span").on("mousedown",function(event){
                currposelem = $(this).position();
                $(this).attr({"data-currleft":currposelem.left,"data-currtop":currposelem.top})
            })
        }
    });
}

// Edit Project
function edit_project(){
    console.log('edit_project')
    saveonclick = true;
    var img_url = $('#img_url').val();
    $('.overly_loader').css('display','block');
    $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
    var proj_id = $("#proj_id").val();
    var proj_title = $("#setting_project_title").val();
    var artist_id = $("#newartista2").val();
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    var cont_ids = [];
    $( "#list_contact tr" ).each(function( index ) {
        var contid = $(this).attr('data-contid');
        cont_ids.push(contid); 
    });  
    
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'edit_project',
            id:user_id,
            proj_id:proj_id,
            proj_title:proj_title,
            artist_id:artist_id,
            cont_id:cont_ids
        },
        success: function( data ) {
            if(data.status){
                flex2('editproject2');
                display_search_project_data();
                $('#artist_list').val('all').attr("selected", "selected");
                //display_project_data('all');
                display_project_list('all');
                display_phase_detail(proj_id,0);
                tlheight(500,"tl23");
                var taskpostl23 = $('#tl23 .grid i.today').position();
                $('#tl23 > div').css({"left":-(taskpostl23.left - 35)});
                $('.overly_loader').css('display','none');
                flex2('editproject2');
            }
        }
    });
}

// Delete Project
function delete_project(){
    $("#settings div#setting_delete").css('display','none');
    var img_url = $('#img_url').val();
    $('.overly_loader').css('display','block');
    $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
    var proj_id = $("#proj_id").val();
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'delete_project',
            id:user_id,
            proj_id:proj_id,
        },
        success: function( data ) {
            var status = data.status;
            var proj_cnt = data.proj_cnt;
            if(status == 'deleted'){
                if(proj_cnt == 0){
                    location.reload();
                }
                else{
                    $("#proj_id").val("");
                    $('#newartista2').val("")
                    display_search_project_data();
                    $('#artist_list').val('all').attr("selected", "selected");
                   // display_project_data('all');
                   display_project_list('all');
                   var temp = '';
                   display_phase_detail(temp,0);
                   tlheight(500,"tl23");
                   var taskpostl23 = $('#tl23 .grid i.today').position();
                   $('#tl23 > div').css({"left":-(taskpostl23.left - 35)});
                   $('.overly_loader').css('display','none');
                   flex2('delproject2');
               }
           }
           $(".current-phase").find("div").removeClass("kies");
           $(".current-phase").find("div.tl6").addClass("kies");
       }
   });
    return false;
}

// Display Task Grid Data
function display_task_grid(task_id){
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'display_task_grid',
            id:user_id,
            task_id:task_id,
        },
        success: function( data ) {
            if(data){
             $("#task_table_detail").html(data.task_html);
         }
     }
 });
}

// Display Phase Grid Data
function display_phase_grid(pro_id){
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'display_phase_grid',
            id:user_id,
            pro_id:pro_id,
        },
        success: function( data ) {
            if(data){
             $("#phase_table_detail").html(data.phase_html);
         }
     }
 });
}

var proj_id_sel = "";
function display_project_data(art_id,loader){

    if(flag == 0){
        span_data = $("#tl23 span");
        flag++;
    }
    var img_url = $('#img_url').val();
    if(!loader){
        $('.overly_loader').css('display','block');
        $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
    }
    else{
        $('.overly_loader').css('display','none');
        $('#image-zoom img').attr({"src":'',"width":"","height":"\n\
            "});
    }

    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'display_project_data',
            id:user_id,
            art_id:art_id,
        },
        success: function( data ) {
            if(data){
                var proj_cnt = data.pro_cnt;
                $("#get_project").html(data.proj_html);

                var proj_count = $('select#get_project option').length;
                if(proj_count > 1){
                    var proj_ids_arr = [];
                    $("select#get_project option").each(function()
                    {
                        proj_ids_arr.push($(this).val());
                    });

                    display_multiple_project_detail(proj_ids_arr);

                    var selectproj = $("#project_dropdown select option:first-child").val();
                    display_phase_detail(selectproj,1);
                }
                else{
                 var selectproj = $("#project_dropdown select option:first-child").val();
                 display_phase_detail(selectproj,1);
                }

                if(art_id == 'all'){
                    var all_val = $("#project_dropdown select option:first-child").val();
                    $('select#get_project option[value="'+all_val+'"]').attr('selected','selected');
                }
                else {
                    if(proj_id_sel){
                     $('select#get_project option[value="'+proj_id_sel+'"]').attr('selected','selected');
                     $('#tl23 span[data-id="'+proj_id_sel+'"]').css("background-color","#4395c9");
                     $('#tl23 span[data-id="'+proj_id_sel+'"]').attr("data-spanselect","true");
                     $('#tl23 span[data-id="'+proj_id_sel+'"]').find("em").css("color","#fff");
                    }else{
                        $("select#get_project option").each(function(){
                            var proj_id = $(this).val();
                            if(selected_proj_id === proj_id){
                                   // //console.log('if in calling')
                                   $('select#get_project option[value="'+proj_id+'"]').attr('selected','selected');
                            }
                        });
                    }
                }
                $('.overly_loader').css('display','none');
            }
    tlheight(500,'tl23');
    }
});
}

/* Display contact list artist wise */
function display_contact_list(art_id,flag){
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
            action:'display_contact_list',
            id:user_id,
            art_id:art_id,
            flag:flag
        },
        success: function( data ) {
            console.log(data,'cont-data');
            if(data.status){
                if(flag == 0){
                    $("#newprojuser").html(data.cont_html);
                }
                else{
                    $("#list_contact").html(data.cont_html);
                }
                $('.overly_loader').css('display','none');
            }
        }
    }); 
}

/* Display contact list project wise */
function display_project_contact_list(proj_id){
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
            action:'display_project_contact_list',
            id:user_id,
            proj_id:proj_id,
        },
        success: function( data ) {
            if(data.status){
                $("#list_contact").html(data.cont_html);
                $('.overly_loader').css('display','none');
            }
        }
    });
}

/* Refresh setting on cancel*/
function refresh_setting_data(){
    var pro_id = $("#tl23").find("span:first").attr('data-id');
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'refresh_setting_data',
            id:user_id,
            pro_id:pro_id,
        },
        success: function( data ) {
            if(data){
                $("#proj_id").val(pro_id);
                $('#setting_project_title').val(data.proj_title);
                $('.projtitle').html('Project: '+data.proj_title);
                $('#newartista2').val(data.artist_id).attr("selected", "selected");
                $('#list_contact').html(data.contact_html);
            }
        }
    });        
}

/* ADD A NEW TASK TO TIMELINE */
function addtask(){
    var t = $('#addtask');
    var naam = $('#taskname').val();
    var start_dt = $("#input1").val();
    var end_dt = $("#input2").val();
    var task_note = $("#task_note").val();
    
    if (naam == '') {
        /* SHOW ERROR */
        flex2('addtaskerror');
    }
    else if(start_dt == ''){
        flex2('addtaskdateerror');
    }
    else if(end_dt == ''){
        flex2('addtaskdateerror');
    }
    else{
        /* GET TASK COLOR */
        var colx = $('#addtask .kies').attr('data-col');
        if ( colx == null ) {
                /* DEFAULT COLOR (INDIEPLANT BLUE) IF NONE SELECTED */
                var col = '4395c9';
        } else {
                /* SET SELECTED COLOR VALUE */
                var col = colx;
        }

        var maximum = null;
        /* DETECT HIGHEST DATA-ROW DATA OF TASKS */
        $('#tl2 > div .tasks span').each(function(i) {
                var value = parseFloat($(this).attr('data-row'));
                maximum = (value > maximum) ? value : maximum;
        });

        var row = maximum + 1;	
        var user_id = get_userid();
        var admin_url = get_ajaxurl();
        var phase_id = $("#phase_id").val();
        //var ph_id = $("#ph_id").val();
        var proj_id = $("#proj_id").val();

        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: 'json',
            data: {
                action:'add_task', 
                id:user_id,
                p_id:proj_id,
                phase_id:phase_id,
                //ph_id:ph_id,
                row_no:row,
                title:naam,
                st_dt:start_dt,
                end_dt:end_dt,
                color:col,
                task_note:task_note

            },
            success: function( data ) {
                var status = data.status
                if(status == 'success'){
                    flex2('addtaskmsg');
                    taskdetail(proj_id,phase_id);
                    var art_id = $("#artist_list").val();
                    //display_project_data(art_id);
                    display_project_list(art_id);
                    display_phase_task_list(proj_id);
                    $('#tl23 span[data-id="'+proj_id+'"]').css("background-color","#4395c9");
                    $('#tl23 span[data-id="'+proj_id+'"]').attr("data-spanselect","true");
                    $('#tl23 span[data-id="'+proj_id+'"]').find("em").css("color","#fff");
                    var zoom = $('#tl2').attr('data-zoom');
                    tasksdraggable(zoom);
                    /* MOVE NEW TASK TO POSITION */
                    taskspos('tl2');
                    /* RESCALE TIMELINE TO FIT NEW TASK */
                    tlheight(500,'tl2');
                    /* HIDE ADD TASK WINDOW */
                    weg('addtask');
                    /* EMPTY ADD TASK FIELDS FOR NEXT TIME */
                    leeg('addtask');
                    /* ENABLE BODY SCROLL */
                    xx();
                    $(".datepicker").datepicker("refresh");
                    $(".changetitle").text("Pick start:")  

                } 
            }
        }); 
    }
}

/* EDIT A TASK FROM TIMELINE */
function edittask(){
    var t = $('#edittask');
    var naam = $('#edittaskname').val();
    var start_dt = $("#edit_dt1").val();
    var end_dt = $("#edit_dt2").val();
    //var task_status = $("#task_status").val();
    
   // console.log(task_status,'task_status')
       
    if ( naam == '' || start_dt == '' || end_dt == '') {
            /* SHOW ERROR */
            flex2('addtaskerror');
    } else {
            /* GET TASK COLOR */
            var col = $('#edittask .kies').attr('data-col');
            //console.log(col,'before color')
            if(col === undefined){
                col = 'F25A5A';
            }
            //console.log(col,'color')
            var task_id = $("#task_id").val();
            var phase_id = $("#phase_id").val();
          //  var ph_id = $("#ph_id").val();
            var proj_id = $("#proj_id").val();
            //var task_status = $("#task_status").val();
            var task_st = $('#edittask').find(".statuskeuze .kies");
            //console.log(task_st,'task_st');
            task_st = task_st[0].className;
            var task_status = task_st.split(' ');
            task_status = task_status[0]
            var user_id = get_userid();
            var admin_url = get_ajaxurl();
            $('.statuskeuze div').removeClass('kies');

            $.ajax({
                type : "POST",
                url : admin_url,
                dataType: 'json',
                data: {
                    action:'edit_task', 
                    id:user_id,
                    p_id:proj_id,
                    phase_id:phase_id,
                    //ph_id:ph_id,
                    task_id:task_id,
                    title:naam,
                    st_dt:start_dt,
                    end_dt:end_dt,
                    color:col,
                    task_status:task_status
                },
                success: function( data ) {
                    //console.log(data);
                    taskspos('tl2');
                    /* HIDE EDIT TASK WINDOW */
                    weg('edittask');
                    /* EMPTY ADD TASK FIELDS FOR NEXT TIME */
                    leeg('edittask');
                    /* ENABLE BODY SCROLL */
                    xx();
                    var status = data.status
                    if(status == 'success'){
                        flex2('edittaskmsg');
                        taskdetail(proj_id,phase_id);
                        var art_id = $("#artist_list").val();
                        //display_project_data(art_id);
                        display_project_list(art_id);
                        display_phase_task_list(proj_id);
                        taskspos('tl2');
                        /* HIDE EDIT TASK WINDOW */
                        weg('edittask');
                        /* EMPTY ADD TASK FIELDS FOR NEXT TIME */
                        leeg('edittask');
                        /* ENABLE BODY SCROLL */
                        xx();
                        $(".changetitle").text("Pick start:") 
                    }
                }
            }); 		

    }
}

/* DELETE A TASK BASED TASK THAT'S CURRENTLY BEING EDITED */
function deletetask(){
    
    var task_id = $("#task_id").val();
    var phase_id = $("#phase_id").val();
    //var ph_id = $("#ph_id").val();
    var proj_id = $("#proj_id").val();
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'delete_task', 
            id:user_id,
            p_id:proj_id,
            phase_id:phase_id,
            //ph_id:ph_id,
            task_id:task_id,
        },
        success: function( data ) {
            //console.log(data);
            var status = data.status;
            if(status == "deleted"){
                flex2('deletetaskmsg');
                taskdetail(proj_id,phase_id);
                var art_id = $("#artist_list").val();
                //display_project_data(art_id);
                display_project_list(art_id);
                display_phase_task_list(proj_id);
                //$('#ctrlz').delay(300).fadeIn(300);
		//$('#ctrlz').delay(2300).fadeOut(300);
            }
        }
    });
    	/*var deze = parseInt($('#tl2 .tasks').attr('data-today'),10) + 1
	if ( $('#tl2').attr('data-touch') == 'touch' ) {;
		// IF ON TOUCH DEVICE		
		$('#tl2 .tasks span:nth-child('+deze+')').remove();
	} else {
		// IF ON DESKTOP
		$('#tl2 .tasks span:nth-child('+deze+')').hide();
		$('#ctrlz').delay(300).fadeIn(300);
		$('#ctrlz').delay(2300).fadeOut(300);
	}*/
}

/*ADD PHASE */
function addphase(){
    var t = $('#addphase');
    var naam = $('#phasename').val();
    var start_dt = $("#ph_input1").val();
    var end_dt = $("#ph_input2").val();
    var ph_note = $("#ph_note").val();

    if ( naam == '' || start_dt == '' || end_dt == '') {
        /* SHOW ERROR */
        flex2('addphaseerror');
    }
    else{
        /* GET TASK COLOR */
        var colx = $('#addphase .kies').attr('data-col');
        if ( colx == null ) {
                /* DEFAULT COLOR (INDIEPLANT BLUE) IF NONE SELECTED */
                var col = '4395c9';
        } else {
                /* SET SELECTED COLOR VALUE */
                var col = colx;
        }

        var maximum = null;
        /* DETECT HIGHEST DATA-ROW DATA OF TASKS */
        $('#tl0 > div .tasks span').each(function(i) {
                var value = parseFloat($(this).attr('data-row'));
                maximum = (value > maximum) ? value : maximum;
        });

        var row = maximum + 1;	
        var user_id = get_userid();
        var admin_url = get_ajaxurl();
        var proj_id = $("#proj_id").val();

        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: 'json',
            data: {
                action:'add_phase', 
                id:user_id,
                p_id:proj_id,
                row_no:row,
                title:naam,
                st_dt:start_dt,
                end_dt:end_dt,
                color:col,
                ph_note:ph_note

            },
            success: function( data ) {
                //console.log(data,'phase data')
                var status = data.status
                if(status == 'success'){
                    flex2('addphasemsg');
                    var art_id = $("#artist_list").val();
                    display_project_list(art_id);
                    display_phase_task_list(proj_id);
                    $('#tl23 span[data-id="'+proj_id+'"]').css("background-color","#4395c9");
                    $('#tl23 span[data-id="'+proj_id+'"]').attr("data-spanselect","true");
                    $('#tl23 span[data-id="'+proj_id+'"]').find("em").css("color","#fff");
                    var zoom = $('#tl0').attr('data-zoom');
                    tasksdraggable(zoom);
                    
                    /* RESCALE TIMELINE TO FIT NEW TASK */
                    tlheight(500,'tl0');
                    /* HIDE ADD TASK WINDOW */
                    weg('addphase');
                    /* EMPTY ADD TASK FIELDS FOR NEXT TIME */
                    leeg('addphase');
                    /* ENABLE BODY SCROLL */
                    xx();
                    $(".ph_datepicker").datepicker("refresh");
                    $(".changephtitle").text("Pick start:")  

                } 
            }
        }); 
    } 
}

/*EDIT PHASE */
function editphase(){
    var title = $("#phasename2").val();
    /* GET PHASE COLOR */
    var col = $('#editphase .kies').attr('data-col');
    if(col === undefined){
        col = 'F25A5A';
    }
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    var ph_id = $('#edit_ph_id').html();
    //console.log(title,'--',col);
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'edit_phase', 
            id:user_id,
            phase_id:ph_id,
            title:title,
            color:col,
        },
        success: function( data ) {
            console.log(data);
            /*taskspos('tl2');
            /* HIDE EDIT TASK WINDOW */
            weg('editphase');
            /* ENABLE BODY SCROLL */
            xx();
            
            if(data.status){
                flex2('editphasemsg');
                taskdetail(data.proj_id,ph_id);
                display_phase_task_list(data.proj_id);
                taskspos('tl0');
            }
        }
    });
}

/*DELETE PHASE */
function deletephase(){
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    var ph_id = $('#edit_ph_id').html();
    var proj_id = $("#proj_id").val();
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'delete_phase', 
            id:user_id,
            p_id:proj_id,
            ph_id:ph_id,
        },
        success: function( data ) {
            console.log(data);
            if(data.status){
                flex2('deletephasemsg');
                //taskdetail(proj_id,ph_id);
                $("#phase").hide();
                $("#project").show();
                var art_id = $("#artist_list").val();
                display_project_list(art_id);
                display_phase_task_list(proj_id);
            }
        }
    });
}

/*ADD CONTACT*/
function addcontact(flag){
    
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    var proj_id = 0;
    var tags = [];
    
    $(".tokenfield .token" ).each(function( index,val ) {
        var tag_title = $(val).find("span").text();
        if(tag_title != ''){
            tags.push(tag_title);
        }
    });
    if(flag == 0){
        var cont_name = $('#cont_name').val();
        var cont_email = $("#cont_email").val();
        var cont_tags = $("#cont_tags").val();
        var art_id = $("#newartista1").val();
    }
    else{
        var cont_name = $('#cont_name_setting').val();
        var cont_email = $("#cont_email_setting").val();
        var cont_tags = $("#cont_tags_setting").val();
        var art_id = $("#newartista2").val();
        proj_id = $("#proj_id").val();
    }
    var is_validate = true;
    
    if(cont_name == '' || cont_email == ''){
        is_validate = false;
        flex2('addcontacterror');
        if(flag == 1){
            toon('adduser');
        }
    }
    if(cont_email != ''){
        is_validate = true;
        if( !isEmail(cont_email)) {
            is_validate = false;
            flex2('addcontactemailerror');
            if(flag == 1){
                toon('adduser');
            }
        }
    }
    if(cont_name != '' && cont_email != '' && isEmail(cont_email)){
        is_validate = true;
        if (tags.length === 0) {
            is_validate = false;
            flex2('addcontacttagerror');
            if(flag == 1){
                toon('adduser');
            }
        }
    }
    console.log(art_id,'art_id',flag,'flag');
    
    if(is_validate === true){
        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: 'json',
            data: {
                action:'add_contact', 
                id:user_id,
                art_id:art_id,
                cont_name:cont_name,
                cont_email:cont_email,
                cont_tags:tags,
                flag:flag,
                proj_id:proj_id
            },
            success: function( data ) {
                console.log(data,'addcontactdata')
                if(data.tag_flag){
                    flex2('addcontactmsg');
                    clear_addcontactdata();
                    if(flag == 1){
                        weg('adduser');
                        flex('settings');
                        display_contact_list(art_id,1);
                        //display_project_contact_list(proj_id);
                    }
                    else {
                        weg('adduser2');
                        flex('addproject');
                    }
                }
            }
        });
    }
}

/*EDIT CONTACT*/
function edit_contact(){
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    var cont_name = $("#edit_cname").val();
    var cont_email = $("#edit_cemail").val();
    var cont_tags = $("#edit_ctag").val();
    var is_validate = true;
    var cont_id = $("#cont_id").val();
    var proj_id = $("#proj_id").val();
    if(cont_name == '' || cont_email == '' || cont_tags == ''){
        is_validate = false;
        flex2('addcontacterror');
    }
    if(cont_email != ''){
        is_validate = true;
        if( !isEmail(cont_email)) {
            is_validate = false;
            flex2('addcontactemailerror');
        }
    }
    var tags = [];
    $("#edituser .extr_float .tokenfield .token" ).each(function( index,val ) {
        var tag_title = $(val).find("span").text();
        if(tag_title != ''){
            tags.push(tag_title);
        }
    });
    
    var art_id = $('#newartista2').val();
    if(is_validate == true){
        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: 'json',
            data: {
                action:'edit_contact', 
                cont_id:cont_id,
                cont_name:cont_name,
                cont_email:cont_email,
                cont_tags:tags
            },
            success: function( data ) {
                if(data.tag_flag){
                    flex2('editcontactmsg');
                    weg('edituser');
                    display_contact_list(art_id,1);
                    //display_project_contact_list(proj_id);
                    flex('settings');
                }
            }
        });
    }
}

/*DELETE CONTACT*/
function delete_contact(){
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    var cont_id = $("#cont_id").val();
    var proj_id = $("#proj_id").val();
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'delete_contact', 
            cont_id:cont_id,
            proj_id:proj_id
        },
        success: function( data ) {
            console.log(data);
            if(data.status){
                flex2('delcontact2');
                weg('edituser');
                display_project_contact_list(proj_id);
                flex('settings');
            }
        }
    });
    
}

/* Check thais contact has sent alert or not on DELETE Contact*/
function check_alert_contact_ondelete(){
    var user_id = get_userid();
    var admin_url = get_ajaxurl();
    var cont_id = $("#cont_id").val();
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'check_alert_contact_ondelete', 
            user_id:user_id,
            cont_id:cont_id,
        },
        success: function( data ) {
            if(data.status){
                flex2('delalertcontact');
            }
            else{
                flex2('delcontact');
            }
        }
    });
}

// Alert Time Check for Task
function check_alert_time(alert_time,alert_int){
    var admin_url = get_ajaxurl();
    var alert_task_id = $("#alert_task_id").val();
    var alert_status = false;
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        async: false,
        global: false,
        data: {
            action:'check_alert_time_task', 
            task_id:alert_task_id,
            alert_time:alert_time,
            alert_int:alert_int
        },
        success: function( data ) {
            alert_status = data.status;
            if(!data.status){
                flex2('alerttimeerror');
                flex('editalert');
                return false;
            }
        }
    });
    //console.log('alert_status',alert_status);
    return alert_status;
}

// Alert Today Check for Task
function check_alert_day_task(){
    var admin_url = get_ajaxurl();
    var alert_task_id = $("#alert_task_id").val();
    $.ajax({
        type : "POST",
        url : admin_url,
        dataType: 'json',
        data: {
            action:'check_alert_day_task', 
            task_id:alert_task_id,
        },
        success: function( data ) {
            console.log(data);
            if(!data.status){
                flex2('alertdayerror');
                flex('editalert');
                return false;
            }
        }
    });
}

/*SAV ALERT*/
function save_alert(){
    var admin_url = get_ajaxurl();
    var user_id = get_userid();
    var alert_int = '';
    var alert_time = '';
    var day_of_task = '';
    var reminder_int = '';
    var reminder_time = '';
    var reminder_dis = '';
    var alertme = $("#alertme").val();
    var alert_text = $("#alert_text").val();
    var alert_task_id = $("#alert_task_id").val();
    var is_alert_validate;
    var is_reminder_validate;
    var is_validate = true;
    
    if($("#alert3").is(':checked')){
        day_of_task = $("#alert3").val();
        is_alert_validate = true;
    }
    else{
        alert_int = $("#alert_interval").val();
        alert_time = $("#alert_time").val();
        is_alert_validate = check_alert_time(alert_time,alert_int)
    }
    
    if($("#reminder3").is(':checked')){
        reminder_dis = $("#reminder3").val();
        is_reminder_validate = true;
    }
    else{
        reminder_int = $("#reminder_interval").val();
        reminder_time = $("#reminder_time").val();
        is_reminder_validate = check_alert_time(reminder_time,reminder_int)
    }
    
    if (alert_cont_ids.length == 0) {
        flex2('addcontacterror');
        toon('editalert');
        is_validate = false;
    }
        
    //console.log(is_validate,'is_validate',is_alert_validate,'is_alert_validate',is_reminder_validate,'is_reminder_validate')
    if(is_validate == true && is_alert_validate == true && is_reminder_validate == true){
        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: 'json',
            data: {
                action:'save_alert', 
                task_id:alert_task_id,
                alert_time:alert_time,
                alert_int:alert_int,
                reminder_time:reminder_time,
                reminder_int:reminder_int,
                day_of_task:day_of_task,
                alert_cont_ids:alert_cont_ids,
                reminder_dis:reminder_dis,
                alertme:alertme,
                alert_text:alert_text,
                user_id:user_id
            },
            success: function( data ) {
                //console.log(data);
                if(data.status){
                    flex2('savealertmsg');
                    display_task_grid(alert_task_id);
                    clear_savealertdata();
                }
            }
        });
    }
}

/* VALIDATION FOR EMAIL*/
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$(document).ready(function(){

// $(document).on("tap","#phasetodo tr td",function(){
//     var tddisplay = $("#phasetodo tr td.noo").css("display");
//     if(tddisplay == "table-row"){
//         $("#phasetodo tr td.noo")
//     }
//     //console.log(note,"note")
// })
datakort();
    // Save Project and phase note
    var keydata =true;
    var note_flag ="";
    //var note = $(':focus');
    $(document).on("keydown",function(event){
        keydata = true;
        note_flag = $(event.target).attr("id");
        
    })
    var notearr= [];
    var notearray=[];
    $(document).on("focusout",function(){
        //console.log($(note).attr("data-heightdata"),"heightdata")
        if(keydata)
        {
            //keydata = false;
            if(note){
                var note_id = note[0].id;
                if(note_id == 'projnote'){
                    $("projnote-par").show();
                }
                var proj_id = note.attr('proj-id');
                var note_val = $("#"+note_id).val();
                var user_id = get_userid();
                var admin_url = get_ajaxurl();
                var note_height = '';
                
                
                if(note_flag == 'projnote'){
                    note_height = $("#projnote").css('height');
                }
                else if(note_flag == 'phasenote'){
                    note_height = $("#phasenote").css('height');
                }
                else if(note_flag == 'tasknote_'+proj_id){
                    note_height = $("#tasknote_"+proj_id).css('height');
                }
//                console.log(note_flag+'--'+note_height);
//                console.log(notearr.indexOf(note_flag))
//                if(notearr.indexOf(note_flag) != -1){
//                    console.log("here",notearray)
//                    notearray.forEach(function(val,i){
//                        if(val.note_flag == note_flag){
//                            console.log()
//                          var noteheight =  val.note_height;
//                          $("#"+note_flag).css("height",noteheight);
//                        }
//                    })
//                }else{
//                    notearr.push(note_flag);
//                    notearray.push({note_flag:note_flag,note_height:note_height});
//                }
//                console.log(notearr,"notearr")
                $.ajax({
                    type : "POST",
                    url : admin_url,
                    dataType: 'json',
                    data: {
                        action:'add_project_phase_task_note',
                        id:user_id,
                        proj_id:proj_id,
                        note_val:note_val,
                        note_height : note_height
                    },
                    success: function( data ) {
                        if(data){
                            if(note_id == 'tasknote_'+proj_id){
                                $('#tasknotesaved_'+proj_id).css({'display':'flex'})
                                setTimeout(function(){ $('#tasknotesaved_'+proj_id).fadeOut(300); }, 600);
                                display_task_grid(proj_id);
                            }
                            else{
                                $('#'+note_id+'saved').css({'display':'flex'});
                                setTimeout(function(){ $('#'+note_id+'saved').fadeOut(300); }, 600);
                            }
                        }
                    }
                });
            }
        }
    })
    
    // CHOOSE TEMPLATE
    $(document).on("tap", ".templates > div", function() {
        var a = $(this);
        a.parent().find('div').removeClass('kies');
        a.addClass('kies');
        projdays = Number(a.find("span").html().trim().split("days")[0].split("+ ")[1].trim());
        temp_id = a.find('#temp_id').attr('value');
    });
    // SHOW TEMPLATE INFO
    $(document).on("tap", ".templates > div i", function() {
      flex('templateinfo');
      var a = $(this).parent();
      var b = $('#templateinfo');
      var naam = a.find('h3').text();
      b.find('h2').text(naam);
      var duur = a.find('span').text();
      b.find('span').text('Duur van dit project: '+duur);
      var id = a.attr('id');
      if ( id == 'templatesingle' ) {
       b.find('p').text('Duis id libero nibh. Suspendisse pulvinar eros id justo egestas, eget commodo metus volutpat. Vestibulum venenatis felis laoreet lectus cursus, id imperdiet quam lobortis. Morbi eu tortor erat. Nunc quis eros id orci suscipit tempor vestibulum non lectus. Pellentesque mattis ex urna, vitae dignissim magna maximus et. Suspendisse eu vestibulum enim, at semper metus. Donec ut lectus sodales, porta nibh vitae, maximus enim.');
   } else if ( id == 'templateep' ) {
       b.find('p').text('Duis id libero nibh. Suspendisse pulvinar eros id justo egestas, eget commodo metus volutpat. Vestibulum venenatis felis laoreet lectus cursus, id imperdiet quam lobortis. Morbi eu tortor erat. Nunc quis eros id orci suscipit tempor vestibulum non lectus. Pellentesque mattis ex urna, vitae dignissim magna maximus et. Suspendisse eu vestibulum enim, at semper metus. Donec ut lectus sodales, porta nibh vitae, maximus enim.');
   } else if ( id == 'templatealbum' ) {
       b.find('p').text('Duis id libero nibh. Suspendisse pulvinar eros id justo egestas, eget commodo metus volutpat. Vestibulum venenatis felis laoreet lectus cursus, id imperdiet quam lobortis. Morbi eu tortor erat. Nunc quis eros id orci suscipit tempor vestibulum non lectus. Pellentesque mattis ex urna, vitae dignissim magna maximus et. Suspendisse eu vestibulum enim, at semper metus. Donec ut lectus sodales, porta nibh vitae, maximus enim.');
   } else {
       b.find('p').text('Duis id libero nibh. Suspendisse pulvinar eros id justo egestas, eget commodo metus volutpat. Vestibulum venenatis felis laoreet lectus cursus, id imperdiet quam lobortis. Morbi eu tortor erat. Nunc quis eros id orci suscipit tempor vestibulum non lectus. Pellentesque mattis ex urna, vitae dignissim magna maximus et. Suspendisse eu vestibulum enim, at semper metus. Donec ut lectus sodales, porta nibh vitae, maximus enim.');
   }
});
    var hidetoggle = true;

    // CHANGE TIMELINE ZOOM
    $(document).on("tap", ".btnkies-tl > div", function() {
        //console.log('calling from here');
        var img_url = $('#img_url').val();
        var a = $(this);
        //console.log(a,'project timeline');
        a.parent().find('div').removeClass('kies');
        a.addClass('kies');
        a.parent().find('img').attr('src',img_url+'icon-hide-zw.png');
        a.find('img').attr('src',img_url+'icon-hide-wi.png');
        // PLACEHOLDER FOR PROJECTS TIMELINE
        if ( a.hasClass('tlmonth') ) {
            // HIDE PROJECTS TIMELINE
            $('#tl1-dropdowns div').show();
            $("#tl23").show();
            tlwidth(30,"tl23")
            tasksdraggable(30);
            $("#tl23[data-zoom=30] .grid i").each(function(ind,val){
                if((ind%2) == 0){
                    $(val).css({"background":"rgba(0,0,0,0.1)","font-size": "10px","color":"white"})
                }else{
                    $(val).css({"background":"rgba(153,153,153,0.1)","font-size": "10px","color":"white"})
                }
            })
            //$("#tl23").hide();
        } else if ( a.hasClass('tl2') ) {
            quarterclick = true;
            $("#tl23").show();
            tlwidth(10,"tl23")
            tasksdraggable(10);
            $("#tl23[data-zoom=10] .grid i").each(function(ind,val){
                if((ind%2) == 0){
                    $(val).css({"background":"rgba(0,0,0,0.1)","font-size": "8px","color":"transparent"})
                }else{
                    $(val).css({"background":"rgba(153,153,153,0.1)","font-size": "8px","color":"transparent"})
                }
            })
            var monthsize = $("#tl23[data-zoom=10] .grid i.month");
            $("#tl23[data-zoom=10] .grid i.month").each(function(ind,val){

                var monthvalue = $(val).find("em").text();
                //console.log(monthvalue)
                if(monthvalue == "January" || monthvalue == "March" || monthvalue == "May" || monthvalue == "July" || monthvalue == "September" || monthvalue == "November"
                    || monthvalue == "Jan" || monthvalue == "Mar" || monthvalue == "May" || monthvalue == "Jul" || monthvalue == "Sep" || monthvalue == "Nov"){
                    $(this).css("background","rgba(0,0,0,0.1)")
                $(val).nextAll().css("background","rgba(0,0,0,0.1)")
            }else{
                $(this).css("background","rgba(153,153,153,0.1)")
                $(val).nextAll().css("background","rgba(153,153,153,0.1)")
            }
            var text = monthvalue.replace(monthvalue,monthvalue.substring(0,9))
            //console.log(text)
            $(val).find("em").text(text)
        })
        } else if ( a.hasClass('tl3') ) {
            $("#tl23").show();
            tlwidth(3,"tl23")
            tasksdraggable(3);
            $("#tl23[data-zoom=3] .grid i.month").each(function(ind,val){

                var monthvalue = $(val).find("em").text();

                if(monthvalue == "January" || monthvalue == "March" || monthvalue == "May" || monthvalue == "July" || monthvalue == "September" || monthvalue == "November"
                    || monthvalue == "Jan" || monthvalue == "Mar" || monthvalue == "May" || monthvalue == "Jul" || monthvalue == "Sep" || monthvalue == "Nov"){
                    $(val).nextAll().css("background","rgba(0,0,0,0.1)")
            }else{
                $(val).nextAll().css("background","rgba(153,153,153,0.1)")
            }
            var text = monthvalue.replace(monthvalue,monthvalue.substring(0,3))
            $(val).find("em").text(text)
        })



        // PHASES + TASKS TIMELINES
    } else if ( a.hasClass('tl4') ) {
            // HIDE PHASES + TASKS TIMELINES
            //$('#tl0, #tl2').animate({'height': 0 },300);
            if(hidetoggle){
                $('#tl0,#tl2').animate({'height': 0 },300);
                hidetoggle = false;
            }else{
                tlheight(500,'tl0');
                tlheight(500,'tl2');
            //tlheight(500,'tl23');
            // SET DAY WIDTH TO 30PX (MONTH ZOOM)
            tlwidth(30,'tl0');
            tlwidth(30,'tl2');
            //tasksdraggable(30);
            //tlwidth(30,'tl23');
            // REMOVE BORDER

            $('#tl0').css({'background-color':'#999','border-bottom':'none'});
            $('#tl2').css({'background-color':'#f25a5a','border-bottom':'none'});
            hidetoggle = true;
        }


            // ADD BORDER
            //setTimeout(function(){ $('#tl0, #tl2').css({'background-color':'#fff','border-bottom':'4px dotted #ccc'}); }, 250);
        } else if (a.hasClass('tl5')) {
            weekphaseclick = true;
            // RECALCULATE TIMELIEN HEIGHT
            tlheight(500,'tl0');
            tlheight(500,'tl2');
            //tlheight(500,'tl23');
            // SET DAY WIDTH TO 70PX (WEEK ZOOM)
            tlwidth(70,'tl0');
            tlwidth(70,'tl2');
            tasksdraggable(70);
            //tlwidth(70,'tl23');
            // REMOVE BORDER
            $('#tl0').css({'background-color':'#999','border-bottom':'none'});
            $('#tl2').css({'background-color':'#f25a5a','border-bottom':'none'});
            //$('#tl23').css({'background-color':'#f25a5a','border-bottom':'none'});
        } else {
            // RECALCULATE TIMELIEN HEIGHT
            tlheight(500,'tl0');
            tlheight(500,'tl2');
            //tlheight(500,'tl23');
            // SET DAY WIDTH TO 30PX (MONTH ZOOM)
            tlwidth(30,'tl0');
            tlwidth(30,'tl2');
            tasksdraggable(30);
            //tlwidth(30,'tl23');
            // REMOVE BORDER
            $('#tl0').css({'background-color':'#999','border-bottom':'none'});
            $('#tl2').css({'background-color':'#f25a5a','border-bottom':'none'});
            //$('#tl23').css({'background-color':'#f25a5a','border-bottom':'none'});
        }
    });
    // CALENDAR SET DATE CLICK
    $(document).on("tap", ".calendar:not(#cal5) i", function() {
        var t = $(this);
        var x = t.parent().parent();
        var pid = x.parent().parent().attr('id');
        var p = $('#'+pid);
        var i = $('#'+pid+' i');
        if ( p.hasClass('kiesend') ) {
            $('#'+pid+'label').text('Done');
            t.addClass('kies-e');
            p.find('.kies-m2').removeClass('kies-m2');
            p.removeClass('kiesend');
            var deze = p.find('.kies-s').index( '#'+pid+' i' ) ;
            var die = t.index( '#'+pid+' i' ) ;
            if ( die < deze ) {
                t.removeClass('kies-e').addClass('kies-s');
                p.find('i:eq('+deze+')').removeClass('kies-s').addClass('kies-e');
                t.nextUntil( p.find('i:eq('+deze+')') ).addClass('kies-m');
            } else if ( die > deze ) {
                p.find('i:eq('+deze+')').nextUntil( t ).addClass('kies-m');
            } else {
                t.removeClass('kies-e').addClass('kies-rond');
            }
        } else {
            $('#'+pid+'label').text('Pick end:');
            x.find('i').removeClass('kies-s kies-m kies-e kies-r');
            p.find('.kies-rond').removeClass('kies-rond');
            t.addClass('kies-s');
            p.addClass('kiesend');
        }
    });
    // CALENDAR CHOOSE ONLY START DATE (MAKE START DATE ROUND)
    $(document).on("mouseout", ".calendar", function() {
        var t = $(this);
        if ( t.hasClass('kiesend') ){
            t.find('.kies-s').addClass('kies-rond');
            t.find('.kies-m2').removeClass('kies-m2');
            t.find('.kies-e').removeClass('kies-e');
            t.find('.kies-e2').removeClass('kies-e2');
        }
    });
    // CALENDAR IN ADD PROJECT WINDOW
    $(document).on("tap", "#cal5 i", function() {
        $('#cal5 i').removeClass('kies-s kies-rond');
        $(this).addClass('kies-s kies-rond');
    });
//   $(document).on("focusout", ".txtarea", function() {
//      var deze = $(this).attr('id');
//               // alert(deze)
//      if ( $(this).val() == '' ){
//          $('#add'+deze).show();
//          $('#'+deze+'-par').hide();
//      } else {
//          $('#'+deze+'saved').css({'display':'flex'});
//          setTimeout(function(){ $('#'+deze+'saved').fadeOut(300); }, 600);
//      }
//  });
    // SAVE NEW USER ON PRESS ENTER
    $('#newuser').keypress(function(event){
        if (event.keyCode == 13) {
            weg('adduser');
            flex('settings');
        }
    });
    // OPEN ADD USER POPUP
    $(document).on("change", ".newartist", function() {
        if ( $(this).val() == 'addnew' ) {
            flex2('addartist');
            $('#editartistname').val('');
            invoer('editartistname');
            $('#addartist .colorpick i').removeClass('kies');
        }
    });
    // SAVE EDIT USER ON PRESS ENTER
    $('#edituser').keypress(function(event){
        if (event.keyCode == 13) {
            weg('edituser');
            flex('settings');
        }
    });
    // PLACEHOLDER FOR PROJECTS TIMELINE
    $('#tl1 img').draggable({
        axis: 'x'
    });
    // SHOW PHASE DETAILS ON CLICK PHASE IN TABLE OR TIMELINE
        
        $(document).on("tap", ".btnback, #tl0 .tasks span,table.tabelrond tr td.editphasetitle", function() {
            if ( $('#project').is(':visible') ){
                //console.log("here")
             /* GET CURRENT SCROLL POS */
             var scrl = $('#tl0 > div').css('left');
             $('#project, #tl0').hide();

             $('#phase, #tl2').show();
             /* SCROLL TASK TIMELINE CURRENT DAY */
             $('#tl2 > div').css({'left':scrl});
         } else {
            $('#tl1-dropdowns > div').show();
            $('#project, #tl23').show();
                /*if($("#tl1-dropdowns div").css("display") == "block"){
                    $('#project, #tl23').hide();
                    $('#tl1-dropdowns > div').show();
                }else{
                    $('#project, #tl23').show();
                    $('#tl1-dropdowns > div').hide();
                }*/
                /* GET CURRENT SCROLL POS */
                // var taskpostl23 = $('#'+id+' .grid i.today').position();
                //     if(taskpostl23){
                //     $('#'+id+' > div').css({"left":-(taskpostl23.left - 35)})

                //   }
                var scrl = $('#tl2').find("div.grid i.today").position();
                var scrltl23 = $('#tl23').find("div.grid i.today").position();
                $('#project, #tl0').show();
                $('#phase, #tl2').hide();
                /* SCROLL PHASE TIMELINE CURRENT DAY */
                $('#tl0 > div').css({'left':-(scrl.left - 35)});
                $('#tl23 > div').css({'left':-(scrltl23.left - 35)});
            }
        });
    //$(document).on("tap", "#phasetodo td:nth-child(5), #phasedone td:nth-child(5)", function() {
    //  flex('edittask');
    //});
    $(document).on("tap", ".statuskeuze div", function() {
        var t = $(this);
        t.parent().find('div').removeClass('kies');
        t.addClass('kies');
        if ( t.parent().hasClass('keuzedirect') ){
            t.parent().parent().parent().hide();
            $('body').css({'overflow':'auto'});
            xx();
        }
    });
    $(document).on("tap", ".statuskeuze div", function() {
        var t = $(this);
        t.parent().find('div').removeClass('kies');
        t.addClass('kies');
        if ( t.parent().hasClass('keuzedirect') ){
            t.parent().parent().parent().hide();
            $('body').css({'overflow':'auto'});
            xx();
        }
    });
    $(document).on("tap", ".phase tr td:nth-child(2)", function() {
        var st = $(this).attr('class');
        var ti = $(this).closest('tr').find('td:nth-child(5)').html();
        var task_id = $(this).closest('tr').find('td:nth-child(5)').attr('data-taskid');
        $('#editstatus .statuskeuze .kies').removeClass('kies');
        $('#editstatus .'+st).addClass('kies');
        $('#editstatus .title').text('Status for \''+ti+'\'');
        $('#editstatus #status_task_id').val(task_id);
        flex2('editstatus');
    });

    $(document).on("tap", "#editstatus .statuskeuze div", function() {
        var st_class = $(this)[0].className;
        st_class = st_class.split(" ");
        st_class = st_class[0];

        var task_st_id = $('#editstatus #status_task_id').val();
        var user_id = get_userid();
        var admin_url = get_ajaxurl();
        var img_url = $('#img_url').val();
        $('.overly_loader').css('display','block');
        $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: 'json',
            data: {
                action:'edit_task_status',
                id:user_id,
                st_class:st_class,
                task_id:task_st_id,
            },
            success: function( data ) {
                //console.log(data);
                if(data,'edit_task_status'){
                    taskdetail(data.proj_id,data.phase_id);
                    //taskdetail(data.proj_id,data.ph_id,data.phase_id);
                            //display_task_grid(task_st_id);
                            display_phase_detail(data.proj_id,1);
                            $('.overly_loader').css('display','none');
                        }
                    }
                });
        });
    
    $(document).on("tap", ".phase td:nth-child(7), .phase td:nth-child(8), .phase td:nth-child(9)", function() {
        var ti = $(this).closest('tr').find('td:nth-child(5)').html();
        $('#editdate .title').text('Period for \''+ti+'\'');
        flex('editdate');
    });

    $("#alert_tags-tokenfield").on("keyup",function(){
        console.log("here");
    })
    function unique(list) {
        var result = [];
        $.each(list, function(i, e) {
            if ($.inArray(e, result) == -1) result.push(e);
        });
        return result;
    }
    $(document).on("tap", ".phase td:nth-child(6)", function() {
        clear_savealertdata();
        var user_id = get_userid();
        var admin_url = get_ajaxurl();
        var alert_st = $(this)[0].className;
        var ti = $(this).closest('tr').find('td:nth-child(5)').html();
        var st_dt = $(this).closest('tr').find('td:nth-child(7)').html();
        var st_date = st_dt.split(' ');
        var dateFirst = new Date(st_date[0]+st_date[1]+st_date[2]);
        var today = new Date();
        console.log(dateFirst.getDate(),'data',today.getDate());
        if(alert_st == 'al1' && dateFirst < today){
            flex2('alerterror');
        }
        else{
            flex2('editalert');
            var alert_task_id = $(this).closest('tr').find('td:nth-child(5)')[0].attributes[0].nodeValue;
            $("#alert_task_id").val(alert_task_id);
            $('#editalert .title').text('Alert for \''+ti+'\'');
            var proj_id = $("#proj_id").val();
            $('#alert_tags').tokenfield({
                autocomplete: {
                    source: admin_url+'/?action=get_contact_list&proj_id='+proj_id+'&user_id='+user_id,
                    delay: 100
                },
                showAutocompleteOnFocus: false
            });
            
            $('#alert_tags').on('tokenfield:createtoken', function (event) {
                //console.log(event,"event")
                //console.log(event.attrs.value,'reltar');
                var alert_data = event.attrs.labelid;
               
                if(alert_data == "no contact"){
                    flex2('searchcontacterror');
                    event.preventDefault();
                }
                else{
                    //var alert_cont_data = alert_data.split('>');
                    //var alert_cont_id = alert_cont_data[1];
                    alert_cont_ids.push(alert_data);
                }
                                
                // setTimeout(function(){
                //     $(".token").find("span").each(function(index,value){
                //         var conttext = $(value).text();
                //         var cont_data = conttext.split('>');
                //         $(value).text(cont_data[0]);
                //     })
                // },50)

            });
            
            $('#alert_tags').on('tokenfield:removedtoken', function (e) {
                var remove_alert = e.attrs.labelid;
                alert_cont_ids.splice($.inArray(remove_alert, alert_cont_ids),1);
            });

            if(alert_st == 'al2'){
                var img_url = $('#img_url').val();
                $('.overly_loader').css('display','block');
                $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
            
                $.ajax({
                    type : "POST",
                    url : admin_url,
                    dataType: 'json',
                    data: {
                        action:'display_alert_detail',
                        id:user_id,
                        task_id:alert_task_id,
                    },
                    success: function( data ) {
                        console.log(data.cont_data,'display_alert_detail');

                        $('#alert_tags').tokenfield('setTokens',unique(data.cont_data));
                        if(data.day_of_task !== 'on'){
                            $("#alert_interval").val(data.alert_int);
                            if(data.alert_int == 1){
                                $('#alert_time').find('option:eq(0)').text('day before');
                                $('#alert_time').find('option:eq(1)').text('week before');
                                $('#alert_time').find('option:eq(2)').text('month before');
                            }
                            else{
                                $('#alert_time').find('option:eq(0)').text('days before');
                                $('#alert_time').find('option:eq(1)').text('weeks before');
                                $('#alert_time').find('option:eq(2)').text('months before');
                            }
                            $("#alert_time").val(data.alert_time);
                        }
                        else{
                            $('#alert3').prop('checked',true);
                            $('#alert_time').attr('disabled',true);
                            $('#alert_interval').attr('disabled',true);
                        }
                                                
                        if(data.reminder_dis !== 'on'){
                            $("#reminder_interval").val(data.reminder_int);
                            if(data.reminder_int == 1){
                                $('#reminder_time').find('option:eq(0)').text('day before');
                                $('#reminder_time').find('option:eq(1)').text('week before');
                                $('#reminder_time').find('option:eq(2)').text('month before');
                            }
                            else{
                                $('#reminder_time').find('option:eq(0)').text('days before');
                                $('#reminder_time').find('option:eq(1)').text('weeks before');
                                $('#reminder_time').find('option:eq(2)').text('months before');
                            }
                            $('#reminder_time').val(data.reminder_time);
                        }
                        else{
                            $('#reminder3').prop('checked', true);	
                            $('#reminder_time').attr('disabled',true);
                            $('#reminder_interval').attr('disabled',true);
                        }
                        if(data.alertme != ''){
                            $('#alertme').prop('checked', true);
                        }
                        $('.overly_loader').css('display','none');
                        $('#image-zoom img').attr({"src":img_url+'loader.gif',"width":"50px","height":"50px"});
                        $("#alert_text").val(data.alert_text);
//                        $.each( data.cont_data, function( i, val ) {
//                            //$( "#" + val ).text( "Mine is " + val + "." );
//                            console.log(val,'val');
//                            // Will stop running after "three"
//                            //return ( val !== "three" );
//                        })
                        $("#alert_tags").val(data.cont_data);
                        /*$('#alert_tags').tokenfield({
                             autocomplete: {
                                 source: data.cont_data,
                                 delay: 100
                             },
                             showAutocompleteOnFocus: false
                         });
                         $('#alert_tags').on('tokenfield:createtoken', function (event) {
                             var existingTokens = $(this).tokenfield('getTokens');
                             console.log(existingTokens,'token');
                             $.each(existingTokens, function(index, token) {
                                 if (token.value === event.attrs.value)
                                     event.preventDefault();
                             });
                         });*/
                        
                    }
                });
            }
            else{
               $("#disablealert").hide();
            }
        }
    });
    
    // Disable alert from alert popup
    $("#disablealert").click(function(){
        console.log("disablealert calling");
        var task_id = $("#alert_task_id").val();
        var user_id = get_userid();
        var admin_url = get_ajaxurl();
        console.log(task_id,'task_id-alert');
        $.ajax({
            type : "POST",
            url : admin_url,
            dataType: 'json',
            data: {
                action:'disable_alert',
                task_id:task_id,
            },
            success: function( data ) {
                if(data.status){
                    flex2('disablealertmsg');
                    display_task_grid(task_id);
                }
            }
        });            
    });

    $(document).on("tap", ".phase .in2", function() {
        var t = $(this).parent();
        var pid = $(this).parent().parent().parent().attr('id');
        wegnoteinfo(pid);
        var deze = t.index('#'+pid+' tr');
        var die = parseInt(deze, 10);
        ++die;
        ++die;
        $(this).removeClass('in2').addClass('in3');
        t.parent().find('tr:eq('+die+')').show();
    });
    $(document).on("tap", ".phase .in3", function() {
        var pid = $(this).parent().parent().parent().attr('id');
        wegnoteinfo(pid);
        $(this).removeClass('in3').addClass('in2');
    });


    $(document).on("tap", ".phase .no1, .phase .no2", function() {
        var t = $(this).parent();
        var pid = $(this).parent().parent().parent().attr('id');
        wegnoteinfo(pid);
        var deze = t.index('#'+pid+' tr');
        var die = parseInt(deze, 10);
        ++die;
        $(this).removeClass('no1 no2').addClass('no3');
        t.parent().find('tr:eq('+die+')').show();
        t.parent().find('tr:eq('+die+') textarea').focus();
    });
    $(document).on("tap", ".phase .no3", function() {
        var pid = $(this).parent().parent().parent().attr('id');
        wegnoteinfo(pid);
        $(this).removeClass('no3').addClass('no1');
    });


  // $('.ui-state-default.ui-state-highlight.ui-state-active').addClass('loadremover');
  
  // Phase - 2 Date : 27-6-2017 
  // SHOW/HIDE TIMELINE 1
    $(document).on("tap", ".showhidetl1", function() {
        var dit = $(this);
        var par = dit.parent();
        var icon = dit.find('div');
        if ( dit.hasClass('hidetl1') ) {
               $('#tl23').hide();
                dit.removeClass('hidetl1').addClass('showtl1');
                $('#top').css({'background-color':'#eee'});
                par.find('.btnkies').hide();
        } else {
               $('#tl23').show();
                dit.removeClass('showtl1').addClass('hidetl1');
                $('#top').css({'background-color':'#fff'});
                par.find('.btnkies').show();
        }
    });
    
   // SHOW/HIDE TIMELINE 2
    $(document).on("tap", ".showhidetl2", function() {
        var dit = $(this);
        var par = dit.parent();
        var icon = dit.find('div');
        if ( dit.hasClass('hidetl1') ){
                if ( $('#phase').css('display') == 'block' ) {
                       $('#tl2').hide();
                } else {
                       $('#tl0').hide();
                }
                par.find('.btnkies').hide();
                $('#top2').css({'padding-bottom':0});
                dit.removeClass('hidetl1').addClass('showtl1');
        } else {
                if ( $('#phase').css('display') == 'block' ) {
                       $('#tl2').show();
                } else {
                       $('#tl0').show();
                }
                par.find('.btnkies').show();
                $('#top2').css({'padding-bottom':''});
                dit.removeClass('showtl1').addClass('hidetl1');
        }
    });
});
