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
    }
};