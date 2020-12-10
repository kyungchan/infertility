<template>
  <v-container>
    <router-link
      class="text-subtitle-2 text-decoration-none"
      :to="{ name: 'Board', params: { boardId: board.id } }"
      >{{ board.name }}</router-link
    >
    <div class="text-h5 mt-3 font-weight-bold" id="title">
      {{ post.title }}
    </div>
    <div class="text-subtitle-2 mt-2">
      <v-icon left>mdi-calendar-month</v-icon>
      <span style="vertical-align: middle">{{ post.createdAt }}</span>
    </div>
    <v-divider class="my-4"></v-divider>
    <editor-content :editor="editor" />
  </v-container>
</template>
<script>
import axios from "axios";
import { Editor, EditorContent } from "tiptap";
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
const apiPrefix = "/api"; // production mode를 구분
export default {
  components: { EditorContent },
  props: ["board"],
  data: () => ({ editor: null, post: {} }),
  beforeRouteEnter(to, from, next) {
    axios
      .get(`${apiPrefix}/posts/${to.params.id}/${to.params.postId}`)
      .then((result) => {
        next((vm) => {
          vm.post = result.data;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    this.editor = new Editor({
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
      editable: false,
      content: this.post.content,
    });
    this.post.createdAt = this.post.createdAt.substr(0, 10);
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style>
#title {
  word-break: keep-all;
}
</style>
