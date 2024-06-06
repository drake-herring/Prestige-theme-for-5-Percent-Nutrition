jQuery(document).ready(function() {
jQuery('body').on('click','section.Product .ProductMeta .yotpo-bottomline.star-clickable',function(){
    console.log('abc')
    jQuery('html,body').animate({
        scrollTop: jQuery("#reviewSection").offset().top
    }, 1000);
})
if (window.innerWidth <= 768) { // Assuming mobile and tablet devices have a maximum width of 768px
    document.getElementById('ex1').id = 'ex2';
  }

var templateSuffix = jQuery('.product-thumbnail-images').data('template-suffix');
  var itemsToShow = 3; // Default value

  if (templateSuffix === 'apparel') {
    itemsToShow = 4;
  } 

  jQuery('.product-thumbnail-images.owl-carousel').owlCarousel({
    items: itemsToShow,
    loop: false,
    dots:false
  });


// Thumbnail click change Feature Image Code
jQuery(document).on('click', '.product-thumbnail-image__img', function() {
  console.log('working for this')
  var mainImageSrc = jQuery(this).data('main-image');
  console.log(mainImageSrc)
  var mainImage = jQuery('.product-main-image__img');
  console.log(mainImage)
  mainImage.fadeOut(100, function() {
    mainImage.attr('src', mainImageSrc);
    mainImage.fadeIn(100);
  });
  jQuery('.product-thumbnail-image__img').not(jQuery(this)).parent().removeClass('product-thumbnail-image--active');
  jQuery(this).parent().addClass('product-thumbnail-image--active');

  // Update zoom hover image source and reinitialize zoom
  jQuery('#ex1 img').attr('src', mainImageSrc).parent().trigger('zoom.destroy').zoom();
});

// On Hover Featured Image Zoom Code (only on desktop screens)
    if (jQuery(window).width() > 991) {
      jQuery('#ex1').zoom();
    }


// Popup Modal on Main Image Click Code
jQuery('body').on('click', '.zoom', function() {
  var mainImage = jQuery(this).find('img');
  var mainImageSrc = mainImage.attr('src');
  var thumbnails = jQuery('.product-thumbnail-image');
  var currentIndex = thumbnails.index(jQuery(this));

  var modal = jQuery('<div class="modal"></div>');
  var modalContent = jQuery('<div class="modal-content"></div>');
  var closeModalButton = jQuery('<span class="close">&times;</span>');
  var prevButton = jQuery('<span class="prev">&#8249;</span>');
  var nextButton = jQuery('<span class="next">&#8250;</span>');
  var enlargedImage = jQuery('<img src="' + mainImageSrc + '" alt="Enlarged Image">');

  modalContent.append(closeModalButton);
  modalContent.append(prevButton);
  modalContent.append(nextButton);
  modalContent.append(enlargedImage);
  modal.append(modalContent);
  jQuery('body').append(modal);

  closeModalButton.on('click', function() {
    modal.remove();
  });

  modal.on('click', function(e) {
    if (jQuery(e.target).hasClass('modal')) {
      modal.remove();
    }
  });

  prevButton.on('click', function() {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    var prevImageSrc = thumbnails.eq(currentIndex).find('img').attr('src');
    enlargedImage.attr('src', prevImageSrc);
  });

  nextButton.on('click', function() {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    var nextImageSrc = thumbnails.eq(currentIndex).find('img').attr('src');
    enlargedImage.attr('src', nextImageSrc);
  });
});

// Refresh Owl Carousel after modal close
jQuery(document).on('click', '.modal .close', function() {
  owl.trigger('refresh.owl.carousel');
});





// Benefits Section Mobile Carosuel  

    jQuery('.loop').owlCarousel({
    center: true,
    items:2,
    loop:true,
    margin:10,
    autoplay: true, 
    autoplayTimeout: 4000,
    responsive:{
        600:{
            items:4
        }
    }
    });


// Benefits Section Carosuel  

var itemCount = jQuery('.desk-loop li').length;

jQuery('.desk-loop').owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true, 
  autoplayTimeout: 4000,
  responsiveClass: true,
  responsive: {
    600: {
      items: 3,
      nav: false,
      loop: itemCount > 3
    },
    1000: {
      items: 4,
      nav: false,
      loop: itemCount > 4
    }
  }
});


// Product Section Tablet Carosuel  
  
