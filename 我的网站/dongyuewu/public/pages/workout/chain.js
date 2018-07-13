

var list = new linkedList();
list.append(2018);
list.append({name:'wu'});
list.append({year:18});
list.append('wu');


console.log(list);
function linkedList () {
  var Node = function(element) {
    this.element = element;
    this.next = null
  }
  this.length = 0;
  this.head = null;

  this.append = function(element) {
    var node = new Node(element);
    if(this.head === null) {
      this.head = node
    } else {
      let current = this.head;
      while(current.next !== null) {
        current = current.next
      }
      current.next = node;
    }
    this.length++;

  }

  this.insert = function(position, element) {
    var node = new Node(element),
        current = this.head,
        previous,
        index = 0;

    if(position > -1 && position <= this.length) {
      if(position === 0) {
        node.next = current;
        this.head = node;
      } else {
        while(index++ < position) {
          previous = current
          current = current.next;
        }
        previous.next = node;
        node.next = current;
      }
      this.length++;

      return true
    } else {
      return false
    }
  }

  this.removeAt = function(position) {
    let current = this.head,
        previous,
        index = 0;
    if(position > - 1 && position < this.length) {
      if(position === 0) {
        this.head = current.next()
      } else {
        while(index++ < position) {
          previous = current;
          current = current.next
        }
        previous.next = current.next;
      }
      this.length--;
      return current.element
    } else {
      return null
    }
  }
  this.remove = function(element) {

  }
  this.indexOf = function(element) {
    var current = this.head,
        position = 0;
    while( position++ < this.length) {
      if(current.element === element) {
        return position - 1
      }
      current = current.next
    }
    return -1
  }

  this.isEmpty = function() {
    return this.length === 0
  }

  this.size = function() {
    return this.length
  }

  this.getHead = function() {
    return this.head
  }

  this.toString = function() {
    var current = this.head,  
        string = '';

      while(current) {
        string += ',' + current.element;
        current = current.next
      }
      return string.slice(1)
  }

  this.print = function() {

  }
  
  this.reverse = function() {
      var previous = this.head,
          current = previous.next,
          that = this;
      if(current) {
        (function reverse(p, c) {
          var next = c.next
          c.next = p;
          if(next) {
            reverse(c, next)
          } else {
            that.head.next = null
            that.head = c
          }
          
        })(previous, current)
      }

      
    }

}