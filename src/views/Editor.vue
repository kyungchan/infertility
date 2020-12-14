<template>
  <v-container class="container">
    <v-dialog v-model="errorDialog" max-width="500px">
      <v-card>
        <v-card-title> 오류 </v-card-title>
        <v-card-text> {{ errorMessage }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="errorDialog = false" depressed
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDialog" max-width="500px">
      <v-card>
        <v-card-title>경고</v-card-title>
        <v-card-text>페이지를 벗어나면 입력한 데이터가 사라집니다.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="$router.go(-1)" tile depressed
            >OK</v-btn
          >
          <v-btn
            color="primary"
            @click="confirmDialog = false"
            tile
            outlined
            depressed
            >취소</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="mx-3 my-5" align="center">
      <v-col cols="12" class="pa-0">
        <router-link
          class="text-subtitle-2 text-decoration-none"
          :to="{ name: 'Board', params: { boardId: board.id } }"
          >{{ board.name }}</router-link
        >
      </v-col>
      <h2 class="mt-1 ma-0">{{ editMode ? "글 수정" : "글 작성" }}</h2>
    </v-row>
    <v-text-field
      id="editor-title"
      class="elevation-1 my-2"
      placeholder="Title"
      flat
      solo
      hide-details="true"
      v-model="title"
      :rules="[(v) => !!v || '제목을 입력해주세요.']"
    ></v-text-field>
    <v-card class="pt-2">
      <div class="editor ma-2 pb-5">
        <editor-menu-bubble
          class="menububble"
          :editor="editor"
          @hide="hideLinkMenu"
          v-slot="{ commands, isActive, getMarkAttrs, menu }"
        >
          <div
            class="menububble"
            :class="{ 'is-active': menu.isActive }"
            :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
          >
            <form
              class="menububble__form"
              v-if="linkMenuIsActive"
              @submit.prevent="setLinkUrl(commands.link, linkUrl)"
            >
              <input
                class="menububble__input"
                type="text"
                v-model="linkUrl"
                placeholder="https://"
                ref="linkInput"
                @keydown.esc="hideLinkMenu"
              />
              <button
                class="menububble__button"
                @click="setLinkUrl(commands.link, null)"
                type="button"
              >
                <v-icon small color="white">mdi-close</v-icon>
              </button>
            </form>

            <template v-else>
              <button
                class="menububble__button"
                @click="showLinkMenu(getMarkAttrs('link'))"
                :class="{ 'is-active': isActive.link() }"
              >
                <span>{{ isActive.link() ? "Update Link" : "Add Link" }}</span>
                <v-icon small dark style="padding-top: 6px; padding-left: 4px"
                  >mdi-link-variant</v-icon
                >
              </button>
            </template>
          </div>
        </editor-menu-bubble>

        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
          <div class="menubar">
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
            >
              <v-icon>mdi-format-bold</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
            >
              <v-icon>mdi-format-italic</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.strike() }"
              @click="commands.strike"
            >
              <v-icon>mdi-format-strikethrough</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
            >
              <v-icon>mdi-format-underline</v-icon>
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.paragraph() }"
              @click="commands.paragraph"
            >
              <v-icon>mdi-format-paragraph</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })"
            >
              <v-icon>mdi-format-header-1</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })"
            >
              <v-icon>mdi-format-header-2</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })"
            >
              <v-icon>mdi-format-header-3</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list"
            >
              <v-icon>mdi-format-list-bulleted</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click="commands.ordered_list"
            >
              <v-icon>mdi-format-list-numbered</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote"
            >
              <v-icon>mdi-format-quote-open</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.code_block() }"
              @click="commands.code_block"
            >
              <v-icon>mdi-code-tags</v-icon>
            </button>

            <button class="menubar__button" @click="commands.horizontal_rule">
              <v-icon>mdi-minus</v-icon>
            </button>

            <button class="menubar__button" @click="commands.undo">
              <v-icon>mdi-undo</v-icon>
            </button>

            <button class="menubar__button" @click="commands.redo">
              <v-icon>mdi-redo</v-icon>
            </button>

            <button
              class="menubar__button"
              @click="showImagePrompt(commands.image)"
            >
              <v-icon>mdi-image</v-icon>
            </button>
          </div>
        </editor-menu-bar>
        <div class="mb-3">
          <v-divider></v-divider>
        </div>
        <editor-content class="editor__content px-3" :editor="editor" />
      </div>
    </v-card>
    <v-row class="mr-1 mt-3">
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mr-2" depressed tile @click="onPublish"
        >등록</v-btn
      >
      <v-btn
        color="primary"
        depressed
        outlined
        tile
        @click="confirmDialog = true"
        >취소</v-btn
      ></v-row
    >
  </v-container>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder,
} from "tiptap-extensions";

const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분

export default {
  components: {
    EditorContent,
    EditorMenuBubble,
    EditorMenuBar,
  },
  props: ["board", "editMode"],
  data() {
    return {
      errorMessage: "",
      editPost: {},
      errorDialog: false,
      confirmDialog: false,
      title: "",
      content: "",
      html: "",
      linkUrl: null,
      linkMenuIsActive: false,
      editor: new Editor({
        extensions: [
          new Placeholder({
            emptyEditorClass: "is-editor-empty",
            emptyNodeClass: "is-empty",
            emptyNodeText: "Content",
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        onUpdate: ({ getHTML }) => {
          const html = getHTML();
          if (html === "<p></p>") this.content = "";
          else this.content = html;
        },
      }),
    };
  },
  mounted() {
    if (this.editMode) {
      this.$axios
        .get(
          `${apiPrefix}/posts/${this.$route.params.id}/${this.$route.params.postId}?editmode=true`
        )
        .then((result) => {
          this.title = result.data.title;
          this.content = result.data.content;
          this.editor.setContent(result.data.content);
        })
        .catch((err) => {
          console.log(err);
          this.$router.replace("/error");
        });
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },
    onPublish() {
      if (!this.title.length) {
        this.errorDialog = true;
        this.errorMessage = "제목을 입력해주세요.";
      } else {
        if (this.editMode) {
          this.$axios
            .patch(
              `${apiPrefix}/posts/${this.board.code}/${this.$route.params.postId}`,
              {
                title: this.title,
                content: this.content,
              }
            )
            .then(() => {
              this.$router.replace(`.`);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$axios
            .post(`${apiPrefix}/posts/${this.board.code}`, {
              title: this.title,
              content: this.content,
            })
            .then((result) => {
              this.$router.replace(`./${result.data._id}`);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    },
  },
};
</script>

<style scoped>
#editor-title {
  font-size: 1.5em;
}
.editor .editor__content {
  height: 44vh;
  overflow: auto;
}
</style>

<style lang="scss">
.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
</style>
<style lang="scss" src="@/assets/sass/main.scss"></style>

<style lang="scss" scoped>
.icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 0.3rem;
  top: -0.05rem;
  fill: currentColor;
  // &.has-align-fix {
  // 	top: -.1rem;
  // }
  &__svg {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
}
// svg sprite
body > svg,
.icon use > svg,
symbol {
  path,
  rect,
  circle,
  g {
    fill: currentColor;
    stroke: none;
  }
  *[d="M0 0h24v24H0z"] {
    display: none;
  }
}
</style>