jQuery('#tablet-product-slider').owlCarousel({
  items: 1,
  loop: true,
  margin: 10,
  // autoplay: true,
  autoplayTimeout: 4000,
  dots: true,
  onInitialized: function(event) {
    jQuery(event.target).find('.owl-item img').click(function() {
      var mainImageSrc = jQuery(this).attr('src');
      var thumbnails = jQuery(event.target).find('.owl-item');
      var currentIndex = jQuery(this).closest('.owl-item').index();

      var modal = jQuery('<div class="modal"></div>');
      var modalContent = jQuery('<div class="modal-content"></div>');
      var closeModalButton = jQuery('<span class="close">&times;</span>');
      var prevButton = jQuery('<span class="prev">&#8249;</span>');
      var nextButton = jQuery('<span class="next">&#8250;</span>');
      var enlargedImage = jQuery('<img src="' + mainImageSrc + '" alt="Enlarged Image">');

      modalContent.append(closeModalButton);
      modalContent.append(prevButton);
      modalContent.append(nextButton);
      modalContent.append(enlargedImage);
      modal.append(modalContent);
      jQuery('body').append(modal);

      closeModalButton.on('click', function() {
        modal.remove();
      });

      modal.on('click', function(e) {
        if (jQuery(e.target).hasClass('modal')) {
          modal.remove();
        }
      });

      prevButton.on('click', function() {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        var prevImageSrc = thumbnails.eq(currentIndex).find('img').attr('src');
        enlargedImage.attr('src', prevImageSrc);
      });

      nextButton.on('click', function() {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        var nextImageSrc = thumbnails.eq(currentIndex).find('img').attr('src');
        enlargedImage.attr('src', nextImageSrc);
      });
    });
  }
});
// Product Section Mobile Carosuel  
  
jQuery('#mobile-product-slider').owlCarousel({
  center: true,
  items: 2,
  loop: true,
  margin: 10,
  // autoplay: true,
  autoplayTimeout: 4000,
  dots: true,
  responsive: {
    600: {
      items: 4
    }
  },
  onInitialized: function(event) {
    jQuery(event.target).find('.owl-item img').click(function() {
      var mainImageSrc = jQuery(this).attr('src');
      var thumbnails = jQuery(event.target).find('.owl-item');
      var currentIndex = jQuery(this).closest('.owl-item').index();

      var modal = jQuery('<div class="modal"></div>');
      var modalContent = jQuery('<div class="modal-content"></div>');
      var closeModalButton = jQuery('<span class="close">&times;</span>');
      var prevButton = jQuery('<span class="prev">&#8249;</span>');
      var nextButton = jQuery('<span class="next">&#8250;</span>');
      var enlargedImage = jQuery('<img src="' + mainImageSrc + '" alt="Enlarged Image">');

      modalContent.append(closeModalButton);
      modalContent.append(prevButton);
      modalContent.append(nextButton);
      modalContent.append(enlargedImage);
      modal.append(modalContent);
      jQuery('body').append(modal);

      closeModalButton.on('click', function() {
        modal.remove();
      });

      modal.on('click', function(e) {
        if (jQuery(e.target).hasClass('modal')) {
          modal.remove();
        }
      });

      prevButton.on('click', function() {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        var prevImageSrc = thumbnails.eq(currentIndex).find('img').attr('src');
        enlargedImage.attr('src', prevImageSrc);
      });

      nextButton.on('click', function() {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        var nextImageSrc = thumbnails.eq(currentIndex).find('img').attr('src');
        enlargedImage.attr('src', nextImageSrc);
      });
    });
  }
});

jQuery('.close').click(function() {
  jQuery('.modal').remove();
});


/*     Accordion Script   */

    jQuery(".accordion-title").click(function() {
    var content = jQuery(this).siblings(".accordion-content");
    var toggle = jQuery(this).find(".accordion-toggle");

    if (content.is(":visible")) {
      content.slideUp();
      toggle.find(".accordion-icon-minus").hide();
      toggle.find(".accordion-icon-plus").show();
    } else {
      jQuery(".accordion-content").slideUp();
      jQuery(".accordion-icon-minus").hide();
      jQuery(".accordion-icon-plus").show();

      content.slideDown();
      toggle.find(".accordion-icon-minus").show();
      toggle.find(".accordion-icon-plus").hide();
    }
  });  



  // var $benefitsContainer = jQuery('.benefits-content-container');
  // var $emptyElements = $benefitsContainer.find('div:empty, ul:empty');
  
  // if ($emptyElements.length > 0) {
  //   jQuery('.benefits-section').hide();
  // }
  
  
});