$(document).ready(function(){

  var companyImageSources = ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1024px-American_Express_logo.svg.png", "http://vignette4.wikia.nocookie.net/logopedia/images/9/90/Disney1972.png", "http://www.underconsideration.com/brandnew/archives/yellow_pages_2013_00_logo_detail.png", "http://ww1.prweb.com/prfiles/2013/01/16/10332807/CC%20logo%202.jpg", "http://4vector.com/i/free-vector-nutreco_079891_nutreco.png", "https://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/072012/dolby_black_png.png?itok=wXepp2DG", "https://upload.wikimedia.org/wikipedia/en/archive/4/4b/20160229195226!The_Infor_logo.png"];

  var rightMost = 0;
  var leftMost = companyImageSources.length-4;

  var carousel = $('#carousel');
  var carouselButtonRight = $('#carousel-button-right');
  var carouselButtonLeft = $('#carousel-button-left');

  var addRight = function() {
    var item = $('<div>')
    item.addClass('carousel-item')
    item.html(`<img src='${companyImageSources[rightMost]}' alt=''>`)
    carousel.append(item)

    console.log($(carousel.find('div')[0]));
    $(carousel.find('div')[0]).attr("id", "one")
    $(carousel.find('div')[1]).attr("id", "two")
    $(carousel.find('div')[2]).attr("id", "three")

    rightMost++
    leftMost++
  }

  var addLeft = function() {

    var item = $('<div>')
    item.addClass('carousel-item')
    item.html(`<img src='${companyImageSources[leftMost]}' alt=''>`)
    carousel.prepend(item)

    console.log($(carousel.find('div')[0]));
    $(carousel.find('div')[0]).attr("id", "one")
    $(carousel.find('div')[1]).attr("id", "two")
    $(carousel.find('div')[2]).attr("id", "three")

    leftMost--
    rightMost--
  }

  var removeLeft = function() {
    // console.log(carousel.find(':first-child'));
    carousel.find(':first-child')[0].remove();
  }

  var removeRight = function() {
    // console.log(carousel.find(':last-child')[2]);
    carousel.find(':last-child')[2].remove();
  }

  var checkNumber = function() {
    if (rightMost >= companyImageSources.length) {
      rightMost = 0;
    }
    if (leftMost == -1) {
      leftMost = companyImageSources.length-1
    }
    if (leftMost >= companyImageSources.length) {
      leftMost = 0;
    }
    if (rightMost == -1) {
      rightMost = companyImageSources.length-1
    }
  }

  var moveRight = function() {
    removeLeft()
    addRight()
    checkNumber()
  }

  var moveLeft = function() {
    removeRight()
    addLeft()
    checkNumber()
  }


  carouselButtonRight.on('click', moveRight)
  carouselButtonLeft.on('click', moveLeft)
  addRight()
  addRight()
  addRight()

});
