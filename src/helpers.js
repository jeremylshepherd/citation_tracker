module.exports = {
    expired: function(str)  {
      var twoYears = 63115200000;
      var then = Date.parse(str);
      var now = Date.parse(new Date(Date.now()));
      return (now - then) > twoYears ? true : false;
    },
    
    queryCheck: function (r, query) {
      if(
        r.tag.toLowerCase().indexOf(query)      !== -1 ||
        r.make.toLowerCase().indexOf(query)     !== -1 ||
        r.model.toLowerCase().indexOf(query)     !== -1 ||
        r.location.toLowerCase().indexOf(query)     !== -1 ||
        r.employee.toLowerCase().indexOf(query) !== -1 ||
        r.officer.name.toLowerCase().indexOf(query)  !== -1 ||
        r.color.toLowerCase().indexOf(query)    !== -1 ||
        r.state.toLowerCase().indexOf(query)    !== -1
      ){
        return true;
      }else{
        return false;
      }
    },
    
    cleanInput: function(str) {
      var re = /^[A-z0-9 _\/ \, \:]*[A-z0-9 _\/ \, \:][A-z0-9 _\/ \, \:]*$/;
      var arr = str.split('');
      var newArr = [];
      for(var i = 0; i < arr.length; i++){
          if(re.test(arr[i])){
              newArr.push(arr[i]);
          }
      }
      var newStr = newArr.join('');
      return newStr.toUpperCase();
    },
    
    validator: function(r) {
       if(
        !r.ticket ||
        !r.make ||
        !r.color || 
        !r.tag || 
        !r.violation.length || 
        !r.location || 
        !r.officer || 
        r.date.length < 10 || 
        r.time.length <5) {
          return false;
      }
      return true;
    }
};