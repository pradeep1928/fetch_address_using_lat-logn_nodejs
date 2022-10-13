function overloadMethod(object, name, fn){
    if(!object._overload){
    object._overload = {};
    }

    if(!object._overload[name]){
    object._overload[name] = {};
    }

    if(!object._overload[name][fn.length]){
    object._overload[name][fn.length] = fn;
    }

    object[name] = function() {
         if(this._overload[name][arguments.length])
         return this._overload[name][arguments.length].apply(this, arguments);
    }
}

    function Students(){
     
        obj = {
            name: 'pradeep'
        }
        overloadMethod(this, "find", function(){
             // Find a student by name
        });
   
        overloadMethod(this, "find", function(first, last){
             // Find a student by first and last name
        });
   
   }

   var students = new Students();
   console.log(students.find()); // Finds all
   console.log(students.find("Rahul")); // Finds students by name