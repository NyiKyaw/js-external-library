function loadScripts(array,callback){
  var loader = function(src,handler){
    var script = document.createElement("script");
    script.src = src;
    script.onload = script.onreadystatechange = function(){
      script.onreadystatechange = script.onload = null;
      handler();
    }
    var head = document.getElementsByTagName("head")[0];
    (head || document.body).appendChild( script );
  };
  (function run(){
    if(array.length!=0){
      loader(array.shift(), run);
    }else{
      callback && callback();
    }
  })();
}

function validateForm(form) {
  loadScripts([
    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js"
  ],function(){
    console.log('All things are loaded', form);
    const rules = {};
    form[0].Pages[0].Fields.forEach(field => {
      rules[field.FieldType] = field.Validation
    });
    $("form[name='" + form[0].Name + "']").validate({
      errorClass: "error fail-alert",
      onkeyup: false,
      onclick: false,
      focusInvalid: false,
      onfocusout: false,
      rules: rules,
      errorPlacement: function (error, element) {
        error.insertBefore(element);
      },
      submitHandler: function (form) {
        // console.log("form >>> ", form);
        // form.submit();
        window.location.reload();
      }
    });
  });
}

