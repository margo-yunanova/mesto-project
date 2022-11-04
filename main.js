(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{J:()=>K});var t={baseUrl:"https://mesto.nomoreparties.co/v1/plus-cohort-16",headers:{authorization:"3b45e7df-7420-41ed-89ad-84bab9964bf8","Content-Type":"application/json"}},r=document.querySelector(".page"),n=r.querySelector(".profile__edit-button"),o=r.querySelector(".profile__add-button"),c=r.querySelector(".places"),a=r.querySelector("#place-template").content.querySelector(".place");function i(e){var r,n=e.target.closest(".place");e.target.classList.contains("place__icon-like_active")?(r=n.dataset.id,fetch("".concat(t.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(t){n.querySelector(".place__like-counter").textContent=t.likes.length,e.target.classList.remove("place__icon-like_active")})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n.dataset.id).then((function(t){n.querySelector(".place__like-counter").textContent=t.likes.length,e.target.classList.add("place__icon-like_active")})).catch((function(e){console.log(e)}))}function l(e){var r;(r=e.target.closest(".place").dataset.id,fetch("".concat(t.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){e.target.closest(".place").remove()})).catch((function(e){console.log(e)}))}function u(e,t){var r=a.cloneNode(!0),n=r.querySelector(".place__image"),o=r.querySelector(".place__like-counter");return r.querySelector(".place__title").textContent=e.name,n.src=e.link,n.alt="фотография ".concat(e.name),r.dataset.id="".concat(e._id),o.textContent=e.likes.length,t||r.querySelector(".place__icon-trash").classList.add("place__icon-trash_inactive"),r.querySelector(".place__icon-like").addEventListener("click",i),r.querySelector(".place__icon-trash").addEventListener("click",l),n.addEventListener("click",K),r}function s(e){c.prepend(e)}function f(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return d(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,a=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){i=!0,c=e},f:function(){try{a||null==r.return||r.return()}finally{if(i)throw c}}}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var p=r.querySelector(".form__item_el_name"),m=r.querySelector(".form__item_el_bio"),_=r.querySelector(".popup_el_place"),y=r.querySelector(".popup_el_profile"),v=r.querySelector(".popup_el_user-pic"),h=r.querySelectorAll(".popup__icon-close"),S=r.querySelectorAll(".popup");function b(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",q)}function g(e){e.classList.add("popup_opened"),document.addEventListener("keydown",q)}function q(e){"Escape"===e.key&&b(document.querySelector(".popup_opened"))}function C(e){e.target.classList.contains("popup_opened")&&b(e.target)}var k,L=f(h);try{for(L.s();!(k=L.n()).done;)k.value.addEventListener("click",(function(e){b(e.target.closest(".popup"))}))}catch(e){L.e(e)}finally{L.f()}var x,E=f(S);try{for(E.s();!(x=E.n()).done;)x.value.addEventListener("click",C)}catch(e){E.e(e)}finally{E.f()}var j=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""},A=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):(t.disabled=!0,t.classList.add(r.inactiveButtonClass))},w=function(e,t){for(var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector),o=0,c=r;o<c.length;o++){var a=c[o];j(e,a,t)}A(r,n,t)};function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var U,O=r.querySelector(".profile__name"),T=r.querySelector(".profile__bio"),B=r.querySelector(".profile__userpic"),I=r.querySelector(".profile__edit-userpic"),D=r.querySelector(".popup__image"),M=r.querySelector(".popup__subtitle"),J=r.querySelector(".popup_el_image"),N=r.querySelector(".form__item_el_place-title"),H=r.querySelector(".form__item_el_place-link"),V=r.querySelector(".form__item_el_user-pic-link"),$=r.querySelector(".popup_el_profile .form"),z=r.querySelector(".popup_el_place .form"),F=r.querySelector(".popup_el_user-pic .form"),G={formSelector:".form",inputSelector:".form__item",submitButtonSelector:".form__submit-button",inactiveButtonClass:"form__submit-button_inactive",inputErrorClass:"form__item_type_error",errorClass:"form__item-error_active"};function K(e){D.src=e.target.src,D.alt=e.target.alt,M.textContent=e.target.closest(".place").querySelector(".place__title").textContent,g(J)}$.addEventListener("submit",(function(e){e.preventDefault();var r=e.target.querySelector(".form__submit-button");O.textContent=p.value,T.textContent=m.value,r.textContent="Сохранение...",function(e,r){return fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:e,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){return console.log(e)}))}(O.textContent,T.textContent).then((function(e){r.textContent="Сохранение",b(y)})).catch((function(e){console.log(e),r.textContent="Сохранение",b(y)}))})),z.addEventListener("submit",(function(e){e.preventDefault();var r,n,o=e.target.querySelector(".form__submit-button");o.textContent="Сохранение...",(r=N.value,n=H.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:r,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){s(u(e,!0)),o.textContent="Сохранение",b(_),z.reset()})).catch((function(e){console.log(e),o.textContent="Сохранение",b(_),z.reset()}))})),F.addEventListener("submit",(function(e){e.preventDefault();var r,n=e.target.querySelector(".form__submit-button");n.textContent="Сохранение...",(r=V.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){n.textContent="Сохранение",B.src=e.avatar,b(v)})).catch((function(e){console.log(e),n.textContent="Сохранение",b(v)}))})),n.addEventListener("click",(function(){p.value=O.textContent,m.value=T.textContent,w(y,G),g(y)})),o.addEventListener("click",(function(){w(_,G),g(_)})),I.addEventListener("click",(function(){g(v)})),U=G,Array.from(r.querySelectorAll(U.formSelector)).forEach((function(e){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);A(r,n,t);for(var o=function(){var o=a[c];o.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?j(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(e,o,t),A(r,n,t)}))},c=0,a=r;c<a.length;c++)o()}(e,U)})),fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){var r,n,o;r=e.name,n=e.about,o=e.avatar,O.textContent=r,T.textContent=n,B.src=o,fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(t){var r,n=function(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return P(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?P(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,a=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){i=!0,c=e},f:function(){try{a||null==r.return||r.return()}finally{if(i)throw c}}}}(t);try{for(n.s();!(r=n.n()).done;){var o=r.value;s(u(o,o.owner._id===e._id))}}catch(e){n.e(e)}finally{n.f()}})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})();