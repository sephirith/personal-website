			jQuery(document).ready(function($){
			
				var $timeline_block = $('.cbp_tmtimeline li');
				var $skill_block = $('.skillset');

				//hide timeline blocks which are outside the viewport
				$timeline_block.each(function(){
					if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.90) {
						$(this).find('.bounce').addClass('is-hidden');
						
					}
				});

				//on scolling, show/animate timeline blocks when enter the viewport
				$(window).on('scroll', function(){
					$timeline_block.each(function(){
						if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.90 && $(this).find('.bounce').hasClass('is-hidden') ) {
							$(this).find('.bounce').removeClass('is-hidden').addClass('bounce-in');
						}
					});
					
					
					
					$skill_block.each(function(){
						if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.90) {								
								jQuery('.skillbar').each(function(){ 
								
								jQuery(this).find('.skillbar-bar').stop(true, false).animate({
								width:jQuery(this).attr('data-percent')
								},2000);
								
								 setTimeout(function () {      
								 $('.skillbar-bar').removeClass('skillbar-bar');   
								}, 2000);				
								}); 	
								
						}
						
					}); 
					
					
				
					if ($(this).scrollTop()) {
						$('#top:hidden').stop(true, true).fadeIn();			
					} else {
						$('#top').stop(true, true).fadeOut();
					}
				
				});

				$("a[href^=#]").click(function(e) { 
				e.preventDefault(); 
				var dest = $(this).attr('href'); 
				$('html,body').animate({ scrollTop: $(dest).offset().top }, 500); 
				});

			
								var messages = $('div[data-type="message"]');
					//check if user updates the email field
					$('.cd-form .cd-email').keyup(function(event){	
						//check if user has pressed the enter button (event.which == 13)
						if(event.which!= 13) {
							//if not..
							//hide messages and loading bar 
							messages.removeClass('slide-in is-visible');
							$('.cd-form').removeClass('is-submitted').find('.cd-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
						}

						var emailInput = $(this),
							insertedEmail = emailInput.val(),
							atPosition = insertedEmail.indexOf("@");
							dotPosition = insertedEmail.lastIndexOf(".");
						//check if user has inserted a "@" and a dot
						if (atPosition< 1 || dotPosition<atPosition+2 ) {
							//if he hasn't..
							//hide the submit button
							$('.cd-form').removeClass('is-active').find('.cd-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
						} else {
							//if he has..
							//show the submit button
							$('.cd-form').addClass('is-active');
						}
					});

					//backspace doesn't fire the keyup event in android mobile
					//so we check if the email input is focused to hide messages and loading bar 
					$('.cd-form .cd-email').on('focus', function(){
						messages.removeClass('slide-in is-visible');
						$('.cd-form').removeClass('is-submitted').find('.cd-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
					});	

					//you should replace this part with your ajax function
					$('.cd-submit').on('click', function(event){
						if($('.cd-form').hasClass('is-active')) {
							$('.cd-form').addClass('is-submitted').find('.cd-loading').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
								return;
							});
										$.ajax(
							{
								url: 'js/contact.php',
								data: ({ 
										email : $('#cd-email').val(),
										}),
								type: 'post',
								success: function(data)
								{

									if(data == 1)
									{
							event.preventDefault();
							//show the loading bar and the corrisponding message
							
								$('.cd-response-success').addClass('slide-in');
							

							//if transitions are not supported - show messages
							if($('html').hasClass('no-csstransitions')) {
								$('.cd-response-success').addClass('slide-in');
							}
									}
									else
									{
							event.preventDefault();
							//show the loading bar and the corrisponding message
							
								$('.cd-response-error').addClass('slide-in');
							

							//if transitions are not supported - show messages
							if($('html').hasClass('no-csstransitions')) {
								$('.cd-response-error').addClass('slide-in');
							}
									}
									
								},
								error:function(x,e){
									if(x.status==0){
										alert('You are offline!!\n Please Check Your Network.');
										}else if(x.status==404){
										alert('Requested URL not found.');
										}else if(x.status==500){
										alert('Internel Server Error.');
										}else if(e=='parsererror'){
										alert('Error.\nParsing JSON Request failed.');
										}else if(e=='timeout'){
										alert('Request Time out.');
										}else {
										alert('Unknow Error.\n'+x.responseText);
										}
																		
								}
								
							});	
						
						}
						
						
						
						
						
						
						
					});
			
			});	