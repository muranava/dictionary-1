var App = function(){
  var dictionary;
  var mainDivIDSelector;
  
  return {
    
    // Main entry point in to the app
    run: function(dictionaryIn, mainDivIDIn) {
      dictionary = dictionaryIn;
      mainDivIDSelector = '#'+mainDivIDIn;
      
      // Handle enter key press
      $(window).keypress(function(e) {
        if(e.keyCode == 13) {
          $('#translation').show();
        }
      });
      
      App.showNextEntry();
    },
    
    // Extract random entry and display it
    showNextEntry: function() {
      var entry = App.getRandomEntry();
      App.display(entry);
    },
    
    // 
    display: function(entry) {
      $(mainDivIDSelector).append(entry.from + " <input type='text' class='entry' /> <input type='button' value='show' onclick=\"$('#translation').show();\" /> <span id='translation' style='display:none;'>" + entry.to + "</span>");
      $(mainDivIDSelector+' .entry').focus();
    },
    
    // Get random entry from the dictionary
    getRandomEntry: function() {
      var entryIndex = App.randomFromTo(0, dictionary.entries.length);
      return dictionary.entries[entryIndex];
    },

    // Generate random number between min and max
    randomFromTo: function(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }
  }
}();
