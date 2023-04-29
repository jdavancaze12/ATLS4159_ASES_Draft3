(function( $ ) {
	'use strict';
    $.fn.serializeFormJSON = function () {
        var o = {},
            a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	$(document).ready(function () {
		
		var emailValivatePattern = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9\._-]+\.\w{2,}$/;
		var urlValivatePattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
		$(document).on('input', '.ays_pb_subscription_live input[name="ays_pb_subs_email"]', function(){
            if ($(this).attr('type') !== 'hidden') {
                $(this).removeClass('ays_pb_red_border');
                $(this).removeClass('ays_pb_green_border');
                if($(this).val() != ''){
                    if (!(emailValivatePattern.test($(this).val()))) {
                        $(this).addClass('ays_pb_red_border');
                    }else{
                        $(this).addClass('ays_pb_green_border');
                    }
                }
            }
        });


		$(document).find('.ays_pb_sub_button, .ays_pb_contact_form_live_btn, .ays_pb_send_file_type_btn').on('click', function(e){
            var _this  = $(this);
            var parent = _this.parents('form.ays-pb-form');
            
            var required_inputs = parent.find('input[required]');

            if ( required_inputs.length !== 0 ) {
                var empty_inputs = 0;

                parent.find('.ays_pb_red_border').removeClass('ays_pb_red_border');
                parent.find('.ays_pb_green_border').removeClass('ays_pb_green_border');

                for (var i = 0; i < required_inputs.length; i++) {

                    var currentInput = required_inputs.eq(i);

                    switch(currentInput.attr('type')){
                        case "checkbox": {
                            if(currentInput.prop('checked') === false){
                                currentInput.addClass('ays_pb_red_border');
                                currentInput.addClass('shake');
                                empty_inputs++;
                            }else{
                                currentInput.addClass('ays_pb_green_border');
                            }
                            break;
                        }
                        case "email": {
                            if (!(emailValivatePattern.test(currentInput.val()))) {
                                currentInput.addClass('ays_pb_red_border');
                                currentInput.addClass('shake');
                                empty_inputs++;
                            }else{
                                currentInput.addClass('ays_pb_green_border');
                            }
                            break;
                        }
                        case "tel": {
                            if (!aysPbvalidatePhoneNumber(currentInput.get(0))) {
                                currentInput.addClass('ays_pb_red_border');
                                currentInput.addClass('shake');
                                empty_inputs++;
                            }else{
                                currentInput.addClass('ays_pb_green_border');
                            }
                            break;
                        }
                        default:{
                            if (currentInput.val().trim() === '' &&
                                currentInput.attr('type') !== 'hidden') {
                                currentInput.addClass('ays_pb_red_border');
                                currentInput.addClass('shake');
                                empty_inputs++;
                            }else{
                                currentInput.addClass('ays_pb_green_border');
                            }
                            break;
                        }
                    }
                }

                var required_textareas = parent.find('textarea[required]');

                var empty_inputs2 = 0;
                if ( required_textareas.length !== 0 ) {
                    for (var i = 0; i < required_textareas.length; i++) {

                        var currentTextarea = required_textareas.eq(i);

                        if (currentTextarea.val().trim() === '' &&
                            currentTextarea.attr('type') !== 'hidden') {
                            currentTextarea.addClass('ays_pb_red_border');
                            currentTextarea.addClass('shake');
                            empty_inputs2++;
                        }else{
                            currentTextarea.addClass('ays_pb_green_border');
                        }
                    }
                }

                // var phoneInput = parent.find('input[name*="ays_pb_form_name"]');
                var emailInput = parent.find('input[name*="ays_pb_form_email"]');
                var selectAttr = parent.find('select.ays_pb_form_input[required]');
                var urlInput = parent.find('input[type="url"]');                

                // if(phoneInput.val() != ''){
                //     phoneInput.removeClass('ays_pb_red_border');
                //     phoneInput.removeClass('ays_pb_green_border');
                //     if (!aysPbvalidatePhoneNumber(phoneInput.get(0))) {
                //         if (phoneInput.attr('type') !== 'hidden') {
                //             phoneInput.addClass('ays_pb_red_border');
                //             phoneInput.addClass('shake');
                //             empty_inputs2++;
                //         }
                //     }else{
                //         phoneInput.addClass('ays_pb_green_border');
                //     }
                // }

                if(emailInput.val() != ''){
                    emailInput.removeClass('ays_pb_red_border');
                    emailInput.removeClass('ays_pb_green_border');
                    if (!(emailValivatePattern.test(emailInput.val()))) {
                        if (emailInput.attr('type') !== 'hidden') {
                            emailInput.addClass('ays_pb_red_border');
                            emailInput.addClass('shake');
                            empty_inputs++;
                        }
                    }else{
                        emailInput.addClass('ays_pb_green_border');
                    }
                }
                
                if(urlInput.length > 0 && urlInput.val() != ''){
                    urlInput.removeClass('ays_pb_red_border');
                    urlInput.removeClass('ays_pb_green_border');
                    if (!(urlValivatePattern.test(urlInput.val()))) {
                        // if (urlInput.attr('type') !== 'hidden') {
                            urlInput.addClass('ays_pb_red_border');
                            urlInput.addClass('shake');
                            empty_inputs++;
                        // }
                    }else{
                        urlInput.addClass('ays_pb_green_border');
                    }
                }
                for (var i = 0; i < selectAttr.length; i++) {
                    if(selectAttr.eq(i).val() == ''){
                        selectAttr.eq(i).removeClass('ays_pb_red_border');
                        selectAttr.eq(i).removeClass('ays_pb_green_border');

                        selectAttr.eq(i).addClass('ays_pb_red_border');
                        selectAttr.eq(i).addClass('shake');
                        empty_inputs++;
                    }else{
                        selectAttr.eq(i).removeClass('ays_pb_red_border');
                    }
                }

                var errorFields = parent.find('.ays_pb_red_border');

                if (empty_inputs2 !== 0 || empty_inputs !== 0) {
                    e.preventDefault();
                    setTimeout(function(){
                        errorFields.each(function(){
                            $(this).removeClass('shake');
                        });
                    }, 500);
                    setTimeout(function(){
                        required_inputs.each(function(){
                            $(this).removeClass('shake');
                        });
                    }, 500);
                    return false;
                }
                else if((e.target.className).match('ays_pb_send_file_type_btn')) {
                    ays_pb_send_file_type_fn();
                }
                else{
                    parent.submit();
                }
            }
        });

        function ays_pb_send_file_type_fn() {
            $(document).on('click', '.ays_pb_send_file_type_btn', function(e){
            var form = $(this).parents('.ays_pb_send_file_container').parents('form#ays_pb_send_file_form');
            var thisDataConfirm = form.data('confirm');

            var curentSubPb = $(this).parents('*[class*=ays-pb-modal_]');
            var curentSubPbClass = curentSubPb.attr("class").split(' ')[1];
            var curentSubPbClassId = curentSubPbClass.split('_')[1];

            var confirm; 

            if(thisDataConfirm && thisDataConfirm != ""){
                confirm = window.confirm(pb_public.ays_pb_confirm);

                if( !confirm && typeof confirm != undefined ){
                    return false;
                }
            }

            var data = form.serializeFormJSON();
            data.action = 'ays_pb_subscribe_get_file';
            $.ajax({
                url: pb_public.ajax,
                dataType: 'json',
                data: data,
                method: 'POST',
                beforeSend: function() {
                    $(document).find('div.ays-pb-preloader').css('display', 'flex');
                },
                success: function (status, xhr) {
                    if(xhr === 'success') {
                        var status_unicode = '&#10003;';
                        var messageSuccess = 'Subscription is accomplished! Thank you for subscribing';
                        curentSubPb.html("<div class='send_file_info_popup'>" + status_unicode + messageSuccess + "</div>" + "<div class='ays_pb_send_file_popup_close_btn'><i class='fa fa-times fa-2x lil_close_btn_x_font'></i></div>");
                        curentSubPb.find('.ays_pb_send_file_popup_close_btn').on('click', function(event){
                            curentSubPb.hide();
                            $(document).find('#ays-pb-screen-shade_' + +curentSubPbClassId).hide();
                            $(document).find('.av_pop_modals_' + +curentSubPbClassId).hide();
                        })
                    }
                },
                complete:function(){
                    $(document).find('div.ays-pb-preloader').delay(700)
                      .queue( function(next){ 
                        $(this).hide(); 
                        next();
                      });
                   },
                error: function() {
                    var status_unicode = '&#x26A0;';
                    var messageFail = 'Error occurred during the subscription. Please, try again';
                    curentSubPb.html("<div class='send_file_info_popup'>" + status_unicode + messageFail + "</div>" + "<div class='ays_pb_send_file_popup_close_btn'><i class='fa fa-times fa-2x lil_close_btn_x_font'></i></div>");
                        curentSubPb.find('.ays_pb_send_file_popup_close_btn').on('click', function(event){
                            curentSubPb.hide();
                            $(document).find('#ays-pb-screen-shade_' + +curentSubPbClassId).hide();
                            $(document).find('.av_pop_modals_' + +curentSubPbClassId).hide();
                        })
                }
            });
            });
        }
        
        $(document).find('.ays-pb-accept-all-cookies').on( 'click', function(){
            var expTime = $(this).parent().parent().find('input.ays-pb-accept-cookie-expire-time').data('expire');
            var id = $(this).parent().parent().find('input.ays-pb-accept-cookie-expire-time').data('id');
                if(expTime != ''){
                    set_cookies('ays_pb_accept_cookie_'+id, 'ays_pb_accept_cookie_'+id, parseInt(expTime));
                }else{
                    set_cookies('ays_pb_accept_cookie_'+id, 'ays_pb_accept_cookie_'+id, 10*365*24*60*60*1000);
                }
                $(document).find('.ays-pb-modal-close_'+id).trigger('click');
        });

        $(document).on('click', '#ays_pb_dismiss_ad', function(){
            var expTime = $(this).parent().data('dismiss');
            var id = $(this).parent().data('id');
    
            if(expTime != ''){
                set_cookies('ays_pb_dismiss_ad_'+id, 'ays_pb_dismiss_ad_'+id, parseInt(expTime));
            }else{
                var expiryDate = new Date();
                  expiryDate.setMonth(expiryDate.getMonth() + 1);
                set_cookies('ays_pb_dismiss_ad_'+id, 'ays_pb_dismiss_ad_'+id, expiryDate);
            }
            $(document).find('.ays-pb-modal-close_'+id).trigger('click');
        });

	});
})( jQuery );

function set_cookies( cname, cvalue, exdays ) {
    var expires = "expires=" +  (new Date(Date.now() + exdays)).toUTCString();  
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
window.onload = function(){
	var classList = document.body.classList;
	document.ontouchmove = function(e){
    	for( var i = 0; i < classList.length; i++ ){
    		if( classList[i] == 'pb_disable_scroll' ){
    			if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                    e.preventDefault(); 
    			}
    			break;
    		}else if( classList[i] == 'pb_enable_scroll' ){
    		    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
    		        true;
    			}
    			break;
    		} 
    	}
	}
}