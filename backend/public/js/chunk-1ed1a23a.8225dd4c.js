(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ed1a23a"],{"30b2":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-parallax",{attrs:{height:"250",fluid:"",dark:"",src:i("7c95")}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[a("h1",{staticClass:"quad-text-shadow text-center display-1 font-weight-thin mb-4"},[t._v(" 나의 심리 상태 검사 ")])])],1)],1),a("v-container",[a("ul",{staticClass:"pa-0"},t._l(t.surveys,(function(t){return a("li",{key:t._id},[a("router-link",{staticClass:"text-decoration-none",attrs:{to:"/test/"+t._id}},[a("board-item",{attrs:{title:t.title,preview:t.description,likebtn:!1,color:"indigo"}})],1)],1)})),0)])],1)},n=[],s=(i("ac1f"),i("5319"),i("bc07")),r=i("bc3a"),o=i.n(r),c="",l={components:{BoardItem:s["a"]},data:function(){return{surveys:{}}},beforeRouteEnter:function(t,e,i){o.a.get("".concat(c,"/tests/title")).then((function(t){i((function(e){e.surveys=t.data}))})).catch((function(){i((function(t){t.$router.replace("/error")}))}))}},d=l,u=(i("b177"),i("2877")),f=i("6544"),h=i.n(f),p=i("62ad"),v=i("a523"),g=i("8b9c"),m=i("0fd9"),w=Object(u["a"])(d,a,n,!1,null,"f7e4fa46",null);e["default"]=w.exports;h()(w,{VCol:p["a"],VContainer:v["a"],VParallax:g["a"],VRow:m["a"]})},"7c95":function(t,e,i){t.exports=i.p+"img/banner_flower.474e80c7.jpg"},"7dae":function(t,e,i){"use strict";i("f854")},"8b9c":function(t,e,i){"use strict";i("a9e3"),i("94aa");var a=i("2b0e"),n=a["default"].extend({name:"translatable",props:{height:Number},data:function(){return{elOffsetTop:0,parallax:0,parallaxDist:0,percentScrolled:0,scrollTop:0,windowHeight:0,windowBottom:0}},computed:{imgHeight:function(){return this.objHeight()}},beforeDestroy:function(){window.removeEventListener("scroll",this.translate,!1),window.removeEventListener("resize",this.translate,!1)},methods:{calcDimensions:function(){var t=this.$el.getBoundingClientRect();this.scrollTop=window.pageYOffset,this.parallaxDist=this.imgHeight-this.height,this.elOffsetTop=t.top+this.scrollTop,this.windowHeight=window.innerHeight,this.windowBottom=this.scrollTop+this.windowHeight},listeners:function(){window.addEventListener("scroll",this.translate,!1),window.addEventListener("resize",this.translate,!1)},objHeight:function(){throw new Error("Not implemented !")},translate:function(){this.calcDimensions(),this.percentScrolled=(this.windowBottom-this.elOffsetTop)/(parseInt(this.height)+this.windowHeight),this.parallax=Math.round(this.parallaxDist*this.percentScrolled)}}}),s=i("58df"),r=Object(s["a"])(n);e["a"]=r.extend().extend({name:"v-parallax",props:{alt:{type:String,default:""},height:{type:[String,Number],default:500},src:String,srcset:String},data:function(){return{isBooted:!1}},computed:{styles:function(){return{display:"block",opacity:this.isBooted?1:0,transform:"translate(-50%, ".concat(this.parallax,"px)")}}},mounted:function(){this.init()},methods:{init:function(){var t=this,e=this.$refs.img;e&&(e.complete?(this.translate(),this.listeners()):e.addEventListener("load",(function(){t.translate(),t.listeners()}),!1),this.isBooted=!0)},objHeight:function(){return this.$refs.img.naturalHeight}},render:function(t){var e={staticClass:"v-parallax__image",style:this.styles,attrs:{src:this.src,srcset:this.srcset,alt:this.alt},ref:"img"},i=t("div",{staticClass:"v-parallax__image-container"},[t("img",e)]),a=t("div",{staticClass:"v-parallax__content"},this.$slots.default);return t("div",{staticClass:"v-parallax",style:{height:"".concat(this.height,"px")},on:this.$listeners},[i,a])}})},"94aa":function(t,e,i){},a523:function(t,e,i){"use strict";i("99af"),i("4de4"),i("b64b"),i("2ca0"),i("20f6"),i("4b85"),i("a15b"),i("498a");var a=i("2b0e");function n(t){return a["default"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,i){var a=i.props,n=i.data,s=i.children;n.staticClass="".concat(t," ").concat(n.staticClass||"").trim();var r=n.attrs;if(r){n.attrs={};var o=Object.keys(r).filter((function(t){if("slot"===t)return!1;var e=r[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}));o.length&&(n.staticClass+=" ".concat(o.join(" ")))}return a.id&&(n.domProps=n.domProps||{},n.domProps.id=a.id),e(a.tag,n,s)}})}var s=i("d9f7");e["a"]=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var i,a=e.props,n=e.data,r=e.children,o=n.attrs;return o&&(n.attrs={},i=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}))),a.id&&(n.domProps=n.domProps||{},n.domProps.id=a.id),t(a.tag,Object(s["a"])(n,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(i||[])}),r)}})},b177:function(t,e,i){"use strict";i("cd2f")},bc07:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{staticClass:"my-2",attrs:{outlined:""}},[i("v-card-title",{staticClass:"font-weight-medium",attrs:{"primary-title":""}},[t._v(" "+t._s(t.title)+" ")]),i("v-card-text",[t.preview?i("div",{staticClass:"text--secondary caption preview"},[t._v(" "+t._s(t.preview)+" ")]):t._e(),i("v-row",{staticClass:"px-3"},[t.view?i("div",{staticClass:"text--secondary caption"},[t._v(" "+t._s(t.date+(t.view?" | 조회 "+t.view:""))+" ")]):t._e(),i("v-spacer"),t.likebtn?i("v-btn",{attrs:{color:t.like?"red":"",icon:""},on:{click:function(e){return e.preventDefault(),t.onLike(e)}}},[i("v-icon",[t._v(t._s(t.like?"mdi-heart":"mdi-heart-outline"))])],1):t._e()],1)],1)],1)},n=[],s=(i("caad"),i("2532"),""),r={methods:{onLike:function(){var t=this;this.$axios.post("".concat(s,"/users/likes"),{set:!this.like,postId:this.id}).then((function(){t.like=!t.like,t.$store.dispatch("getLikes")}))}},data:function(){return{like:!1}},mounted:function(){this.userRule&&(this.like=this.getLike.includes(this.id))},computed:{userRule:function(){return this.$store.state.rule},getLike:function(){return this.$store.state.likes}},props:["preview","color","title","date","link","view","id","likebtn"]},o=r,c=(i("7dae"),i("2877")),l=i("6544"),d=i.n(l),u=i("8336"),f=i("b0af"),h=i("99d9"),p=i("132d"),v=i("0fd9"),g=i("2fa4"),m=Object(c["a"])(o,a,n,!1,null,"f7081aa4",null);e["a"]=m.exports;d()(m,{VBtn:u["a"],VCard:f["a"],VCardText:h["b"],VCardTitle:h["c"],VIcon:p["a"],VRow:v["a"],VSpacer:g["a"]})},cd2f:function(t,e,i){},f854:function(t,e,i){}}]);
//# sourceMappingURL=chunk-1ed1a23a.8225dd4c.js.map