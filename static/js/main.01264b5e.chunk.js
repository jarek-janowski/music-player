(this["webpackJsonpmusic-player"]=this["webpackJsonpmusic-player"]||[]).push([[0],[,,,,,,,,,function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){"use strict";a.r(t);var r=a(1),s=a.n(r),n=a(4),c=a.n(n),i=(a(9),a(2)),o=(a(10),a(0)),l=function(e){var t=e.audioRef,a=e.progressRef,s=e.song,n=e.nextSong,c=e.prevSong,l=e.handlePlayPause,u=e.isPaused,d=e.startSetProgressBar,j=e.stopSetProgressBar,f=e.setProgressBar,h=e.progress,p=e.addRemoveFromFavourites,m=s.audioUrl,b=s.cover,g=s.title,v=s.artist,O=s.id,x=Object(o.jsx)("i",{className:"fa fa-step-backward","aria-hidden":"true"}),N=Object(o.jsx)("i",{className:"fa fa-step-forward","aria-hidden":"true"}),y=Object(o.jsx)("i",{className:"fa fa-pause","aria-hidden":"true"}),_=Object(o.jsx)("i",{className:"fa fa-play","aria-hidden":"true"}),S=Object(o.jsx)("i",{className:"fa fa-heart-o","aria-hidden":"true"}),w=Object(o.jsx)("i",{className:"fa fa-heart","aria-hidden":"true"}),P=null===t.current?"":Math.floor(t.current.currentTime),k=null===t.current?"":Math.floor(t.current.duration),F=k%60||"0",I=P%60||"0",R=Math.floor(P/60)||"0",C=Math.floor(k/60)||"0",J=(JSON.parse(localStorage.getItem("favourites"))||[]).map((function(e){return e.id})).includes(s.id),T=Object(r.useState)(24),M=Object(i.a)(T,2),U=M[0],A=M[1],E=window.screen.width;return Object(r.useEffect)((function(){E>=360&&A(28),E>=410&&A(35),E>=1080&&A(36),E>=1366&&A(39)}),[E]),Object(o.jsxs)("section",{className:"song-player",children:[Object(o.jsx)("img",{className:"song-player__image",src:b,alt:"".concat(g," cover")}),Object(o.jsxs)("div",{className:"info-wrapper",children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{className:g.length>U?"song-player__title--if-length":"song-player__title",children:Object(o.jsx)("div",{className:g.length>U?"song-player__title--if-length--animation":"",children:g})}),Object(o.jsx)("p",{className:"song-player__artist",children:v})]}),Object(o.jsx)("button",{className:"song-player__heart",onClick:p,children:J?w:S})]}),Object(o.jsx)("audio",{ref:t,autoPlay:!0,preload:"metadata",src:m,type:"audio/mpeg"},O),Object(o.jsx)("div",{className:"progress-bar",children:Object(o.jsx)("div",{ref:a,onClick:f,onMouseDown:d,onMouseMove:f,onMouseLeave:j,onMouseUp:j,className:"progress-bar__container",children:Object(o.jsx)("div",{style:{width:100*h+"%"}})})}),Object(o.jsxs)("div",{className:"timers-wrapper",children:[Object(o.jsxs)("span",{className:"timers timers--current-time",children:[R,":",I<10?"0".concat(I):I]}),Object(o.jsxs)("span",{className:"timers timers--duration",children:[C,":",F<10?"0".concat(F):F]})]}),Object(o.jsx)("div",{className:"song-player__controls",children:Object(o.jsxs)("div",{className:"button-wrapper",children:[Object(o.jsx)("button",{className:"song-player__button",onClick:function(){return c(s)},children:x}),Object(o.jsx)("button",{className:"song-player__button song-player__button--play",onClick:l,children:u?_:y}),Object(o.jsx)("button",{className:"song-player__button",onClick:function(){return n(s)},children:N})]})})]})},u=(a(12),function(e){var t=e.song,a=e.isCurrent,r=e.onSelect,s=e.setIsPaused,n=e.audioRef,c=e.addRemoveFavouritesFromList,i=e.currentPlaylist,l={color:a?"#009FFD":"#EAF6FF"},u=t.cover,d=t.title,j=t.artist,f="all"===i,h=Object(o.jsx)("i",{className:"fa fa-trash-o","aria-hidden":"true"}),p=Object(o.jsx)("i",{className:"fa fa-heart-o","aria-hidden":"true"}),m=Object(o.jsx)("i",{className:"fa fa-heart","aria-hidden":"true"}),b=(JSON.parse(localStorage.getItem("favourites"))||[]).map((function(e){return e.id})).includes(t.id);return Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("li",{className:"song-list-item",children:[Object(o.jsxs)("div",{onClick:function(){n.current.play(),s(!1),r(t)},children:[Object(o.jsx)("img",{className:"song-list-item__image",src:u,alt:"".concat(d," cover")}),Object(o.jsxs)("div",{className:"title-artist-wrapper",children:[Object(o.jsx)("p",{className:"song-list-item__title",style:l,children:d}),Object(o.jsx)("p",{className:"song-list-item__artist",children:j})]})]}),Object(o.jsx)("button",{className:"song-list-item__icon",onClick:function(){return c(t)},children:f?b?m:p:h})]})})}),d=(a(13),function(e){var t=e.songs,a=e.currentSong,r=e.handleSelectSong,s=e.audioRef,n=e.setIsPaused,c=e.addRemoveFavouritesFromList,i=e.favourites,l=e.currentPlaylist;return Object(o.jsxs)("section",{className:"songs",children:[Object(o.jsx)("h2",{className:"songs__heading",children:"all"===l?"All songs":"Favourites"}),Object(o.jsx)("ul",{className:"songs__list",children:0===t.length?"dodaj co\u015b":t.map((function(e){return Object(o.jsx)(u,{song:e,isCurrent:e.audioUrl===a.audioUrl,onSelect:r,setIsPaused:n,audioRef:s,addRemoveFavouritesFromList:c,favourites:i,currentPlaylist:l},e.id)}))})]})}),j=(a(14),function(e){var t=e.handlePlayPause,a=e.isPaused,r=e.progressRef,s=e.progress,n=e.song,c=e.className,i=e.addRemoveFromFavourites,l=e.playFavourites,u=e.playAll,d=e.currentPlaylist,j=e.data,f=e.favourites,h=e.popOut,p=n.cover,m=n.title,b=n.artist,g=Object(o.jsx)("i",{className:"fa fa-pause","aria-hidden":"true"}),v=Object(o.jsx)("i",{className:"fa fa-play","aria-hidden":"true"}),O=Object(o.jsx)("i",{className:"fa fa-heart-o","aria-hidden":"true"}),x=Object(o.jsx)("i",{className:"fa fa-heart","aria-hidden":"true"}),N="favourites"===d,y="all"===d,_=N?"playlists__chosen":"playlists__no-chosen",S=y?"playlists__chosen":"playlists__no-chosen",w=(JSON.parse(localStorage.getItem("favourites"))||[]).map((function(e){return e.id})).includes(n.id);return Object(o.jsxs)("section",{children:[Object(o.jsxs)("div",{className:"fixed-player ".concat(c),children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{ref:r,className:"fixed-player__progress-container",children:Object(o.jsx)("div",{style:{width:100*s+"%"}})}),Object(o.jsx)("img",{onClick:function(){return window.scrollTo(0,0)},className:"fixed-player__image",src:p,alt:"".concat(m," cover")}),Object(o.jsxs)("div",{onClick:function(){return window.scrollTo(0,0)},className:"fixed-player__info",children:[Object(o.jsx)("h3",{className:"fixed-player__title",children:m}),Object(o.jsx)("p",{className:"fixed-player__artist",children:b})]})]}),Object(o.jsx)("button",{className:"fixed-player__heart",onClick:i,children:w?x:O}),Object(o.jsx)("button",{className:"fixed-player__button",onClick:t,children:a?v:g})]}),Object(o.jsxs)("div",{className:"playlists",children:[Object(o.jsxs)("button",{className:S,onClick:u,children:["All songs ","(".concat(j.length,")"),Object(o.jsx)("span",{children:y?"":v})]}),Object(o.jsxs)("button",{className:_,onClick:l,children:["Favourites ","(".concat(null===f?"0":f.length,")"),Object(o.jsx)("span",{children:N?"":v})]})]}),h?Object(o.jsx)("div",{className:"pop-out",children:"Favourites is empty"}):""]})}),f=(a(15),function(){return Object(o.jsx)("div",{className:"dot",children:Object(o.jsx)("div",{className:"dot__spin"})})});a(16);var h=function(){var e=Object(r.useRef)(null),t=Object(r.useRef)(null),a=Object(r.useRef)(null);window.onload=function(){null!==e.current&&(e.current.autoplay=!1)},window.onbeforeunload=function(){window.scrollTo(0,0)};var s=Object(r.useState)(!1),n=Object(i.a)(s,2),c=n[0],u=n[1],h=Object(r.useState)([]),p=Object(i.a)(h,2),m=p[0],b=p[1],g=Object(r.useState)("all"),v=Object(i.a)(g,2),O=v[0],x=v[1],N=Object(r.useState)([]),y=Object(i.a)(N,2),_=y[0],S=y[1],w=Object(r.useState)(0),P=Object(i.a)(w,2),k=P[0],F=P[1],I=_[k],R=Object(r.useState)(!0),C=Object(i.a)(R,2),J=C[0],T=C[1],M=Object(r.useState)(0),U=Object(i.a)(M,2),A=U[0],E=U[1],L=Object(r.useState)(0),W=Object(i.a)(L,2),B=W[0],D=W[1],X=Object(r.useState)(!1),$=Object(i.a)(X,2),q=$[0],z=$[1],G=Object(r.useState)(!1),H=Object(i.a)(G,2),K=H[0],Q=H[1],V=Object(r.useState)(!1),Y=Object(i.a)(V,2),Z=Y[0],ee=Y[1],te=Object(r.useState)(!1),ae=Object(i.a)(te,2),re=ae[0],se=ae[1],ne=Object(r.useState)([]),ce=Object(i.a)(ne,2),ie=ce[0],oe=ce[1];function le(e,t){return t.findIndex((function(t){return t.audioUrl===e.audioUrl}))}function ue(e){return(JSON.parse(localStorage.getItem("favourites"))||[]).map((function(e){return e.id})).includes(e.id)}function de(e){var t=JSON.parse(localStorage.getItem("favourites"))||[];t.push({artist:e.artist,audioUrl:e.audioUrl,cover:e.cover,id:e.id,title:e.title}),localStorage.setItem("favourites",JSON.stringify(t));var a=localStorage.getItem("favourites");oe(JSON.parse(a))}function je(t){var a=(JSON.parse(localStorage.getItem("favourites"))||[]).filter((function(e){return e.id!==t.id}));localStorage.setItem("favourites",JSON.stringify(a));var r=localStorage.getItem("favourites");oe(JSON.parse(r)),"favourites"===O&&(S(JSON.parse(r)),k>0&&F(k-1),e.current.play())}Object(r.useEffect)((function(){fetch("https://music-api-j95.herokuapp.com/songs").then((function(e){e.ok&&e.json().then((function(e){b(e.songs),S(e.songs)}))}));var e=localStorage.getItem("favourites");oe(JSON.parse(e)),null===e&&localStorage.setItem("favourites",JSON.stringify([]))}),[]),Object(r.useEffect)((function(){var t=setInterval((function(){null!==e.current&&(J&&clearInterval(t),e.current.ended&&(e.current.currentTime=0,he(I),E(0),clearInterval(t)),Z!==e.current&&(ee(e.current),e.current.addEventListener("timeupdate",(function(t){if(!K&&null!==e.current){var a=e.current,r=a.currentTime,s=a.duration;E(r/s),D(r/s)}}))))}),100);return function(){return clearInterval(t)}})),window.addEventListener("scroll",(function(e){var t=e.target.scrollingElement.scrollTop;t<100?se(!1):t<700&&se(!0)})),null!==ie&&void 0===I&&0===ie.length&&m.length>1&&(S(m),x("all"),E(0),D(0),null!==e.current&&(T(!0),e.current.currentTime=0,e.current.pause())),K&&(Q(!1),e.current.currentTime=e.current.duration*A),J&&null!==e.current&&e.current.pause();var fe=function(e){if(null!==t&&q){var a=t.current,r=a.offsetLeft,s=a.offsetWidth,n=(e.clientX-r)/s;E(n),Q(!0)}},he=function(){var t=k>=_.length-1?k-_.length+1:k+1;F(t),T(!1),e.current.currentTime=0,E(0)},pe=function(){J?(T(!1),e.current.play()):J||(T(!0),e.current.pause())},me=function(){ue(I)?je(I):de(I)};return Object(o.jsx)("div",{className:"App",children:0===_.length&&"all"===O?Object(o.jsx)(f,{}):Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("h1",{className:"App__heading",children:"Music player"}),Object(o.jsx)(l,{audioRef:e,progressRef:t,song:I,nextSong:he,prevSong:function(){var e=k<=0?k+_.length-1:k-1;F(e),T(!1)},handlePlayPause:pe,isPaused:J,startSetProgressBar:function(e){z(!0),fe(e)},stopSetProgressBar:function(e){z(!1),fe(e)},setProgressBar:fe,progress:A,addRemoveFromFavourites:me,favourites:ie,currentPlaylist:O,data:m,songs:_,setCurrentSongIndex:F}),Object(o.jsx)(d,{audioRef:e,songs:_,currentSong:I,handleSelectSong:function(t){var a=le(t,_);a>=0&&(F(a),E(0),T(!1)),J||(e.current.pause(),T(!0)),a!==k&&(e.current.play(),T(!1))},setIsPaused:T,song:I,addRemoveFavouritesFromList:function(e){var t=le(e,_),a=_[t];ue(a)?je(a):de(a)},favourites:ie,currentPlaylist:O}),Object(o.jsx)(j,{audioRef:e,handlePlayPause:pe,isPaused:J,progressRef:a,progress:B,song:I,className:re?"fixed-player__show":"fixed-player__hide",addRemoveFromFavourites:me,playFavourites:function(){ie.length>0?(S(ie),F(0),T(!0),x("favourites"),u(!1),E(0),D(0),e.current.currentTime=0):u(!0)},playAll:function(){S(m),F(0),T(!0),x("all"),E(0),D(0),e.current.currentTime=0},currentPlaylist:O,data:m,favourites:ie,popOut:c})]})})},p=(a(17),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function m(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(Object(o.jsx)(s.a.StrictMode,{children:Object(o.jsx)(h,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/music-player",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/music-player","/service-worker.js");p?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var r=a.headers.get("content-type");404===a.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):m(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):m(t,e)}))}}()}],[[18,1,2]]]);
//# sourceMappingURL=main.01264b5e.chunk.js.map