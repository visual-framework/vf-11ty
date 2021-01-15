/**
 * Precompiled Nunjucks template: vf-form__input.njk
 */
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["vf-form__input"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<form action=\"\" class=\"vf-form vf-stack vf-stack--800\">\n  <div class=\"vf-form__item vf-stack\">\n    <label class=\"vf-form__label\" for=\"text\">Text</label>\n    <input type=\"text\" id=\"text\" class=\"vf-form__input\">\n  </div>\n\n  <div class=\"vf-form__item vf-stack\">\n    <label class=\"vf-form__label\" for=\"password\">Password</label>\n    <input type=\"password\" id=\"password\" class=\"vf-form__input\">\n  </div>\n\n  <div class=\"vf-form__item vf-stack\">\n    <label class=\"vf-form__label\" for=\"search\">Search</label>\n    <input type=\"search\" id=\"search\" class=\"vf-form__input\">\n  </div>\n\n  <div class=\"vf-form__item vf-stack\">\n    <label class=\"vf-form__label\" for=\"email\">Disabled email</label>\n    <input type=\"email\" id=\"email\" class=\"vf-form__input\" disabled>\n  </div>\n  <div class=\"vf-form__item vf-stack\">\n    <label class=\"vf-form__label\" for=\"text-invalid\">Invalid Text</label>\n    <label class=\"vf-form__label vf-form__label--required\">\n      <span class=\"vf-u-sr-only\">field is required.</span>\n      <span class=\"vf-icon vf-icon--asterick\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><title>asterick</title><path d=\"M23.555,8.729a1.505,1.505,0,0,0-1.406-.98H16.062a.5.5,0,0,1-.472-.334L13.405,1.222a1.5,1.5,0,0,0-2.81,0l-.005.016L8.41,7.415a.5.5,0,0,1-.471.334H1.85A1.5,1.5,0,0,0,.887,10.4l5.184,4.3a.5.5,0,0,1,.155.543L4.048,21.774a1.5,1.5,0,0,0,2.31,1.684l5.346-3.92a.5.5,0,0,1,.591,0l5.344,3.919a1.5,1.5,0,0,0,2.312-1.683l-2.178-6.535a.5.5,0,0,1,.155-.543l5.194-4.306A1.5,1.5,0,0,0,23.555,8.729Z\"/></svg></span>\n    </label>\n\n    <input type=\"text\" id=\"text-invalid\" class=\"vf-form__input\" required>\n\n    <p class=\"vf-form__helper vf-form__helper--error\">You need to fill this out.</p>\n  </div>\n</form>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
