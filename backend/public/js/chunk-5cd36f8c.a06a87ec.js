(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5cd36f8c"],{"1f52":function(t,e,n){"use strict";n("7a2e")},"49d7":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"container"},[n("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.errorDialog,callback:function(e){t.errorDialog=e},expression:"errorDialog"}},[n("v-card",[n("v-card-title",[t._v(" 오류 ")]),n("v-card-text",[t._v(" "+t._s(t.errorMessage)+" ")]),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"primary",depressed:""},on:{click:function(e){t.errorDialog=!1}}},[t._v("OK")])],1)],1)],1),n("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.confirmDialog,callback:function(e){t.confirmDialog=e},expression:"confirmDialog"}},[n("v-card",[n("v-card-title",[t._v("경고")]),n("v-card-text",[t._v("페이지를 벗어나면 입력한 데이터가 사라집니다.")]),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"primary",tile:"",depressed:""},on:{click:function(e){return t.$router.go(-1)}}},[t._v("OK")]),n("v-btn",{attrs:{color:"primary",tile:"",outlined:"",depressed:""},on:{click:function(e){t.confirmDialog=!1}}},[t._v("취소")])],1)],1)],1),n("v-row",{staticClass:"mx-3 my-5",attrs:{align:"center"}},[n("v-col",{staticClass:"pa-0",attrs:{cols:"12"}},[n("router-link",{staticClass:"text-subtitle-2 text-decoration-none",attrs:{to:{name:"Board",params:{boardId:t.board.id}}}},[t._v(t._s(t.board.name))])],1),n("h2",{staticClass:"mt-1 ma-0"},[t._v(t._s(t.editMode?"글 수정":"글 작성"))])],1),n("v-text-field",{staticClass:"elevation-1 my-2",attrs:{id:"editor-title",placeholder:"Title",flat:"",solo:"","hide-details":"true",rules:[function(t){return!!t||"제목을 입력해주세요."}]},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),n("v-card",{staticClass:"pt-2"},[n("div",{staticClass:"editor ma-2 pb-5"},[n("editor-menu-bubble",{staticClass:"menububble",attrs:{editor:t.editor},on:{hide:t.hideLinkMenu},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.commands,o=e.isActive,a=e.getMarkAttrs,s=e.menu;return[n("div",{staticClass:"menububble",class:{"is-active":s.isActive},style:"left: "+s.left+"px; bottom: "+s.bottom+"px;"},[t.linkMenuIsActive?n("form",{staticClass:"menububble__form",on:{submit:function(e){return e.preventDefault(),t.setLinkUrl(i.link,t.linkUrl)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.linkUrl,expression:"linkUrl"}],ref:"linkInput",staticClass:"menububble__input",attrs:{type:"text",placeholder:"https://"},domProps:{value:t.linkUrl},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.hideLinkMenu(e)},input:function(e){e.target.composing||(t.linkUrl=e.target.value)}}}),n("button",{staticClass:"menububble__button",attrs:{type:"button"},on:{click:function(e){return t.setLinkUrl(i.link,null)}}},[n("v-icon",{attrs:{small:"",color:"white"}},[t._v("mdi-close")])],1)]):[n("button",{staticClass:"menububble__button",class:{"is-active":o.link()},on:{click:function(e){t.showLinkMenu(a("link"))}}},[n("span",[t._v(t._s(o.link()?"Update Link":"Add Link"))]),n("v-icon",{staticStyle:{"padding-top":"6px","padding-left":"4px"},attrs:{small:"",dark:""}},[t._v("mdi-link-variant")])],1)]],2)]}}])}),n("editor-menu-bar",{attrs:{editor:t.editor},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.commands,o=e.isActive;return[n("div",{staticClass:"menubar"},[n("button",{staticClass:"menubar__button",class:{"is-active":o.bold()},on:{click:i.bold}},[n("v-icon",[t._v("mdi-format-bold")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":o.italic()},on:{click:i.italic}},[n("v-icon",[t._v("mdi-format-italic")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":o.strike()},on:{click:i.strike}},[n("v-icon",[t._v("mdi-format-strikethrough")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":o.underline()},on:{click:i.underline}},[n("v-icon",[t._v("mdi-format-underline")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":o.paragraph()},on:{click:i.paragraph}},[n("v-icon",[t._v("mdi-format-paragraph")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":o.heading({level:1})},on:{click:function(t){return i.heading({level:1})}}},[n("v-icon",[t._v("mdi-format-header-1")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":o.heading({level:2})},on:{click:function(t){return i.heading({level:2})}}},[n("v-icon",[t._v("mdi-format-header-2")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":o.heading({level:3})},on:{click:function(t){return i.heading({level:3})}}},[n("v-icon",[t._v("mdi-format-header-3")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":o.bullet_list()},on:{click:i.bullet_list}},[n("v-icon",[t._v("mdi-format-list-bulleted")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":o.ordered_list()},on:{click:i.ordered_list}},[n("v-icon",[t._v("mdi-format-list-numbered")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":o.blockquote()},on:{click:i.blockquote}},[n("v-icon",[t._v("mdi-format-quote-open")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":o.code_block()},on:{click:i.code_block}},[n("v-icon",[t._v("mdi-code-tags")])],1),n("button",{staticClass:"menubar__button",on:{click:i.horizontal_rule}},[n("v-icon",[t._v("mdi-minus")])],1),n("button",{staticClass:"menubar__button",on:{click:i.undo}},[n("v-icon",[t._v("mdi-undo")])],1),n("button",{staticClass:"menubar__button",on:{click:i.redo}},[n("v-icon",[t._v("mdi-redo")])],1),n("button",{staticClass:"menubar__button",on:{click:function(e){return t.showImagePrompt(i.image)}}},[n("v-icon",[t._v("mdi-image")])],1)])]}}])}),n("div",{staticClass:"mb-3"},[n("v-divider")],1),n("editor-content",{staticClass:"editor__content px-3",attrs:{editor:t.editor}})],1)]),n("v-row",{staticClass:"mr-1 mt-3"},[n("v-spacer"),n("v-btn",{staticClass:"mr-2",attrs:{color:"primary",depressed:"",tile:""},on:{click:t.onPublish}},[t._v("등록")]),n("v-btn",{attrs:{color:"primary",depressed:"",outlined:"",tile:""},on:{click:function(e){t.confirmDialog=!0}}},[t._v("취소")])],1)],1)},o=[],a=(n("99af"),n("ac1f"),n("5319"),n("cd42")),s=n("f23d"),c="",r={components:{EditorContent:a["b"],EditorMenuBubble:a["d"],EditorMenuBar:a["c"]},props:["board","editMode"],data:function(){var t=this;return{errorMessage:"",editPost:{},errorDialog:!1,confirmDialog:!1,title:"",content:"",html:"",linkUrl:null,linkMenuIsActive:!1,editor:new a["a"]({extensions:[new s["n"]({emptyEditorClass:"is-editor-empty",emptyNodeClass:"is-empty",emptyNodeText:"Content",showOnlyWhenEditable:!0,showOnlyCurrent:!0}),new s["a"],new s["c"],new s["e"],new s["f"],new s["g"]({levels:[1,2,3]}),new s["i"],new s["l"],new s["m"],new s["p"],new s["q"],new s["k"]({rel:"",target:"_blank"}),new s["b"],new s["d"],new s["j"],new s["o"],new s["r"],new s["h"]],onUpdate:function(e){var n=e.getHTML,i=n();t.content="<p></p>"===i?"":i}})}},mounted:function(){var t=this;this.editMode&&this.$axios.get("".concat(c,"/posts/").concat(this.$route.params.id,"/").concat(this.$route.params.postId,"?editmode=true")).then((function(e){t.title=e.data.title,t.content=e.data.content,t.editor.setContent(e.data.content)})).catch((function(e){console.log(e),t.$router.replace("/error")}))},beforeDestroy:function(){this.editor.destroy()},methods:{showImagePrompt:function(t){var e=prompt("Enter the url of your image here");null!==e&&t({src:e})},onPublish:function(){var t=this;this.title.length?this.editMode?this.$axios.patch("".concat(c,"/posts/").concat(this.board.code,"/").concat(this.$route.params.postId),{title:this.title,content:this.content}).then((function(){t.$router.replace(".")})).catch((function(t){console.log(t)})):this.$axios.post("".concat(c,"/posts/").concat(this.board.code),{title:this.title,content:this.content}).then((function(e){t.$router.replace("./".concat(e.data._id))})).catch((function(t){console.log(t)})):(this.errorDialog=!0,this.errorMessage="제목을 입력해주세요.")},showLinkMenu:function(t){var e=this;this.linkUrl=t.href,this.linkMenuIsActive=!0,this.$nextTick((function(){e.$refs.linkInput.focus()}))},hideLinkMenu:function(){this.linkUrl=null,this.linkMenuIsActive=!1},setLinkUrl:function(t,e){t({href:e}),this.hideLinkMenu()}}},l=r,u=(n("c482"),n("1f52"),n("53f4"),n("c49e"),n("2877")),d=n("6544"),v=n.n(d),m=n("8336"),b=n("b0af"),f=n("99d9"),p=n("62ad"),_=n("a523"),h=n("169a"),k=n("ce7e"),g=n("132d"),C=n("0fd9"),w=n("2fa4"),x=n("8654"),y=Object(u["a"])(l,i,o,!1,null,"5c044b1f",null);e["default"]=y.exports;v()(y,{VBtn:m["a"],VCard:b["a"],VCardActions:f["a"],VCardText:f["b"],VCardTitle:f["c"],VCol:p["a"],VContainer:_["a"],VDialog:h["a"],VDivider:k["a"],VIcon:g["a"],VRow:C["a"],VSpacer:w["a"],VTextField:x["a"]})},5036:function(t,e,n){},"53f4":function(t,e,n){"use strict";n("5036")},"7a2e":function(t,e,n){},"8efc6":function(t,e,n){},"930a":function(t,e,n){},c482:function(t,e,n){"use strict";n("930a")},c49e:function(t,e,n){"use strict";n("8efc6")}}]);
//# sourceMappingURL=chunk-5cd36f8c.a06a87ec.js.map