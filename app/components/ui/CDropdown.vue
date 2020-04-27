<template>
    <span class="c-dropdown" :class="disabled">
        <select
            v-model="syncModel"
            class="c-dropdown-input"
            :class="{ multiple: multiple }"
            :multiple="multiple"
            :disabled="disabled"
            @change="checkedHandler"
        >
            <option v-for="(data, index) in items" :key="index" :value="dataValue ? data[dataValue] : data">
                <template v-for="label in dataLabel.split(',')">
                    {{ data[label] }}
                </template>
            </option>
            <slot />
        </select>
    </span>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync, Emit } from 'vue-property-decorator'
// import { generateUUIDv4 as uuid } from '@bitjourney/uuid-v4'
@Component
export default class CDropdown extends Vue {
    // 無効状態か否か
    @Prop(Boolean) disabled?: boolean
    // 複数選択
    @Prop(Boolean) multiple?: boolean
    // モデル
    @PropSync('model', { default: undefined }) syncModel!: any
    // データソース
    @Prop({ type: Array, default: null }) items?: Array<any>
    // ラベル
    @Prop({ type: String, default: 'label' }) dataLabel!: string
    // ラベル
    @Prop({ type: String, default: null }) dataValue!: string
    // 変更通知
    @Emit('c-change')
    private checkedHandler() {
        return this.syncModel
    }
}
</script>
<style lang="stylus">
.c-dropdown
    display: block
    select
        appearance: none
        width: 100%
        outline: none
        text-indent: 0.01px
        text-overflow: ''
        vertical-align: middle
        font-size: inherit
        color: inherit
        border: 1px solid #ccc
        padding: 8px 32px 8px 8px
        border-radius: 4px
        background: #fff url(/img/arrow/c-arrow-down.svg) no-repeat right 10px center
        background-size: 12px auto
        &.multiple
            background-image: none
            padding-right: 8px
        &:disabled
            opacity: 50%
</style>