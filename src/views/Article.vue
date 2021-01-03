<template>
  <v-container class="topScroll">
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title> 삭제 </v-card-title>
        <v-card-text> 정말 게시글을 삭제하시겠습니까? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onDelete" tile depressed>예</v-btn>
          <v-btn color="primary" outlined tile @click="deleteDialog = false"
            >아니오</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" class="py-0">
        <router-link
          v-if="board.code != 0"
          class="text-subtitle-2 text-decoration-none"
          :to="{ name: 'Board', params: { boardId: board.id } }"
          >{{ board.name }}</router-link
        >
      </v-col>
      <v-col cols="12" class="py-0">
        <div class="text-h5 mt-3 font-weight-bold" id="title">
          {{ post.title }}
        </div>
      </v-col>

      <v-col cols="12" class="py-0">
        <div class="text-subtitle-2 mt-2">
          <v-icon left>mdi-calendar-month</v-icon>
          <span style="vertical-align: middle">{{
            $moment(post.createdAt).format("YYYY-MM-DD HH:mm:ss")
          }}</span>
        </div>
        <v-row class="px-3">
          <v-col
            class="align-center pa-0 d-flex text-subtitle-2 mt-2"
            cols="12"
          >
            <v-icon left>mdi-file-find</v-icon>
            <span style="vertical-align: middle">{{ post.view }}</span>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="onLike" :color="like ? 'red' : ''" icon>
              <v-icon>{{ like ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
            </v-btn>
            <v-menu offset-y v-if="userRule == 'admin'">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  :to="`../${$route.params.id}/${$route.params.postId}/editor`"
                  dense
                >
                  <v-list-item-title>
                    <v-icon left>mdi-pencil</v-icon>수정</v-list-item-title
                  >
                </v-list-item>
                <v-list-item
                  v-if="board.code != 0"
                  dense
                  @click="deleteDialog = true"
                >
                  <v-list-item-title>
                    <v-icon left>mdi-delete</v-icon>삭제
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="py-0">
        <div class="editor ma-2 pb-5">
          <v-divider class="my-4"></v-divider>
          <editor-content class="editor__content px-3" :editor="editor" />
        </div>
      </v-col>
    </v-row>
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
  Image,
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
  components: { EditorContent },
  props: ["board"],
  data: () => ({ editor: null, post: {}, deleteDialog: false, like: false }),
  beforeRouteUpdate(to, from, next) {
    axios
      .get(`${apiPrefix}/posts/${to.params.id}/${to.params.postId}`)
      .then((result) => {
        this.post = result.data;
        this.editor.setContent(this.post.content);
        next();
      })
      .catch(() => {
        this.$router.replace("/error");
      });
  },
  beforeRouteEnter(to, from, next) {
    axios
      .get(`${apiPrefix}/posts/${to.params.id}/${to.params.postId}`)
      .then((result) => {
        next((vm) => {
          vm.post = result.data;
        });
      })
      .catch(() => {
        next((vm) => {
          vm.$router.replace("/error");
        });
      });
  },
  methods: {
    onLike() {
      this.$axios
        .post(`${apiPrefix}/users/likes`, {
          set: !this.like,
          postId: this.$route.params.postId,
        })
        .then(() => {
          this.like = !this.like;
          this.$store.dispatch("getLikes");
        });
    },
    onDelete() {
      this.$axios
        .delete(
          `${apiPrefix}/posts/${this.$route.params.id}/${this.$route.params.postId}`
        )
        .then(() => {
          this.$router.replace(`.`);
        })
        .catch(() => {
          this.$router.replace("/error");
        });
    },
  },
  computed: {
    userRule() {
      return this.$store.state.rule;
    },
    getLike() {
      return this.$store.state.likes;
    },
  },
  mounted() {
    this.like = this.getLike.includes(this.$route.params.postId);
    if (this.userRule) {
      this.$axios
        .patch(`${apiPrefix}/users/history`, {
          post: this.$route.params.postId,
        })
        .then((result) => {
          this.$store.commit("setHistoryCount", result.data.count);
        });
    }
    setTimeout(() => {
      this.$scrollTo.scrollTo(".topScroll", 800, {
        offset: -80,
        easing: [0.65, 0, 0.35, 1],
      });
    }, 50);
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
        new Image(),
        new Link({ rel: "", target: "_blank" }),
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
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.editor {
  @import "@/assets/sass/main.scss";
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
