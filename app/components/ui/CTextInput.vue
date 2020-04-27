<template>
    <div class="c-text-input">
        <input
            v-if="password"
            v-model="syncModel"
            :disabled="disabled"
            :readonly="readonly"
            type="password"
            class="c-text-input-input"
            :placeholder="placeholder"
        />
        <input
            v-else-if="number"
            v-model.number="syncModel"
            :disabled="disabled"
            :readonly="readonly"
            type="number"
            class="c-text-input-input"
            :placeholder="placeholder"
        />
        <textarea
            v-else-if="multiline"
            v-model="syncModel"
            :disabled="disabled"
            :readonly="readonly"
            class="c-text-input-input"
            :style="{ height: height }"
            :placeholder="placeholder"
        ></textarea>
        <input
            v-else
            v-model="syncModel"
            :disabled="disabled"
            :readonly="readonly"
            type="text"
            class="c-text-input-input"
            :placeholder="placeholder"
            @input="inputHandler"
        />
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
@Component({})
export default class CTextInput extends Vue {
    // 無効状態か否か
    @Prop(Boolean) disabled?: boolean
    // 高さ
    @Prop({ type: String, default: '100px' }) height?: string
    // パスワード入力
    @Prop(Boolean) password?: boolean
    // テキストエリア
    @Prop(Boolean) multiline?: boolean
    // 読み取り専用
    @Prop(Boolean) readonly?: boolean
    // 数値入力
    @Prop(Boolean) number?: boolean
    // textのみ表示の場合は、itemsではなくtextで
    @Prop(String) text?: string
    // placeholder
    @Prop(String) placeholder?: string
    // とりあえず文字列で返す
    @PropSync('model', { default: undefined }) syncModel!: string | number | boolean | null | undefined
    inputHandler() {
        this.$emit('c-input', this.text)
    }
}
</script>
<style lang="stylus">
.c-text-input
    input, textarea
        display: block
        width: calc(100% - 18px)
        font-size: $form-item-font-size
        padding: 8px
        border: 1px solid #ccc
        border-radius: 4px
        background-color: #fff
        resize: none
        &:disabled
            background-color: #ddd
</style>