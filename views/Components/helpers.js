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
    
    compare: function(a, b) {
      if(typeof +a === 'number' && a.length < 3) {
        return a - b;
      }
      
      if(!Number.isNaN(Date.parse(a)) && a.length >= 8) {
        a = Date.parse(a);
        b = Date.parse(b);
      }
      
      if(Number.isNaN(a) && Number.isNaN(b)) {
        a = a.toLowerCase();
        b = b.toLowerCase();
      } 
      
      return (a<b) ? -1 : (a>b) ? 1 : 0;
    }
};