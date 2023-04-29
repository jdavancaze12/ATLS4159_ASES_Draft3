jQuery(function () {
  var Script = {};
  (function (app) {
    var wWidth = jQuery(window).width();
      app.init = function() {
        app.bindings();
      }

      app.bindings = function() {
      	app.toggleClass();
        app.subMenu();
        app.slickCarousel();
        app.sidebarHeight();
        app.stSubMenu();
        //app.stTabShow();
      }

      app.toggleClass = function(){
      	jQuery('.toggle-click').on('click', '.toggle-btn', function(){
          toggleBtn = jQuery(this);
          var state;
      		if( toggleBtn.hasClass('toggled') ){
            state = 0;
            if( toggleBtn.hasClass('search-toggle') ){
              app.searchToggle(toggleBtn, state);
            }
            if( toggleBtn.hasClass('accordion-toggle') ){
              app.accordionToggle(toggleBtn, state);
            }
            if( toggleBtn.hasClass('menu-toggle') ){
              app.phoneMenuToggle(toggleBtn, state);
            }
            if( toggleBtn.hasClass('search-toggle-inner') ){
              app.searchToggleInner(toggleBtn, state);
            }
      		}else{
            state = 1;
            if( toggleBtn.hasClass('search-toggle') ){
        			app.searchToggle(toggleBtn, state);
            }
            if( toggleBtn.hasClass('accordion-toggle') ){
              app.accordionToggle(toggleBtn, state);
            }
            if( toggleBtn.hasClass('menu-toggle') ){
              app.phoneMenuToggle(toggleBtn, state);
            }
            if( toggleBtn.hasClass('search-toggle-inner') ){
              app.searchToggleInner(toggleBtn, state);
            }
      		}
      	});
      }

      app.searchToggle = function (toggleBtn, state){
        if( state == 0 ){
          toggleBtn.find('i.fa').removeClass('fa-close').addClass('fa-search');
          toggleBtn.parent().find('.toggle-child').fadeOut();
          toggleBtn.removeClass('toggled');
        }else if( state == 1){
          toggleBtn.find('i.fa').removeClass('fa-search').addClass('fa-close');
          toggleBtn.parent().find('.toggle-child').fadeIn();
          toggleBtn.addClass('toggled');
        }
      }

      app.accordionToggle = function (toggleBtn, state){
        if( state == 0 ){
          toggleBtn.find('i.fa').removeClass('fa-minus').addClass('fa-plus');
          toggleBtn.parents('.toggle-click').find('.toggle-child').slideUp();
          toggleBtn.removeClass('toggled');
        }else if( state == 1){
          toggleBtn.find('i.fa').removeClass('fa-plus').addClass('fa-minus');
          toggleBtn.parents('.toggle-click').find('.toggle-child').slideDown();
          toggleBtn.addClass('toggled');
        }
      }

      app.phoneMenuToggle = function(toggleBtn, state){
        if( state == 0 ){
          toggleBtn.find('i.fa').removeClass('fa-close').addClass('fa-bars');
          toggleBtn.parents('.toggle-click').find('.toggle-child').slideUp();
          toggleBtn.removeClass('toggled');
        }else if( state == 1){
          toggleBtn.find('i.fa').removeClass('fa-bars').addClass('fa-close');
          toggleBtn.parents('.toggle-click').find('.toggle-child').slideDown();
          toggleBtn.addClass('toggled');
        }
      }

      app.searchToggleInner = function(toggleBtn, state){
        if( state == 0 ){
          toggleBtn.find('i.fa').removeClass('fa-close').addClass('fa-search');
          toggleBtn.parents('.toggle-click').find('.toggle-child').fadeOut();
          toggleBtn.removeClass('toggled');
        }else if( state == 1){
          toggleBtn.find('i.fa').removeClass('fa-search').addClass('fa-close');
          toggleBtn.parents('.toggle-click').find('.toggle-child').fadeIn().css('display', 'inline-block');
          toggleBtn.addClass('toggled');
        }
      }

      app.subMenu = function(){
          jQuery( 'ul.header_menu li.menu-item-has-children' ).hover(
              function(){
                  jQuery(this).children('.sub-menu').slideDown();
              },
              function(){
                  jQuery(this).children('.sub-menu').slideUp();
              }
          );
      }

      app.stSubMenu = function(){
          jQuery( 'ul.st-category-list li' ).hover(
              function(){
                  jQuery(this).children('.sub-st-category-list').slideDown();
              },
              function(){
                  jQuery(this).children('.sub-st-category-list').slideUp();
              }
          );
      }

      app.slickCarousel = function(){
          jQuery(".newsinfo").slick({
            dots: false,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1300,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 993,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              }
            ]
          });
      }

      app.sidebarHeight = function(){
        if(wWidth > 768){
          var innerContentHeight = jQuery('.inner-content-wrapper').outerHeight();
          var asideHeight = jQuery('aside').outerHeight();
          if( innerContentHeight > asideHeight ){
            jQuery('aside').height(innerContentHeight);
          }
        }
      }

      app.stTabShow = function(){
        jQuery(document).ready(function() {
           var hash = window.location.hash;

           if (hash != ""){
              var divPosition = jQuery('#STCatList').offset();
              jQuery('html, body').animate({scrollTop: divPosition.top}, "slow");
              var child = hash.charAt(1);
              if(child == '_'){
                var hash2 = '#'+hash.slice(2);
                jQuery('#STCatList li').removeClass('active');
                jQuery('#STCatList ul.sub-st-category-list a[href="' + hash2 + '"]').tab('show');
              }else{
                jQuery('#STCatList a[href="' + hash + '"]').tab('show');
              }
           }
        });
      }

  app.init();
  })(Script);
});
