(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5deb7702"],{"04a9":function(t,e,o){},"3ad6":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",{staticClass:"topScroll"},[o("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[o("v-card",[o("v-card-title",[t._v(" 삭제 ")]),o("v-card-text",[t._v(" 정말 게시글을 삭제하시겠습니까? ")]),o("v-card-actions",[o("v-spacer"),o("v-btn",{attrs:{color:"primary",tile:"",depressed:""},on:{click:t.onDelete}},[t._v("예")]),o("v-btn",{attrs:{color:"primary",outlined:"",tile:""},on:{click:function(e){t.deleteDialog=!1}}},[t._v("아니오")])],1)],1)],1),o("v-row",[o("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[0!=t.board.code?o("router-link",{staticClass:"text-subtitle-2 text-decoration-none",attrs:{to:{name:"Board",params:{boardId:t.board.id}}}},[t._v(t._s(t.board.name))]):t._e()],1),o("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[o("div",{staticClass:"text-h5 mt-3 font-weight-bold",attrs:{id:"title"}},[t._v(" "+t._s(t.post.title)+" ")])]),o("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[o("div",{staticClass:"text-subtitle-2 mt-2"},[o("v-icon",{attrs:{left:""}},[t._v("mdi-calendar-month")]),o("span",{staticStyle:{"vertical-align":"middle"}},[t._v(t._s(t.$moment(t.post.createdAt).format("YYYY-MM-DD HH:mm:ss")))])],1),o("v-row",{staticClass:"px-3"},[o("v-col",{staticClass:"align-center pa-0 d-flex text-subtitle-2 mt-2",attrs:{cols:"12"}},[o("v-icon",{attrs:{left:""}},[t._v("mdi-file-find")]),o("span",{staticStyle:{"vertical-align":"middle"}},[t._v(t._s(t.post.view))]),o("v-spacer"),t.userRule?o("v-btn",{attrs:{color:t.like?"red":"",icon:""},on:{click:function(e){return e.preventDefault(),t.onLike(e)}}},[o("v-icon",[t._v(t._s(t.like?"mdi-heart":"mdi-heart-outline"))])],1):t._e(),"admin"==t.userRule?o("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,s=e.attrs;return[o("v-btn",t._g(t._b({attrs:{icon:""}},"v-btn",s,!1),a),[o("v-icon",[t._v("mdi-dots-vertical")])],1)]}}],null,!1,3221905750)},[o("v-list",[o("v-list-item",{attrs:{to:"../"+t.$route.params.id+"/"+t.$route.params.postId+"/editor",dense:""}},[o("v-list-item-title",[o("v-icon",{attrs:{left:""}},[t._v("mdi-pencil")]),t._v("수정")],1)],1),0!=t.board.code?o("v-list-item",{attrs:{dense:""},on:{click:function(e){t.deleteDialog=!0}}},[o("v-list-item-title",[o("v-icon",{attrs:{left:""}},[t._v("mdi-delete")]),t._v("삭제 ")],1)],1):t._e()],1)],1):t._e()],1)],1)],1),o("v-col",{staticClass:"py-0",attrs:{cols:"12"}},[o("v-divider",{staticClass:"my-4"}),o("editor-content",{attrs:{editor:t.editor}})],1)],1)],1)},s=[],n=(o("99af"),o("caad"),o("ac1f"),o("2532"),o("5319"),o("bc3a")),i=o.n(n),r=o("cd42"),c=o("f23d"),l="",d={components:{EditorContent:r["b"]},props:["board"],data:function(){return{editor:null,post:{},deleteDialog:!1,like:!1}},beforeRouteUpdate:function(t,e,o){var a=this;i.a.get("".concat(l,"/posts/").concat(t.params.id,"/").concat(t.params.postId)).then((function(t){a.post=t.data,a.editor.setContent(a.post.content),o()})).catch((function(){a.$router.replace("/error")}))},beforeRouteEnter:function(t,e,o){i.a.get("".concat(l,"/posts/").concat(t.params.id,"/").concat(t.params.postId)).then((function(t){o((function(e){e.post=t.data}))})).catch((function(){o((function(t){t.$router.replace("/error")}))}))},methods:{onLike:function(){var t=this;this.$axios.post("".concat(l,"/users/likes"),{set:!this.like,postId:this.$route.params.postId}).then((function(){t.like=!t.like,t.$store.dispatch("getLikes")}))},onDelete:function(){var t=this;this.$axios.delete("".concat(l,"/posts/").concat(this.$route.params.id,"/").concat(this.$route.params.postId)).then((function(){t.$router.replace(".")})).catch((function(){t.$router.replace("/error")}))}},computed:{userRule:function(){return this.$store.state.rule},getLike:function(){return this.$store.state.likes}},mounted:function(){var t=this;this.userRule&&(this.like=this.getLike.includes(this.$route.params.postId),this.$axios.patch("".concat(l,"/users/history"),{post:this.$route.params.postId}).then((function(t){console.log(t)})).catch((function(t){console.log(t)}))),setTimeout((function(){t.$scrollTo.scrollTo(".topScroll",800,{offset:-80,easing:[.65,0,.35,1]})}),50),this.editor=new r["a"]({extensions:[new c["n"]({emptyEditorClass:"is-editor-empty",emptyNodeClass:"is-empty",emptyNodeText:"Content",showOnlyWhenEditable:!0,showOnlyCurrent:!0}),new c["a"],new c["c"],new c["e"],new c["f"],new c["g"]({levels:[1,2,3]}),new c["i"],new c["l"],new c["m"],new c["p"],new c["q"],new c["k"]({rel:"noopener noreferrer nofollow",target:"_blank"}),new c["b"],new c["d"],new c["j"],new c["o"],new c["r"],new c["h"]],editable:!1,content:this.post.content})},beforeDestroy:function(){this.editor.destroy()}},u=d,p=(o("4935"),o("a1fc"),o("2877")),v=o("6544"),f=o.n(v),m=o("8336"),h=o("b0af"),w=o("99d9"),b=o("62ad"),_=o("a523"),k=o("169a"),g=o("ce7e"),C=o("132d"),y=o("8860"),$=o("da13"),x=o("5d23"),V=o("e449"),D=o("0fd9"),I=o("2fa4"),L=Object(p["a"])(u,a,s,!1,null,"116e83a1",null);e["default"]=L.exports;f()(L,{VBtn:m["a"],VCard:h["a"],VCardActions:w["a"],VCardText:w["b"],VCardTitle:w["c"],VCol:b["a"],VContainer:_["a"],VDialog:k["a"],VDivider:g["a"],VIcon:C["a"],VList:y["a"],VListItem:$["a"],VListItemTitle:x["b"],VMenu:V["a"],VRow:D["a"],VSpacer:I["a"]})},4935:function(t,e,o){"use strict";o("04a9")},"6f41":function(t,e,o){},a1fc:function(t,e,o){"use strict";o("6f41")}}]);
//# sourceMappingURL=chunk-5deb7702.159e6ced.js.map