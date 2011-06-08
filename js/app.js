var App = function(){
  var dictionary, mainDivIDSelector, ids = [];
  
  return {
    
    // Main entry point in to the app
    run: function(dictionaryIn, mainDivIDIn) {
      dictionary = dictionaryIn;
      mainDivIDSelector = '#'+mainDivIDIn;
      
      // Handle enter key press
      $(window).keypress(function(e) {
        App.handleKeyPress(e);
      });
      
      $(mainDivIDSelector).html('<div class="new"></div><div class="missed" style="text-align:left; margin-top:20px; font-size:12px;"></div>')
      
      App.showNextEntry();
    },
    
    // Extract random entry and display it
    showNextEntry: function() {
      entry = App.getRandomEntry();
      App.display(entry);
    },
    
    delayedNextEntry: function() {
      setTimeout(function(){ App.showNextEntry(); }, 50);
    },
    
    missed: function() {
      // Add current entry to missed list
      var currentEntry = dictionary.entries[ids[ids.length-1]];
      $(mainDivIDSelector+' .missed').append(currentEntry.from+' = '+currentEntry.to+', ')
      
      App.delayedNextEntry();
    },
    
    // 
    display: function(entry) {
      $(mainDivIDSelector+' .new').html(entry.from + " <input type='text' class='entry' /> <input type='button' value='show' onclick=\"$('#translation').show();\" class='show' /> <span id='translation' style='display:none;'>" + entry.to + "</span>");
      $(mainDivIDSelector+' .entry').focus();
    },
    
    // Get random entry from the dictionary
    getRandomEntry: function() {
      var entryIndex;
      // Select an entry that was not displayed already
      do {
        entryIndex = App.randomFromTo(0, dictionary.entries.length);
      } while ($.inArray(entryIndex, ids) != -1);
      
      ids.push(entryIndex);
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
      else if (e.charCode == 47) { // '?'
        App.missed();
      }
      else if (e.charCode == 48 || e.charCode == 57) { // '0' / '9'
        App.delayedNextEntry();
      }
    }
  }
}();
