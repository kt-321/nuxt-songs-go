<template>
    <div class="c-select-list" :class="{ multiple: multiple }">
        <ul :style="{ height: height }">
            <li v-for="(data, index) in items" :key="index" :class="getClass(data)" @click="selectItem(data)">
                <span v-for="(label, index2) in dataLabel.split(',')" :key="index2">
                    {{ data[label] }}
                </span>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
@Component
export default class CSelectList extends Vue {
    // 無効状態か否か
    @Prop(Boolean) disabled?: boolean
    // 複数選択
    @Prop(Boolean) multiple?: boolean
    // 高さ
    @Prop({ type: String, default: '100px' }) height?: string
    // モデル
    @PropSync('model', { default: undefined }) syncModel!: any
    // データソース
    @Prop({ type: Array, default: null }) items?: Array<any>
    // ラベルキー
    @Prop({ type: String, default: 'label' }) dataLabel!: string
    // 値キー
    @Prop({ type: String, default: null }) dataValue!: string

    private serialize(data: any) {
        return JSON.stringify(data)
    }
    // スタイル
    private getClass(data: any) {
        if (this.syncModel && Array.isArray(this.syncModel)) {
            const index = this.syncModel.findIndex((it) => this.serialize(it) === this.serialize(data))
            return {
                selected: index >= 0
            }
        }
        return {
            selected: false
        }
    }
    // 選択
    private selectItem(data: any) {
        // 無効の場合は反応させない
        if (this.disabled) {
            return
        }
        if (!this.multiple) {
            const index = this.syncModel.findIndex((it: any) => this.serialize(it) === this.serialize(data))
            if (index >= 0) {
                this.syncModel.splice(index, 1)
            } else {
                this.syncModel.splice(0, this.syncModel.length)
                this.syncModel.push(this.dataValue ? data[this.dataValue] : data)
            }
        } else if (Array.isArray(this.syncModel)) {
            // すでに選択されている場合は解除
            const index = this.syncModel.findIndex((it) => this.serialize(it) === this.serialize(data))
            if (index >= 0) {
                this.syncModel.splice(index, 1)
            } else {
                this.syncModel.push(this.dataValue ? data[this.dataValue] : data)
            }
        }
        // 変更イベント発火
        this.$emit('c-change', this.syncModel)
    }
}
</script>
<style lang="stylus">
.c-select-list
    ul
        margin: 0
        padding: 0
        list-style: none
        width: calc(100% - 18px)
        font-size: 13px
        padding: 6px 8px
        border: 1px solid #ccc
        border-radius: 4px
        background-color: #fff
        overflow-y: scroll
        &:disabled
            background-color: #ddd
        li
            cursor: pointer
            &.selected
                background-color: $dark-bg-color
            > span
                padding-left: 24px
                position: relative
                &:before
                    content: ''
                    display: block
                    position: absolute
                    top: -1px
                    left: 0
                    width: 18px
                    height: 18px
                    border: 3px solid rgba(15, 59, 138, 0.54)
                    border-radius: 3px
                    box-sizing: border-box
                    background-color: #fff
            &.selected span
                &:after
                    content: ''
                    display: block
                    position: absolute
                    top: 2px
                    left: 6px
                    width: 6px
                    height: 10px
                    transform: rotate(45deg)
                    border-bottom: 3px solid rgba(15, 59, 138, 0.54)
                    border-right: 3px solid rgba(15, 59, 138, 0.54)
                    box-sizing: border-box
</style>