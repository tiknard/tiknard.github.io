function Randomiser(el, count, delay) {
    this.element = el;
    this.originalText = el.textContent || el.innerText || '';
    this.places = [];
    this.currentText = [];
    this.count = count || 1;   // iterations before fixing a character
    this.delay = delay || 100; // milliseconds between updates
    this.iteration = 0;
    this.startTime = new Date();
  
    var i = this.originalText.length;
  
    while (i--) {
      this.places[i] = [i];
    }
  }
  
  Randomiser.prototype.randomise = function() {
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var i = this.places.length;
  
    while (i--) {
      this.currentText[this.places[i]] = charSet.charAt((Math.random() * charSet.length) | 0);
    }
    this.iteration += 1;
  }
  
  Randomiser.prototype.setContent = function() {
    var t = this.currentText.join('');
  
    if (typeof this.element.textContent == 'string') {
      this.element.textContent = t;
    } else {
      this.element.innerText = t;
    }
  }
  
  Randomiser.prototype.run = function() {
    var n;
    var temp = [];
  
    // If first run, randomise to initiate
    if (!this.iteration) {
      this.randomise();
    }
  
    // If there are places left
    if (this.places.length) {
  
      // If reached count, randomly remove one place and set its character
      // to the original value
      if (!(this.iteration % this.count)) {
        n = this.places.splice((Math.random() * this.places.length|0), 1)[0];
        this.currentText[n] = this.originalText.charAt(n);
      }
  
      // Randomise the string and call itself
      this.randomise(); 
      this.setContent();
      var randomiser = this;
      setTimeout(function(){randomiser.run();}, this.delay); 
    }
    // If no places left, end
  }
  
  // Kick it off
  var lineOne = new Randomiser(document.getElementById('line_01'));
  lineOne.run();

  setTimeout(() => {
    window.location.assign("http://127.0.0.1:5500/main.html");
}, 3750); // 9000 millisecondes = 9 secondes
