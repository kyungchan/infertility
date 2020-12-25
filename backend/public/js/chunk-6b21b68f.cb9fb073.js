(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b21b68f"],{"0798":function(t,e,i){"use strict";i("caad");var n=i("5530"),a=i("ade3"),s=(i("0c18"),i("10d2")),o=i("afdd"),r=i("9d26"),l=i("f2e7"),c=i("7560"),u=i("f40d"),h=i("58df"),d=i("d9bd");e["a"]=Object(h["a"])(s["a"],l["a"],u["a"]).extend({name:"v-alert",props:{border:{type:String,validator:function(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator:function(t){return"string"===typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator:function(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder:function(){if(!this.border)return null;var t={staticClass:"v-alert__border",class:Object(a["a"])({},"v-alert__border--".concat(this.border),!0)};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible:function(){var t=this;if(!this.dismissible)return null;var e=this.iconColor;return this.$createElement(o["a"],{staticClass:"v-alert__dismissible",props:{color:e,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(){return t.isActive=!1}}},[this.$createElement(r["a"],{props:{color:e}},this.closeIcon)])},__cachedIcon:function(){return this.computedIcon?this.$createElement(r["a"],{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes:function(){var t=Object(n["a"])(Object(n["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text});return this.border&&(t["v-alert--border-".concat(this.border)]=!0),t},computedColor:function(){return this.color||this.type},computedIcon:function(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&"$".concat(this.type))},hasColoredIcon:function(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText:function(){return this.text||this.outlined},iconColor:function(){return this.hasColoredIcon?this.computedColor:void 0},isDark:function(){return!(!this.type||this.coloredBorder||this.outlined)||c["a"].options.computed.isDark.call(this)}},created:function(){this.$attrs.hasOwnProperty("outline")&&Object(d["a"])("outline","outlined",this)},methods:{genWrapper:function(){var t=[this.$slots.prepend||this.__cachedIcon,this.genContent(),this.__cachedBorder,this.$slots.append,this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],e={staticClass:"v-alert__wrapper"};return this.$createElement("div",e,t)},genContent:function(){return this.$createElement("div",{staticClass:"v-alert__content"},this.$slots.default)},genAlert:function(){var t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){var e=this.hasText?this.setTextColor:this.setBackgroundColor;t=e(this.computedColor,t)}return this.$createElement("div",t,[this.genWrapper()])},toggle:function(){this.isActive=!this.isActive}},render:function(t){var e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},"0c18":function(t,e,i){},"17b3":function(t,e,i){},"2f8c":function(t,e,i){},"7c5e":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"topScroll"},[n("v-parallax",{attrs:{height:"250",fluid:"",dark:"",src:i("7c95")}},[n("v-row",{attrs:{align:"center",justify:"center"}},[n("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[n("h1",{staticClass:"quad-text-shadow text-center display-1 font-weight-thin mb-4"},[t._v(" 저장한 게시글 ")])])],1)],1),n("v-container",[n("v-card",{attrs:{tile:"",outlined:""}},[n("v-card-text",[n("ul",{staticClass:"pa-0 ma-0"},[t.likes.length?t._e():n("div",{staticClass:"py-10 text-center"},[t._v(" 저장한 글이 없습니다. ")]),t._l(t.likes,(function(e){return n("li",{key:e._id},[n("v-slide-y-reverse-transition",{attrs:{appear:"","hide-on-leave":"",duration:"1000"}},[n("list-item",{attrs:{link:"/boards/"+e.boardCode+"/"+e._id,subtitle:t.boards[e.boardCode].name,title:e.title,content:e.preview,color:t.boards[e.boardCode].color,postId:e._id}})],1)],1)}))],2)])],1),t.likes.length?n("v-pagination",{staticClass:"elevation-0",attrs:{length:parseInt(t.total/10)+(t.total%10?1:0)},on:{input:t.onPageChange},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}}):t._e()],1)],1)},a=[],s=(i("99af"),i("4160"),i("ac1f"),i("5319"),i("159b"),i("a6d7")),o=i("5e22"),r=i.n(o),l=i("bc3a"),c=i.n(l),u="",h={components:{ListItem:s["a"]},data:function(){return{page:1,total:0,likes:[],boards:[{code:"0",name:"난임 정보 마당",color:"pink"},{code:"1",name:"난임과 신체 건강",color:"indigo"},{code:"2",name:"신체 건강 중재",color:"indigo"},{code:"3",name:"난임과 정서적 건강",color:"amber"},{code:"4",name:"정서 건강 중재",color:"amber"},{code:"5",name:"성 건강",color:"orange"},{code:"6",name:"생활습관",color:"orange"}]}},mounted:function(){var t=this;setTimeout((function(){t.$scrollTo.scrollTo(".topScroll",800,{offset:-80,easing:[.65,0,.35,1]})}),50)},beforeRouteUpdate:function(t,e,i){var n=this;c.a.get("".concat(u,"/users/likes?page=").concat(t.query.page||1)).then((function(e){n.likes=e.data.likes.reverse(),n.likes.forEach((function(t){t.preview=r()(t.content,{allowedTags:[]})})),n.total=e.data.total,n.page=1*t.query.page||1,n.$scrollTo.scrollTo(".topScroll",800,{offset:-80,easing:[.65,0,.35,1]}),i()})).catch((function(){n.$router.replace("/error")}))},beforeRouteEnter:function(t,e,i){c.a.get("".concat(u,"/users/likes?page=").concat(t.query.page||1)).then((function(e){i((function(i){i.page=1*t.query.page||1,i.likes=e.data.likes.reverse(),i.total=e.data.total,i.likes.forEach((function(t){t.preview=r()(t.content,{allowedTags:[]})}))}))})).catch((function(){i((function(t){t.$router.replace("/error")}))}))},methods:{onPageChange:function(t){this.$router.push("".concat(this.$route.path,"?page=").concat(t))}},computed:{userRule:function(){return this.$store.state.rule},headers:function(){return[{text:"No",value:"no"},{text:"Test Name",value:"name"}]}}},d=h,p=(i("ce86"),i("2877")),v=i("6544"),f=i.n(v),g=i("b0af"),b=i("99d9"),m=i("62ad"),_=i("a523"),y=i("891e"),$=i("8b9c"),k=i("0fd9"),C=i("0789"),x=Object(p["a"])(d,n,a,!1,null,"735540fc",null);e["default"]=x.exports;f()(x,{VCard:g["a"],VCardText:b["b"],VCol:m["a"],VContainer:_["a"],VPagination:y["a"],VParallax:$["a"],VRow:k["a"],VSlideYReverseTransition:C["f"]})},"891e":function(t,e,i){"use strict";i("99af"),i("d81d"),i("a9e3"),i("d3b7"),i("25f0");var n=i("2909"),a=i("5530"),s=(i("17b3"),i("9d26")),o=i("dc22"),r=i("a9ad"),l=i("de2c"),c=i("7560"),u=i("58df");e["a"]=Object(u["a"])(r["a"],Object(l["a"])({onVisible:["init"]}),c["a"]).extend({name:"v-pagination",directives:{Resize:o["a"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function(t){return t%1===0}},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data:function(){return{maxButtons:0,selected:null}},computed:{classes:function(){return Object(a["a"])({"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled},this.themeClasses)},items:function(){var t=parseInt(this.totalVisible,10);if(0===t)return[];var e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);var i=e%2===0?1:0,a=Math.floor(e/2),s=this.length-a+1+i;if(this.value>a&&this.value<s){var o=this.value-a+2,r=this.value+a-2-i;return[1,"..."].concat(Object(n["a"])(this.range(o,r)),["...",this.length])}if(this.value===a){var l=this.value+a-1-i;return[].concat(Object(n["a"])(this.range(1,l)),["...",this.length])}if(this.value===s){var c=this.value-a+1;return[1,"..."].concat(Object(n["a"])(this.range(c,this.length)))}return[].concat(Object(n["a"])(this.range(1,a)),["..."],Object(n["a"])(this.range(s,this.length)))}},watch:{value:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.selected=null,this.$nextTick(this.onResize),setTimeout((function(){return t.selected=t.value}),100)},onResize:function(){var t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next:function(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous:function(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range:function(t,e){var i=[];t=t>0?t:1;for(var n=t;n<=e;n++)i.push(n);return i},genIcon:function(t,e,i,n,a){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":i},attrs:{type:"button","aria-label":a},on:i?{}:{click:n}},[t(s["a"],[e])])])},genItem:function(t,e){var i=this,n=e===this.value&&(this.color||"primary"),a=e===this.value,s=a?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(n,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button","aria-current":a,"aria-label":this.$vuetify.lang.t(s,e)},on:{click:function(){return i.$emit("input",e)}}}),[e.toString()])},genItems:function(t){var e=this;return this.items.map((function(i,n){return t("li",{key:n},[isNaN(Number(i))?t("span",{class:"v-pagination__more"},[i.toString()]):e.genItem(t,i)])}))},genList:function(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render:function(t){var e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}})},a6d7:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("router-link",{staticClass:"text-decoration-none",attrs:{to:t.link}},[i("v-alert",{staticClass:"py-0 pr-0",attrs:{tile:"","colored-border":"",color:t.color,border:"left",elevation:"0"}},[i("div",{staticClass:"one-line text--secondary caption"},[t._v(t._s(t.subtitle))]),i("div",{staticClass:"one-line subtitle-2 font-weight-bold"},[t._v(t._s(t.title))]),i("div",{staticClass:"text--secondary caption"},[t._v(t._s(t.date))]),i("v-row",{staticClass:"mx-0"},[i("div",{staticClass:"one-line text--secondary caption"},[t._v(t._s(t.content))]),i("v-spacer"),t.postId?i("v-btn",{attrs:{color:t.like?"red":"",icon:""},on:{click:function(e){return e.preventDefault(),t.onLike(e)}}},[i("v-icon",[t._v(t._s(t.like?"mdi-heart":"mdi-heart-outline"))])],1):t._e()],1)],1)],1)},a=[],s=(i("caad"),i("2532"),""),o={methods:{onLike:function(){var t=this;this.$axios.post("".concat(s,"/users/likes"),{set:!this.like,postId:this.postId}).then((function(){t.like=!t.like,t.$store.dispatch("getLikes")}))}},computed:{getLike:function(){return this.$store.state.likes}},mounted:function(){this.postId&&(this.like=this.getLike.includes(this.postId))},data:function(){return{like:!1}},props:["color","title","date","link","content","subtitle","postId"]},r=o,l=(i("ddcd"),i("2877")),c=i("6544"),u=i.n(c),h=i("0798"),d=i("8336"),p=i("132d"),v=i("0fd9"),f=i("2fa4"),g=Object(l["a"])(r,n,a,!1,null,"de0af918",null);e["a"]=g.exports;u()(g,{VAlert:h["a"],VBtn:d["a"],VIcon:p["a"],VRow:v["a"],VSpacer:f["a"]})},afdd:function(t,e,i){"use strict";var n=i("8336");e["a"]=n["a"]},c8d9:function(t,e,i){},ce86:function(t,e,i){"use strict";i("2f8c")},ddcd:function(t,e,i){"use strict";i("c8d9")}}]);
//# sourceMappingURL=chunk-6b21b68f.cb9fb073.js.map