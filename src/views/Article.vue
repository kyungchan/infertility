<template>
  <v-container>
    <div class="text-subtitle-2">난임생활정보</div>
    <div class="text-h5 mt-3 font-weight-bold" id="title">
      인공수정 이전 난임 여성들을 위한 체중 감소 중재의 효과
    </div>
    <div class="text-subtitle-2 mt-2">
      <v-icon left>mdi-calendar-month</v-icon>
      <span style="vertical-align: middle">2020-11-25</span>
    </div>
    <v-divider class="my-4"></v-divider>
    <editor-content :editor="editor" />
  </v-container>
</template>
<script>
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
export default {
  components: { EditorContent },
  data() {
    return { editor: null };
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
      content: `<p>난임 사례 중 10~30%는 오로지 남성에게 원인이 있다고 분석되어 집니다. 몇몇 질환들은 남성 난임을 악화시키는 데에 기여하는 것으로 나타납니다. 그리고 당뇨는 그 질환들 중 하나입니다. 당뇨는 만성적, 비전염성 질환이고 2014년 기준으로 전 세계의 9%(4억 2200만)에게 있는 질환으로, 가장 주목할 만한 건강 위협으로 여겨집니다.</p><p>당뇨는 고혈당이 특징이며 고혈당은 세포가 인슐린을 분비하거나 췌장 세포의 불능 또는 표적조직이 인슐린으로부터 무감각해지는 것으로부터 초래됩니다.</p><p>출처</p><ul><li><p>Omolaoye, T. &amp; Du Plessis, S. S. 2018. Diabetes mellitus and male infertility. Asian Pacific Journal of Reproduction, 7(1):6-14, doi:10.4103/2305-0500.220978.</p></li></ul><p>더 자세히 알아보기</p><p><a href="http://scholar.sun.ac.za/handle/10019.1/106380" rel="noopener noreferrer nofollow">http://scholar.sun.ac.za/handle/10019.1/106380</a></p>`,
    });
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
