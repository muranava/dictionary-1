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
        App.handleKeyPress(e);
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
      $(mainDivIDSelector).html(entry.from + " <input type='text' class='entry' /> <input type='button' value='show' onclick=\"$('#translation').show();\" class='show' /> <span id='translation' style='display:none;'>" + entry.to + "</span>");
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
    },
    
    // Show translation div
    showTranslation: function() {
      $('#translation').show();
    },
    
    // Handle key presses:
    // - show next entry on '0' or '9' press
    // - show translation on enter press
    handleKeyPress: function(e) {
      if (e.keyCode == 13) { // enter
        App.showTranslation();
        $(mainDivIDSelector+' .show').focus();
      }
      else if (e.charCode == 48 || e.charCode == 57) { // '0' / '9'
        setTimeout(function(){ App.showNextEntry(); }, 50);
      }
    }
  }
}();
