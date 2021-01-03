(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ffe4f2de"],{"0798":function(t,e,o){"use strict";o("caad");var s=o("5530"),n=o("ade3"),i=(o("0c18"),o("10d2")),r=o("afdd"),a=o("9d26"),c=o("f2e7"),l=o("7560"),d=o("f40d"),u=o("58df"),h=o("d9bd");e["a"]=Object(u["a"])(i["a"],c["a"],d["a"]).extend({name:"v-alert",props:{border:{type:String,validator:function(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator:function(t){return"string"===typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator:function(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder:function(){if(!this.border)return null;var t={staticClass:"v-alert__border",class:Object(n["a"])({},"v-alert__border--".concat(this.border),!0)};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible:function(){var t=this;if(!this.dismissible)return null;var e=this.iconColor;return this.$createElement(r["a"],{staticClass:"v-alert__dismissible",props:{color:e,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(){return t.isActive=!1}}},[this.$createElement(a["a"],{props:{color:e}},this.closeIcon)])},__cachedIcon:function(){return this.computedIcon?this.$createElement(a["a"],{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes:function(){var t=Object(s["a"])(Object(s["a"])({},i["a"].options.computed.classes.call(this)),{},{"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text});return this.border&&(t["v-alert--border-".concat(this.border)]=!0),t},computedColor:function(){return this.color||this.type},computedIcon:function(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&"$".concat(this.type))},hasColoredIcon:function(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText:function(){return this.text||this.outlined},iconColor:function(){return this.hasColoredIcon?this.computedColor:void 0},isDark:function(){return!(!this.type||this.coloredBorder||this.outlined)||l["a"].options.computed.isDark.call(this)}},created:function(){this.$attrs.hasOwnProperty("outline")&&Object(h["a"])("outline","outlined",this)},methods:{genWrapper:function(){var t=[this.$slots.prepend||this.__cachedIcon,this.genContent(),this.__cachedBorder,this.$slots.append,this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],e={staticClass:"v-alert__wrapper"};return this.$createElement("div",e,t)},genContent:function(){return this.$createElement("div",{staticClass:"v-alert__content"},this.$slots.default)},genAlert:function(){var t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){var e=this.hasText?this.setTextColor:this.setBackgroundColor;t=e(this.computedColor,t)}return this.$createElement("div",t,[this.genWrapper()])},toggle:function(){this.isActive=!this.isActive}},render:function(t){var e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},"0c18":function(t,e,o){},4572:function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"topScroll"},[s("v-parallax",{attrs:{height:"250",fluid:"",dark:"",src:o("7c95")}},[s("v-row",{attrs:{align:"center",justify:"center"}},[s("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[s("h1",{staticClass:"quad-text-shadow text-center display-1 font-weight-thin mb-4"},[t._v(" 최근 작성된 게시글 ")])])],1)],1),s("v-container",[s("v-card",{attrs:{tile:"",outlined:""}},[s("v-card-text",[s("ul",{staticClass:"pa-0 ma-0"},[t.posts.length?t._e():s("div",{staticClass:"py-10 text-center"},[t._v(" 최근 작성된 글이 없습니다. ")]),t._l(t.posts,(function(e){return s("li",{key:e._id},[s("v-slide-y-reverse-transition",{attrs:{appear:"","hide-on-leave":"",duration:"1000"}},[s("list-item",{attrs:{link:"/boards/"+e.boardCode+"/"+e._id,subtitle:t.boards[e.boardCode].name,title:e.title,content:e.preview,color:t.boards[e.boardCode].color,postId:e._id}})],1)],1)}))],2)])],1)],1)],1)},n=[],i=(o("4160"),o("ac1f"),o("5319"),o("159b"),o("a6d7")),r=o("5e22"),a=o.n(r),c=o("bc3a"),l=o.n(c),d="",u={components:{ListItem:i["a"]},data:function(){return{posts:[],boards:[{code:"0",name:"난임 정보 마당",color:"pink"},{code:"1",name:"난임과 신체 건강",color:"indigo"},{code:"2",name:"신체 건강 중재",color:"indigo"},{code:"3",name:"난임과 정서적 건강",color:"amber"},{code:"4",name:"정서 건강 중재",color:"amber"},{code:"5",name:"성 건강",color:"orange"},{code:"6",name:"생활습관",color:"orange"}]}},mounted:function(){var t=this;setTimeout((function(){t.$scrollTo.scrollTo(".topScroll",800,{offset:-80,easing:[.65,0,.35,1]})}),50)},beforeRouteUpdate:function(t,e,o){var s=this;l.a.get("".concat(d,"/posts/recent")).then((function(t){s.posts=t.data.posts,s.posts.forEach((function(t){t.preview=a()(t.content,{allowedTags:[]})})),s.$scrollTo.scrollTo(".topScroll",800,{offset:-80,easing:[.65,0,.35,1]}),o()})).catch((function(){s.$router.replace("/error")}))},beforeRouteEnter:function(t,e,o){l.a.get("".concat(d,"/posts/recent")).then((function(t){o((function(e){e.posts=t.data.posts,e.posts.forEach((function(t){t.preview=a()(t.content,{allowedTags:[]})}))}))})).catch((function(){o((function(t){t.$router.replace("/error")}))}))},computed:{userRule:function(){return this.$store.state.rule},headers:function(){return[{text:"No",value:"no"},{text:"Test Name",value:"name"}]}}},h=u,p=(o("508c"),o("2877")),f=o("6544"),v=o.n(f),m=o("b0af"),b=o("99d9"),_=o("62ad"),g=o("a523"),C=o("8b9c"),k=o("0fd9"),$=o("0789"),x=Object(p["a"])(h,s,n,!1,null,"15be831f",null);e["default"]=x.exports;v()(x,{VCard:m["a"],VCardText:b["b"],VCol:_["a"],VContainer:g["a"],VParallax:C["a"],VRow:k["a"],VSlideYReverseTransition:$["f"]})},4956:function(t,e,o){},"508c":function(t,e,o){"use strict";o("4956")},a6d7:function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("router-link",{staticClass:"text-decoration-none",attrs:{to:t.link}},[o("v-alert",{staticClass:"py-0 pr-0",attrs:{tile:"","colored-border":"",color:t.color,border:"left",elevation:"0"}},[o("div",{staticClass:"one-line text--secondary caption"},[t._v(t._s(t.subtitle))]),o("div",{staticClass:"one-line subtitle-2 font-weight-bold"},[t._v(t._s(t.title))]),o("div",{staticClass:"text--secondary caption"},[t._v(t._s(t.date))]),o("v-row",{staticClass:"mx-0"},[o("div",{staticClass:"one-line text--secondary caption"},[t._v(t._s(t.content))]),o("v-spacer"),t.postId?o("v-btn",{attrs:{color:t.like?"red":"",icon:""},on:{click:function(e){return e.preventDefault(),t.onLike(e)}}},[o("v-icon",[t._v(t._s(t.like?"mdi-heart":"mdi-heart-outline"))])],1):t._e()],1)],1)],1)},n=[],i=(o("caad"),o("2532"),""),r={methods:{onLike:function(){var t=this;this.$axios.post("".concat(i,"/users/likes"),{set:!this.like,postId:this.postId}).then((function(){t.like=!t.like,t.$store.dispatch("getLikes")}))}},computed:{getLike:function(){return this.$store.state.likes}},mounted:function(){this.postId&&(this.like=this.getLike.includes(this.postId))},data:function(){return{like:!1}},props:["color","title","date","link","content","subtitle","postId"]},a=r,c=(o("ddcd"),o("2877")),l=o("6544"),d=o.n(l),u=o("0798"),h=o("8336"),p=o("132d"),f=o("0fd9"),v=o("2fa4"),m=Object(c["a"])(a,s,n,!1,null,"de0af918",null);e["a"]=m.exports;d()(m,{VAlert:u["a"],VBtn:h["a"],VIcon:p["a"],VRow:f["a"],VSpacer:v["a"]})},afdd:function(t,e,o){"use strict";var s=o("8336");e["a"]=s["a"]},c8d9:function(t,e,o){},ddcd:function(t,e,o){"use strict";o("c8d9")}}]);
//# sourceMappingURL=chunk-ffe4f2de.8f0b71f9.js.map